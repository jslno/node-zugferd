import { describe, expect, it } from "vitest";
import { parse, parseAsync, safeParse } from "../methods";
import { arrayAsync } from "./array";
import { nullish, nullishAsync } from "./nullish";
import { text } from "./string";

describe("nullish", () => {
	it("passes values through and substitutes defaults for null and undefined", () => {
		const schema = nullish(text(), "fallback");

		expect(parse(schema, "value")).toBe("value");
		expect(parse(schema, null)).toBe("fallback");
		expect(parse(schema, undefined)).toBe("fallback");
		expect(schema.expects).toBe("(string | null | undefined)");
	});

	it("keeps nullish input when no default is configured", () => {
		expect(parse(nullish(text()), null)).toBeNull();
		expect(parse(nullish(text()), undefined)).toBeUndefined();
	});

	it("evaluates a default factory", () => {
		expect(
			parse(
				nullish(text(), () => "now"),
				undefined,
			),
		).toBe("now");
	});

	it("still validates a present value", () => {
		expect(safeParse(nullish(text()), 1).typed).toBe(false);
	});
});

describe("nullishAsync", () => {
	it("evaluates an async default factory", async () => {
		await expect(
			parseAsync(
				nullishAsync(arrayAsync(text()), async () => ["later"]),
				null,
			),
		).resolves.toEqual(["later"]);
		expect(nullishAsync(arrayAsync(text())).async).toBe(true);
	});
});
