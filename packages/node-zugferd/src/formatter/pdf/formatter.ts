import {
	decodePDFRawStream,
	PDFArray,
	PDFDict,
	PDFDocument,
	PDFHexString,
	PDFName,
	PDFNumber,
	PDFRawStream,
	PDFStream,
	PDFString,
} from "pdf-lib";
import { formatXml } from "../xml";
import crypto from "crypto";
import { COLOR_PROFILE } from "../../utils/color-profile";
import { type PickRequired } from "../../types/helper";
import { base64ToUint8Array } from "../../utils/helper";
import { colors } from "../../utils/logger";
import type { InternalContext } from "../../init";
import type { HybridDocumentCode } from "../../codelists/hybrid-document.gen";
import type { FilenameCode } from "../../codelists/filename.gen";
import type { HybridVersionCode } from "../../codelists/hybrid-version.gen";
import type { HybridConformanceCode } from "../../codelists/hybrid-conformance.gen";

export type PDFAMetadata = {
	author?: string;
	creator?: string;
	producer?: string;
	createDate?: Date;
	modifyDate?: Date;
	language?: string;
	subject?: string;
	title?: string;
	keywords?: string[];
	facturX: {
		documentType: HybridDocumentCode;
		documentFileName: FilenameCode;
		version: HybridVersionCode;
		conformanceLevel: HybridConformanceCode;
	};
};

export const addPdfMetadata = (
	ctx: InternalContext,
	pdfDoc: PDFDocument,
	metadata: PickRequired<PDFAMetadata, "createDate" | "modifyDate"> & {
		now: Date;
	},
) => {
	ctx.logger.debug(
		`[${addPdfMetadata.name}] Starting with metadata:`,
		metadata,
	);
	let xmp = formatXml(ctx, {
		"x:xmpmeta": {
			"@xmlns:x": "adobe:ns:meta/",
			"rdf:RDF": {
				"@xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
				"rdf:Description": [
					{
						"@xmlns:pdfaid": "http://www.aiim.org/pdfa/ns/id/",
						"@rdf:about": "",
						"pdfaid:part": "3",
						"pdfaid:conformance": "B",
					},
					{
						"@xmlns:dc": "http://purl.org/dc/elements/1.1/",
						"@rdf:about": "",
						"dc:format": "application/pdf",
						"dc:date": {
							"rdf:Seq": {
								"rdf:li": metadata.now.toISOString(),
							},
						},
						...(metadata.title
							? {
									"dc:title": {
										"rdf:Alt": {
											"rdf:li": {
												"@xml:lang": "x-default",
												"#": metadata.title,
											},
										},
									},
								}
							: {}),
						...(metadata.subject
							? {
									"dc:description": {
										"rdf:Alt": {
											"rdf:li": {
												"@xml:lang": "x-default",
												"#": metadata.subject,
											},
										},
									},
								}
							: {}),
						"dc:creator": {
							"rdf:Seq": {
								"rdf:li": metadata.author || metadata.creator,
							},
						},
					},
					{
						"@xmlns:pdf": "http://ns.adobe.com/pdf/1.3/",
						"@rdf:about": "",
						"pdf:Producer":
							metadata.producer ||
							"jslno/node-zugferd git+https://github.com/jslno/node-zugferd",
						"pdf:PDFVersion": "1.7",
					},
					{
						"@xmlns:xmp": "http://ns.adobe.com/xap/1.0/",
						"@rdf:about": "",
						"xmp:CreatorTool": metadata.creator,
						"xmp:CreateDate": metadata.createDate.toISOString(),
						"xmp:ModifyDate": metadata.modifyDate.toISOString(),
						"xmp:MetadataDate": metadata.now.toISOString(),
					},
					{
						"@xmlns:pdfaExtension": "http://www.aiim.org/pdfa/ns/extension/",
						"@xmlns:pdfaSchema": "http://www.aiim.org/pdfa/ns/schema#",
						"@xmlns:pdfaProperty": "http://www.aiim.org/pdfa/ns/property#",
						"@rdf:about": "",
						"pdfaExtension:schemas": {
							"rdf:Bag": {
								"rdf:li": {
									"@rdf:parseType": "Resource",
									"pdfaSchema:schema": "Factur-X PDFA Extension Schema",
									"pdfaSchema:namespaceURI":
										"urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#",
									"pdfaSchema:prefix": "fx",
									"pdfaSchema:property": {
										"rdf:Seq": {
											"rdf:li": [
												{
													"@rdf:parseType": "Resource",
													"pdfaProperty:name": "DocumentFileName",
													"pdfaProperty:valueType": "Text",
													"pdfaProperty:category": "external",
													"pdfaProperty:description":
														"The name of the embedded XML document",
												},
												{
													"@rdf:parseType": "Resource",
													"pdfaProperty:name": "DocumentType",
													"pdfaProperty:valueType": "Text",
													"pdfaProperty:category": "external",
													"pdfaProperty:description":
														"The type of the hybrid document in capital letters, e.g. INVOICE or ORDER",
												},
												{
													"@rdf:parseType": "Resource",
													"pdfaProperty:name": "Version",
													"pdfaProperty:valueType": "Text",
													"pdfaProperty:category": "external",
													"pdfaProperty:description":
														"The actual version of the standard applying to the embedded XML Document",
												},
												{
													"@rdf:parseType": "Resource",
													"pdfaProperty:name": "ConformanceLevel",
													"pdfaProperty:valueType": "Text",
													"pdfaProperty:category": "external",
													"pdfaProperty:description":
														"The conformance level of the embedded XML document",
												},
											],
										},
									},
								},
							},
						},
					},
					{
						"@xmlns:fx": "urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#",
						"@rdf:about": "",
						"fx:DocumentType": metadata.facturX.documentType,
						"fx:DocumentFileName": metadata.facturX.documentFileName,
						"fx:Version": metadata.facturX.version,
						"fx:ConformanceLevel": metadata.facturX.conformanceLevel,
					},
				],
			},
		},
	});
	xmp = `<?xpacket begin="\uFEFF" id="W5M0MpCehiHzreSzNTczkc9d"?>${xmp}<?xpacket end="w"?>`;

	ctx.logger.debug(
		`[${addPdfMetadata.name}] Generated XMP length: ${colors.bright}${xmp.length}${colors.reset}`,
	);

	// Encode XMP as proper UTF-8 bytes before creating the stream.
	// The original code passed the JS string directly with Length: xmp.length,
	// but JS .length counts UTF-16 code units, not bytes. The \uFEFF BOM in
	// the xpacket header is 1 JS char but 3 UTF-8 bytes, causing Length to
	// be 2 bytes too short, which made PDF/A validators unable to read the XMP.
	const xmpBytes = new TextEncoder().encode(xmp);
	const metadataStream = pdfDoc.context.stream(xmpBytes, {
		Type: "Metadata",
		Subtype: "XML",
	});

	const metadataStreamRef = pdfDoc.context.register(metadataStream);

	pdfDoc.catalog.set(PDFName.of("Metadata"), metadataStreamRef);

	ctx.logger.debug(`[${addPdfMetadata.name}] Metadata stream registered`);

	return pdfDoc;
};

