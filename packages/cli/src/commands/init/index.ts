import fs from "node:fs/promises";
import path from "node:path";
import {
	cancel,
	confirm,
	groupMultiselect,
	isCancel,
	multiselect,
	outro,
	text,
} from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";
import * as z from "zod";
import { formatContent } from "../../utils/format";
import { getConfig, possibleConfigPaths } from "../../utils/get-config";
import { getPackageInfo, hasDependency } from "../../utils/get-package-info";
import { tryCatch } from "../../utils/helper";
import type { Dependency } from "../../utils/install-dependencies";
import { installDependencies } from "../../utils/install-dependencies";
import {
	detectPackageManager,
	PACKAGE_MANAGER,
} from "../../utils/package-manager";
import { generateConfig } from "./utils/config";
import {
	configuredPluginIds,
	configuredProfileIds,
	remainingPlugins,
	remainingProfiles,
} from "./utils/configured";
import type { Import } from "./utils/imports";
import { catalogIdsFromSource, patchConfig } from "./utils/patch-config";
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
});

async function initAction(opts: z.infer<typeof initOptionsSchema>) {
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

	const configFilePath = await resolveExistingConfigPath(cwd, options.config);
	const configured = await readConfiguredCatalog(cwd, configFilePath);
	const updating = configured !== null;

	const hasInstalledProfile = [...PROFILES.values()].some((profile) =>
		(profile.dependencies ?? []).every(({ name }) =>
			hasDependency(packageJson, name),
		),
	);
	const profileCandidates = configured
		? remainingProfiles({
				profiles: configured.profiles.map((id) => ({ id })),
			})
		: hasInstalledProfile
			? []
			: [...PROFILES.values()];
	const pluginCandidates = configured
		? remainingPlugins({
				plugins: configured.plugins.map((id) => ({ id })),
			})
		: [...PLUGINS.values()];

	if (
		updating &&
		profileCandidates.length === 0 &&
		pluginCandidates.length === 0
	) {
		await installDependencies(depsToInstall, {
			cwd,
			packageManager: pm,
		});
		outro("Profiles and plugins are already set up.");
		process.exit(0);
	}

	const queueDependency = (dependency: Dependency) => {
		if (hasDependency(packageJson, dependency.name)) return;
		depsToInstall.push(dependency);
	};

	// Install profile
	const selectedProfiles = await (async () => {
		if (profileCandidates.length === 0) return [];
		await nextStep(updating ? "Add a profile" : "Install a profile");

		const groups: Record<
			string,
			{ label: string; value: string; hint?: string | undefined }[]
		> = {};
		for (const profile of profileCandidates) {
			const group = profile.type === "order" ? "Order" : "Invoice";
			groups[group] ??= [];
			groups[group].push({
				label: profile.label,
				value: profile.id,
				hint: profile.description || profile.dependencies?.[0]?.name,
			});
		}

		const selectedProfiles = await groupMultiselect({
			message: "Select the profiles you want to install:",
			...(updating ? { required: false } : {}),
			options: groups,
		});
		if (isCancel(selectedProfiles)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}

		return selectedProfiles.map((id) => {
			const profile = PROFILES.get(id)!;
			for (const dependency of profile.dependencies ?? []) {
				queueDependency(dependency);
			}
			return profile;
		});
	})();

	let resolvedConfigPath = configFilePath;
	let generateConfigOptions: { imports: Import[] } | null = null;

	if (!updating) {
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
		resolvedConfigPath = path.isAbsolute(cleanPath)
			? cleanPath
			: path.join(cwd, cleanPath);
	}

	const imports: Import[] = [];
	for (const profile of selectedProfiles) {
		if (!profile.imports || profile.imports.length === 0) continue;
		imports.push(...profile.imports);
	}
	generateConfigOptions = { imports };

	const plugins = await (async (): Promise<Plugin[]> => {
		if (pluginCandidates.length === 0) return [];

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
			...(updating ? { required: false } : {}),
			options: pluginCandidates.map((plugin) => ({
				label: plugin.label,
				value: plugin.id,
				hint: plugin.description || plugin.dependencies?.[0]?.name,
			})),
		});
		if (isCancel(selectedPlugins)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}

		return selectedPlugins.map((id) => {
			const plugin = PLUGINS.get(id)!;
			for (const dependency of plugin.dependencies ?? []) {
				queueDependency(dependency);
			}
			if (plugin.imports?.length && plugin.imports.length > 0) {
				generateConfigOptions?.imports.push(...plugin.imports);
			}
			return {
				...plugin,
				options: { code: plugin.options?.code ?? "" },
			};
		});
	})();

	if (updating && selectedProfiles.length === 0 && plugins.length === 0) {
		await installDependencies(depsToInstall, {
			cwd,
			packageManager: pm,
		});
		outro("No changes selected.");
		process.exit(0);
	}

	if (generateConfigOptions) {
		for (const plugin of plugins) {
			const options = (plugin.options ??= { code: "" });
			await plugin.prompt?.({
				hasDependency: (name: string) => hasDependency(packageJson, name),
				depsToInstall,
				filesToWrite,
				imports: generateConfigOptions.imports,
				options,
			});
		}
	}

	if (!updating && generateConfigOptions !== null && resolvedConfigPath) {
		const target = resolvedConfigPath;
		filesToWrite.push(async () => {
			const { error: mkdirError } = await tryCatch(
				fs.mkdir(path.dirname(target), { recursive: true }),
			);
			if (mkdirError) {
				console.error(
					`Failed to create directory at ${path.dirname(target)}: ${mkdirError.message}`,
				);
				process.exit(1);
			}

			const { error } = await tryCatch(
				fs.writeFile(
					target,
					await formatContent(
						await generateConfig({
							plugins,
							profiles: selectedProfiles,
							...generateConfigOptions,
							cwd,
							filePath: target,
						}),
					),
					"utf-8",
				),
			);
			if (error) {
				console.error(`Failed to write file at ${target}: ${error.message}`);
				process.exit(1);
			}
		});
	}

	if (updating && generateConfigOptions !== null && resolvedConfigPath) {
		const target = resolvedConfigPath;
		let patched: string;
		try {
			patched = await patchConfig(await fs.readFile(target, "utf-8"), {
				imports: generateConfigOptions.imports,
				plugins,
				profiles: selectedProfiles,
				cwd,
				filePath: target,
			});
		} catch (error) {
			console.error(
				error instanceof Error
					? error.message
					: "Couldn't update the zugferd config.",
			);
			process.exit(1);
		}
		filesToWrite.push(async () => {
			const { error } = await tryCatch(fs.writeFile(target, patched, "utf-8"));
			if (error) {
				console.error(`Failed to write file at ${target}: ${error.message}`);
				process.exit(1);
			}
		});
	}

	await Promise.all([
		installDependencies(depsToInstall, {
			cwd,
			packageManager: pm,
		}),
		...filesToWrite.map((write) => write()),
	]);

	outro("✨ Successfully initialized the project.");
	process.exit(0);
}

