import { createRequire } from "module";
import path from "path";

export const getAsset = (_path: string) => {
	let req;
	try {
		if (typeof import.meta !== "undefined" && import.meta.url) {
			req = createRequire(import.meta.url);
		} else {
			req = require;
		}
	} catch (error) {
		req = require;
	}

	try {
		const resolvedPath = req.resolve("node-zugferd");
		const dirname = path.dirname(resolvedPath);
		const fullPath = path.join(dirname, _path);
		
		return fullPath;
	} catch (error) {
		throw error;
	}
};
