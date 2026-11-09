import { describe, expect, it } from "vitest";
import { parse, pipe } from "../methods";
import { getMetadata } from "../methods/get-metadata";
import { text } from "../schemas";
import { maxLength } from "./max-length";
import { metadata } from "./metadata";

describe("metadata", () => {
	it("stores metadata without participating in parsing", () => {
		const schema = pipe(
			text(),
			metadata({ xpath: "/Invoice/ID", label: "Number" }),
			maxLength(3),
		);

		expect(schema.pipe[1]).toMatchObject({
			kind: "metadata",
			type: "metadata",
			reference: metadata,
		});
		expect(parse(schema, "471")).toBe("471");
		expect(getMetadata(schema)).toEqual({
			xpath: "/Invoice/ID",
			label: "Number",
		});
	});
});
