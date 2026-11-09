import { describe, expect, it } from "vitest";
import { parse, pipe, safeParse } from "../methods";
import { array, text } from "../schemas";
import { maxLength } from "./max-length";

describe("maxLength", () => {
	const schema = pipe(text(), maxLength(3));

	it("describes the exclusive upper bound", () => {
		expect(maxLength(3)).toMatchObject({
			kind: "validation",
			type: "max_length",
			requirement: 3,
			expects: "<3",
			async: false,
		});
	});

	it("accepts values up to the limit", () => {
		expect(parse(schema, "abc")).toBe("abc");
		expect(parse(pipe(array(text()), maxLength(2)), ["a", "b"])).toEqual([
			"a",
			"b",
		]);
	});

	it("rejects values beyond the limit", () => {
		const result = safeParse(schema, "abcd");

		expect(result).toMatchObject({
			success: false,
			typed: true,
			issues: [
				{
					kind: "validation",
					type: "max_length",
					expected: "<3",
					received: "4",
					requirement: 3,
					message: "Invalid length: Expected <3 but received 4",
				},
			],
		});
	});

	it("uses a custom message", () => {
		const custom = pipe(
			text(),
			maxLength(2, (issue) => `too long (${issue.received})`),
		);

		expect(safeParse(custom, "abc").issues?.[0]?.message).toBe("too long (3)");
		expect(
			safeParse(pipe(text(), maxLength(2, "shorten")), "abc").issues?.[0],
		).toMatchObject({ message: "shorten" });
	});
});
