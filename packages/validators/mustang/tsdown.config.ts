import { defineConfig } from "tsdown";

export default defineConfig([
	{
		dts: { build: true, incremental: true },
		format: ["esm", "cjs"],
		entry: ["./src/index.ts"],
		external: ["./meta.js", "./meta.cjs"],
	},
	{
		dts: false,
		format: "esm",
		entry: ["./src/post-install.ts"],
		external: ["./meta.js", "./meta.cjs"],
	},
]);
