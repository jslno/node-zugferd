import { describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { literal } from "./literal";

describe("literal", () => {
	it("accepts an identical value", () => {
		expect(parse(literal("EUR"), "EUR")).toBe("EUR");
		expect(parse(literal(1), 1)).toBe(1);
		expect(literal("EUR").expects).toBe('"EUR"');
	});

	it("rejects a different value", () => {
		expect(
			safeParse(literal("EUR", "currency"), "USD").issues?.[0],
		).toMatchObject({
			expected: '"EUR"',
			received: '"USD"',
			message: "currency",
		});
	});
});
