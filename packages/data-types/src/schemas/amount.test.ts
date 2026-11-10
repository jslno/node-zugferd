import { beforeAll, describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { registerCodelist } from "../storages";
import { amount } from "./amount";

describe("amount", () => {
	beforeAll(() => {
		registerCodelist("currency", [
			{ key: "EUR", value: "EUR" },
			{ key: "USD", value: "USD" },
		]);
	});

	it("rounds a bare amount to two decimals", () => {
		expect(parse(amount(), 1.239)).toEqual({ value: 1.24 });
		expect(parse(amount(), "10")).toEqual({ value: 10 });
	});

	it("keeps a known currency and rejects an unknown one", () => {
		expect(parse(amount(), { value: "10.5", currency: "EUR" })).toEqual({
			value: 10.5,
			currency: "EUR",
		});
		expect(safeParse(amount(), { value: 1, currency: "XXX" }).success).toBe(
			false,
		);
	});

	it("enforces requireCurrency at runtime", () => {
		expect(parse(amount({ requireCurrency: "never" }), 4)).toEqual({
			value: 4,
		});
		expect(safeParse(amount({ requireCurrency: "always" }), 4).success).toBe(
			false,
		);
		expect(
			parse(amount({ requireCurrency: "always" }), {
				value: 4,
				currency: "USD",
			}),
		).toEqual({ value: 4, currency: "USD" });
	});

	it("rejects values that are not numeric", () => {
		expect(safeParse(amount(), "nope").success).toBe(false);
		expect(safeParse(amount(), { value: "nope" }).success).toBe(false);
		expect(safeParse(amount(), null).success).toBe(false);
	});
});
