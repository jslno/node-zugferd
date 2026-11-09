import { beforeAll, describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { registerCodelist } from "../storages";
import { code } from "./code";

describe("code", () => {
	beforeAll(() => {
		registerCodelist("currency", [
			{ key: "EUR", value: "EUR" },
			{ key: "USD", value: "USD" },
		]);
	});

	it("wraps a listed code", () => {
		expect(parse(code("currency"), "EUR")).toEqual({
			value: "EUR",
			codelist: "currency",
		});
		expect(code("currency").expects).toBe("a code of the codelist currency");
	});

	it("rejects an unknown code and a non-string", () => {
		expect(safeParse(code("currency"), "XXX").issues?.[0]).toMatchObject({
			type: "code",
			received: "currency",
			message: expect.stringContaining("codelist"),
		});
		expect(safeParse(code("currency"), 1).issues?.[0]).toMatchObject({
			type: "code",
			message: expect.stringContaining("Invalid type"),
		});
	});

	it("throws when the codelist was never registered", () => {
		expect(() => parse(code("missing-list"), "EUR")).toThrow(
			'Codelist with id "missing-list" not found in registry.',
		);
	});
});
