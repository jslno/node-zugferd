import { describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { percentage } from "./percentage";

describe("percentage", () => {
	it("accepts numbers and numeric strings inside 0 to 100", () => {
		expect(parse(percentage(), 0)).toBe(0);
		expect(parse(percentage(), "100")).toBe(100);
		expect(parse(percentage(), "19.5")).toBe(19.5);
	});

	it("rejects values outside the range and non-numeric input", () => {
		expect(safeParse(percentage(), 101).issues?.[0]).toMatchObject({
			type: "percentage",
			message: expect.stringContaining("number range"),
		});
		expect(safeParse(percentage(), -1).issues?.[0]?.message).toEqual(
			expect.stringContaining("number range"),
		);
		expect(safeParse(percentage(), "nope").issues?.[0]?.type).toBe(
			"percentage",
		);
	});
});
