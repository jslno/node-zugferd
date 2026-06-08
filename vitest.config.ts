import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		projects: ["./packages/*", "./e2e/*"],
	},
	ssr: {
		resolve: {
			// We resolve from source files for unit testing
			conditions: ["dev-source"],
		},
	},
});
