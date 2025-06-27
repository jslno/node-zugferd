import { cancel, isCancel, log, spinner, confirm } from "@clack/prompts";
import { getLatestNpmVersion } from "./get-latest-npm-version";
import { installDependencies } from "./install-dependencies";
import chalk from "chalk";
import { formatMilliseconds } from "./format-ms";
import semver from "semver";
import { getPackageManager } from "./get-package-manager";

export const handlePackageInstallation = async ({
	packageName,
	packageVersion = "latest",
	cwd,
	packageInfo,
	packageManagerPreference,
}: {
	packageName: string;
	packageVersion?: string;
	cwd: string;
	packageInfo: Record<string, any>;
	packageManagerPreference?: "bun" | "pnpm" | "yarn" | "npm";
}) => {
	const s = spinner({ indicator: "dots" });
	s.start(`Checking ${packageName} installation`);

	let latest_package_version: string;

	try {
		latest_package_version = await getLatestNpmVersion(packageName);
	} catch (err) {
		log.error(`❌ Couldn't get latest version of ${packageName}.`);
		log.error(JSON.stringify(err, null, 2));
		process.exit(1);
	}

	if (
		!packageInfo.dependencies ||
		!Object.keys(packageInfo.dependencies).includes(packageName)
	) {
		s.stop(`Finished fetching latest version of ${packageName}.`);

		const s2 = spinner({ indicator: "dots" });
		const shouldInstallPackageDep = await confirm({
			message: `Would you like to install ${packageName}?`,
		});
		if (isCancel(shouldInstallPackageDep)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		if (packageManagerPreference === undefined) {
			packageManagerPreference = await getPackageManager();
		}
		if (shouldInstallPackageDep) {
			s2.start(
				`Installing ${packageName} using ${chalk.bold(packageManagerPreference)}`,
			);
			try {
				const start = Date.now();
				await installDependencies({
					dependencies: [`${packageName}@${packageVersion}`],
					packageManager: packageManagerPreference,
					cwd,
				});
				s2.stop(
					`${packageName} installed ${chalk.greenBright("successfully")}! ${chalk.gray(`(${formatMilliseconds(Date.now() - start)})`)}`,
				);
			} catch (err: any) {
				s2.stop(`Failed to install ${packageName}:`);
				log.error(JSON.stringify(err, null, 2));
				process.exit(1);
			}
		}
	} else if (
		packageInfo.dependencies[packageName] !== "workspace:*" &&
		semver.lt(
			semver.coerce(packageInfo.dependencies[packageName])?.toString()!,
			semver.clean(latest_package_version)!,
		)
	) {
		s.stop(`Finished fetching latest version of ${packageName}.`);
		const shouldInstallPackageDep = await confirm({
			message: `Your current ${packageName} dependency is out-of-date. Would you like to update it? (${chalk.bold(packageInfo.dependencies[packageName])} → ${chalk.bold(`v${latest_package_version}`)})`,
		});
		if (isCancel(shouldInstallPackageDep)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		if (shouldInstallPackageDep) {
			if (packageManagerPreference === undefined) {
				packageManagerPreference = await getPackageManager();
			}
			const s = spinner({ indicator: "dots" });
			s.start(
				`Updating ${packageName} using ${chalk.bold(packageManagerPreference)}`,
			);
			try {
				const start = Date.now();
				await installDependencies({
					dependencies: [`${packageName}@${packageVersion}`],
					packageManager: packageManagerPreference,
					cwd: cwd,
				});
				s.stop(
					`${packageName} updated ${chalk.greenBright(
						`successfully`,
					)}! ${chalk.gray(`(${formatMilliseconds(Date.now() - start)})`)}`,
				);
			} catch (error: any) {
				s.stop(`Failed to update ${packageName}:`);
				log.error(error.message);
				process.exit(1);
			}
		}
	} else {
		s.stop(`${packageName} dependencies are ${chalk.green("up-to-date")}!`);
	}
};
