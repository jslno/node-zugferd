import { PDFDocument, PDFName } from "pdf-lib";

export const blankPdf = async () => {
	const pdf = await PDFDocument.create();
	pdf.addPage();
	return pdf;
};

export const pdfHasMetadata = (pdf: PDFDocument) =>
	pdf.catalog.has(PDFName.of("Metadata"));

export const pdfEmbedsFile = async (pdf: PDFDocument, fileName: string) => {
	const bytes = await pdf.save();
	const needle = new TextEncoder().encode(fileName);

	if (needle.length === 0 || needle.length > bytes.length) {
		return false;
	}

	outer: for (let i = 0; i <= bytes.length - needle.length; i++) {
		for (let j = 0; j < needle.length; j++) {
			if (bytes[i + j] !== needle[j]) continue outer;
		}
		return true;
	}
};
