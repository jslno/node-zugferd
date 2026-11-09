import { describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { documentReference, text } from "./string";

describe("text", () => {
	it("accepts strings and rejects other types", () => {
		expect(parse(text(), "hello")).toBe("hello");
		expect(text()).toMatchObject({
			type: "string",
			subType: "text",
			expects: "string",
		});
		expect(safeParse(text(), 1).issues?.[0]).toMatchObject({
			type: "string",
			expected: "string",
			received: "1",
		});
	});
});

describe("documentReference", () => {
	it("keeps document references distinct from plain text", () => {
		expect(documentReference()).toMatchObject({
			type: "string",
			subType: "document-reference",
		});
		expect(parse(documentReference(), "INV-1")).toBe("INV-1");
	});
});
