import type { ZugferdContext } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { describe, expect, it, vi } from "vitest";
import { magicBytes } from "./index";
import { defaultMimeTypes, verifyMagicBytes } from "./mime-types";
import type { MimeTypeDefinition } from "./types";

type Definition = (typeof defaultMimeTypes)[number];

const pdfBytes = [0x25, 0x50, 0x44, 0x46, 0x2d] as const;
const xmlBytes = [0x3c, 0x3f, 0x78, 0x6d, 0x6c, 0x20] as const;
const zipBytes = [0x50, 0x4b, 0x03, 0x04] as const;

function signature(magic: readonly (number | "*")[], wildcard = 0xab) {
	return Uint8Array.from(magic.map((byte) => (byte === "*" ? wildcard : byte)));
}

function attachment(
	definition: Definition,
	overrides: Partial<{
		filename: string;
		content: Uint8Array;
		mimeType: string;
	}> = {},
) {
	return {
		filename: `file.${definition.extensions[0]}`,
		mimeType: definition.mimeType[0],
		content:
			definition.magicBytes === null
				? Uint8Array.from([0x61])
				: signature(definition.magicBytes),
		...overrides,
	};
}

function file(input: {
	filename: string;
	mimeType: string;
	content: readonly number[];
}) {
	return {
		filename: input.filename,
		mimeType: input.mimeType,
		content: Uint8Array.from(input.content),
	};
}

const signatures = defaultMimeTypes.map((definition, index) => ({
	id: definition.id,
	index,
	definition,
}));

const mediaTypes = defaultMimeTypes.flatMap((definition, index) =>
	definition.mimeType.map((mimeType) => ({
		id: definition.id,
		index,
		mimeType,
		definition,
	})),
);

const extensions = defaultMimeTypes.flatMap((definition, index) =>
	definition.extensions.map((extension) => ({
		id: definition.id,
		index,
		extension,
		definition,
	})),
);

describe("defaultMimeTypes", () => {
	it("lists the built-in attachment formats", () => {
		expect([
			...new Set(defaultMimeTypes.map((definition) => definition.id)),
		]).toEqual([
			"pdf",
			"txt",
			"gif",
			"tiff",
			"jpg",
			"xml",
			"xlsx",
			"json",
			"csv",
		]);
	});

	it("gives every definition a media type, an extension, and a signature", () => {
		for (const definition of defaultMimeTypes) {
			expect(definition.mimeType.length).toBeGreaterThan(0);
			expect(definition.extensions.length).toBeGreaterThan(0);
			for (const extension of definition.extensions) {
				expect(extension).toBe(extension.toLowerCase());
				expect(extension.includes(".")).toBe(false);
			}
			if (definition.magicBytes === null) {
				continue;
			}
			expect(definition.magicBytes.length).toBeGreaterThan(0);
			for (const byte of definition.magicBytes) {
				if (byte === "*") {
					continue;
				}
				expect(byte).toBeGreaterThanOrEqual(0);
				expect(byte).toBeLessThanOrEqual(255);
				expect(Number.isInteger(byte)).toBe(true);
			}
		}
	});
});

