import fs from "node:fs";
import path from "node:path";
import babelPresetReact from "@babel/preset-react";
import babelPresetTypescript from "@babel/preset-typescript";
import { loadConfig } from "c12";
import type { TsConfigResult } from "get-tsconfig";
import { createPathsMatcher, getTsconfig, parseTsconfig } from "get-tsconfig";
import type { JitiOptions } from "jiti";
import type { ZugferdOptions } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { addCloudflareVirtualModules } from "./cloudflare-virtual-modules";
import { addSvelteKitVirtualModules } from "./sveltekit-virtual-modules";
import { getViteAssetStub } from "./vite-virtual-modules";

export let possibleConfigPaths = [
	"invoicer.ts",
	"invoicer.tsx",
	"invoicer.js",
	"invoicer.jsx",
	"invoicer.server.js",
	"invoicer.server.ts",
	"zugferd.ts",
	"zugferd.tsx",
	"zugferd.js",
	"zugferd.jsx",
	"zugferd.server.js",
	"zugferd.server.ts",
];

possibleConfigPaths = [
	...possibleConfigPaths,
	...possibleConfigPaths.map((p) => `lib/server/${p}`),
	...possibleConfigPaths.map((p) => `server/${p}`),
	...possibleConfigPaths.map((p) => `lib/${p}`),
	...possibleConfigPaths.map((p) => `utils/${p}`),
];
possibleConfigPaths = [
	...possibleConfigPaths,
	...possibleConfigPaths.map((p) => `src/${p}`),
	...possibleConfigPaths.map((p) => `app/${p}`),
];

type PathsMatcher = (specifier: string) => string[];

function readRawTsconfigReferences(
	tsconfigPath: string,
): Array<{ path: string }> | undefined {
	try {
		const text = fs.readFileSync(tsconfigPath, "utf-8");
		const stripped = text
			.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
				g ? "" : m,
			)
			.replace(/,(?=\s*[}\]])/g, "");
		const raw = JSON.parse(stripped);
		return raw.references;
	} catch {
		return undefined;
	}
}

function collectReferencedTsconfigs(
	tsconfigPath: string,
	visited = new Set<string>(),
): TsConfigResult[] {
	const result: TsConfigResult[] = [];
	const refs = readRawTsconfigReferences(tsconfigPath);
	if (!refs) return result;

	const configDir = path.dirname(tsconfigPath);
	for (const ref of refs) {
		const resolvedRef = path.resolve(configDir, ref.path);
		const refTsconfigPath = resolvedRef.endsWith(".json")
			? resolvedRef
			: path.join(resolvedRef, "tsconfig.json");

		if (visited.has(refTsconfigPath)) continue;
		visited.add(refTsconfigPath);

		try {
			const refConfig = parseTsconfig(refTsconfigPath);
			result.push({ path: refTsconfigPath, config: refConfig });
		} catch {
			continue;
		}

		result.push(...collectReferencedTsconfigs(refTsconfigPath, visited));
	}
	return result;
}

/**
 * Ordered `paths` matchers from the project tsconfig and any referenced
 * tsconfigs, following TypeScript canonical resolution semantics.
 * @see https://github.com/microsoft/TypeScript/blob/main/src/compiler/moduleNameResolver.ts
 */
function collectPathsMatchers(cwd: string): PathsMatcher[] {
	const configName = fs.existsSync(path.join(cwd, "tsconfig.json"))
		? "tsconfig.json"
		: "jsconfig.json";
	const tsconfig = getTsconfig(cwd, configName);
	if (!tsconfig) return [];

	const matchers: PathsMatcher[] = [];
	try {
		const mainMatcher = createPathsMatcher(tsconfig);
		if (mainMatcher) matchers.push(mainMatcher);
		for (const refTsconfig of collectReferencedTsconfigs(tsconfig.path)) {
			const refMatcher = createPathsMatcher(refTsconfig);
			if (refMatcher) matchers.push(refMatcher);
		}
	} catch (error) {
		console.error(error);
		throw new ZugferdError("Error parsing tsconfig.json");
	}
	return matchers;
}

const SOURCE_EXTENSIONS = [
	".ts",
	".tsx",
	".mts",
	".cts",
	".js",
	".jsx",
	".mjs",
	".cjs",
] as const;

const SOURCE_EXTENSIONS_SET: ReadonlySet<string> = new Set(SOURCE_EXTENSIONS);

function resolveCandidateFile(candidate: string): string | undefined {
	try {
		if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
			return candidate;
		}
	} catch {}
	// A candidate that already has a known extension is either the exact
	// target or does not exist; extension and index probing would be noise.
	if (SOURCE_EXTENSIONS_SET.has(path.extname(candidate))) {
		return undefined;
	}
	for (const ext of SOURCE_EXTENSIONS) {
		const withExt = candidate + ext;
		if (fs.existsSync(withExt)) return withExt;
	}
	for (const ext of SOURCE_EXTENSIONS) {
		const asIndex = path.join(candidate, `index${ext}`);
		if (fs.existsSync(asIndex)) return asIndex;
	}
	return undefined;
}

function resolveWithMatchers(
	specifier: string,
	matchers: PathsMatcher[],
): string | undefined {
	for (const matcher of matchers) {
		for (const candidate of matcher(specifier)) {
			const resolved = resolveCandidateFile(candidate);
			if (resolved) return resolved;
		}
	}
	return undefined;
}

interface StringLiteralNode {
	type: "StringLiteral";
	value: string;
}
interface BabelNodePath<Node> {
	node: Node;
}
interface BabelTypes {
	isIdentifier(node: unknown): node is { name: string };
	isImport(node: unknown): boolean;
	isStringLiteral(node: unknown): node is StringLiteralNode;
}

