import { describe, expect, it } from "vitest";
import { parse, parseAsync, safeParse, safeParseAsync } from "../methods";
import { literal } from "./literal";
import { text } from "./string";
import { union, unionAsync } from "./union";

describe("union", () => {
	const schema = union([literal("a"), literal("b")]);

	it("returns the first successful option", () => {
		expect(parse(schema, "b")).toBe("b");
		expect(schema.expects).toBe('("a" | "b")');
	});

	it("reports a type issue when every option fails", () => {
		const result = safeParse(schema, "c");

		expect(result.success).toBe(false);
		expect(result.issues?.[0]).toMatchObject({
			type: "union",
			expected: '("a" | "b")',
		});
		expect(result.issues?.[0]?.issues).toHaveLength(2);
	});

	it("returns the single failing dataset when only one option was tried", () => {
		expect(safeParse(union([text()]), 1).issues?.[0]?.type).toBe("string");
	});
});

describe("unionAsync", () => {
	it("parses async unions", async () => {
		await expect(
			parseAsync(unionAsync([literal("a"), literal("b")]), "a"),
		).resolves.toBe("a");
		await expect(
			safeParseAsync(unionAsync([text()]), 1),
		).resolves.toMatchObject({ success: false });
	});
});
