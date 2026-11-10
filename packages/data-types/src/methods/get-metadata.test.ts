import { describe, expect, it } from "vitest";
import { metadata } from "../actions";
import { literal, object, text } from "../schemas";
import { getMetadata } from "./get-metadata";
import { pipe } from "./pipe";

describe("getMetadata", () => {
	it("merges metadata from nested pipes", () => {
		const schema = pipe(
			pipe(text(), metadata({ label: "Name" })),
			metadata({ group: "Invoice" }),
		);

		expect(getMetadata(schema)).toEqual({
			label: "Name",
			group: "Invoice",
		});
		expect(getMetadata(literal("x"))).toEqual({});
		expect(getMetadata(object({ name: text() }))).toEqual({});
	});
});
