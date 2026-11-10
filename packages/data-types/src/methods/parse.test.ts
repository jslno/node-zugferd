import { ZugferdValidationError } from "@node-zugferd/core/error";
import { describe, expect, it, vi } from "vitest";
import type { DataTypeContext } from "../context";
import { withContext } from "../context";
import { binaryObject, text } from "../schemas";
import { parse, parseAsync } from "./parse";

describe("parse", () => {
	it("returns the output", () => {
		expect(parse(text(), "invoice")).toBe("invoice");
	});

	it("throws the collected issues", () => {
		expect(() => parse(text(), 1)).toThrow(ZugferdValidationError);
		try {
			parse(text(), 1);
		} catch (error) {
			expect(error).toBeInstanceOf(ZugferdValidationError);
			expect((error as ZugferdValidationError).issues[0]).toMatchObject({
				kind: "schema",
				type: "string",
			});
		}
	});
});

describe("parseAsync", () => {
	it("parses synchronous schemas", async () => {
		await expect(parseAsync(text(), "ok")).resolves.toBe("ok");
	});

	it("supplies the async context to the schema", async () => {
		const handleBinaryObject = vi.fn();
		const embedFile = vi.fn();
		const context = {
			context: {
				options: { advanced: { handleBinaryObject } },
			},
			profile: { id: "minimum" },
			pdf: { autoAttachBinaryObjects: true, embedFile },
		} as unknown as DataTypeContext;
		const input = {
			content: Uint8Array.from([9]),
			mimeType: "text/plain",
			filename: "note.txt",
		};

		const output = await withContext(context, () =>
			parseAsync(binaryObject(), input),
		);

		expect(output).toMatchObject({
			mimeType: "text/plain",
			filename: "note.txt",
		});
		expect([...output.content]).toEqual([9]);
		expect(handleBinaryObject).toHaveBeenCalledOnce();
		expect(embedFile).toHaveBeenCalledOnce();
	});
});
