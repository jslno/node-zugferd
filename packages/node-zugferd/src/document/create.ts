import { AFRelationship, PDFDocument, type AttachmentOptions } from "pdf-lib";
import type { ZugferdContext } from "../init";
import type { InferSchema, ZugferdOptions } from "../types";
import type { PDFAMetadata } from "../formatter/pdf";
import { validateDocumentFactory } from "./validate";

export const createDocumentFactory =
	<O extends ZugferdOptions>(ctx: ZugferdContext, options: O) =>
	async (data: InferSchema<O["profile"]>) => {
		const toObj = () =>
			options.profile.parse({
				context: ctx,
				data,
			});

		const toXML = async () => {
			const xml = ctx.xml.format(toObj());
			await validateDocumentFactory(ctx)(xml);
			return xml;
		};

		return {
			toObj,
			toXML,
			embedInPdf: async (
				pdf: PDFDocument | string | Uint8Array | ArrayBuffer,
				opts: {
					metadata?: Omit<PDFAMetadata, "facturX">;
					additionalFiles?: Array<
						{
							content: string | ArrayBuffer | Uint8Array;
							filename: string;
							relationship?: keyof typeof AFRelationship;
						} & Omit<AttachmentOptions, "afRelationship">
					>;
				} = {},
			) => {
				const xml = await toXML();
				let { metadata } = opts;
				const { profile } = options;

				const now = new Date();
				metadata ??= {};
				metadata.createDate ??= now;
				metadata.modifyDate ??= metadata.createDate;

				let pdfDoc =
					pdf instanceof PDFDocument ? pdf : await PDFDocument.load(pdf);

				await pdfDoc.attach(Buffer.from(xml), profile.documentFileName, {
					mimeType: "application/xml",
					description: "Factur-X",
					creationDate: metadata.createDate,
					modificationDate: metadata.modifyDate,
					afRelationship: AFRelationship.Alternative,
				});

				if (!!metadata.author) {
					pdfDoc.setAuthor(metadata.author);
				}
				pdfDoc.setCreationDate(metadata.createDate);
				pdfDoc.setModificationDate(metadata.modifyDate);
				if (!!metadata.creator) {
					pdfDoc.setCreator(metadata.creator);
				}
				if (!!metadata.keywords) {
					pdfDoc.setKeywords(metadata.keywords);
				}
				if (!!metadata.language) {
					pdfDoc.setLanguage(metadata.language);
				}
				if (!!metadata.producer) {
					pdfDoc.setProducer(metadata.producer);
				}
				if (!!metadata.subject) {
					pdfDoc.setSubject(metadata.subject);
				}
				if (!!metadata.title) {
					pdfDoc.setTitle(metadata.title);
				}

				pdfDoc = ctx.pdf.addTrailerInfoId(pdfDoc, metadata.subject || "");
				pdfDoc = ctx.pdf.addMarkInfo(pdfDoc);
				pdfDoc = ctx.pdf.addStructTreeRoot(pdfDoc);
				pdfDoc = ctx.pdf.fixLinkAnnotations(pdfDoc);
				pdfDoc = ctx.pdf.addICC(pdfDoc);
				ctx.pdf.addMetadata(pdfDoc, {
					...metadata,
					createDate: metadata.createDate!,
					modifyDate: metadata.modifyDate!,
					now,
					facturX: {
						conformanceLevel: profile.conformanceLevel,
						documentFileName: profile.documentFileName,
						documentType: profile.documentType ?? "INVOICE",
						version: String(parseInt(profile.version)),
					},
				});

				for (const item of opts.additionalFiles || []) {
					const { filename, content, relationship, ...fileOptions } = item;

					await pdfDoc.attach(content, filename, {
						...fileOptions,
						afRelationship: !!relationship
							? AFRelationship[relationship]
							: AFRelationship.Unspecified,
					});
				}

				return await pdfDoc.save();
			},
		};
	};
