import { describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { identifier } from "./identifier";

describe("identifier", () => {
	it("accepts a bare identifier", () => {
		expect(parse(identifier(), "ABC")).toEqual({ identifier: "ABC" });
		expect(parse(identifier(), { value: "ABC", schemeId: "0088" })).toEqual({
			identifier: "ABC",
			schemeId: "0088",
		});
	});

	it("enforces scheme id and version requirements", () => {
		expect(
			safeParse(identifier({ requireSchemeId: "always" }), "ABC").success,
		).toBe(false);
		expect(
			parse(identifier({ requireSchemeId: "always" }), {
				value: "ABC",
				schemeId: "0088",
			}),
		).toEqual({ identifier: "ABC", schemeId: "0088" });
		expect(
			safeParse(identifier({ requireSchemeId: "never" }), {
				value: "ABC",
				schemeId: "0088",
			}).success,
		).toBe(false);
		expect(
			safeParse(identifier({ requireSchemeVersion: "always" }), {
				value: "ABC",
			}).success,
		).toBe(false);
		expect(
			parse(identifier({ requireSchemeVersion: "always" }), {
				value: "ABC",
				schemeVersion: "1",
			}),
		).toEqual({ identifier: "ABC", schemeVersion: "1" });
		expect(
			safeParse(identifier({ requireSchemeVersion: "never" }), {
				value: "ABC",
				schemeVersion: "1",
			}).success,
		).toBe(false);
	});

	it("checks scheme ids against the built-in registry", () => {
		expect(
			parse(identifier("ISO/IEC-6523"), { value: "ABC", schemeId: "0002" }),
		).toEqual({ identifier: "ABC", schemeId: "0002" });
		expect(
			safeParse(identifier("ISO/IEC-6523"), {
				value: "ABC",
				schemeId: "not-a-scheme",
			}).success,
		).toBe(false);
	});

	it("rejects input that is not a string or an object with a value", () => {
		expect(safeParse(identifier(), 1).success).toBe(false);
		expect(safeParse(identifier(), { schemeId: "0088" }).success).toBe(false);
	});
});