export const addPdfTrailerInfoId = (
	ctx: InternalContext,
	pdfDoc: PDFDocument,
	trailerInfoId: string,
) => {
	trailerInfoId = trailerInfoId + new Date().toISOString();
	ctx.logger.debug(
		`[${addPdfTrailerInfoId.name}] Creating trailer info ID for: ${colors.bright}${trailerInfoId}${colors.reset}`,
	);

	const hash = crypto.createHash("SHA256").update(trailerInfoId).digest();
	const hashArr = Array.from(new Uint8Array(hash));
	const hashHex = hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");

	ctx.logger.debug(
		`[${addPdfTrailerInfoId.name}] Generated SHA256 hex: ${colors.bright}${hashHex}${colors.reset}`,
	);

	const permanentDocId = PDFHexString.of(hashHex);
	const changingDocId = permanentDocId;

	pdfDoc.context.trailerInfo.ID = pdfDoc.context.obj([
		permanentDocId,
		changingDocId,
	]);

	ctx.logger.debug(`[${addPdfTrailerInfoId.name}] Trailer info ID set`);

	return pdfDoc;
};

export const fixPdfLinkAnnotations = (
	ctx: InternalContext,
	pdfDoc: PDFDocument,
) => {
	ctx.logger.debug(`[${fixPdfLinkAnnotations.name}] Fixing link annotations`);

	const pages = pdfDoc.getPages();
	ctx.logger.debug(
		`[${fixPdfLinkAnnotations.name}] Page count: ${colors.bright}${pages.length}${colors.reset}`,
	);
	for (const [pageIndex, page] of pages.entries()) {
		const annotations = page.node.get(PDFName.of("Annots"));

		if (annotations instanceof PDFArray) {
			for (let i = 0; i < annotations.size(); ++i) {
				const annotationRef = annotations.get(i);
				const annotation = page.node.context.lookup(annotationRef) as PDFDict;

				const subtype = annotation.get(PDFName.of("Subtype"));
				if (subtype === PDFName.of("Link")) {
					ctx.logger.debug(
						`[${fixPdfLinkAnnotations.name}] Found link annotation on page ${colors.bright}${pageIndex + 1}${colors.reset}`,
					);
					const flagsObj = annotation.get(PDFName.of("F"));
					const flags = flagsObj instanceof PDFNumber ? flagsObj.asNumber() : 0;

					annotation.set(PDFName.of("F"), PDFNumber.of(flags | 4));
				}
			}
		}
	}

	return pdfDoc;
};

