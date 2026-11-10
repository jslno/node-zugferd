import { formatContent } from "../../../utils/format";
import type { Import } from "./imports";
import { createImport, processImports } from "./imports";
import type { Plugin } from "./plugins";
import type { Profile } from "./profiles";

export async function generateConfig({
	imports: imports_ = [],
	plugins = [],
	profiles = [],
	cwd = process.cwd(),
	filePath = "invoicer.ts",
}: {
	imports?: Import[] | undefined;
	plugins?: Plugin[] | undefined;
	profiles?: Profile[] | undefined;
	cwd?: string | undefined;
	filePath?: string | undefined;
}) {
	const imports = processImports([
		createImport({
			path: "node-zugferd",
			imports: [
				{
					name: "zugferd",
				},
			],
		}),
		...imports_,
	]);

	return formatContent(
		`${imports.join("\n")}

export const invoicer = zugferd({
${generateInnerConfig({ plugins, profiles })}
});
`,
		{ cwd, filePath },
	);
}

function generateInnerConfig({
	profiles,
	plugins,
}: {
	profiles: Profile[];
	plugins: Plugin[];
}) {
	const code: Record<string, string> = {};
	if (profiles.length > 0) {
		code.profiles = getProfilesCode(profiles);
	}
	if (plugins.length > 0) {
		code.plugins = getPluginsCode(plugins);
	}

	const lines = [];
	for (const key in code) {
		const escaped = /^[A-Za-z0-9_]+$/.test(key) ? key : `"${key}"`;
		lines.push(`  ${escaped}: ${code[key]},`);
	}
	return lines.join("\n");
}

function getProfilesCode(profiles: Profile[]) {
	return `[\n${profiles
		.map((p) => {
			const imp = p.imports?.[0]?.imports?.[0];
			const name = imp?.alias || imp?.name;
			if (!name) return;
			return `    ${name},`;
		})
		.filter(Boolean)
		.join("\n")}\n  ]`;
}

function getPluginsCode(plugins: Plugin[]) {
	return `[\n${plugins
		.map((plugin) => {
			const imp = plugin.imports?.[0]?.imports?.[0];
			const name = imp?.alias || imp?.name;
			if (!name) return;
			const args = plugin.options?.code.trim() ?? "";
			return args.length > 0 ? `    ${name}(${args}),` : `    ${name}(),`;
		})
		.filter(Boolean)
		.join("\n")}\n  ]`;
}
