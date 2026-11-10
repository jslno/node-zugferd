import type { MimeTypeDefinition } from "./types";

export const defaultMimeTypes = [
	{
		id: "pdf",
		mimeType: ["application/pdf"],
		extensions: ["pdf"],
		magicBytes: [0x25, 0x50, 0x44, 0x46, 0x2d],
	},
	{
		id: "txt",
		mimeType: ["text/plain"],
		extensions: ["txt"],
		magicBytes: [0xef, 0xbb, 0xbf],
	},
	{
		id: "txt",
		mimeType: ["text/plain"],
		extensions: ["txt"],
		magicBytes: [0xff, 0xfe],
	},
	{
		id: "txt",
		mimeType: ["text/plain"],
		extensions: ["txt"],
		magicBytes: [0xfe, 0xff],
	},
	{
		id: "txt",
		mimeType: ["text/plain"],
		extensions: ["txt"],
		magicBytes: [0xff, 0xfe, 0x00, 0x00],
	},
	{
		id: "txt",
		mimeType: ["text/plain"],
		extensions: ["txt"],
		magicBytes: [0x00, 0x00, 0xfe, 0xff],
	},
	{
		id: "txt",
		mimeType: ["text/plain"],
		extensions: ["txt"],
		magicBytes: [0x0e, 0xfe, 0xff],
	},
	{
		id: "gif",
		mimeType: ["image/gif"],
		extensions: ["gif"],
		magicBytes: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
	},
	{
		id: "gif",
		mimeType: ["image/gif"],
		extensions: ["gif"],
		magicBytes: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
	},
	{
		id: "tiff",
		mimeType: ["image/tiff"],
		extensions: ["tiff", "tif"],
		magicBytes: [0x49, 0x49, 0x2a, 0x00],
	},
	{
		id: "tiff",
		mimeType: ["image/tiff"],
		extensions: ["tiff", "tif"],
		magicBytes: [0x4d, 0x4d, 0x00, 0x2a],
	},
	{
		id: "tiff",
		mimeType: ["image/tiff"],
		extensions: ["tiff", "tif"],
		magicBytes: [0x49, 0x49, 0x2b, 0x00],
	},
	{
		id: "tiff",
		mimeType: ["image/tiff"],
		extensions: ["tiff", "tif"],
		magicBytes: [0x4d, 0x4d, 0x00, 0x2b],
	},
	{
		id: "jpg",
		mimeType: ["image/jpeg"],
		extensions: ["jpg", "jpeg"],
		magicBytes: [0xff, 0xd8, 0xff, 0xdb],
	},
	{
		id: "jpg",
		mimeType: ["image/jpeg"],
		extensions: ["jpg", "jpeg"],
		magicBytes: [
			0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
		],
	},
	{
		id: "jpg",
		mimeType: ["image/jpeg"],
		extensions: ["jpg", "jpeg"],
		magicBytes: [0xff, 0xd8, 0xff, 0xee],
	},
	{
		id: "jpg",
		mimeType: ["image/jpeg"],
		extensions: ["jpg", "jpeg"],
		magicBytes: [
			0xff,
			0xd8,
			0xff,
			0xe1,
			"*",
			"*",
			0x45,
			0x78,
			0x69,
			0x66,
			0x00,
			0x00,
		],
	},
	{
		id: "jpg",
		mimeType: ["image/jpeg"],
		extensions: ["jpg"],
		magicBytes: [0xff, 0xd8, 0xff, 0xe0],
	},
	{
		id: "xml",
		mimeType: ["application/xml", "text/xml", "application/*+xml"],
		extensions: ["xml"],
		magicBytes: [0x3c, 0x3f, 0x78, 0x6d, 0x6c, 0x20],
	},
	{
		id: "xml",
		mimeType: ["application/xml", "text/xml", "application/*+xml"],
		extensions: ["xml"],
		magicBytes: [
			0x3c, 0x00, 0x3f, 0x00, 0x78, 0x00, 0x6d, 0x00, 0x6c, 0x00, 0x20,
		],
	},
	{
		id: "xml",
		mimeType: ["application/xml", "text/xml", "application/*+xml"],
		extensions: ["xml"],
		magicBytes: [
			0x00, 0x3c, 0x00, 0x3f, 0x00, 0x78, 0x00, 0x6d, 0x00, 0x6c, 0x00, 0x20,
		],
	},
	{
		id: "xml",
		mimeType: ["application/xml", "text/xml", "application/*+xml"],
		extensions: ["xml"],
		magicBytes: [
			0x3c, 0x00, 0x00, 0x00, 0x3f, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00,
			0x6d, 0x00, 0x00, 0x00, 0x6c, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00,
		],
	},
	{
		id: "xml",
		mimeType: ["application/xml", "text/xml", "application/*+xml"],
		extensions: ["xml"],
		magicBytes: [
			0x00, 0x00, 0x00, 0x3c, 0x00, 0x00, 0x00, 0x3f, 0x00, 0x00, 0x00, 0x78,
			0x00, 0x00, 0x00, 0x6d, 0x00, 0x00, 0x00, 0x6c, 0x00, 0x00, 0x00, 0x20,
		],
	},
	{
		id: "xml",
		mimeType: ["application/xml", "text/xml", "application/*+xml"],
		extensions: ["xml"],
		magicBytes: [0x4c, 0x6f, 0xa7, 0x94, 0x93, 0x40],
	},
	{
		id: "xlsx",
		mimeType: [
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.oasis.opendocument.spreadsheet",
		],
		extensions: ["xlsx", "ods"],
		magicBytes: [0x50, 0x4b, 0x03, 0x04],
	},
	{
		id: "xlsx",
		mimeType: [
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.oasis.opendocument.spreadsheet",
		],
		extensions: ["xlsx", "ods"],
		magicBytes: [0x50, 0x4b, 0x05, 0x06],
	},
	{
		id: "xlsx",
		mimeType: [
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.oasis.opendocument.spreadsheet",
		],
		extensions: ["xlsx", "ods"],
		magicBytes: [0x50, 0x4b, 0x07, 0x08],
	},
	// Heuristic
	{
		id: "json",
		mimeType: ["application/json"],
		extensions: ["json"],
		magicBytes: [0x7b],
	},
	{
		id: "json",
		mimeType: ["application/json"],
		extensions: ["json"],
		magicBytes: [0x5b],
	},
	{
		id: "csv",
		mimeType: ["text/csv"],
		extensions: ["csv"],
		magicBytes: null,
	},
] as const satisfies MimeTypeDefinition[];

