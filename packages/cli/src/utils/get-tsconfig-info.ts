import path from "path";
import fs from "fs-extra";

export const stripJsonComments = (jsonStr: string): string => {
	return jsonStr
		.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
			g ? "" : m,
		)
		.replace(/,(?=\s*[}\]])/g, "");
};

export const getTsconfigInfo = (cwd?: string, flatPath?: string) => {
	let tsConfigPath: string;
	if (flatPath) {
		tsConfigPath = flatPath;
	} else {
		tsConfigPath = cwd
			? path.join(cwd, "tsconfig.json")
			: path.join("tsconfig.json");
	}

	const text = fs.readFileSync(tsConfigPath, "utf-8");
	return JSON.parse(stripJsonComments(text));
};
