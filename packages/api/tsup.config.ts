import { defineConfig } from "tsup";

export default defineConfig((env) => {
	return {
		entry: {
			index: "./src/index.ts",
			client: "./src/client/index.ts",
			"react/renderer": "./src/renderer/react.tsx",
			"vue/renderer": "./src/renderer/vue.ts",
			"solid/renderer": "./src/renderer/solid.tsx",
			"svelte/renderer": "./src/renderer/svelte.ts",
		},
		format: ["cjs", "esm"],
		bundle: true,
		splitting: false,
		cjsInterop: true,
		skipNodeModulesBundle: true,
		external: ["react"],
	};
});
