import { join } from "node:path";
import { defineConfig } from "tsdown";
import { schemaSourcesPlugin } from "../../../scripts/validators/schema-sources.ts";

export default defineConfig({
	dts: {
		tsc: { build: true, incremental: true },
	},
	format: ["esm"],
	entry: ["./src/index.ts"],
	plugins: [
		schemaSourcesPlugin({
			id: "virtual:node-zugferd/xrechnung-schemas",
			dir: join(import.meta.dirname, "schemas"),
		}),
	],
	copy: [
		{
			from: "./schemas",
			to: "./dist",
		},
	],
	treeshake: true,
});
