import { defineConfig } from "tsup";

export default defineConfig((env) => {
	return {
		entry: {
			index: "./src/index.ts",
		},
		format: ["cjs", "esm"],
		publicDir: "./src/assets",
		splitting: true,
		cjsInterop: true,
		skipNodeModulesBundle: true,
	};
});