describe("verifyMagicBytes", () => {
	it.each(signatures)("accepts $id signature $index", ({ definition }) => {
		expect(verifyMagicBytes(attachment(definition))).toBe(true);
	});

	it.each(mediaTypes)(
		"accepts $id signature $index as $mimeType",
		({ definition, mimeType }) => {
			expect(verifyMagicBytes(attachment(definition, { mimeType }))).toBe(true);
		},
	);

	it.each(extensions)(
		"accepts $id signature $index with .$extension",
		({ definition, extension }) => {
			expect(
				verifyMagicBytes(
					attachment(definition, {
						filename: `scan.${extension}`,
					}),
				),
			).toBe(true);
			expect(
				verifyMagicBytes(
					attachment(definition, {
						filename: `scan.${extension.toUpperCase()}`,
					}),
				),
			).toBe(true);
		},
	);

	it("accepts bytes that follow the signature", () => {
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.pdf",
					mimeType: "application/pdf",
					content: [...pdfBytes, 0x31, 0x2e, 0x37],
				}),
			),
		).toBe(true);
	});

	it("reads the extension after the last dot", () => {
		expect(
			verifyMagicBytes(
				file({
					filename: "archive.tar.pdf",
					mimeType: "application/pdf",
					content: pdfBytes,
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: ".pdf",
					mimeType: "application/pdf",
					content: pdfBytes,
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: "folder.pdf/invoice",
					mimeType: "application/pdf",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.pdf.bak",
					mimeType: "application/pdf",
					content: pdfBytes,
				}),
			),
		).toBe(false);
	});

	it("rejects a missing extension, a prefix media type, and a short or altered signature", () => {
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice",
					mimeType: "application/pdf",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.",
					mimeType: "application/pdf",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "",
					mimeType: "application/pdf",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.pdf",
					mimeType: "application/pdf+zip",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.pdf",
					mimeType: "application/pdf; charset=binary",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.pdf",
					mimeType: "APPLICATION/PDF",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.pdf",
					mimeType: "application/pdf",
					content: pdfBytes.slice(0, -1),
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.pdf",
					mimeType: "application/pdf",
					content: [],
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "invoice.pdf",
					mimeType: "application/pdf",
					content: [0x25, 0x50, 0x44, 0x46, 0x2e],
				}),
			),
		).toBe(false);
	});

	it("rejects a file whose media type, extension, and bytes come from different definitions", () => {
		expect(
			verifyMagicBytes(
				file({
					filename: "scan.pdf",
					mimeType: "image/png",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "scan.txt",
					mimeType: "application/pdf",
					content: pdfBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "scan.pdf",
					mimeType: "application/pdf",
					content: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
				}),
			),
		).toBe(false);
	});

	it("accepts text only when it starts with a listed byte-order mark", () => {
		const marks = [
			[0xef, 0xbb, 0xbf],
			[0xff, 0xfe],
			[0xfe, 0xff],
			[0xff, 0xfe, 0x00, 0x00],
			[0x00, 0x00, 0xfe, 0xff],
			[0x0e, 0xfe, 0xff],
		];
		for (const content of marks) {
			expect(
				verifyMagicBytes(
					file({ filename: "note.txt", mimeType: "text/plain", content }),
				),
			).toBe(true);
		}
		expect(
			verifyMagicBytes(
				file({
					filename: "note.txt",
					mimeType: "text/plain",
					content: [0x68, 0x69],
				}),
			),
		).toBe(false);
	});

	it("matches the shorter UTF-16 mark before the longer UTF-32 mark", () => {
		expect(
			verifyMagicBytes(
				file({
					filename: "note.txt",
					mimeType: "text/plain",
					content: [0xff, 0xfe, 0x00],
				}),
			),
		).toBe(true);
	});

	it("accepts GIF87a and GIF89a", () => {
		expect(
			verifyMagicBytes(
				file({
					filename: "anim.gif",
					mimeType: "image/gif",
					content: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: "anim.gif",
					mimeType: "image/gif",
					content: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: "anim.gif",
					mimeType: "image/gif",
					content: [0x47, 0x49, 0x46, 0x38, 0x39],
				}),
			),
		).toBe(false);
	});

	it("treats star entries as single-byte wildcards", () => {
		const exif = (fourth: number, fifth: number, marker = 0x45) => [
			0xff,
			0xd8,
			0xff,
			0xe1,
			fourth,
			fifth,
			marker,
			0x78,
			0x69,
			0x66,
			0x00,
			0x00,
		];
		expect(
			verifyMagicBytes(
				file({
					filename: "photo.jpeg",
					mimeType: "image/jpeg",
					content: exif(0x00, 0x00),
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: "photo.jpeg",
					mimeType: "image/jpeg",
					content: exif(0xff, 0x10),
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: "photo.jpeg",
					mimeType: "image/jpeg",
					content: exif(0x00, 0x00, 0x00),
				}),
			),
		).toBe(false);
	});

	it("accepts a four-byte JPEG APP0 marker for .jpg only", () => {
		const content = [0xff, 0xd8, 0xff, 0xe0];
		expect(
			verifyMagicBytes(
				file({ filename: "photo.jpg", mimeType: "image/jpeg", content }),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({ filename: "photo.jpeg", mimeType: "image/jpeg", content }),
			),
		).toBe(false);
	});

	it("matches application/*+xml and keeps the rest of the pattern literal", () => {
		for (const mimeType of [
			"application/xml",
			"text/xml",
			"application/xhtml+xml",
			"application/+xml",
			"application/foo+xml",
		]) {
			expect(
				verifyMagicBytes(
					file({ filename: "doc.xml", mimeType, content: xmlBytes }),
				),
			).toBe(true);
		}
		for (const mimeType of [
			"application/xhtml+xml+extra",
			"application/xhtmlxml",
			"text/application/foo+xml",
			"application/json",
		]) {
			expect(
				verifyMagicBytes(
					file({ filename: "doc.xml", mimeType, content: xmlBytes }),
				),
			).toBe(false);
		}
	});

	it("accepts either spreadsheet media type with an xlsx or ods name", () => {
		for (const mimeType of [
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.oasis.opendocument.spreadsheet",
		]) {
			for (const filename of ["book.xlsx", "book.ods"]) {
				expect(
					verifyMagicBytes(file({ filename, mimeType, content: zipBytes })),
				).toBe(true);
			}
		}
		expect(
			verifyMagicBytes(
				file({
					filename: "book.xlsx",
					mimeType: "application/zip",
					content: zipBytes,
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "book.zip",
					mimeType:
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
					content: zipBytes,
				}),
			),
		).toBe(false);
	});

	it("accepts a JSON object or array and rejects other first bytes", () => {
		expect(
			verifyMagicBytes(
				file({
					filename: "data.json",
					mimeType: "application/json",
					content: [0x7b, 0x7d],
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: "data.json",
					mimeType: "application/json",
					content: [0x5b, 0x5d],
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: "data.json",
					mimeType: "application/json",
					content: [0x20, 0x7b],
				}),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({
					filename: "data.json",
					mimeType: "application/json",
					content: [],
				}),
			),
		).toBe(false);
	});

	it("accepts any CSV payload when the media type and extension match", () => {
		expect(
			verifyMagicBytes(
				file({ filename: "rows.csv", mimeType: "text/csv", content: [] }),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({
					filename: "rows.csv",
					mimeType: "text/csv",
					content: pdfBytes,
				}),
			),
		).toBe(true);
		expect(
			verifyMagicBytes(
				file({ filename: "rows.txt", mimeType: "text/csv", content: [] }),
			),
		).toBe(false);
		expect(
			verifyMagicBytes(
				file({ filename: "rows.csv", mimeType: "text/plain", content: [] }),
			),
		).toBe(false);
	});

	it("uses only the definitions it is given", () => {
		const png: MimeTypeDefinition = {
			id: "png",
			mimeType: ["image/png"],
			extensions: ["png"],
			magicBytes: [0x89, 0x50, 0x4e, 0x47],
		};
		const pngFile = file({
			filename: "pixel.png",
			mimeType: "image/png",
			content: [0x89, 0x50, 0x4e, 0x47],
		});
		const pdfFile = file({
			filename: "invoice.pdf",
			mimeType: "application/pdf",
			content: pdfBytes,
		});

		expect(verifyMagicBytes(pngFile, [png])).toBe(true);
		expect(verifyMagicBytes(pngFile)).toBe(false);
		expect(verifyMagicBytes(pdfFile, [png])).toBe(false);
		expect(verifyMagicBytes(pdfFile, [])).toBe(false);
		expect(verifyMagicBytes(pdfFile)).toBe(true);
	});

	it("escapes regular-expression characters in a media type pattern", () => {
		const definition: MimeTypeDefinition = {
			id: "vendor",
			mimeType: ["application/vnd.*"],
			extensions: ["bin"],
			magicBytes: [0x01],
		};
		const match = (mimeType: string) =>
			verifyMagicBytes(
				file({ filename: "payload.bin", mimeType, content: [0x01] }),
				[definition],
			);

		expect(match("application/vnd.custom")).toBe(true);
		expect(match("application/vnd.")).toBe(true);
		expect(match("application/vnd-extra")).toBe(false);
		expect(match("extra/application/vnd.custom")).toBe(false);
	});

	it("returns on the first definition that matches", () => {
		const open: MimeTypeDefinition = {
			id: "open",
			mimeType: ["text/plain"],
			extensions: ["txt"],
			magicBytes: null,
		};
		const strict: MimeTypeDefinition = {
			id: "strict",
			mimeType: ["text/plain"],
			extensions: ["txt"],
			magicBytes: [0x00],
		};
		const data = file({
			filename: "note.txt",
			mimeType: "text/plain",
			content: [0x01],
		});

		expect(verifyMagicBytes(data, [open, strict])).toBe(true);
		expect(verifyMagicBytes(data, [strict, open])).toBe(true);
		expect(verifyMagicBytes(data, [strict])).toBe(false);
	});

	it("skips a definition when the extension or the file length does not match", () => {
		const pdf: MimeTypeDefinition = {
			id: "pdf",
			mimeType: ["application/pdf"],
			extensions: ["pdf"],
			magicBytes: [...pdfBytes],
		};
		const bin: MimeTypeDefinition = {
			id: "bin",
			mimeType: ["application/pdf"],
			extensions: ["bin"],
			magicBytes: [...pdfBytes],
		};
		const named = file({
			filename: "payload.bin",
			mimeType: "application/pdf",
			content: pdfBytes,
		});
		expect(verifyMagicBytes(named, [pdf, bin])).toBe(true);
		expect(verifyMagicBytes(named, [pdf])).toBe(false);

		const long: MimeTypeDefinition = {
			id: "long",
			mimeType: ["application/octet-stream"],
			extensions: ["bin"],
			magicBytes: [0x01, 0x02, 0x03, 0x04],
		};
		const short: MimeTypeDefinition = {
			id: "short",
			mimeType: ["application/octet-stream"],
			extensions: ["bin"],
			magicBytes: [0x01, 0x02],
		};
		const truncated = file({
			filename: "payload.bin",
			mimeType: "application/octet-stream",
			content: [0x01, 0x02],
		});
		expect(verifyMagicBytes(truncated, [long, short])).toBe(true);
		expect(verifyMagicBytes(truncated, [long])).toBe(false);
	});

	it("treats an empty signature as a match for any content", () => {
		const definition: MimeTypeDefinition = {
			id: "empty",
			mimeType: ["application/octet-stream"],
			extensions: ["bin"],
			magicBytes: [],
		};
		expect(
			verifyMagicBytes(
				file({
					filename: "payload.bin",
					mimeType: "application/octet-stream",
					content: [],
				}),
				[definition],
			),
		).toBe(true);
	});
});

