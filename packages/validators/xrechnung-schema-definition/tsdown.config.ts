import { defineConfig } from "tsdown";

export default defineConfig({
	dts: { build: true, incremental: true },
	format: ["esm"],
	entry: ["./src/index.ts"],
	copy: [
		{
			from: "./schemas",
			to: "./dist",
		},
	],
	treeshake: true,
});
