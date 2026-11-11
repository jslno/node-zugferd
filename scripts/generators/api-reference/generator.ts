import fs from "node:fs/promises";
import path from "node:path";
import type { PlopGeneratorConfig } from "plop";
import { workspaceRoot } from "../helper";
import { parseEntryPoints } from "./parse";
import { writePackageReference } from "./transform";

const filterPackages = (pkgName: string) =>
	![
		"@node-zugferd/cli",
		"@node-zugferd/utils",
		"@node-zugferd/minimum",
		"@node-zugferd/basic",
		"@node-zugferd/basic-wl",
		"@node-zugferd/en-16931",
		"@node-zugferd/extended",
		"@node-zugferd/xrechnung",
		"@node-zugferd/xrechnung-schema-definition",
		"@node-zugferd/order-x-basic",
		"@node-zugferd/order-x",
		"@node-zugferd/order-x-schema-definition",
	].includes(pkgName) && !pkgName.startsWith("@node-zugferd/codelist-");

type PackageJson = {
	name: string;
	description?: string;
	private?: boolean;
	exports?: Record<string, unknown>;
};

type PackageRecord = {
	path: string;
	packageJson: PackageJson;
};

let lazyPackages: Map<string, PackageRecord> | null = null;

const collectPackages = async () => {
	if (lazyPackages) return lazyPackages;
	const result = new Map<string, PackageRecord>();
	const lookup = async (directory: string) => {
		const entries = await fs.readdir(directory, { withFileTypes: true });

		if (
			!entries.some((entry) => entry.isFile() && entry.name === "package.json")
		) {
			for (const dir of entries.filter((entry) => entry.isDirectory())) {
				await lookup(path.join(dir.parentPath, dir.name));
			}
			return;
		}

		const packageJson = JSON.parse(
			await fs.readFile(path.join(directory, "package.json"), "utf-8"),
		) as PackageJson;
		if (
			packageJson.private === true ||
			Object.keys(packageJson.exports ?? {}).length === 0 ||
			!filterPackages(packageJson.name)
		) {
			return;
		}
		result.set(packageJson.name, {
			path: directory,
			packageJson,
		});
	};

	await lookup(path.join(workspaceRoot, "packages"));
	lazyPackages = result;
	return lazyPackages;
};

function devSourceEntryPoints(
	pkgPath: string,
	exportsField: PackageJson["exports"],
) {
	const points = new Set<string>();
	for (const entry of Object.values(exportsField ?? {})) {
		if (!entry || typeof entry !== "object" || !("dev-source" in entry))
			continue;
		const devSource = (entry as { "dev-source"?: unknown })["dev-source"];
		if (typeof devSource === "string") {
			points.add(path.resolve(pkgPath, devSource));
		}
	}
	return [...points];
}

const contentBasePath = path.join(workspaceRoot, "docs/content/api-reference");

export async function generateApiReference(selection: string | string[]) {
	const packages = await collectPackages();
	const packageNames =
		selection === "*" || (Array.isArray(selection) && selection.includes("*"))
			? [...packages.keys()]
			: Array.isArray(selection)
				? selection
				: [selection];

	for (const pkgName of packageNames) {
		const pkg = packages.get(pkgName);
		if (!pkg) {
			throw new Error(`Package "${pkgName}" is not part of the API reference.`);
		}

		const tsconfig = path.join(pkg.path, "tsconfig.json");
		try {
			await fs.access(tsconfig);
		} catch {
			console.warn(`No tsconfig.json found for package "${pkgName}".`);
			continue;
		}

		const entryPoints: string[] = [];
		for (const entryPoint of devSourceEntryPoints(
			pkg.path,
			pkg.packageJson.exports,
		)) {
			try {
				await fs.access(entryPoint);
				entryPoints.push(entryPoint);
			} catch {
				console.warn(
					`dev-source entry "${entryPoint}" for package "${pkgName}" does not exist.`,
				);
			}
		}
		if (entryPoints.length === 0) {
			console.warn(`No dev-source exports found for package "${pkgName}".`);
			continue;
		}

		const project = await parseEntryPoints({
			name: pkgName,
			entryPoints,
			tsconfig,
		});
		await writePackageReference({
			project,
			packageName: pkgName,
			description:
				typeof pkg.packageJson.description === "string"
					? pkg.packageJson.description
					: undefined,
			outDir: path.join(contentBasePath, pkgName),
		});
	}

	await writeRootMeta(packageNames);
	return "Done!";
}

async function writeRootMeta(packageNames: string[]) {
	const metaPath = path.join(contentBasePath, "meta.json");
	let existingPages: string[] = [];
	try {
		const existing = JSON.parse(await fs.readFile(metaPath, "utf-8")) as {
			pages?: unknown;
		};
		if (Array.isArray(existing.pages)) {
			existingPages = existing.pages.filter(
				(page): page is string => typeof page === "string",
			);
		}
	} catch {
		existingPages = [];
	}

	await fs.mkdir(contentBasePath, { recursive: true });
	await fs.writeFile(
		metaPath,
		`${JSON.stringify(
			{ pages: [...new Set([...existingPages, ...packageNames])] },
			null,
			2,
		)}\n`,
		"utf-8",
	);
}

export const apiReferenceGeneratorConfig: Partial<PlopGeneratorConfig> = {
	prompts: [
		{
			type: "list",
			name: "package",
			choices: async () => {
				const packages = await collectPackages();
				return ["*", ...packages.keys()];
			},
			default: "*",
			message: "Select a package to generate API reference for:",
		},
	],
	actions: [
		async (answers) => {
			const selected = answers?.package;
			if (typeof selected !== "string" && !Array.isArray(selected)) {
				throw new Error("Missing package selection.");
			}
			return generateApiReference(selected);
		},
	],
};
