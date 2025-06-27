import { checkPackageManagers } from "./check-package-managers";
import { cancel, isCancel, select } from "@clack/prompts";

export const getPackageManager = async () => {
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
