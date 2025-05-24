/**
 * Inspired by
 * @see {@link https://github.com/better-auth/better-auth/blob/main/packages/cli/src/commands/init.ts}
 */

import { format as prettierFormat, type PrettierOptions } from "prettier";
import { Command } from "commander";
import { z } from "zod";
import path from "path";
import {
	cancel,
	confirm,
	intro,
	isCancel,
	log,
	multiselect,
	outro,
	select,
} from "@clack/prompts";
import chalk from "chalk";
import fs from "fs/promises";
import { getPackageInfo } from "../utils/get-package-info";
import { getTsconfigInfo } from "../utils/get-tsconfig-info";
import { existsSync } from "fs";
import { handlePackageInstallation } from "../utils/handle-package-installation";
import { generateSecretHash } from "./api-secret";
import { parse } from "dotenv";

export const supportedTemplateRenderers = [
	{
		id: "react",
		displayName: "React",
		name: "renderer",
		path: `@node-zugferd/api/react/renderer`,
	},
	{
		id: "vue",
		displayName: "Vue",
		name: "renderer",
		path: `@node-zugferd/api/vue/renderer`,
	},
	{
		id: "svelte-kit",
		displayName: "Svelte Kit",
		name: "renderer",
		path: `@node-zugferd/api/svelte-kit/renderer`,
	},
	{
		id: "solid-start",
		displayName: "Solid Start",
		name: "renderer",
		path: `@node-zugferd/api/solid-start/renderer`,
	},
	{
		id: "vanilla",
		displayName: "Vanilla",
		name: "renderer",
		path: `@node-zugferd/api/vanilla/renderer`,
	},
] as const;

export type SupportedTemplateRenderer =
	(typeof supportedTemplateRenderers)[number];

type Import = {
	path: string;
	name?: string;
	variables: {
		name: string;
		as?: string;
		asType?: boolean;
	}[];
};

type SupportedPluginDef = {
	id: string;
	displayName: string;
	path: string;
	init: (ctx: {
		profile: SupportedProfile;
		cwd: string;
		packageInfo: Record<string, any>;
		packageManagerPreference: "bun" | "pnpm" | "yarn" | "npm" | undefined;
	}) => Promise<{
		imports?: Import[];
		code: string;
	}>;
};

