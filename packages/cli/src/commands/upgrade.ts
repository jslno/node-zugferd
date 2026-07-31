import { Command } from "commander";
import { existsSync } from "node:fs";
import path from "node:path";
import type { PackageJson } from "type-fest";
import * as z from "zod";
import { getPackageInfo } from "../utils/get-package-info";
import type { DependencyType } from "../utils/install-dependencies";
import { installDependencies } from "../utils/install-dependencies";
import { cancel, confirm, isCancel, spinner } from "@clack/prompts";
import { fetchDistTags } from "../utils/npm";
import semver from "semver";
import chalk from "chalk";
import { detectPackageManager } from "../utils/package-manager";

const upgradeOptionsSchema = z.object({
	cwd: z.string().default(process.cwd()),
	yes: z.boolean().default(false),
});

async function upgradeAction(opts: z.infer<typeof upgradeOptionsSchema>) {
	const options = await upgradeOptionsSchema.parseAsync(opts);
	const cwd = path.resolve(options.cwd);
	if (!existsSync(cwd)) {
		console.error(`The directory "${cwd}" does not exist.`);
		process.exit(1);
	}

	let packageJson: PackageJson;
	try {
		packageJson = getPackageInfo(cwd);
	} catch {
		console.error(
			`Could not read package.json in "${cwd}". Make sure you are within a project directory.`,
		);
		process.exit(1);
	}

	const dependencies = {
		prod: packageJson.dependencies ?? {},
		peer: packageJson.peerDependencies ?? {},
		optional: packageJson.optionalDependencies ?? {},
		dev: packageJson.devDependencies ?? {},
	};

	const isNodeZugferdPackage = (name: string) =>
		name === "node-zugferd" || name.startsWith("@node-zugferd/");

	const resolveCandidates = (
		type: DependencyType,
		deps: Partial<Record<string, string>>,
	) => {
		for (const [name, version] of Object.entries(deps)) {
			if (!version || version.startsWith("workspace:")) continue;
			if (isNodeZugferdPackage(name)) {
				candidates.push({
					name,
					currentVersion: version,
					type,
				});
			}
		}
	};

	const candidates: {
		type: DependencyType;
		name: string;
		currentVersion: string;
	}[] = [];

	for (const [type, deps] of Object.entries(dependencies)) {
		resolveCandidates(type as DependencyType, deps);
	}

	if (candidates.length === 0) {
		console.log("No node-zugferd packages found in this project.");
		process.exit(0);
	}

	const s1 = spinner();
	s1.start("Checking for updates...");

	const results = await Promise.allSettled(
		candidates.map(async (c) => {
			const distTags = await fetchDistTags(c.name);
			return {
				...c,
				latestVersion: distTags?.latest,
			};
		}),
	);

	const upgrades: {
		type: DependencyType;
		name: string;
		currentVersion: string;
		latestVersion: string;
	}[] = [];
	for (const result of results) {
		if (result.status !== "fulfilled" || !result.value.latestVersion) {
			continue;
		}
		const { currentVersion, latestVersion, ...candidate } = result.value;
		const coerced = semver.coerce(currentVersion);
		if (coerced && semver.lt(coerced, latestVersion)) {
			upgrades.push({ ...candidate, currentVersion, latestVersion });
		}
	}

	s1.stop();

	if (upgrades.length === 0) {
		console.log("All node-zugferd packages are up to date.");
		process.exit(0);
	}

	console.log("\nThe following packages can be upgraded:\n");
	for (const u of upgrades) {
		console.log(
			`\t${chalk.cyan(u.name)}\t${chalk.dim(u.currentVersion)} ${chalk.reset("→")} ${chalk.green(u.latestVersion)}`,
		);
	}
	console.log("");

	let confirmed = options.yes;
	if (!confirmed) {
		const response = await confirm({
			message: "Do you want to upgrade these packages?",
			initialValue: true,
		});
		if (isCancel(response)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		confirmed = response;
	}

	if (!confirmed) {
		cancel("Upgrade cancelled.");
		process.exit(0);
	}

	const { packageManager } = await detectPackageManager(cwd, packageJson);

	const s2 = spinner();
	s2.start("Installing updates...");

	try {
		await installDependencies(
			upgrades.map(({ type, name, latestVersion: version }) => ({
				name,
				type,
				version,
			})),
			{
				packageManager,
				cwd,
			},
		);
		s2.stop();
		console.log(chalk.green("Successfully upgraded node-zugferd packages."));
	} catch (err) {
		s2.stop();
		console.error("Failed to install updates:", err);
		process.exit(1);
	}
}

export const upgrade = new Command("upgrade")
	.description("Upgrade node-zugferd packages to their latest versions.")
	.option("-c, --cwd <cwd>", "The current working directory.")
	.option("-y, --yes", "Automatically accept and upgrade without prompting.")
	.action(upgradeAction);
