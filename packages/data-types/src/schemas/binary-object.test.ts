import { describe, expect, it, vi } from "vitest";
import type { DataTypeContext } from "../context";
import { parseAsync, safeParseAsync } from "../methods";
import { binaryObject } from "./binary-object";

describe("binaryObject", () => {
	it("normalizes bytes, an array buffer, and a blob", async () => {
		const bytes = Uint8Array.from([1, 2, 3]);
		const fromBytes = await parseAsync(binaryObject(), {
			content: bytes,
			mimeType: "text/plain",
			filename: "a.txt",
		});
		const fromBuffer = await parseAsync(binaryObject(), {
			content: bytes.buffer,
			mimeType: "application/octet-stream",
			filename: "b.bin",
		});
		const fromBlob = await parseAsync(binaryObject(), {
			content: new Blob([bytes], { type: "text/plain" }),
			mimeType: "text/plain",
			filename: "c.txt",
		});

		expect([...fromBytes.content]).toEqual([1, 2, 3]);
		expect(fromBytes.content).toBe(bytes);
		expect([...fromBuffer.content]).toEqual([1, 2, 3]);
		expect([...fromBlob.content]).toEqual([1, 2, 3]);
	});

	it("reads a File", async () => {
		const output = await parseAsync(
			binaryObject(),
			new File([Uint8Array.from([7])], "note.txt", { type: "text/plain" }),
		);

		expect(output).toMatchObject({
			filename: "note.txt",
			mimeType: "text/plain",
		});
		expect([...output.content]).toEqual([7]);
	});

	it("embeds the object when the active context asks for it", async () => {
		const embedFile = vi.fn();
		const context = {
			context: { options: {} },
			profile: { id: "minimum" },
			pdf: { autoAttachBinaryObjects: true, embedFile },
		} as unknown as DataTypeContext;

		await parseAsync(
			binaryObject(),
			{
				content: Uint8Array.from([1]),
				mimeType: "text/plain",
				filename: "a.txt",
			},
			{ context },
		);

		expect(embedFile).toHaveBeenCalledOnce();
	});

	it("rejects incomplete input", async () => {
		await expect(safeParseAsync(binaryObject(), "file")).resolves.toMatchObject(
			{ success: false, typed: false },
		);
	});
});
