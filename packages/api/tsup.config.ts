import { defineConfig } from "tsup";

export default defineConfig((env) => {
	return {
		entry: {
			index: "./src/index.ts",
		},
		format: ["cjs", "esm"],
		bundle: true,
		splitting: false,
		cjsInterop: true,
		skipNodeModulesBundle: true,
		external: ["react"],
	};
});
