import { describe, expect, it } from "vitest";
import { nullish, text } from "../schemas";
import { unwrap } from "./unwrap";

describe("unwrap", () => {
	it("returns the wrapped schema and itself otherwise", () => {
		const inner = text();

		expect(unwrap(nullish(inner))).toBe(inner);
		expect(unwrap(inner)).toBe(inner);
		expect(unwrap(["not", "a", "schema"] as never)).toEqual([
			"not",
			"a",
			"schema",
		]);
	});
});
