import { type InferSchema } from "./types/schema";
import { init } from "./init";
import { type ZugferdOptions } from "./types/options";
import { AFRelationship, type AttachmentOptions, PDFDocument } from "pdf-lib";
import { type PDFAMetadata } from "./pdf-formatter";

export const zugferd = <O extends ZugferdOptions>(options: O) => {
	const context = init(options);
	const { validate } = options.profile;

	return {
		context,
		create: async (data: InferSchema<O["profile"]>) => {
			//await validate(xml)

			const toObj = () =>
				options.profile.parse({
					context,
					data,
				});

			const toXML = () => context.xml.format(toObj());

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
					const xml = toXML();
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

					pdfDoc = context.pdf.addTrailerInfoId(pdfDoc, metadata.subject || "");
					pdfDoc = context.pdf.addMarkInfo(pdfDoc);
					pdfDoc = context.pdf.addStructTreeRoot(pdfDoc);
					pdfDoc = context.pdf.fixLinkAnnotations(pdfDoc);
					pdfDoc = context.pdf.addICC(pdfDoc);
					context.pdf.addMetadata(pdfDoc, {
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
		},
		validate,
	};
};
