import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const fixturesDir = fileURLToPath(new URL("./fixtures", import.meta.url));

test.for([
	{ dir: "tsconfig-declaration", skip: false },
	{ dir: "tsconfig-exact-optional-property-types", skip: false },
	{ dir: "tsconfig-verbatim-module-syntax-node10", skip: false },
	{ dir: "tsconfig-isolated-module-bundler", skip: false },
])("typecheck $dir", ({ dir, skip: shouldSkip }, { skip }) => {
	if (shouldSkip) skip();

	const cwd = resolve(fixturesDir, dir);
	const output = spawnSync("pnpm", ["run", "typecheck"], {
		stdio: "inherit",
		cwd,
		timeout: 10 * 1000, // 10 seconds
	});
	expect(output.error).toBeUndefined();
	expect(output.status).toStrictEqual(0);
});
