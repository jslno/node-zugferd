import { describe, expect, it } from "vitest";
import { createFormatters } from "./format";

// Intl emits non-breaking / narrow non-breaking spaces, normalize for
// readable assertions
const plain = (value: string) => value.replace(/[\u00A0\u202F]/g, " ");

describe("createFormatters", () => {
	const formatters = createFormatters();

	it("formats currency amounts in German notation", () => {
		expect(plain(formatters.currency("1234.56"))).toBe("1.234,56 €");
		expect(plain(formatters.currency(0, "USD"))).toBe("0,00 $");
	});

	it("formats dates in German notation", () => {
		expect(formatters.date(new Date("2024-11-15"))).toBe("15.11.2024");
	});

	it("formats quantities with human readable units", () => {
		expect(plain(formatters.quantity("20.0000", "H87"))).toBe("20 Stk");
		expect(plain(formatters.quantity(1.5, "HUR"))).toBe("1,5 Std.");
	});

	it("falls back to the raw unit code for unknown units", () => {
		expect(plain(formatters.quantity(3, "XYZ"))).toBe("3 XYZ");
	});

	it("omits the unit when no code is given", () => {
		expect(plain(formatters.quantity("2"))).toBe("2");
	});

	it("respects a custom locale", () => {
		const en = createFormatters("en-US");
		expect(plain(en.currency("1234.56"))).toBe("€1,234.56");
	});
});
