import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

export type SchemaSourcesPluginOptions = {
	/** Module specifier the package imports, e.g. `virtual:node-zugferd/xsd-schemas`. */
	id: string;
	/** Absolute path to the directory that contains the XSD files. */
	dir: string;
};

export type SchemaSourcesPlugin = {
	name: string;
	resolveId(source: string): string | undefined;
	load(id: string): string | undefined;
};

const collectSchemas = (dir: string, root = dir): Record<string, string> => {
	const sources: Record<string, string> = {};
	const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	for (const entry of entries) {
		const path = join(dir, entry.name);

		if (entry.isDirectory()) {
			Object.assign(sources, collectSchemas(path, root));
		} else if (entry.isFile() && entry.name.endsWith(".xsd")) {
			const key = relative(root, path).split(sep).join("/");
			sources[key] = readFileSync(path, "utf-8");
		}
	}

	return sources;
};

/**
 * Embeds every `.xsd` file in a directory as a virtual ES module whose default
 * export is a `Record<relativePath, content>`.
 *
 * The XSD validator reads schemas with `node:fs`. Runtimes such as Cloudflare
 * Workers have no access to package files, so the schemas have to be part of
 * the JavaScript bundle instead. Generating the module during the build keeps
 * the XML out of the source tree while making it available at runtime.
 */
export const schemaSourcesPlugin = (
	options: SchemaSourcesPluginOptions,
): SchemaSourcesPlugin => {
	const resolvedId = `\0${options.id}`;

	return {
		name: "node-zugferd:schema-sources",
		resolveId(source) {
			if (source === options.id) {
				return resolvedId;
			}
		},
		load(id) {
			if (id !== resolvedId) {
				return;
			}

			return `export default ${JSON.stringify(collectSchemas(options.dir))};`;
		},
	};
};
