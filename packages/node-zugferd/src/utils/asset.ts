import { createRequire } from "module";
import path from "path";

export const getAsset = (_path: string) => {
	const require = createRequire(import.meta.url)
	const x = require.resolve("node-zugferd")

	return path.join(path.dirname(x), _path);
};
