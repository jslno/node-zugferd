import { defineConfig } from "tsup";

export default defineConfig((env) => {
	return {
		entry: {
			index: "./src/index.ts",
			client: "./src/client/index.ts",
			node: "./src/integrations/node.ts",
			"next-js": "./src/integrations/next-js.ts",
			"react/renderer": "./src/renderer/react.tsx",
			"vue/renderer": "./src/renderer/vue.ts",
			"solid-start": "./src/integrations/solid-start.ts",
			"solid-start/renderer": "./src/renderer/solid.tsx",
			"svelte-kit": "./src/integrations/svelte-kit.ts",
			"svelte-kit/renderer": "./src/renderer/svelte.ts",
			"vanilla/renderer": "./src/renderer/vanilla.ts",
			api: "./src/api/index.ts",
		},
		format: ["cjs", "esm"],
		bundle: true,
		splitting: false,
		cjsInterop: true,
		skipNodeModulesBundle: true,
		external: ["react"],
	};
});
