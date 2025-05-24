import { format as prettierFormat } from "prettier";
import { Command } from "commander";
import { z } from "zod";
import path from "path";
import {
	cancel,
	confirm,
	intro,
	isCancel,
	log,
	outro,
	select,
	spinner,
} from "@clack/prompts";
import chalk from "chalk";
import fs from "fs/promises";
import { getPackageInfo } from "../utils/get-package-info";
import { getTsconfigInfo } from "../utils/get-tsconfig-info";
import { checkPackageManagers } from "../utils/check-package-managers";
import semver from "semver";
import { existsSync } from "fs";
import { installDependencies } from "../utils/install-dependencies";
import { formatMilliseconds } from "../utils/format-ms";

export const supportedProfiles = [
	{
		id: "minimum",
		displayName: "Minimum",
		name: "MINIMUM",
		path: `node-zugferd/profile/minimum`,
	},
	{
		id: "basic-wl",
		displayName: "Basic WL",
		name: "BASIC_WL",
		path: `node-zugferd/profile/basic-wl`,
	},
	{
		id: "basic",
		displayName: "Basic",
		name: "BASIC",
		path: `node-zugferd/profile/basic`,
	},
	{
		id: "en16931",
		displayName: "EN16931 (Comfort)",
		hint: "recommended",
		name: "EN16931",
		path: `node-zugferd/profile/en16931`,
	},
	{
		id: "extended",
		displayName: "Extended",
		name: "EXTENDED",
		path: `node-zugferd/profile/extended`,
	},
] as const;

export type SupportedProfile = (typeof supportedProfiles)[number];

const defaultFormatOptions = {
	trailingComma: "all" as const,
	useTabs: false,
	tabWidth: 4,
};

const getDefaultInvoicerConfig = async (profile: SupportedProfile) =>
	await prettierFormat(
		[
			"import { zugferd } from 'node-zugferd';",
			`import { ${profile.name} } from '${profile.path}';`,
			"",
			"export const invoicer = zugferd({",
			`profile: ${profile.name},`,
			"plugins: [],",
			"});",
		].join("\n"),
		{
			filepath: "invoicer.ts",
			...defaultFormatOptions,
		},
	);

const optionsSchema = z.object({
	cwd: z.string(),
	config: z.string().optional(),
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

	const format = async (code: string) =>
		await prettierFormat(code, {
			filepath: configPath,
			...defaultFormatOptions,
		});

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
	const s = spinner({ indicator: "dots" });
	s.start("Checking node-zugferd installation");

	let latest_nodeZugferd_version: string;

	try {
		latest_nodeZugferd_version = await getLatestNpmVersion("node-zugferd");
	} catch (err) {
		log.error("❌ Couldn't get latest version of node-zugferd.");
		log.error(JSON.stringify(err, null, 2));
		process.exit(1);
	}

	if (
		!packageInfo.dependencies ||
		!Object.keys(packageInfo.dependencies).includes("node-zugferd")
	) {
		s.stop("Finished fetching latest version of node-zugferd.");

		const s2 = spinner({ indicator: "dots" });
		const shouldInstallNodeZugferdDep = await confirm({
			message: "Would you like to install node-zugferd?",
		});
		if (isCancel(shouldInstallNodeZugferdDep)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		if (packageManagerPreference === undefined) {
			packageManagerPreference = await getPackageManager();
		}
		if (shouldInstallNodeZugferdDep) {
			s2.start(
				`Installing node-zugferd using ${chalk.bold(packageManagerPreference)}`,
			);
			try {
				const start = Date.now();
				await installDependencies({
					dependencies: ["node-zugferd@latest"],
					packageManager: packageManagerPreference,
					cwd,
				});
				s2.stop(
					`node-zugferd installed ${chalk.greenBright("successfully")}! ${chalk.gray(`(${formatMilliseconds(Date.now() - start)})`)}`,
				);
			} catch (err: any) {
				s2.stop("Failed to install node-zugferd:");
				log.error(JSON.stringify(err, null, 2));
				process.exit(1);
			}
		}
	} else if (
		packageInfo.dependencies["node-zugferd"] !== "workspace:*" &&
		semver.lt(
			semver.coerce(packageInfo.dependencies["node-zugferd"])?.toString()!,
			semver.clean(latest_nodeZugferd_version)!,
		)
	) {
		s.stop("Finished fetching latest version of node-zugferd.");
		const shouldInstallNodeZugferdDep = await confirm({
			message: `Your current node-zugferd dependency is out-of-date. Would you like to update it? (${chalk.bold(packageInfo.dependencies["node-zugferd"])} → ${chalk.bold(`v${latest_nodeZugferd_version}`)})`,
		});
		if (isCancel(shouldInstallNodeZugferdDep)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		if (shouldInstallNodeZugferdDep) {
			if (packageManagerPreference === undefined) {
				packageManagerPreference = await getPackageManager();
			}
			const s = spinner({ indicator: "dots" });
			s.start(
				`Updating node-zugferd using ${chalk.bold(packageManagerPreference)}`,
			);
			try {
				const start = Date.now();
				await installDependencies({
					dependencies: ["node-zugferd@latest"],
					packageManager: packageManagerPreference,
					cwd: cwd,
				});
				s.stop(
					`node-zugferd updated ${chalk.greenBright(
						`successfully`,
					)}! ${chalk.gray(`(${formatMilliseconds(Date.now() - start)})`)}`,
				);
			} catch (error: any) {
				s.stop(`Failed to update node-zugferd:`);
				log.error(error.message);
				process.exit(1);
			}
		}
	} else {
		s.stop(`node-zugferd dependencies are ${chalk.green("up-to-date")}!`);
	}

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

			const filePath = path.join(cwd, "invoicer.ts");
			configPath = filePath;
			log.info(`Creating invoicer config file: ${filePath}`);
			try {
				currentUserConfig = await getDefaultInvoicerConfig(profile);

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
	.option(
		"--package-manager <package-manager>",
		"The package manager you want to use.",
	)
	.action(initAction);

const getLatestNpmVersion = async (packageName: string): Promise<string> => {
	try {
		const response = await fetch(`https://registry.npmjs.org/${packageName}`);

		if (!response.ok) {
			throw new Error(`Package not found: ${response.statusText}`);
		}

		const data = await response.json();
		return data["dist-tags"].latest; // Get the latest version from dist-tags
	} catch (err: any) {
		throw err?.message;
	}
};

const getPackageManager = async () => {
	const { hasBun, hasPnpm } = await checkPackageManagers();

	if (!hasBun && !hasPnpm) {
		return "npm";
	}

	const packageManagerOptions: {
		value: "bun" | "pnpm" | "yarn" | "npm";
		label?: string;
		hint?: string;
	}[] = [];

	if (hasPnpm) {
		packageManagerOptions.push({
			value: "pnpm",
			label: "pnpm",
			hint: "recommended",
		});
	}
	if (hasBun) {
		packageManagerOptions.push({
			value: "bun",
			label: "bun",
		});
	}
	packageManagerOptions.push({
		value: "npm",
		hint: "not recommended",
	});

	let packageManager = await select({
		message: "Choose a package manager",
		options: packageManagerOptions,
	});
	if (isCancel(packageManager)) {
		cancel("✋ Operation cancelled.");
		process.exit(0);
	}

	return packageManager;
};
