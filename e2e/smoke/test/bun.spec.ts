import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { test, expect } from "vitest";
import { fileURLToPath } from "node:url";

const fixturesDir = fileURLToPath(new URL("./fixtures", import.meta.url));

const hasBun =
	spawnSync("bun", ["--version"], {
		encoding: "utf8",
		stdio: "ignore",
	}).status === 0;

test("bun", { skip: !process.env.CI && !hasBun }, () => {
	const fixture = join(fixturesDir, "bun-simple.ts");
	const output = spawnSync("bun", ["run", fixture], {
		stdio: "inherit",
		timeout: 30 * 1000,
	});
	expect(output.error).toBeUndefined();
	expect(output.status).toStrictEqual(0);
});
