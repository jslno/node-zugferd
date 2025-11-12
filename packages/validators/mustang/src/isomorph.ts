import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const _filename =
	typeof __filename !== "undefined"
		? __filename
		: fileURLToPath(import.meta.url);
const _dirname =
	typeof __dirname !== "undefined" ? __dirname : dirname(_filename);

export { _filename as __filename, _dirname as __dirname };