describe("magicBytes", () => {
	const pdfFile = file({
		filename: "invoice.pdf",
		mimeType: "application/pdf",
		content: pdfBytes,
	});
	const png: MimeTypeDefinition = {
		id: "png",
		mimeType: ["image/png"],
		extensions: ["png"],
		magicBytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
	};
	const pngFile = file({
		filename: "pixel.png",
		mimeType: "image/png",
		content: png.magicBytes as number[],
	});

	async function handle(
		plugin: ReturnType<typeof magicBytes>,
		data: ReturnType<typeof file>,
		next?: (ctx: {
			data: ReturnType<typeof file>;
			context: ZugferdContext;
		}) => void,
	) {
		const context = {
			options: {
				advanced: next ? { handleBinaryObject: next } : {},
			},
		} as unknown as ZugferdContext;
		const handler =
			plugin.init?.(context)?.options?.advanced?.handleBinaryObject;
		if (!handler) {
			throw new Error("magic-bytes did not register a binary handler");
		}
		await handler({
			data,
			context,
			profile: { id: "minimum" },
		} as never);
	}

	it("registers the plugin id, version, and default options", () => {
		const plugin = magicBytes();

		expect(plugin.id).toBe("magic-bytes");
		expect(plugin.version).toBe(NODE_ZUGFERD_VERSION);
		expect(plugin.options).toEqual({ overrideDefaults: false });
	});

	it("keeps the options it was given", () => {
		expect(magicBytes({ overrideDefaults: true }).options).toEqual({
			overrideDefaults: true,
		});
		expect(
			magicBytes({ customMimeTypes: [png], overrideDefaults: false }).options,
		).toEqual({
			customMimeTypes: [png],
			overrideDefaults: false,
		});
	});

	it("checks a built-in file and then calls the previous handler", async () => {
		const next = vi.fn();

		await handle(magicBytes(), pdfFile, next);

		expect(next).toHaveBeenCalledOnce();
		expect(next.mock.calls[0]?.[0].data).toEqual(pdfFile);
	});

	it("accepts a built-in file when no previous handler is registered", async () => {
		await expect(handle(magicBytes(), pdfFile)).resolves.toBeUndefined();
	});

	it("rejects an unsupported file before calling the previous handler", async () => {
		const next = vi.fn();

		await expect(handle(magicBytes(), pngFile, next)).rejects.toEqual(
			expect.objectContaining({
				name: "ZugferdError",
				message: "Unsupported file type",
			}),
		);
		expect(next).not.toHaveBeenCalled();
		await expect(handle(magicBytes(), pngFile)).rejects.toBeInstanceOf(
			ZugferdError,
		);
	});

	it("appends custom definitions after the built-in list", async () => {
		const plugin = magicBytes({ customMimeTypes: [png] });

		await expect(handle(plugin, pdfFile)).resolves.toBeUndefined();
		await expect(handle(plugin, pngFile)).resolves.toBeUndefined();
	});

	it("uses a non-empty custom list on its own when defaults are overridden", async () => {
		const plugin = magicBytes({
			overrideDefaults: true,
			customMimeTypes: [png],
		});

		await expect(handle(plugin, pngFile)).resolves.toBeUndefined();
		await expect(handle(plugin, pdfFile)).rejects.toBeInstanceOf(ZugferdError);
	});

	it("keeps the built-in list when override is set without a custom definition", async () => {
		await expect(
			handle(magicBytes({ overrideDefaults: true }), pdfFile),
		).resolves.toBeUndefined();
		await expect(
			handle(
				magicBytes({ overrideDefaults: true, customMimeTypes: [] }),
				pdfFile,
			),
		).resolves.toBeUndefined();
	});

	it("still matches a built-in definition that appears before a custom one", async () => {
		const stricter: MimeTypeDefinition = {
			id: "pdf",
			mimeType: ["application/pdf"],
			extensions: ["pdf"],
			magicBytes: [...pdfBytes, 0x31],
		};
		const loose = file({
			filename: "invoice.pdf",
			mimeType: "application/pdf",
			content: [...pdfBytes, 0x00],
		});

		await expect(
			handle(magicBytes({ customMimeTypes: [stricter] }), loose),
		).resolves.toBeUndefined();
		await expect(
			handle(
				magicBytes({ overrideDefaults: true, customMimeTypes: [stricter] }),
				loose,
			),
		).rejects.toBeInstanceOf(ZugferdError);
	});
});
