/* eslint-disable unicorn/import-style,unicorn/prefer-module */
import { defineConfig } from "vitest/config";

/**
 * Vitest coverage configuration
 *
 * Uses the built-in 'v8' provider for code coverage. This enables coverage reporting when running tests with the --coverage flag or via the test:coverage script.
 * You can customize include/exclude patterns, reporters, and thresholds as needed.
 * See: https://vitest.dev/guide/coverage.html
 */
export default defineConfig({
	test: {
		environment: "node",
		globalSetup: "./tests/setup/vitest.global-setup-e2e.ts",
		setupFiles: ["./tests/setup/vitest.setup-e2e.ts"],
		include: ["tests/**/*.spec.ts"],
		testTimeout: 60000,
		hookTimeout: 60000,
		// Run all test files sequentially to avoid DynamoDB table race conditions
		fileParallelism: false,
		sequence: {
			concurrent: false,
		},
	},
});
