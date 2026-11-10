import { describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { unitPriceAmount } from "./unit-price-amount";

describe("unitPriceAmount", () => {
	it("coerces numeric strings", () => {
		expect(parse(unitPriceAmount(), "1.50")).toBe(1.5);
		expect(parse(unitPriceAmount(), 2)).toBe(2);
	});

	it("rejects non-numeric input", () => {
		expect(safeParse(unitPriceAmount(), "x").issues?.[0]).toMatchObject({
			type: "unit-price-amount",
		});
	});
});
