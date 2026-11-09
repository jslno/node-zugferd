import { describe, expect, it } from "vitest";
import { parse, parseAsync, safeParse, safeParseAsync } from "../methods";
import { nullish } from "./nullish";
import { object, objectAsync } from "./object";
import { text } from "./string";

describe("object", () => {
	const schema = object({
		name: text(),
		note: nullish(text(), "none"),
	});

	it("parses known keys and fills nullish defaults", () => {
		expect(parse(schema, { name: "Ada" })).toEqual({
			name: "Ada",
			note: "none",
		});
	});

	it("drops unknown keys and reports missing required keys", () => {
		expect(parse(object({ name: text() }), { name: "Ada", extra: 1 })).toEqual({
			name: "Ada",
		});
		expect(safeParse(schema, {}).issues?.[0]).toMatchObject({
			type: "object",
			expected: '"name"',
			message: expect.stringContaining("Invalid key"),
		});
	});

	it("nests child issues under the object key", () => {
		expect(safeParse(schema, { name: 1 }).issues?.[0]?.path?.[0]).toMatchObject(
			{
				type: "object",
				origin: "value",
				key: "name",
				value: 1,
			},
		);
	});

	it("rejects non-objects and honors abortEarly", () => {
		expect(safeParse(schema, null).issues?.[0]?.expected).toBe("Object");
		expect(
			safeParse(object({ a: text(), b: text() }), {}, { abortEarly: true })
				.issues,
		).toHaveLength(1);
	});
});

describe("objectAsync", () => {
	it("parses async entries", async () => {
		await expect(
			parseAsync(objectAsync({ name: text() }), { name: "Ada" }),
		).resolves.toEqual({ name: "Ada" });
		await expect(
			safeParseAsync(objectAsync({ name: text() }), null),
		).resolves.toMatchObject({ success: false });
	});
});
