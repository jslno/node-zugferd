import { existsSync } from "fs";
import path from "path";
import type { ZugferdOptions } from "node-zugferd/types";
import { getTsconfigInfo } from "./get-tsconfig-info";
import { addSvelteKitEnvModules } from "./add-svelte-kit-env-modules";
// @ts-ignore
import babelPresetTypeScript from "@babel/preset-typescript";
// @ts-ignore
import babelPresetReact from "@babel/preset-react";
import chalk from "chalk";
import { loadConfig } from "c12";

let possiblePaths = [
	"invoicer.ts",
	"invoicer.tsx",
	"invoicer.js",
	"invoicer.jsx",
	"invoicer.server.js",
	"invoicer.server.ts",
];

possiblePaths = [
	...possiblePaths,
	...possiblePaths.map((it) => `lib/server/${it}`),
	...possiblePaths.map((it) => `server/${it}`),
	...possiblePaths.map((it) => `lib/${it}`),
	...possiblePaths.map((it) => `utils/${it}`),
];
possiblePaths = [
	...possiblePaths,
	...possiblePaths.map((it) => `src/${it}`),
	...possiblePaths.map((it) => `app/${it}`),
];

const getPathAliases = (cwd: string): Record<string, string> | null => {
	const tsConfigPath = path.join(cwd, "tsconfig.json");
	if (!existsSync(tsConfigPath)) {
		return null;
	}
	try {
		const tsConfig = getTsconfigInfo(cwd);
		const { paths = {}, baseUrl = "." } = tsConfig.compilerOptions || {};
		const result: Record<string, string> = {};
		const obj = Object.entries(paths) as [string, string[]][];
		for (const [alias, aliasPaths] of obj) {
			for (const aliasedPath of aliasPaths) {
				const resolvedBaseUrl = path.join(cwd, baseUrl);
				const finalAlias = alias.slice(-1) === "*" ? alias.slice(0, -1) : alias;
				const finalAliasedPath =
					aliasedPath.slice(-1) === "*"
						? aliasedPath.slice(0, -1)
						: aliasedPath;

				result[finalAlias || ""] = path.join(resolvedBaseUrl, finalAliasedPath);
			}
		}

		addSvelteKitEnvModules(result);
		return result;
	} catch (err) {
		console.error(err);
		throw new Error("Error parsing tsconfig.json");
	}
};

/**
 * .tsx files are not supported by Jiti.
 */
const jitiOptions = (cwd: string) => {
	const alias = getPathAliases(cwd) || {};
	return {
		transformOptions: {
			babel: {
				presets: [
					[
						babelPresetTypeScript,
						{
							isTSX: true,
							allExtensions: true,
						},
					],
					[babelPresetReact, { runtime: "automatic" }],
				],
			},
		},
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias,
	};
};

export const getConfig = async ({
	cwd,
	configPath,
	shouldThrowOnError = false,
}: {
	cwd: string;
	configPath?: string;
	shouldThrowOnError?: boolean;
}) => {
	try {
		let configFile: ZugferdOptions | null = null;
		if (configPath) {
			let resolvedPath: string = path.join(cwd, configPath);
			if (existsSync(configPath)) {
				resolvedPath = configPath;
			}

			const { config } = await loadConfig<{
				invoicer: {
					context: {
						options: ZugferdOptions;
					};
				};
				default?: {
					context: {
						options: ZugferdOptions;
					};
				};
			}>({
				configFile: resolvedPath,
				dotenv: true,
				jitiOptions: jitiOptions(cwd),
			});
			if (!config.invoicer && !config.default) {
				if (shouldThrowOnError) {
					throw new Error(
						`Couldn't read your invoicer config in ${resolvedPath}. Make sure to default export your invoicer instance or to export as a variable named invoicer.`,
					);
				}
				console.error(
					chalk.redBright(
						`Couldn't read your invoicer config in ${resolvedPath}. Make sure to default export your invoicer instance or to export as a variable named invoicer.`,
					),
				);
				process.exit(1);
			}
			configFile =
				config.invoicer?.context.options ||
				config.default?.context.options ||
				null;
		}

		if (!configFile) {
			for (const possiblePath of possiblePaths) {
				try {
					const { config } = await loadConfig<{
						invoicer: {
							context: {
								options: ZugferdOptions;
							};
						};
						default?: {
							context: {
								options: ZugferdOptions;
							};
						};
					}>({
						configFile: possiblePath,
						jitiOptions: jitiOptions(cwd),
					});
					const hasConfig = Object.keys(config).length > 0;
					if (hasConfig) {
						configFile =
							config.invoicer?.context.options ||
							config.default?.context.options ||
							null;
						if (!configFile) {
							if (shouldThrowOnError) {
								throw new Error(
									"Couldn't read your invoicer config. Make sure to default export your invoicer instance or to export as a variable named invoicer.",
								);
							}
							console.error(
								chalk.redBright("Couldn't read your invoicer config."),
							);
							console.log("");
							console.info(
								"Make sure to default export your invoicer instance or to export as a variable named invoicer.",
							);
							process.exit(1);
						}
						break;
					}
				} catch (e) {
					if (
						typeof e === "object" &&
						e &&
						"message" in e &&
						typeof e.message === "string" &&
						e.message.includes(
							"This module cannot be imported from a Client Component module",
						)
					) {
						if (shouldThrowOnError) {
							throw new Error(
								`Please remove import 'server-only' from your invoicer config file temporarily. The CLI cannot resolve the configuration with it included. You can re-add it after running the CLI.`,
							);
						}
						console.error(
							chalk.redBright(
								`Please remove import 'server-only' from your invoicer config file temporarily. The CLI cannot resolve the configuration with it included. You can re-add it after running the CLI.`,
							),
						);
						process.exit(1);
					}
					if (shouldThrowOnError) {
						throw e;
					}

					console.error(chalk.redBright("Couldn't read your auth config.", e));
					process.exit(1);
				}
			}
		}
		return configFile;
	} catch (e) {
		if (
			typeof e === "object" &&
			e &&
			"message" in e &&
			typeof e.message === "string" &&
			e.message.includes(
				"This module cannot be imported from a Client Component module",
			)
		) {
			if (shouldThrowOnError) {
				throw new Error(
					`Please remove import 'server-only' from your invoicer config file temporarily. The CLI cannot resolve the configuration with it included. You can re-add it after running the CLI.`,
				);
			}
			console.error(
				chalk.redBright(
					`Please remove import 'server-only' from your invoicer config file temporarily. The CLI cannot resolve the configuration with it included. You can re-add it after running the CLI.`,
				),
			);
			process.exit(1);
		}
		if (shouldThrowOnError) {
			throw e;
		}

		console.error(chalk.redBright("Couldn't read your auth config.", e));
		process.exit(1);
	}
};

export { possiblePaths };
