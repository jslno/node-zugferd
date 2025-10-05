import { Biome } from "@biomejs/js-api/nodejs";
import serialize from "serialize-javascript";
import { PROJECT_ROOT } from ".";
import path from "path";
import { mkdir, writeFile, readFile } from "fs/promises";

const codelists = [
	import("./country"),
	import("./currency"),
	import("./icd"),
	import("./untdid-1001"),
	import("./untdid-1153"),
	import("./vat-id"),
	import("./fiscal-id"),
	import("./vat-cat"),
	import("./time"),
	import("./text"),
	import("./payment"),
	import("./untdid-5305"),
	import("./allowance"),
	import("./item"),
	import("./charge"),
	import("./mime"),
	import("./eas"),
	import("./vatex"),
	import("./unit"),
	import("./line-status"),
	import("./language"),
	import("./characteristic"),
	import("./line-reason"),
	import("./incoterms"),
	import("./transport"),
	import("./date"),
	import("./hybrid-document"),
	import("./hybrid-conformance"),
	import("./filename"),
	import("./hybrid-version"),

	import("./untdid-3035"),
	import("./untdid-3139"),
	import("./untdid-4451"),
];

const main = async () => {
	const sidebarItems = [];
	const codelistNames = [];

	for await (const codelist of codelists) {
		const result = await codelist.default.generate();

		if (!result.sidebar?.disabled) {
			sidebarItems.push(result.sidebar);
		}

		// Extract codelist name from the href for package.json exports
		if (result.sidebar?.href) {
			const codelistName = result.sidebar.href.replace("/docs/codelists/", "");
			codelistNames.push(codelistName);
		}
	}

	if (sidebarItems.length > 0) {
		await generateCodelistSidebarItems(sidebarItems);
	}

	if (codelistNames.length > 0) {
		await updatePackageJsonExports(codelistNames);
	}

	return Promise.resolve();
};

void main();

const generateCodelistSidebarItems = async (
	items: {
		disabled: boolean;
		title: string;
		href: string;
	}[],
) => {
	const data = items
		.map(({ href, title }) => ({
			title,
			href,
		}))
		.sort((a, b) =>
			a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
		);

	const dest = path.resolve(
		PROJECT_ROOT,
		"./docs/src/data/sidebar-items/codelist-items.gen.ts",
	);
	const destDir = path.dirname(dest);

	const content = `import { Content } from "@/types/content";

export const codelistSidebarItems: Content["list"] = ${serialize(data, {
		unsafe: true,
	})};`;

	const biome = new Biome();
	const { projectKey } = biome.openProject(PROJECT_ROOT);

	const { content: formattedContent } = biome.formatContent(
		projectKey,
		content,
		{
			filePath: dest,
		},
	);

	await mkdir(destDir, { recursive: true });

	await writeFile(dest, formattedContent);

	return;
};

const updatePackageJsonExports = async (codelistNames: string[]) => {
	const packageJsonPath = path.resolve(
		PROJECT_ROOT,
		"packages/node-zugferd/package.json",
	);

	// Read the current package.json
	const packageJsonContent = await readFile(packageJsonPath, "utf-8");
	const packageJson = JSON.parse(packageJsonContent);

	// Generate exports for each codelist
	const codelistExports: Record<string, any> = {};

	const additionals = [
		"filename",
		"hybrid-conformance",
		"hybrid-document",
		"hybrid-version",
	];

	for (const codelistName of [...codelistNames, ...additionals]
		.filter((c) => c != "/docs")
		.sort()) {
		const exportKey = `./codelist/${codelistName}`;
		codelistExports[exportKey] = {
			import: {
				types: `./dist/codelist/${codelistName}.d.ts`,
				default: `./dist/codelist/${codelistName}.js`,
			},
			require: {
				types: `./dist/codelist/${codelistName}.d.cts`,
				default: `./dist/codelist/${codelistName}.cjs`,
			},
		};
	}

	// Update the exports section
	// First, remove existing codelist exports
	const updatedExports: Record<string, any> = {};
	for (const [key, value] of Object.entries(packageJson.exports)) {
		if (!key.startsWith("./codelist/")) {
			updatedExports[key] = value;
		}
	}

	// Add the new codelist exports after the existing non-codelist exports
	Object.assign(updatedExports, codelistExports);

	packageJson.exports = updatedExports;

	// Format the JSON content
	const biome = new Biome();
	const { projectKey } = biome.openProject(PROJECT_ROOT);

	const { content: formattedContent } = biome.formatContent(
		projectKey,
		JSON.stringify(packageJson, null, "\t"),
		{
			filePath: packageJsonPath,
		},
	);

	// Write the updated package.json
	await writeFile(packageJsonPath, formattedContent);

	console.log(
		`Updated package.json with ${codelistNames.length} codelist exports`,
	);
};
