import { describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { boolean } from "./boolean";

describe("boolean", () => {
	it("accepts booleans", () => {
		expect(parse(boolean(), true)).toBe(true);
		expect(parse(boolean(), false)).toBe(false);
	});

	it("rejects other types with the schema message", () => {
		expect(safeParse(boolean("flag"), "true").issues?.[0]).toMatchObject({
			type: "boolean",
			expected: "boolean",
			message: "flag",
		});
	});
});
