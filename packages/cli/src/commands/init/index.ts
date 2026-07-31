import { Command } from "commander";
import fs from "node:fs/promises";
import path from "node:path";
import * as z from "zod";
import {
	detectPackageManager,
	PACKAGE_MANAGER,
} from "../../utils/package-manager";
import { getPackageInfo, hasDependency } from "../../utils/get-package-info";
import chalk from "chalk";
import type { Dependency } from "../../utils/install-dependencies";
import {
	cancel,
	confirm,
	groupMultiselect,
	isCancel,
	multiselect,
	text,
} from "@clack/prompts";
import { possibleConfigPaths } from "../../utils/get-config";
import { tryCatch } from "../../utils/helper";
import { generateConfig } from "./utils/config";
import type { Import } from "./utils/imports";
import type { Plugin } from "./utils/plugins";
import { PLUGINS } from "./utils/plugins";
import { PROFILES } from "./utils/profiles";

const initOptionsSchema = z.object({
	cwd: z
		.string()
		.transform((val) => path.resolve(val))
		.default(process.cwd()),
	config: z.string().optional(),
	packageManager: z.enum(PACKAGE_MANAGER).optional(),
	dryRun: z.boolean().default(false),
});

export async function initAction(opts: z.infer<typeof initOptionsSchema>) {
	const { cwd, ...options } = await initOptionsSchema.parseAsync(opts);

	// Check if package.json exists (not an empty project)
	let packageJson: Record<string, any> | null = null;
	try {
		packageJson = await getPackageInfo(cwd);
	} catch {
		//
	}
	if (typeof packageJson !== "object" || packageJson === null) {
		const pm = options.packageManager || "npm";
		console.error(
			chalk.red(
				`\nThis appears to be an empty project. No package.json found.\n`,
			),
		);
		console.error(
			chalk.yellow(
				`Please initialize a new project first by running:\n\n  ${chalk.bold(`${pm} init`)}\n`,
			),
		);
		process.exit(1);
	}

	let currentStep = 0;
	const additionalSteps: (() => Promise<void>)[] = [];

	const nextStep = async (msg: string) => {
		currentStep++;
		console.log(chalk.white(`\n${currentStep}. ${msg}`));
	};

	console.log("node-zugferd CLI");

	const pm =
		options.packageManager ??
		(await detectPackageManager(cwd, packageJson)).packageManager;

	const depsToInstall: Dependency[] = [];
	const filesToWrite: (() => Promise<void>)[] = [];

	// Install node-zugferd
	await (async () => {
		const hasNodeZugferd = hasDependency(packageJson, "node-zugferd");
		if (hasNodeZugferd) return;
		await nextStep("Install node-zugferd");

		const shouldInstallNodeZugferd = await confirm({
			message: `Would you like to install node-zugferd using ${chalk.bold(pm)}?`,
			initialValue: true,
		});
		if (isCancel(shouldInstallNodeZugferd)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}

		if (shouldInstallNodeZugferd) {
			depsToInstall.push({
				name: "node-zugferd",
			});
		}
	})();

	// Install profile
	const selectedProfiles = await (async () => {
		const hasProfile = PROFILES.values()
			.map((p) => p.dependencies ?? [])
			.some((deps) =>
				deps.every(({ name }) => hasDependency(packageJson, name)),
			);
		if (hasProfile) return [];
		await nextStep("Install a profile");

		const selectedProfiles = await groupMultiselect({
			message: "Select the profiles you want to install:",
			options: {
				Invoice: [
					...PROFILES.entries()
						.filter(([_, profile]) => profile.type === "invoice")
						.map(([value, profile]) => ({
							label: profile.label,
							value,
							hint: profile.description || profile.dependencies?.[0]?.name,
						})),
				],
			},
		});
		if (isCancel(selectedProfiles)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}

		return selectedProfiles.map((id) => {
			const profile = PROFILES.get(id)!;
			if (profile.dependencies?.length && profile.dependencies.length > 0) {
				depsToInstall.push(...profile.dependencies);
			}
			return profile;
		});
	})();

	let configFilePath: string | null = null;
	let generateConfigOptions: { imports: Import[] } | null = null;
	const hasConfig = await (async () => {
		for (const filePath of possibleConfigPaths) {
			const fullPath = path.join(cwd, filePath);
			const { error } = await tryCatch(fs.access(fullPath, fs.constants.F_OK));
			if (!error) {
				configFilePath = fullPath;
				return true;
			}
		}
		return false;
	})();

	if (!hasConfig) {
		await nextStep("Create A ZUGFeRD Instance");

		const { data: allFiles, error } = await tryCatch(fs.readdir(cwd, "utf-8"));
		if (error) {
			console.log(`Failed to read directory: ${error.message}`);
			process.exit(1);
		}

		const hasSrc = allFiles.some((node) => node === "src");
		const defaultConfigPath = hasSrc
			? path.join(cwd, "src", "lib", "invoicer.ts")
			: path.join(cwd, "lib", "invoicer.ts");
		const relativeDefaultPath = path.relative(cwd, defaultConfigPath);

		const filePath = await text({
			message: "Where would you like to create the zugferd instance?",
			initialValue: relativeDefaultPath,
		});
		if (isCancel(filePath)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}

		const cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
		const absolutePath = path.isAbsolute(cleanPath)
			? cleanPath
			: path.join(cwd, cleanPath);

		configFilePath = absolutePath;

		const imports = [];
		for (const profile of selectedProfiles) {
			if (!profile?.imports || profile.imports.length === 0) continue;
			imports.push(...profile.imports);
		}
		generateConfigOptions = {
			imports,
		};
	}

	const plugins = await (async (): Promise<Plugin[]> => {
		if (hasConfig) return [];

		await nextStep("Select Plugins");

		const shouldInstallPlugins = await confirm({
			message: "Would you like to install any plugins?",
			initialValue: true,
		});
		if (isCancel(shouldInstallPlugins)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		if (!shouldInstallPlugins) return [];

		const selectedPlugins = await multiselect({
			message: "Select the plugins you want to use:",
			options: [
				...PLUGINS.values().map((plugin) => ({
					label: plugin.label,
					value: plugin.id,
					hint: plugin.description || plugin.dependencies?.[0]?.name,
				})),
			],
		});
		if (isCancel(selectedPlugins)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}

		return selectedPlugins.map((id) => {
			const plugin = PLUGINS.get(id)!;
			if (plugin.imports?.length && plugin.imports.length > 0) {
				generateConfigOptions?.imports.push(...plugin.imports);
			}
			return plugin;
		});
	})();

	if (generateConfigOptions !== null && configFilePath) {
		console.log(
			await generateConfig({
				plugins,
				profiles: selectedProfiles,
				...generateConfigOptions,
			}),
		);
		filesToWrite.push(async () => {
			const { error: mkdirError } = await tryCatch(
				fs.mkdir(path.dirname(configFilePath!), { recursive: true }),
			);
			if (mkdirError) {
				console.error(
					`Failed to create directory at ${path.dirname(configFilePath!)}: ${mkdirError.message}`,
				);
				process.exit(1);
			}

			const { error } = await tryCatch(
				fs.writeFile(
					configFilePath!,
					await generateConfig({
						plugins,
						profiles: selectedProfiles,
						...generateConfigOptions,
					}),
					"utf-8",
				),
			);
			if (error) {
				console.error(
					`Failed to write file at ${configFilePath!}: ${error.message}`,
				);
				process.exit(1);
			}
		});
	}
}

export const init = new Command("init")
	.description("Initialize a new or customize a node-zugferd project.")
	.option("-c, --cwd <cwd>", "The current working directory.")
	.option(
		"--config <config>",
		"The path to the zugferd configuration file. Defaults to the first `invoicer.ts` or `zugferd.ts` file found.",
	)
	.option(
		"--pm <package-manager>, --package-manager <package-manager>",
		"The package manager to use. Defaults to the package manager detected in the current working directory.",
	)
	.option("--dry-run", "Run the command without making any changes.")
	.action(initAction);
