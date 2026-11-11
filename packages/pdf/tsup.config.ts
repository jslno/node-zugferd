import { defineConfig } from "tsup";

export default defineConfig(() => {
	return {
		entry: {
			index: "./src/index.ts",
			templates: "./src/templates/index.ts",
		},
		format: ["cjs", "esm"],
		bundle: true,
		splitting: false,
		cjsInterop: true,
		skipNodeModulesBundle: true,
	};
});