/**
 * Callees whose first string argument is a module specifier. `jitiImport` is
 * a jiti-side preprocessor artifact observed in the AST; revisit on jiti
 * major version bumps (the regression suite catches a rename but not the why).
 */
const LOADER_IDENTIFIERS = new Set(["require", "import", "jitiImport"]);

function createRewriteImportPathsPlugin(matchers: PathsMatcher[]) {
	return ({ types: t }: { types: BabelTypes }) => {
		const rewrite = (source: StringLiteralNode | null | undefined): void => {
			if (!source) return;
			// Vite asset/query imports have no file on disk; stub them first so a
			// resolved alias prefix never sends them down the filesystem path.
			const stub = getViteAssetStub(source.value);
			if (stub) {
				source.value = stub;
				return;
			}
			const resolved = resolveWithMatchers(source.value, matchers);
			if (resolved) source.value = resolved;
		};
		return {
			visitor: {
				ImportDeclaration(p: BabelNodePath<{ source: StringLiteralNode }>) {
					rewrite(p.node.source);
				},
				ExportNamedDeclaration(
					p: BabelNodePath<{ source: StringLiteralNode | null }>,
				) {
					rewrite(p.node.source);
				},
				ExportAllDeclaration(p: BabelNodePath<{ source: StringLiteralNode }>) {
					rewrite(p.node.source);
				},
				ImportExpression(p: BabelNodePath<{ source: unknown }>) {
					// Only string literal sources can be statically rewritten.
					if (t.isStringLiteral(p.node.source)) rewrite(p.node.source);
				},
				CallExpression(
					p: BabelNodePath<{
						callee: unknown;
						arguments: unknown[];
					}>,
				) {
					const { callee, arguments: args } = p.node;
					const first = args[0];
					if (!t.isStringLiteral(first)) return;
					const isKnownLoader =
						(t.isIdentifier(callee) && LOADER_IDENTIFIERS.has(callee.name)) ||
						t.isImport(callee);
					if (!isKnownLoader) return;
					rewrite(first);
				},
			},
		};
	};
}

const getVirtualModuleAliases = (): Record<string, string> => {
	const result: Record<string, string> = {};
	addSvelteKitVirtualModules(result);
	addCloudflareVirtualModules(result);
	return result;
};

const jitiOptions = (cwd: string): JitiOptions => {
	const matchers = collectPathsMatchers(cwd);

	const plugins = [createRewriteImportPathsPlugin(matchers)];
	return {
		transformOptions: {
			babel: {
				presets: [
					[babelPresetTypescript, { isTSX: true, allExtensions: true }],
					[babelPresetReact, { runtime: "automatic" }],
				],
				plugins,
			},
		},
		extensions: [...SOURCE_EXTENSIONS],
		alias: getVirtualModuleAliases(),
	};
};

export async function getConfig({
	cwd,
	configPath,
	throw: shouldThrow = false,
}: {
	cwd: string;
	configPath?: string | undefined;
	throw?: boolean | undefined;
}) {
	const load = async (configFile: string) => {
		const { config } = await loadConfig<{
			invoicer?:
				| {
						options: ZugferdOptions;
				  }
				| undefined;
			zugferd?:
				| {
						options: ZugferdOptions;
				  }
				| undefined;
			options?: ZugferdOptions | undefined;
		}>({
			configFile,
			jitiOptions: jitiOptions(cwd),
			cwd,
		});
		return {
			hasConfig: Object.keys(config).length > 0,
			config:
				config.invoicer?.options ||
				config.zugferd?.options ||
				config?.options ||
				null,
		};
	};

	const handleMissingConfig = (configFile: string) => {
		const msg = [
			`Couldn't read your zugferd config in ${configFile}.`,
			`Make sure to default export your invoicer instance or to export as a variable named invoicer/zugferd.`,
		];
		if (shouldThrow) {
			throw new ZugferdError(msg.join(" "));
		}
		console.error(
			msg
				.map((m, i) => `${i !== 0 ? "\n" : ""}[#node-zugferd]: ${m}`)
				.join("\n"),
		);
		process.exit(1);
	};

	const handleError = (err: unknown) => {
		if (
			typeof err === "object" &&
			err &&
			"message" in err &&
			typeof err.message === "string" &&
			err.message.includes(
				"This module cannot be imported from a Client Component module",
			)
		) {
			const msg =
				"Please remove import 'server-only' from your zugferd config file temporarily. The CLI cannot resolve the configuration with it included. You can re-add it after running the CLI.";
			if (shouldThrow) {
				throw new Error(msg);
			}
			console.error(`[#node-zugferd]: ${msg}`);
			process.exit(1);
		}
		if (shouldThrow) {
			throw err;
		}

		console.error("[#node-zugferd]: Couldn't read your zugferd config.", err);
		process.exit(1);
	};

	try {
		let configFile: ZugferdOptions | null = null;
		if (configPath) {
			const resolvedPath = fs.existsSync(configPath)
				? configPath
				: path.join(cwd, configPath);
			configFile = (await load(resolvedPath)).config;
			if (!configFile) handleMissingConfig(resolvedPath);
		}

		if (!configFile) {
			for (const possiblePath of possibleConfigPaths) {
				try {
					const { hasConfig, config } = await load(possiblePath);
					if (hasConfig) {
						configFile = config;
						if (!configFile) handleMissingConfig(possiblePath);
						break;
					}
				} catch (err) {
					handleError(err);
				}
			}
		}

		return configFile;
	} catch (err) {
		handleError(err);
	}
}
