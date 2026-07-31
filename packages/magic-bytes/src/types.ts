import type { LiteralString } from "@node-zugferd/core";

export type MimeTypeDefinition = {
	id: LiteralString;
	mimeType: string[];
	extensions: string[];
	magicBytes: (number | "*")[] | null;
	heuristic?: ((data: Uint8Array) => boolean) | undefined;
};

export type MagicBytesOptions = {
	customMimeTypes?: MimeTypeDefinition[] | undefined;
	overrideDefaults?: boolean | undefined;
};
