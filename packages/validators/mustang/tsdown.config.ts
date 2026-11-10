import { defineConfig } from "tsdown";

export default defineConfig([
	{
		dts: {
			tsc: { build: true, incremental: true },
		},
		format: ["esm"],
		entry: ["./src/index.ts"],
		treeshake: true,
	},
	{
		dts: false,
		format: ["esm"],
		entry: ["./src/bin.ts"],
	},
]);
