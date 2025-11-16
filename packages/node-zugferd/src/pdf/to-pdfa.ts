import {
	AFRelationship,
	PDFArray,
	PDFDict,
	PDFDocument,
	PDFHexString,
	PDFName,
	PDFNumber,
	PDFString,
} from "@cantoo/pdf-lib";
import type {
	PDFaDocument,
	Profile,
	ToPDFaOptions,
	ZugferdContext,
} from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { formatXML } from "@node-zugferd/core/utils";
import { subtle } from "uncrypto";
import * as pkg from "../../package.json" with { type: "json" };
import { COLOR_PROFILE } from "./color-profile";

export async function toPDFa<P extends Profile>(
	doc: PDFDocument | string | Uint8Array | ArrayBuffer,
	profile: P,
	input: P["$Input"],
	options: ToPDFaOptions<P>,
	ctx?: ZugferdContext<P> | undefined,
): Promise<PDFaDocument> {
	if (profile.config?.supportsPDFA === false) {
		throw new ZugferdError(
			`The profile "${profile.id}" does not support PDF/A generation.`,
		);
	}
	const xml = await profile.toXML(input, ctx);
	let pdf = await (doc instanceof PDFDocument
		? doc.copy()
		: PDFDocument.load(doc, {
				updateMetadata: false,
			}));

	if (ctx?.options.hooks?.pdfa?.before) {
		const res = await ctx.options.hooks.pdfa.before(xml, {
			document: pdf,
			profile,
			context: ctx,
		});
		if (typeof res === "object") {
			if (res.options) {
				options = res.options;
			}
			if (res.document) {
				pdf = res.document;
			}
		}
	}

	const modificationDate = new Date();
	const creationDate = pdf.getCreationDate() || modificationDate;

	const metadata =
		typeof options.metadata === "function"
			? await options.metadata(input)
			: options.metadata;

	const addMetadata = () => {
		const producer =
			metadata.producer || `${pkg.name} v${pkg.version} - ${pkg.homepage}`;
		pdf.setProducer(producer);

		pdf.setSubject(metadata.subject);
		pdf.setCreationDate(creationDate);
		pdf.setModificationDate(modificationDate);
		if (metadata.creator) {
			pdf.setCreator(metadata.creator);
		}

		const fieldMap = profile.extensionSchema.customFieldMap ?? {
			documentType: "DocumentType",
			documentFileName: "DocumentFileName",
			version: "Version",
			conformanceLevel: "ConformanceLevel",
		};
		const ns = fieldMap.prefix ?? "fx";
		const namespaceURI =
			profile.extensionSchema.uri ||
			"urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#";

		const lines = [
			'<?xpacket begin="\uFEFF" id="W5M0MpCehiHzreSzNTczkc9d"?>',
			formatXML(
				{
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
											"rdf:li": modificationDate.toISOString(),
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
									"pdf:Producer": producer,
									"pdf:PDFVersion": "1.7",
								},
								{
									"@xmlns:xmp": "http://ns.adobe.com/xap/1.0/",
									"@rdf:about": "",
									"xmp:CreatorTool": metadata.creator,
									"xmp:CreateDate": creationDate.toISOString(),
									"xmp:ModifyDate": modificationDate.toISOString(),
									"xmp:MetadataDate": modificationDate.toISOString(),
								},
								{
									"@xmlns:pdfaExtension":
										"http://www.aiim.org/pdfa/ns/extension/",
									"@xmlns:pdfaSchema": "http://www.aiim.org/pdfa/ns/schema#",
									"@xmlns:pdfaProperty":
										"http://www.aiim.org/pdfa/ns/property#",
									"@rdf:about": "",
									"pdfaExtension:schemas": {
										"rdf:Bag": {
											"rdf:li": {
												"@rdf:parseType": "Resource",
												"pdfaSchema:schema": "Factur-X PDFA Extension Schema",
												"pdfaSchema:namespaceURI": namespaceURI,
												"pdfaSchema:prefix": ns,
												"pdfaSchema:property": {
													"rdf:Seq": {
														"rdf:li": [
															{
																"@rdf:parseType": "Resource",
																"pdfaProperty:name": fieldMap.documentFileName,
																"pdfaProperty:valueType": "Text",
																"pdfaProperty:category": "external",
																"pdfaProperty:description":
																	"The name of the embedded XML document",
															},
															{
																"@rdf:parseType": "Resource",
																"pdfaProperty:name": fieldMap.documentType,
																"pdfaProperty:valueType": "Text",
																"pdfaProperty:category": "external",
																"pdfaProperty:description":
																	"The type of the hybrid document in capital letters, e.g. INVOICE or ORDER",
															},
															{
																"@rdf:parseType": "Resource",
																"pdfaProperty:name": fieldMap.version,
																"pdfaProperty:valueType": "Text",
																"pdfaProperty:category": "external",
																"pdfaProperty:description":
																	"The actual version of the standard applying to the embedded XML Document",
															},
															{
																"@rdf:parseType": "Resource",
																"pdfaProperty:name": fieldMap.conformanceLevel,
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
									[`@xmlns:${ns}`]: namespaceURI,
									"@xmlns:about": "",
									[`${ns}:${fieldMap.documentType}`]:
										profile.extensionSchema.documentType || "INVOICE",
									[`${ns}:${fieldMap.documentFileName}`]:
										profile.extensionSchema.documentFileName || "factur-x.xml",
									[`${ns}:${fieldMap.version}`]:
										profile.extensionSchema.version || "1.0",
									[`${ns}:${fieldMap.conformanceLevel}`]:
										profile.extensionSchema.conformanceLevel,
								},
							],
						},
					},
				},
				{
					format: ctx?.options.pdfa?.xmp?.format === "pretty",
				},
			),
			'<?xpacket end="w"?>',
		];
		const xmp = lines.join("");

		const stream = pdf.context.stream(xmp, {
			Type: "Metadata",
			Subtype: "XML",
			Length: xmp.length,
		});
		const ref = pdf.context.register(stream);

		pdf.catalog.set(PDFName.of("Metadata"), ref);
	};

	const addTrailerInfoId = async () => {
		const hash = await subtle.digest(
			"SHA-256",
			new TextEncoder().encode(metadata.subject),
		);
		const hex = [...new Uint8Array(hash)]
			.map((byte) => byte.toString(16).padStart(2, "0"))
			.join("");
		const docId = PDFHexString.of(hex);
		const changingId = docId;

		pdf.context.trailerInfo.ID = pdf.context.obj([docId, changingId]);
	};

	const fixLinkAnnotations = () => {
		const pages = pdf.getPages();
		for (const [i, page] of pages.entries()) {
			const annotations = page.node.get(PDFName.of("Annots"));

			if (annotations instanceof PDFArray) {
				for (let i = 0; i < annotations.size(); ++i) {
					const annotRef = annotations.get(i);
					const annot = page.node.context.lookup(annotRef) as PDFDict;

					const subtype = annot.get(PDFName.of("Subtype"));
					if (subtype === PDFName.of("Link")) {
						const flagsObj = annot.get(PDFName.of("F"));
						const flags =
							flagsObj instanceof PDFNumber ? flagsObj.asNumber() : 0;

						annot.set(PDFName.of("F"), PDFNumber.of(flags | 4));
					}
				}
			}
		}
	};

	const addMarkInfo = () => {
		const rootRef = pdf.context.obj({ Marked: true });
		pdf.catalog.set(PDFName.of("MarkInfo"), rootRef);
	};

	const addStructTreeRoot = () => {
		const structTreeRoot = pdf.context.obj({
			Type: PDFName.of("StructTreeRoot"),
		});
		const ref = pdf.context.register(structTreeRoot);
		pdf.catalog.set(PDFName.of("StructTreeRoot"), ref);
	};

	const addICCProfile = () => {
		const stream = pdf.context.stream(COLOR_PROFILE, {
			Length: COLOR_PROFILE.length,
		});
		const streamRef = pdf.context.register(stream);

		const outputIntent = pdf.context.obj({
			Type: "OutputIntent",
			S: "GTS_PDFA1",
			OutputConditionIdentifier: PDFString.of("sRGB"),
			DestOutputProfile: streamRef,
		});
		const outputIntentRef = pdf.context.register(outputIntent);

		pdf.catalog.set(
			PDFName.of("OutputIntents"),
			pdf.context.obj([outputIntentRef]),
		);
	};

	await pdf.attach(
		Buffer.from(xml),
		profile.extensionSchema.documentFileName || "factur-x.xml",
		{
			mimeType: "application/xml",
			creationDate: modificationDate,
			modificationDate,
			afRelationship:
				AFRelationship[profile.config?.dataRelationship || "Alternative"],
		},
	);

	if (options?.additionalFiles?.length && options.additionalFiles.length > 0) {
		await Promise.all(
			options.additionalFiles.map(async (file) => {
				if (
					profile.config?.allowedAttachmentFormats !== "*" &&
					!profile.config?.allowedAttachmentFormats?.includes(file.type)
				) {
					throw new ZugferdError(
						`Attachment with mime type "${file.type}" is not allowed in profile "${profile.id}".`,
					);
				}

				return await pdf.attach(await file.arrayBuffer(), file.name, {
					mimeType: file.type,
					afRelationship: AFRelationship.Source,
					modificationDate: new Date(file.lastModified),
				});
			}),
		);
	}

	await addTrailerInfoId();
	addMetadata();
	addMarkInfo();
	addStructTreeRoot();
	addICCProfile();
	fixLinkAnnotations();

	if (ctx?.options.hooks?.pdfa?.after) {
		const res = await ctx.options.hooks.pdfa.after(pdf, {
			profile,
			context: ctx,
		});

		if (typeof res === "object" && res instanceof PDFDocument) {
			pdf = res;
		}
	}

	return pdf;
}

export type {
	PDFaDocument,
	ToPDFaOptions,
} from "@node-zugferd/core";
