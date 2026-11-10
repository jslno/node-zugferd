import { beforeAll, describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { registerCodelist } from "../storages";
import { quantity } from "./quantity";

describe("quantity", () => {
	beforeAll(() => {
		registerCodelist("unit", [
			{ key: "H87", value: "H87" },
			{ key: "C62", value: "C62" },
		]);
	});

	it("requires a known unit code by default", () => {
		expect(parse(quantity(), { value: "2", unitCode: "H87" })).toEqual({
			value: 2,
			unitCode: "H87",
		});
		expect(safeParse(quantity(), 2).issues?.[0]?.message).toEqual(
			expect.stringContaining("unitCode"),
		);
		expect(
			safeParse(quantity(), { value: 2, unitCode: "ZZZ" }).issues?.[0]?.message,
		).toEqual(expect.stringContaining("unitCode"));
	});

	it("allows a bare number when the unit code is optional or forbidden", () => {
		expect(parse(quantity({ requireUnitCode: "never" }), "3")).toEqual({
			value: 3,
			unitCode: undefined,
		});
		expect(parse(quantity({ requireUnitCode: "optional" }), 3)).toEqual({
			value: 3,
			unitCode: undefined,
		});
	});

	it("rejects a non-numeric quantity", () => {
		expect(safeParse(quantity(), { value: "x", unitCode: "H87" }).success).toBe(
			false,
		);
	});
});
