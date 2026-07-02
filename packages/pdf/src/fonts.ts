import type { PdfFont } from "./types";

/**
 * PDF/A-3 forbids non-embedded fonts, so pdfmake's "standard 14 fonts"
 * path (Helvetica etc.) must never be used. Instead the Roboto family that
 * pdfmake already ships for the browser (as base64 in its virtual file
 * system) is reused server-side and embedded into the document.
 */
export const getDefaultFonts = async (): Promise<Record<string, PdfFont>> => {
	const vfsModule: any = await import("pdfmake/build/vfs_fonts.js");

	// the export shape changed across pdfmake 0.2.x releases
	const vfs: Record<string, string> =
		vfsModule.pdfMake?.vfs ??
		vfsModule.vfs ??
		vfsModule.default?.pdfMake?.vfs ??
		vfsModule.default ??
		vfsModule;

	const read = (file: string) => {
		const data = vfs[file];
		if (typeof data !== "string") {
			throw new Error(
				`[@node-zugferd/pdf] Could not load bundled font "${file}" from pdfmake. Provide your own fonts via the plugin's "fonts" option.`,
			);
		}
		return Buffer.from(data, "base64");
	};

	return {
		Roboto: {
			normal: read("Roboto-Regular.ttf"),
			bold: read("Roboto-Medium.ttf"),
			italics: read("Roboto-Italic.ttf"),
			bolditalics: read("Roboto-MediumItalic.ttf"),
		},
	};
};
