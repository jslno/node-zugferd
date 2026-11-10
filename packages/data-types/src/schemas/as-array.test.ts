import { describe, expect, it } from "vitest";
import { parse, parseAsync, safeParse } from "../methods";
import { asArray, asArrayAsync } from "./as-array";
import { text } from "./string";

describe("asArray", () => {
	it("validates an array through the array runner", () => {
		expect(asArray(text())).toMatchObject({
			type: "as_array",
			expects: "Array",
		});
		expect(parse(asArray(text()), ["a", "b"])).toEqual(["a", "b"]);
		expect(safeParse(asArray(text()), "a").success).toBe(false);
	});
});

describe("asArrayAsync", () => {
	it("parses arrays asynchronously", async () => {
		await expect(parseAsync(asArrayAsync(text()), ["a"])).resolves.toEqual([
			"a",
		]);
	});
});
