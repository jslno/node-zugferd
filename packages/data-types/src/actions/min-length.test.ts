import { describe, expect, it } from "vitest";
import { parse, pipe, safeParse } from "../methods";
import { array, text } from "../schemas";
import { minLength } from "./min-length";

describe("minLength", () => {
	const schema = pipe(text(), minLength(2));

	it("describes the inclusive lower bound", () => {
		expect(minLength(2)).toMatchObject({
			kind: "validation",
			type: "min_length",
			requirement: 2,
			expects: ">=2",
		});
	});

	it("accepts values at the limit", () => {
		expect(parse(schema, "ab")).toBe("ab");
		expect(parse(pipe(array(text()), minLength(1)), ["a"])).toEqual(["a"]);
	});

	it("rejects shorter values", () => {
		expect(safeParse(schema, "a").issues?.[0]).toMatchObject({
			kind: "validation",
			type: "min_length",
			expected: ">=2",
			received: "1",
			requirement: 2,
		});
	});

	it("uses a custom message", () => {
		expect(
			safeParse(pipe(text(), minLength(3, "too short")), "ab").issues?.[0]
				?.message,
		).toBe("too short");
	});
});
