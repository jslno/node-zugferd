import path from "path";
import fs from "fs-extra";

export const getPackageInfo = (cwd?: string) => {
	const packageJsonPath = cwd
		? path.join(cwd, "package.json")
		: path.join("package.json");

	return fs.readJsonSync(packageJsonPath);
};