export const supportedPlugins = [
	{
		id: "api",
		displayName: "API",
		path: "@node-zugferd/api",
		init: async (ctx) => {
			const envFiles = await getEnvFiles(ctx.cwd);
			if (!envFiles.length) {
				outro("❌ No .env files found. Please create an env file first.");
				process.exit(0);
			}
			let targetEnvFile: string;
			if (envFiles.includes(".env")) {
				targetEnvFile = ".env";
			} else if (envFiles.includes(".env.local")) {
				targetEnvFile = ".env.local";
			} else if (envFiles.includes(".env.development")) {
				targetEnvFile = ".env.development";
			} else if (envFiles.length === 1) {
				targetEnvFile = envFiles[0]!;
			} else {
				targetEnvFile = "none";
			}

			if (targetEnvFile !== "none") {
				try {
					const fileContents = await fs.readFile(
						path.join(ctx.cwd, targetEnvFile),
						"utf-8",
					);
					const parsed = parse(fileContents);
					let isMissingSecret = parsed.ZUGFERD_API_SECRET === undefined;

					if (isMissingSecret) {
						let txt = chalk.bold("ZUGFERD_API_SECRET");

						log.warn(`Missing ${txt} in ${targetEnvFile}`);

						const shouldAdd = await select({
							message: `Do you want to add ${txt} to ${targetEnvFile}?`,
							options: [
								{ label: "Yes", value: "yes" },
								{ label: "No", value: "no" },
								{ label: "Choose other file(s)", value: "other" },
							],
						});
						if (isCancel(shouldAdd)) {
							cancel(`✋ Operation cancelled.`);
							process.exit(0);
						}
						let envs: string[] = [];
						if (isMissingSecret) {
							envs.push("ZUGFERD_API_SECRET");
						}
						if (shouldAdd === "yes") {
							try {
								await updateEnvs({
									files: [path.join(ctx.cwd, targetEnvFile)],
									envs,
									isCommented: false,
								});
							} catch (err) {
								log.error(`❌ Failed to add ENV variables to ${targetEnvFile}`);
								log.error(JSON.stringify(err, null, 2));
								process.exit(1);
							}
							log.success(`🚀 ENV variables successfully added!`);
						} else if (shouldAdd === "no") {
							log.info("Skipping ENV step.");
						} else if (shouldAdd === "other") {
							if (!envFiles.length) {
								cancel("No env files found. Please create an env file first.");
								process.exit(0);
							}
							const envFilesToUpdate = await multiselect({
								message: "Select the .env files you want to update",
								options: envFiles.map((x) => ({
									value: path.join(ctx.cwd, x),
									label: x,
								})),
								required: false,
							});
							if (isCancel(envFilesToUpdate)) {
								cancel("✋ Operation cancelled.");
								process.exit(0);
							}
							if (envFilesToUpdate.length === 0) {
								log.info("No .env files to update. Skipping...");
							} else {
								try {
									await updateEnvs({
										files: envFilesToUpdate,
										envs: envs,
										isCommented: false,
									});
								} catch (error) {
									log.error(`❌ Failed to update .env files:`);
									log.error(JSON.stringify(error, null, 2));
									process.exit(1);
								}
								log.success(`🚀 ENV files successfully updated!`);
							}
						}
					}
				} catch {}
			}

			await handlePackageInstallation({
				packageName: "@node-zugferd/api",
				cwd: ctx.cwd,
				packageInfo: ctx.packageInfo,
				packageManagerPreference: ctx.packageManagerPreference,
			});

			const renderer = await select({
				message: "Select your template renderer",
				options: supportedTemplateRenderers.map((x) => ({
					label: x.displayName,
					value: x.id,
				})),
			});

			if (isCancel(renderer)) {
				cancel("✋ Operation cancelled.");
				process.exit(0);
			}
			let templateFileName: string;
			let templateContent: string;
			let templateImport: Import;
			let templateFormatOptions: PrettierOptions = {};

			switch (renderer) {
				case "react": {
					templateFileName = "invoicer.template.tsx";
					templateImport = {
						path: "./invoicer.template",
						variables: [
							{
								name: "Template",
							},
						],
					};
					templateContent = [
						"import { Document } from '@node-zugferd/api/react/renderer';",
						`import type { ${ctx.profile.typeName} } from "${ctx.profile.path}";`,
						"",
						`export function Template(props: { data: ${ctx.profile.typeName}; }) {`,
						"return (",
						"<Document>",
						"<h1>Invoice {props.data.number}</h1>",
						"</Document>",
						");",
						"};",
					].join("\n");
					break;
				}
				case "vue": {
					templateFileName = "invoicer.template.vue";
					templateImport = {
						path: "./invoicer.template.vue",
						name: "Template",
						variables: [],
					};
					templateContent = [
						"<template>",
						"<Document>",
						"<h1>Invoice {{ number }}</h1>",
						"</Document>",
						"</template>",
						"",
						"<script setup lang='ts'>",
						"import { Document } from '@node-zugferd/api/vue/renderer';",
						`import type { ${ctx.profile.typeName} } from "${ctx.profile.path}";`,
						"",
						`defineProps<{ data: ${ctx.profile.typeName} }>();`,
						"</script>",
					].join("\n");
					break;
				}
				case "svelte-kit": {
					templateFileName = "invoicer.template.svelte";
					templateImport = {
						path: "./invoicer.template.svelte",
						name: "Template",
						variables: [],
					};
					templateFormatOptions = {
						parser: "svelte",
						plugins: ["prettier-plugin-svelte"],
					};
					templateContent = [
						"<script>",
						`import type { ${ctx.profile.typeName} } from "${ctx.profile.path}";`,
						"",
						`export let data: ${ctx.profile.typeName};`,
						"</script>",
						"",
						"<h1>Invoice {data.number}</h1>",
					].join("\n");
					break;
				}
				case "solid-start": {
					templateFileName = "invoicer.template.tsx";
					templateImport = {
						path: "./invoicer.template",
						variables: [
							{
								name: "Template",
							},
						],
					};
					templateContent = [
						"import { Document } from '@node-zugferd/api/solid-start/renderer';",
						`import type { ${ctx.profile.typeName} } from "${ctx.profile.path}";`,
						"",
						`export function Template(props: { data: ${ctx.profile.typeName}; }) {`,
						"return (",
						"<Document>",
						"<h1>Invoice {props.data.number}</h1>",
						"</Document>",
						");",
						"};",
					].join("\n");
					break;
				}
				case "vanilla": {
					templateFileName = "invoicer.template.ts";
					templateImport = {
						path: "./invoicer.template",
						variables: [
							{
								name: "Template",
							},
						],
					};
					templateContent = [
						"import { Document } from '@node-zugferd/api/vanilla/renderer';",
						`import type { ${ctx.profile.typeName} } from "${ctx.profile.path}";`,
						"",
						`export function Template(props: { data: ${ctx.profile.typeName}; }) {`,
						"return Document()`<h1>Invoice ${props.data.number}</h1>`;",
						"};",
					].join("\n");
				}
			}

			const templatePath = path.join(ctx.cwd, templateFileName);

			if (!existsSync(templatePath)) {
				await fs.writeFile(
					templatePath,
					await prettierFormat(templateContent, {
						filepath: templateFileName,
						...defaultFormatOptions,
						...templateFormatOptions,
					}),
				);
				log.success(`🚀 Invoicer template file successfully created!`);
			}

			return {
				imports: [
					{
						path: "@node-zugferd/api",
						variables: [
							{
								name: "api",
							},
						],
					},
					{
						path: `@node-zugferd/api/${renderer}/renderer`,
						variables: [
							{
								name: "renderer",
							},
						],
					},
					templateImport,
				],
				code: `api<typeof ${ctx.profile.name}>()(renderer, { secret: process.env.ZUGFERD_API_SECRET!, template: Template, })`,
			};
		},
	} satisfies SupportedPluginDef,
] as const;

