import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globalSetup: ["./vitest.setup.ts"],
		testTimeout: 10_000,
	},
	ssr: {
		resolve: {
			conditions: ["dev-source"],
		},
	},
});
