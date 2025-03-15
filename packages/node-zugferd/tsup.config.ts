import { defineConfig } from "tsup";

export default defineConfig((env) => {
	return {
		entry: {
			index: "./src/index.ts",
			profile: "./src/profile.ts",
			"profile/minimum": "./src/profiles/minimum/index.ts",
			"profile/basic": "./src/profiles/basic/index.ts",
			"profile/basic-wl": "./src/profiles/basic-wl/index.ts",
			"profile/en16931": "./src/profiles/en16931/index.ts",
			"profile/extended": "./src/profiles/extended/index.ts",
			types: "./src/types/index.ts",
		},
		format: ["cjs", "esm"],
		bundle: true,
		publicDir: "./src/assets",
		splitting: false,
		cjsInterop: true,
		skipNodeModulesBundle: true,
	};
});
