import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export async function getMustangCLI(): Promise<string> {
	let path: string;

	if (typeof require !== "undefined") {
		path = require("./meta.cjs").MUSTANG_CLI_JAR;
	} else {
		// @ts-expect-error
		path = (await import("./meta.js")).MUSTANG_CLI_JAR;
	}

	return join(_dirname, path);
}

const _filename =
	typeof __filename !== "undefined"
		? __filename
		: fileURLToPath(import.meta.url);
const _dirname =
	typeof __dirname !== "undefined" ? __dirname : dirname(_filename);

export { _filename as __filename, _dirname as __dirname };
