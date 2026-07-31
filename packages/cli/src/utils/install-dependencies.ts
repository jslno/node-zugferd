import { exec } from "node:child_process";
import type { LiteralString } from "@node-zugferd/core";
import type { PackageManager } from "./package-manager";
import { rcompare } from "semver";

const flagsMap = {
	npm: {
		dev: "--save-dev",
		optional: "--save-optional",
	},
	pnpm: {
		dev: "--save-dev",
		peer: "--save-peer",
		optional: "--save-optional",
		catalog: (name?: string) => {
			if (name) {
				return `--save-catalog-name ${name}`;
			}
			return "--save-catalog";
		},
	},
	bun: {
		dev: "--dev",
		peer: "--peer",
		optional: "--optional",
	},
	yarn: {
		dev: "--dev",
		peer: "--peer",
		optional: "--optional",
	},
} as const satisfies Record<PackageManager, Record<string, any>>;

const dependencyTypes = ["prod", "peer", "optional", "dev"] as const;
export type DependencyType = (typeof dependencyTypes)[number];

export type Dependency = {
	name: string;
	version?: string | undefined;
	type?: DependencyType | undefined;
	catalog?: boolean | string | undefined;
};

function processDependencies(dependencies: Dependency[]): Dependency[] {
	const groupedDependencies = dependencies.reduce(
		(acc, dep) => {
			acc[dep.name] = [...(acc[dep.name] ?? []), dep];
			return acc;
		},
		{} as Record<string, Dependency[]>,
	);

	const resolveDependencyType = (deps: Dependency[]): DependencyType => {
		for (const type of dependencyTypes) {
			if (deps.some((d) => d.type === type)) {
				return type;
			}
		}

		return "prod";
	};

	const resolveVersion = (deps: Dependency[]): string | undefined =>
		[...deps].sort((a, b) =>
			!a.version || !b.version ? 0 : rcompare(a.version, b.version),
		)[0]!.version;

	return Object.entries(groupedDependencies).map(([name, deps]) => {
		return {
			name,
			type: resolveDependencyType(deps),
			version: resolveVersion(deps),
			catalog: deps.find((dep) => !!dep.catalog)?.catalog ?? false,
		};
	});
}

export async function installDependencies(
	dependencies: Dependency[],
	options?:
		| {
				cwd?: string | undefined;
				packageManager?: PackageManager | undefined;
		  }
		| undefined,
) {
	const groupedDependencies = processDependencies(dependencies).reduce(
		(acc, dep) => {
			const key = !!dep.catalog
				? `catalog:${typeof dep.catalog === "string" ? dep.catalog : ""}`
				: (dep.type ?? "prod");
			acc[key] = [...(acc[key] ?? []), dep];
			return acc;
		},
		{} as Record<string, Dependency[]>,
	);

	for (const deps of Object.values(groupedDependencies)) {
		await install({
			dependencies: deps.map((dep) =>
				[dep.name, dep.version].filter(Boolean).join("@"),
			),
			cwd: options?.cwd ?? process.cwd(),
			packageManager: options?.packageManager ?? "npm",
			type: deps[0]!.type ?? "prod",
			catalog: deps[0]?.catalog ?? false,
		});
	}
}

function install({
	dependencies,
	packageManager,
	cwd,
	type,
	catalog = false,
}: {
	dependencies: string | string[];
	packageManager: "npm" | "pnpm" | "bun" | "yarn" | LiteralString;
	cwd: string;
	type?: "prod" | "peer" | "optional" | "dev" | undefined;
	catalog?: boolean | string | undefined;
}): Promise<boolean> {
	let installCommand: string;
	const flags: string[] = [];
	switch (packageManager) {
		case "npm":
			installCommand = "npm install";
			flags.push("--force");
			break;
		case "pnpm":
			installCommand = "pnpm add";
			break;
		case "bun":
			installCommand = "bun install";
			break;
		case "yarn":
			installCommand = "yarn install";
			break;
		default:
			throw new Error("Invalid package manager");
	}

	const flagMap = flagsMap[packageManager as "pnpm" | "npm"];
	if (!!catalog) {
		if ("catalog" in flagMap) {
			const catalogFlag = flagMap["catalog"];
			flags.push(
				catalogFlag(typeof catalog === "string" ? catalog : undefined),
			);
		} else {
			throw new Error(`Catalog flag is not supported by "${packageManager}"`);
		}
	} else {
		const flag = flagMap?.[type as keyof typeof flagMap];
		if (flag) {
			flags.push(flag);
		}
	}
	const command = `${installCommand}${flags.length > 0 ? ` ${flags.join(" ")}` : ""} ${Array.isArray(dependencies) ? dependencies.join(" ") : dependencies}`;

	return new Promise((resolve, reject) => {
		exec(command, { cwd }, (error, _stdout, stderr) => {
			if (error) {
				reject(new Error(stderr));
				return;
			}
			resolve(true);
		});
	});
}
