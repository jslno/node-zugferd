import { defineConfig } from "tsup";

export default defineConfig((env) => {
	return {
		entry: {
			index: "./src/index.ts",
			"react/renderer": "./src/renderer/react.tsx",
			"solid/renderer": "./src/renderer/solid.tsx",
		},
		format: ["cjs", "esm"],
		bundle: true,
		splitting: false,
		cjsInterop: true,
		skipNodeModulesBundle: true,
		external: ["react"],
	};
});