export type SupportedPlugin = (typeof supportedPlugins)[number];

export const supportedProfiles = [
	{
		id: "minimum",
		displayName: "Minimum",
		hint: "not recommended",
		name: "MINIMUM",
		typeName: "ProfileMinimum",
		path: `node-zugferd/profile/minimum`,
	},
	{
		id: "basic-wl",
		displayName: "Basic WL",
		hint: "not recommended",
		name: "BASIC_WL",
		typeName: "ProfileBasicWL",
		path: `node-zugferd/profile/basic-wl`,
	},
	{
		id: "basic",
		displayName: "Basic",
		hint: "not recommended",
		name: "BASIC",
		typeName: "ProfileBasic",
		path: `node-zugferd/profile/basic`,
	},
	{
		id: "en16931",
		displayName: "EN16931 (Comfort)",
		hint: "recommended",
		name: "EN16931",
		typeName: "ProfileEN16931",
		path: `node-zugferd/profile/en16931`,
	},
	{
		id: "extended",
		displayName: "Extended",
		name: "EXTENDED",
		typeName: "ProfileExtended",
		path: `node-zugferd/profile/extended`,
	},
] as const;

export type SupportedProfile = (typeof supportedProfiles)[number];

const defaultFormatOptions: PrettierOptions = {
	trailingComma: "all",
	useTabs: false,
	tabWidth: 4,
};

const getDefaultInvoicerConfig = async (
	profile: SupportedProfile,
	plugins: SupportedPlugin[] = [],
	cwd: string,
	packageInfo: Record<string, any>,
	packageManagerPreference?: "bun" | "pnpm" | "yarn" | "npm",
) => {
	let imports: Import[] = [
		{
			path: "node-zugferd",
			variables: [
				{
					name: "zugferd",
				},
			],
		},
		{
			path: profile.path,
			variables: [
				{
					name: profile.name,
				},
			],
		},
	];
	const addedPlugins: string[] = [];

	for await (const plugin of plugins) {
		const { imports: pluginImports, code } = await plugin.init({
			profile,
			cwd,
			packageInfo,
			packageManagerPreference,
		});

		imports.push(...pluginImports);
		addedPlugins.push(code);
	}

	return await prettierFormat(
		[
			imports
				.map(
					(x) =>
						`import ${x.name ?? ""}${x.variables.length > 0 ? `${!!x.name ? ", " : ""}{ ${x.variables.map((v) => `${v.asType ? "type " : ""}${v.name}${v.as ? ` as ${v.as}` : ""}`)} }` : ""} from "${x.path}";`,
				)
				.join("\n"),
			"",
			"export const invoicer = zugferd({",
			`profile: ${profile.name},`,
			`plugins: [${addedPlugins.join(", ")}],`,
			"});",
		].join("\n"),
		{
			filepath: "invoicer.ts",
			...defaultFormatOptions,
		},
	);
};

