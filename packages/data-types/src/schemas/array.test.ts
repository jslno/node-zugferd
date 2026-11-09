import { describe, expect, it } from "vitest";
import { parse, parseAsync, safeParse, safeParseAsync } from "../methods";
import { array, arrayAsync } from "./array";
import { text } from "./string";

describe("array", () => {
	it("validates every item", () => {
		expect(parse(array(text()), ["a", "b"])).toEqual(["a", "b"]);
		expect(array(text()).expects).toBe("Array");
	});

	it("prefixes item issues with the array index", () => {
		const result = safeParse(array(text()), ["a", 2, 3]);

		expect(result.issues).toHaveLength(2);
		expect(result.issues?.[0]?.path?.[0]).toMatchObject({
			type: "array",
			key: 1,
			value: 2,
		});
	});

	it("stops after the first item when abortEarly is set", () => {
		expect(
			safeParse(array(text()), ["a", 2, 3], { abortEarly: true }).issues,
		).toHaveLength(1);
	});

	it("rejects a non-array", () => {
		expect(safeParse(array(text()), "a").issues?.[0]).toMatchObject({
			expected: "Array",
		});
	});
});

describe("arrayAsync", () => {
	it("parses arrays asynchronously", async () => {
		await expect(parseAsync(arrayAsync(text()), ["a"])).resolves.toEqual(["a"]);
		await expect(
			safeParseAsync(arrayAsync(text()), [1]),
		).resolves.toMatchObject({ success: false });
	});
});
