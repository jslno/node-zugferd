import { describe, expect, it } from "vitest";
import { maxLength } from "../actions";
import { object, text } from "../schemas";
import { pipe } from "./pipe";
import { safeParse, safeParseAsync } from "./safe-parse";

describe("safeParse", () => {
	it("marks a successful dataset", () => {
		expect(safeParse(text(), "invoice")).toEqual({
			typed: true,
			success: true,
			output: "invoice",
			issues: undefined,
		});
	});

	it("reports a typed validation failure without throwing", () => {
		const result = safeParse(pipe(text(), maxLength(2)), "abcd");

		expect(result.success).toBe(false);
		expect(result.typed).toBe(true);
		expect(result.output).toBe("abcd");
		expect(result.issues).toHaveLength(1);
	});

	it("reports an untyped failure", () => {
		const result = safeParse(text(), 1);

		expect(result).toMatchObject({
			success: false,
			typed: false,
			output: 1,
		});
	});

	it("forwards the parse config", () => {
		const schema = object({ a: text(), b: text() });
		const result = safeParse(schema, {}, { abortEarly: true });

		expect(result.issues).toHaveLength(1);
	});
});

describe("safeParseAsync", () => {
	it("parses synchronous schemas", async () => {
		await expect(safeParseAsync(text(), 1)).resolves.toMatchObject({
			success: false,
			typed: false,
		});
	});
});