const optionsSchema = z.object({
	cwd: z.string(),
	config: z.string().optional(),
	"skip-plugins": z.boolean().optional(),
	"package-manager": z.string().optional(),
	tsconfig: z.string().optional(),
});

export const initAction = async (opts: any) => {
	console.log();
	intro("Initializing node-zugferd");

	const options = optionsSchema.parse(opts);

	const cwd = path.resolve(options.cwd);
	let packageManagerPreference: "bun" | "pnpm" | "yarn" | "npm" | undefined =
		undefined;

	let configPath: string = "";

	// ===== package.json =====
	let packageInfo: Record<string, any>;
	try {
		packageInfo = getPackageInfo(cwd);
	} catch (err) {
		log.error(`❌ Couln't read your package.json file. (dir: ${cwd})`);
		log.error(JSON.stringify(err, null, 2));
		process.exit(1);
	}

	// ===== tsconfig.json =====
	let tsconfigInfo: Record<string, any>;

	try {
		const tsconfigPath =
			options.tsconfig !== undefined
				? path.resolve(cwd, options.tsconfig)
				: path.join(cwd, "tsconfig.json");

		tsconfigInfo = await getTsconfigInfo(cwd, tsconfigPath);
	} catch (err) {
		log.error(`❌ Couln't read your tsconfig.json file. (dir: ${cwd})`);
		log.error(JSON.stringify(err, null, 2));
		process.exit(1);
	}

	if (
		!(
			"compilerOptions" in tsconfigInfo &&
			"strict" in tsconfigInfo.compilerOptions &&
			tsconfigInfo.compilerOptions.strict === true
		)
	) {
		log.warn(
			`node-zugferd requires your tsconfig.json to have "compilerOptions.strict" set to true.`,
		);
		const shouldAdd = await confirm({
			message: `Would you like us to set ${chalk.bold("strict")} to ${chalk.bold("true")}?`,
		});
		if (isCancel(shouldAdd)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}

		if (shouldAdd) {
			try {
				await fs.writeFile(
					path.join(cwd, "tsconfig.json"),
					await prettierFormat(
						JSON.stringify(
							Object.assign(tsconfigInfo, {
								compilerOptions: {
									strict: true,
								},
							}),
						),
						{ filepath: "tsconfig.json", ...defaultFormatOptions },
					),
					"utf-8",
				);
				log.success("🚀 tsconfig.json successfully updated!");
			} catch (err) {
				log.error(
					`❌ Failed to add "compilerOptions.strict" to your tsconfig.json file.`,
				);
				log.error(JSON.stringify(err, null, 2));
				process.exit(1);
			}
		}
	}

	// ===== install node-zugferd =====
	await handlePackageInstallation({
		packageName: "node-zugferd",
		packageInfo,
		cwd,
		packageManagerPreference,
	});

	// ===== config path =====

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

	if (options.config) {
		configPath = path.join(cwd, options.config);
	} else {
		for (const possiblePath of possiblePaths) {
			const doesExist = existsSync(path.join(cwd, possiblePath));

			if (doesExist) {
				configPath = path.join(cwd, possiblePath);
				break;
			}
		}
	}

	// ===== create invoicer config =====
	let currentUserConfig = "";
	let add_plugins: SupportedPlugin[] = [];

	if (!configPath) {
		const shouldCreateInvoicerConfig = await select({
			message: "Would you like to create an invoicer config file?",
			options: [
				{
					label: "Yes",
					value: "yes",
				},
				{
					label: "No",
					value: "no",
				},
			],
		});
		if (isCancel(shouldCreateInvoicerConfig)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		if (shouldCreateInvoicerConfig === "yes") {
			const prompted_profiles = await select({
				message: "Select your Profile",
				initialValue: "en16931",
				options: supportedProfiles.map((x) => ({
					value: x.id,
					label: x.displayName,
					hint: "hint" in x ? x.hint : undefined,
				})),
			});

			if (isCancel(prompted_profiles)) {
				cancel(`✋ Operating cancelled.`);
				process.exit(0);
			}

			const profile = supportedProfiles.find((p) => p.id === prompted_profiles);

			if (!profile) {
				log.error("❌ Profile not found");
				process.exit(1);
			}

			if (options["skip-plugins"] !== false) {
				const shouldSetupPlugins = await confirm({
					message: `Would you like to set-up ${chalk.bold("plugins")}?`,
				});
				if (isCancel(shouldSetupPlugins)) {
					cancel(`✋ Operating cancelled.`);
					process.exit(0);
				}
				if (shouldSetupPlugins) {
					const prompted_plugins = await multiselect({
						message: "Select your new plugins",
						options: supportedPlugins.map((x) => ({
							label: x.displayName,
							value: x.id,
						})),
						required: false,
					});
					if (isCancel(prompted_plugins)) {
						cancel(`✋ Operating cancelled.`);
						process.exit(0);
					}
					add_plugins = prompted_plugins.map(
						(x) => supportedPlugins.find((y) => y.id === x)!,
					);
				}
			}

			const filePath = path.join(cwd, "invoicer.ts");
			configPath = filePath;
			log.info(`Creating invoicer config file: ${filePath}`);
			try {
				currentUserConfig = await getDefaultInvoicerConfig(
					profile,
					add_plugins,
					cwd,
					packageInfo,
					packageManagerPreference,
				);

				await fs.writeFile(filePath, currentUserConfig);
				configPath = filePath;
				log.success(`🚀 Invoicer config file successfully created!`);
			} catch {}
		} else if (shouldCreateInvoicerConfig === "no") {
			log.info("Skipping invoicer config file creation.");
		}
	} else {
		log.message();
		log.success(`Found invoicer config file. ${chalk.gray(`(${configPath})`)}`);
		log.message();
	}

	outro("🥳 Successfully initialized node-zugferd.");
	console.log();
	process.exit(0);
};

// ===== Init Command =====

export const init = new Command("init")
	.option("-c, --cwd <cwd>", "The working directory.", process.cwd())
	.option(
		"--config <config>",
		"The path to the invoicer configuration file. defaults to the first `invoicer.ts` file found.",
	)
	.option("--tsconfig <tsconfig>", "The path to the tsconfig file.")
	.option("--skip-plugins", "Skip the plugins setup.")
	.option(
		"--package-manager <package-manager>",
		"The package manager you want to use.",
	)
	.action(initAction);

const getEnvFiles = async (cwd: string) => {
	const files = await fs.readdir(cwd);
	return files.filter((x) => x.startsWith(".env"));
};

const updateEnvs = async ({
	envs,
	files,
	isCommented,
}: {
	/**
	 * The ENVs to append to the file
	 */
	envs: string[];
	/**
	 * Full file paths
	 */
	files: string[];
	/**
	 * Whether to comment all of the envs or not
	 */
	isCommented: boolean;
}) => {
	let previouslyGeneratedSecret: string | null = null;

	for (const file of files) {
		const content = await fs.readFile(file, "utf-8");
		const lines = content.split("\n");
		const newLines = envs.map(
			(x) =>
				`${isCommented ? "# " : ""}${x}=${getEnvDescription(x) ?? "some_value"}`,
		);
		newLines.push("", ...lines);
		await fs.writeFile(file, newLines.join("\n"), "utf-8");
	}

	function getEnvDescription(env: string) {
		if (env === "ZUGFERD_API_SECRET") {
			previouslyGeneratedSecret =
				previouslyGeneratedSecret ?? generateSecretHash();
			return `"${previouslyGeneratedSecret}"`;
		}
	}
};
