import type { PDFDocument, PDFHexString, PDFString } from "pdf-lib";
import {
	decodePDFRawStream,
	PDFArray,
	PDFDict,
	PDFName,
	PDFRawStream,
	PDFStream,
} from "pdf-lib";
import { convert } from "xmlbuilder2";

// https://github.com/cantoo-scribe/pdf-lib/pull/80/files#top
const getRawAttachments = (pdfDoc: PDFDocument) => {
	if (!pdfDoc.catalog.has(PDFName.of("Names"))) {
		return [];
	}
	const Names = pdfDoc.catalog.lookup(PDFName.of("Names"), PDFDict);

	if (!Names.has(PDFName.of("EmbeddedFiles"))) {
		return [];
	}
	const EmbeddedFiles = Names.lookup(PDFName.of("EmbeddedFiles"), PDFDict);

	if (!EmbeddedFiles.has(PDFName.of("Names"))) {
		return [];
	}
	const EFNames = EmbeddedFiles.lookup(PDFName.of("Names"), PDFArray);

	const rawAttachments: {
		fileName: PDFHexString | PDFString;
		fileSpec: PDFDict;
	}[] = [];
	for (let i = 0; i < EFNames.size(); i += 2) {
		const fileName = EFNames.lookup(i) as PDFHexString | PDFString;
		const fileSpec = EFNames.lookup(i + 1, PDFDict);
		rawAttachments.push({
			fileName,
			fileSpec,
		});
	}

	return rawAttachments;
};

export const getAttachments = (pdfDoc: PDFDocument) => {
	const rawAttachments = getRawAttachments(pdfDoc);
	return rawAttachments.map(({ fileName, fileSpec }) => {
		const stream = fileSpec
			.lookup(PDFName.of("EF"), PDFDict)
			.lookup(PDFName.of("F"), PDFStream) as PDFRawStream;

		return {
			name: fileName.decodeText(),
			data: decodePDFRawStream(stream).decode(),
		};
	});
};

export function getMetadata(pdfDoc: PDFDocument) {
	const metadataRef = pdfDoc.catalog.get(PDFName.of("Metadata"));

	if (!metadataRef) return null;

	const stream = pdfDoc.context.lookup(metadataRef);

	if (!(stream instanceof PDFRawStream)) {
		return null;
	}

	const xml = new TextDecoder().decode(stream.getContents());
	return convert(xml, { format: "object" });
}
