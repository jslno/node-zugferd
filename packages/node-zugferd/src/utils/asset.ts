import { createRequire } from "module";
import path from "path";

export const getAsset = (_path: string) => {
	let req =
		typeof import.meta !== "undefined"
			? createRequire(import.meta.url)
			: require;

	return path.join(path.dirname(req.resolve("node-zugferd")), _path);
};
