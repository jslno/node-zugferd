import path from "node:path";
import { fileURLToPath } from "node:url";
import type { FormatContentOptions } from "@biomejs/js-api/nodejs";
import { Biome } from "@biomejs/js-api/nodejs";
import { convert } from "xmlbuilder2";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const workspaceRoot = path.resolve(__dirname, "../../");

const biome = new Biome();
const { projectKey } = biome.openProject(workspaceRoot);

export function formatContent(content: string, options: FormatContentOptions) {
	return biome.formatContent(projectKey, content, options);
}

export function parseXML(xml: string) {
	return convert(xml, { format: "object" });
}