async function resolveExistingConfigPath(cwd: string, configOption?: string) {
	if (configOption) {
		const resolved = path.resolve(cwd, configOption);
		const { error } = await tryCatch(fs.access(resolved));
		if (error) {
			console.error(
				chalk.red(`\nCouldn't find a zugferd config at ${resolved}.\n`),
			);
			process.exit(1);
		}
		return resolved;
	}

	for (const filePath of possibleConfigPaths) {
		const fullPath = path.join(cwd, filePath);
		const { error } = await tryCatch(fs.access(fullPath));
		if (!error) return fullPath;
	}
	return null;
}

async function readConfiguredCatalog(
	cwd: string,
	configFilePath: string | null,
) {
	if (!configFilePath) return null;
	try {
		const loaded = await getConfig({
			cwd,
			configPath: configFilePath,
			throw: true,
		});
		if (loaded) {
			return {
				profiles: configuredProfileIds(loaded),
				plugins: configuredPluginIds(loaded),
			};
		}
	} catch {
		// The instance could not be executed. Read the catalog entries from source.
	}

	try {
		return catalogIdsFromSource(
			await fs.readFile(configFilePath, "utf-8"),
			configFilePath,
		);
	} catch (error) {
		console.error(
			error instanceof Error
				? error.message
				: "Couldn't read the zugferd config.",
		);
		process.exit(1);
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
	.action(initAction);