function matchesMimeType(input: string, mimeTypes: string[]): boolean {
	for (const mimeType of mimeTypes) {
		if (mimeType.includes("*")) {
			const pattern = mimeType
				.replace(/[.+?^${}()|[\]\\]/g, "\\$&")
				.replace(/\*/g, ".*");

			if (new RegExp(`^${pattern}$`).test(input)) {
				return true;
			}
		} else if (input === mimeType) {
			return true;
		}
	}

	return false;
}

export function verifyMagicBytes(
	data: {
		filename: string;
		content: Uint8Array;
		mimeType: string;
	},
	definitions: readonly MimeTypeDefinition[] = defaultMimeTypes,
) {
	outer: for (const { mimeType, extensions, magicBytes } of definitions) {
		if (!matchesMimeType(data.mimeType, mimeType)) {
			continue;
		}

		const ext = data.filename.split(".").pop()?.toLowerCase();

		if (!ext || !extensions.some((val) => val === ext)) {
			continue;
		}

		if (!magicBytes) {
			return true;
		}

		if (data.content.length < magicBytes.length) {
			continue;
		}

		for (let i = 0; i < magicBytes.length; i++) {
			const expected = magicBytes[i]!;

			if (expected !== "*" && data.content[i] !== expected) {
				continue outer;
			}
		}

		return true;
	}

	return false;
}
