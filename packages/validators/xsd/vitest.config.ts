import { join } from "node:path";
import { defineProject } from "vitest/config";
import { schemaSourcesPlugin } from "../../../scripts/validators/schema-sources.ts";

export default defineProject({
	plugins: [
		schemaSourcesPlugin({
			id: "virtual:node-zugferd/xsd-schemas",
			dir: join(import.meta.dirname, "schemas"),
		}),
	],
	test: {
		clearMocks: true,
		restoreMocks: true,
	},
});
