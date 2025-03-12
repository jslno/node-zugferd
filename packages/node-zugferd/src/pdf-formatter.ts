import {
	PDFArray,
	PDFDict,
	PDFDocument,
	PDFHexString,
	PDFName,
	PDFNumber,
	PDFString,
} from "pdf-lib";
import { formatXml } from "./xml-formatter";
import crypto from "crypto";
import { COLOR_PROFILE } from "./constants";
import { type PickRequired } from "./types/helper";
import { base64ToUint8Array } from "./helper";

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
		documentType: "INVOICE" | "ORDER";
		documentFileName: string;
		version: string;
		conformanceLevel: string;
	};
};

export const addPdfMetadata = (
	pdfDoc: PDFDocument,
	metadata: PickRequired<PDFAMetadata, "createDate" | "modifyDate"> & {
		now: Date;
	},
) => {
	let xmp = formatXml({
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
						"dc:creator": {
							"rdf:Seq": {
								"rdf:li": metadata.creator,
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
						"@xmlns:about": "",
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

	const metadataStream = pdfDoc.context.stream(xmp, {
		Type: "Metadata",
		Subtype: "XML",
		Length: xmp.length,
	});

	const metadataStreamRef = pdfDoc.context.register(metadataStream);

	pdfDoc.catalog.set(PDFName.of("Metadata"), metadataStreamRef);

	return pdfDoc;
};

export const addPdfTrailerInfoId = (
	pdfDoc: PDFDocument,
	trailerInfoId: string,
) => {
	const hash = crypto
		.createHash("SHA256")
		.update(trailerInfoId + new Date().toISOString())
		.digest();
	const hashArr = Array.from(new Uint8Array(hash));
	const hashHex = hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
	const permanentDocId = PDFHexString.of(hashHex);
	const changingDocId = permanentDocId;

	pdfDoc.context.trailerInfo.ID = pdfDoc.context.obj([
		permanentDocId,
		changingDocId,
	]);

	return pdfDoc;
};

export const fixPdfLinkAnnotations = (pdfDoc: PDFDocument) => {
	const pages = pdfDoc.getPages();
	for (const page of pages) {
		const annotations = page.node.get(PDFName.of("Annots"));

		if (annotations instanceof PDFArray) {
			for (let i = 0; i < annotations.size(); ++i) {
				const annotationRef = annotations.get(i);
				const annotation = page.node.context.lookup(annotationRef) as PDFDict;

				const subtype = annotation.get(PDFName.of("Subtype"));
				if (subtype === PDFName.of("Link")) {
					const flagsObj = annotation.get(PDFName.of("F"));
					const flags = flagsObj instanceof PDFNumber ? flagsObj.asNumber() : 0;

					annotation.set(PDFName.of("F"), PDFNumber.of(flags | 4));
				}
			}
		}
	}

	return pdfDoc;
};

export const addPdfMarkInfo = (pdfDoc: PDFDocument) => {
	const rootRef = pdfDoc.context.obj({ Marked: true });
	pdfDoc.catalog.set(PDFName.of("MarkInfo"), rootRef);

	return pdfDoc;
};

export const addPdfStructTreeRoot = (pdfDoc: PDFDocument) => {
	const structTreeRoot = pdfDoc.context.obj({
		Type: PDFName.of("StructTreeRoot"),
	});
	const structTreeRootRef = pdfDoc.context.register(structTreeRoot);
	pdfDoc.catalog.set(PDFName.of("StructTreeRoot"), structTreeRootRef);

	return pdfDoc;
};

export const addPdfICC = (pdfDoc: PDFDocument) => {
	const profile = base64ToUint8Array(COLOR_PROFILE);
	const profileStream = pdfDoc.context.stream(profile, {
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

	return pdfDoc;
};