export const addPdfMarkInfo = (ctx: InternalContext, pdfDoc: PDFDocument) => {
	ctx.logger.debug(`[${addPdfMarkInfo.name}] Adding MarkInfo`);
	const rootRef = pdfDoc.context.obj({ Marked: true });
	pdfDoc.catalog.set(PDFName.of("MarkInfo"), rootRef);

	return pdfDoc;
};

export const addPdfStructTreeRoot = (
	ctx: InternalContext,
	pdfDoc: PDFDocument,
) => {
	ctx.logger.debug(`[${addPdfStructTreeRoot.name}] Adding StructTreeRoot`);
	const structTreeRoot = pdfDoc.context.obj({
		Type: PDFName.of("StructTreeRoot"),
	});
	const structTreeRootRef = pdfDoc.context.register(structTreeRoot);
	pdfDoc.catalog.set(PDFName.of("StructTreeRoot"), structTreeRootRef);

	return pdfDoc;
};

export const addPdfICC = (ctx: InternalContext, pdfDoc: PDFDocument) => {
	ctx.logger.debug(`[${addPdfICC.name}] Adding ICC profile`);
	const profile = base64ToUint8Array(COLOR_PROFILE);
	const profileStream = pdfDoc.context.stream(profile, {
		N: 3, // Number of color components (RGB = 3), required by PDF/A validators
		Length: profile.length,
	});
	const profileStreamRef = pdfDoc.context.register(profileStream);

	const outputIntent = pdfDoc.context.obj({
		Type: "OutputIntent",
		S: "GTS_PDFA1",
		OutputConditionIdentifier: PDFString.of("sRGB"),
		DestOutputProfile: profileStreamRef,
	});
	const outputIntentRef = pdfDoc.context.register(outputIntent);
	pdfDoc.catalog.set(
		PDFName.of("OutputIntents"),
		pdfDoc.context.obj([outputIntentRef]),
	);

	ctx.logger.debug(`[${addPdfICC.name}] ICC profile registered`);

	return pdfDoc;
};

// https://github.com/cantoo-scribe/pdf-lib/pull/80/files#top
const getRawAttachments = (ctx: InternalContext, pdfDoc: PDFDocument) => {
	ctx.logger.debug(`[${getRawAttachments.name}] Extracting raw attachments`);
	if (!pdfDoc.catalog.has(PDFName.of("Names"))) {
		ctx.logger.debug(`[${getRawAttachments.name}] No Names dictionary found`);
		return [];
	}
	const Names = pdfDoc.catalog.lookup(PDFName.of("Names"), PDFDict);

	if (!Names.has(PDFName.of("EmbeddedFiles"))) {
		ctx.logger.debug(`[${getRawAttachments.name}] No EmbeddedFiles found`);
		return [];
	}
	const EmbeddedFiles = Names.lookup(PDFName.of("EmbeddedFiles"), PDFDict);

	if (!EmbeddedFiles.has(PDFName.of("Names"))) {
		ctx.logger.debug(
			`[${getRawAttachments.name}] No Names array found for EmbeddedFiles`,
		);
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
		ctx.logger.debug(
			`[${getRawAttachments.name}] Found attachment: ${colors.bright}${fileName.decodeText()}${colors.reset}`,
		);
	}

	return rawAttachments;
};

export const getPdfAttachments = (
	ctx: InternalContext,
	pdfDoc: PDFDocument,
) => {
	ctx.logger.debug(`[${getPdfAttachments.name}] Getting PDF attachments`);
	const rawAttachments = getRawAttachments(ctx, pdfDoc);
	return rawAttachments.map(({ fileName, fileSpec }) => {
		const stream = fileSpec
			.lookup(PDFName.of("EF"), PDFDict)
			.lookup(PDFName.of("F"), PDFStream) as PDFRawStream;

		ctx.logger.debug(
			`[${getPdfAttachments.name}] Decoding attachment: ${colors.bright}${fileName.decodeText()}${colors.reset}`,
		);

		return {
			name: fileName.decodeText(),
			data: decodePDFRawStream(stream).decode(),
		};
	});
};
