import { existsSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import type {
	Configuration,
	FormatContentOptions,
} from "@biomejs/js-api/nodejs";
import { Biome } from "@biomejs/js-api/nodejs";
import { findMonorepoRoot } from "./get-package-info";

const biome = new Biome();

const DEFAULT_CONFIGURATION = {
	formatter: {
		enabled: true,
		indentStyle: "tab",
	},
} satisfies Configuration;

const projects = new Map<string, number>();

const BIOME_CONFIG_FILES = ["biome.json", "biome.jsonc"] as const;

export async function formatContent(
	content: string,
	options?: Partial<FormatContentOptions> & { cwd?: string },
) {
	const {
		cwd = process.cwd(),
		filePath = "file.ts",
		...formatOptions
	} = options ?? {};
	const projectRoot = (await findMonorepoRoot(cwd)) ?? path.resolve(cwd);
	const projectKey = projectKeyFor(projectRoot);
	const formatted = biome.formatContent(projectKey, content, {
		...formatOptions,
		filePath: toProjectFilePath(filePath, projectRoot),
	});
	const errors = formatted.diagnostics.filter(
		(diagnostic) =>
			diagnostic.severity === "error" || diagnostic.severity === "fatal",
	);
	if (errors.length > 0) {
		throw new Error(
			errors.map((diagnostic) => diagnostic.description).join("\n"),
		);
	}
	return formatted.content;
}

function projectKeyFor(projectRoot: string) {
	const cached = projects.get(projectRoot);
	if (cached !== undefined) return cached;

	const { projectKey } = biome.openProject(projectRoot);
	applyConfiguration(
		projectKey,
		readBiomeConfiguration(projectRoot) ?? DEFAULT_CONFIGURATION,
		projectRoot,
	);
	projects.set(projectRoot, projectKey);
	return projectKey;
}

function applyConfiguration(
	projectKey: number,
	configuration: Configuration,
	projectRoot: string,
) {
	// `Biome.applyConfiguration` always sets the workspace directory to "./".
	const workspace = (
		biome as unknown as {
			workspace: {
				updateSettings(params: {
					configuration: Configuration;
					projectKey: number;
					workspaceDirectory?: string;
				}): void;
			};
		}
	).workspace;
	try {
		workspace.updateSettings({
			projectKey,
			configuration,
			workspaceDirectory: projectRoot,
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(
			`Failed to apply Biome configuration from ${projectRoot}: ${message}`,
		);
	}
}

function readBiomeConfiguration(projectRoot: string) {
	const filePath = biomeConfigPath(projectRoot);
	if (!filePath) return undefined;
	return loadConfiguration(filePath, projectRoot, new Set());
}

function biomeConfigPath(directory: string) {
	for (const fileName of BIOME_CONFIG_FILES) {
		const filePath = path.join(directory, fileName);
		if (isFile(filePath)) return filePath;
	}
	return undefined;
}

function loadConfiguration(
	filePath: string,
	projectRoot: string,
	seen: Set<string>,
) {
	const resolvedPath = path.resolve(filePath);
	if (seen.has(resolvedPath)) {
		throw new Error(`Circular Biome extends at ${resolvedPath}`);
	}
	seen.add(resolvedPath);
	try {
		let configuration: Configuration;
		try {
			configuration = JSON.parse(
				stripJsonComments(readFileSync(resolvedPath, "utf8")),
			) as Configuration;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			throw new Error(`Failed to read ${resolvedPath}: ${message}`);
		}

		const extendsValue = configuration.extends;
		configuration.extends = undefined;

		let merged: Configuration = {};
		for (const entry of extendEntries(extendsValue)) {
			if (entry === "//") {
				const rootPath = biomeConfigPath(projectRoot);
				if (!rootPath || path.resolve(rootPath) === resolvedPath) continue;
				const parent = seen.has(path.resolve(rootPath))
					? loadOwnConfiguration(rootPath)
					: loadConfiguration(rootPath, projectRoot, seen);
				merged = mergeConfiguration(merged, parent);
				continue;
			}
			const parentPath = resolveExtendSpecifier(
				entry,
				path.dirname(resolvedPath),
			);
			merged = mergeConfiguration(
				merged,
				loadConfiguration(parentPath, projectRoot, seen),
			);
		}
		return mergeConfiguration(merged, configuration);
	} finally {
		seen.delete(resolvedPath);
	}
}

function loadOwnConfiguration(filePath: string) {
	try {
		const configuration = JSON.parse(
			stripJsonComments(readFileSync(filePath, "utf8")),
		) as Configuration;
		configuration.extends = undefined;
		return configuration;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(`Failed to read ${filePath}: ${message}`);
	}
}

function extendEntries(value: Configuration["extends"] | string | undefined) {
	if (value == null) return [];
	if (typeof value === "string") return [value];
	return value;
}

function resolveExtendSpecifier(specifier: string, fromDir: string) {
	if (specifier.startsWith(".") || path.isAbsolute(specifier)) {
		const resolved = path.resolve(fromDir, specifier);
		if (isFile(resolved)) return resolved;
		const nested = biomeConfigPath(resolved);
		if (nested) return nested;
		throw new Error(
			`Could not resolve Biome extends "${specifier}" from ${fromDir}`,
		);
	}

	const require = createRequire(path.join(fromDir, "package.json"));
	try {
		const resolved = require.resolve(specifier);
		if (isBiomeConfig(resolved)) return resolved;
	} catch {
		// Resolve the package root below.
	}

	const packageName = packageNameOf(specifier);
	let packageJsonPath: string;
	try {
		packageJsonPath = require.resolve(`${packageName}/package.json`);
	} catch {
		throw new Error(
			`Could not resolve Biome extends "${specifier}" from ${fromDir}`,
		);
	}

	const packageRoot = path.dirname(packageJsonPath);
	const subpath = specifier.slice(packageName.length).replace(/^\//, "");
	const base = subpath ? path.join(packageRoot, subpath) : packageRoot;
	if (isFile(base)) return base;
	const config = biomeConfigPath(base);
	if (config) return config;
	throw new Error(
		`Could not resolve Biome extends "${specifier}" from ${fromDir}`,
	);
}

function packageNameOf(specifier: string) {
	const parts = specifier.split("/");
	if (specifier.startsWith("@")) return parts.slice(0, 2).join("/");
	return parts[0] ?? specifier;
}

function mergeConfiguration(base: Configuration, next: Configuration) {
	return mergeValues(base, next) as Configuration;
}

function mergeValues(base: unknown, next: unknown): unknown {
	if (Array.isArray(base) && Array.isArray(next)) {
		return [...base, ...next];
	}
	if (isRecord(base) && isRecord(next)) {
		const merged: Record<string, unknown> = { ...base };
		for (const [key, value] of Object.entries(next)) {
			merged[key] = key in merged ? mergeValues(merged[key], value) : value;
		}
		return merged;
	}
	return next;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFile(filePath: string) {
	return existsSync(filePath) && statSync(filePath).isFile();
}

function isBiomeConfig(filePath: string) {
	return BIOME_CONFIG_FILES.some(
		(fileName) => path.basename(filePath) === fileName,
	);
}

function stripJsonComments(input: string) {
	let output = "";
	let inString = false;
	let escaped = false;
	for (let index = 0; index < input.length; index++) {
		const char = input[index];
		if (inString) {
			output += char;
			if (escaped) {
				escaped = false;
			} else if (char === "\\") {
				escaped = true;
			} else if (char === '"') {
				inString = false;
			}
			continue;
		}
		if (char === '"') {
			inString = true;
			output += char;
			continue;
		}
		if (char === "/" && input[index + 1] === "/") {
			index += 2;
			while (index < input.length && input[index] !== "\n") index++;
			output += "\n";
			continue;
		}
		if (char === "/" && input[index + 1] === "*") {
			index += 2;
			while (
				index < input.length &&
				!(input[index] === "*" && input[index + 1] === "/")
			) {
				index++;
			}
			index += 1;
			continue;
		}
		output += char;
	}
	return output.replace(/,\s*([}\]])/g, "$1");
}

function toProjectFilePath(filePath: string, projectRoot: string) {
	const relative = path.isAbsolute(filePath)
		? path.relative(projectRoot, filePath)
		: filePath;
	return relative.split(path.sep).join("/");
}
