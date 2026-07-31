import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { test, expect } from "vitest";
import { fileURLToPath } from "node:url";

const fixturesDir = fileURLToPath(new URL("./fixtures", import.meta.url));

const hasDeno =
	spawnSync("deno", ["--version"], {
		encoding: "utf8",
		stdio: "ignore",
	}).status === 0;

test("deno", { skip: !process.env.CI && !hasDeno }, () => {
	const fixture = join(fixturesDir, "deno-simple.ts");
	const output = spawnSync(
		"deno",
		["run", "-A", "--node-modules-dir=auto", fixture],
		{
			stdio: "inherit",
			timeout: 60 * 1000,
		},
	);
	expect(output.error).toBeUndefined();
	expect(output.status).toStrictEqual(0);
});
