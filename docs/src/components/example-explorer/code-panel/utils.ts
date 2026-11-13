import type { bundledLanguages } from "shiki";

export function detectLanguage(
	path: string,
): keyof typeof bundledLanguages | null {
	const fileName = path.split("/").pop()!;
	const extension = fileName.split(".").pop()!;

	switch (extension.toLowerCase()) {
		case "ts":
		case "js":
		case "mjs":
		case "mts":
		case "cjs":
		case "cts":
		case "tsx":
		case "jsx":
		case "json":
		case "jsonc":
		case "json5":
		case "xml":
		case "xsl":
		case "yml":
		case "yaml":
		case "sh":
		case "hbs":
		case "html":
		case "java":
		case "php":
		case "md":
		case "mdx":
		case "css":
		case "scss":
		case "sass":
		case "postcss":
		case "csv":
		case "vue":
		case "svelte":
		case "c":
		case "c#":
		case "cs":
		case "cpp":
		case "rs":
			return extension.toLowerCase() as keyof typeof bundledLanguages;
	}

	return null;
}
