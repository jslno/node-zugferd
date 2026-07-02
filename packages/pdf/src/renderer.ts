import PdfPrinter from "pdfmake";
import type { TDocumentDefinitions, TFontDictionary } from "pdfmake/interfaces";
import { getDefaultFonts } from "./fonts";
import type { PdfFont } from "./types";

export type RenderPdfOptions = {
	fonts?: Record<string, PdfFont>;
};

/**
 * Renders a pdfmake document definition to a PDF buffer with all fonts
 * embedded, ready to be passed to node-zugferd's `embedInPdf`.
 */
export const renderPdf = async (
	docDefinition: TDocumentDefinitions,
	options: RenderPdfOptions = {},
): Promise<Buffer> => {
	const fonts = options.fonts ?? (await getDefaultFonts());
	const defaultFont = Object.keys(fonts)[0];
	if (!defaultFont) {
		throw new Error("[@node-zugferd/pdf] At least one font is required.");
	}

	const printer = new PdfPrinter(fonts as unknown as TFontDictionary);
	const doc = printer.createPdfKitDocument({
		...docDefinition,
		defaultStyle: {
			font: defaultFont,
			...docDefinition.defaultStyle,
		},
	});

	return await new Promise<Buffer>((resolve, reject) => {
		const chunks: Buffer[] = [];
		doc.on("data", (chunk: Buffer) => chunks.push(chunk));
		doc.on("end", () => resolve(Buffer.concat(chunks)));
		doc.on("error", reject);
		doc.end();
	});
};
