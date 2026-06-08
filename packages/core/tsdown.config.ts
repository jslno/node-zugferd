import { defineConfig } from "tsdown";

export default defineConfig({
	dts: { build: true, incremental: true },
	format: ["esm"],
	entry: [
		"./src/index.ts",
		"./src/utils/index.ts",
		"./src/error/index.ts",
		"./src/types/index.ts",
		"./src/data-types/index.ts",
	],
	treeshake: true,
});
