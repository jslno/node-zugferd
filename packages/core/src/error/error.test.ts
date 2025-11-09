import { describe, expect, it } from "vitest";
import { ZugferdError } from ".";

describe("ZugferdError", () => {
	it("should capture stack trace correctly", () => {
		const error = new ZugferdError("Test error");
		expect(error.stack).toBeDefined();
		expect(error.stack).toMatch(/ErrorWithStack:|Error:|ZugferdError:/);
		expect(error.stack).toMatch(/at\s+.*\(.*\)/);
		expect(error.stack).toMatch(/\.ts:\d+:\d+/);
	});
});
