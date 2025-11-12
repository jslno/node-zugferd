import { defineConfig } from "tsdown";

export default defineConfig([
	{
		dts: { build: true, incremental: true },
		format: ["esm", "cjs"],
		entry: ["./src/index.ts"],
		external: ["../runtime/meta.js", "../runtime/meta.cjs"],
	},
	{
		dts: false,
		format: "esm",
		entry: ["./src/bin.ts"],
		external: ["../runtime/meta.js", "../runtime/meta.cjs"],
	},
]);
