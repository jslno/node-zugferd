import { AFRelationship, PDFDocument, type AttachmentOptions } from "pdf-lib";
import type {
	InferSchema,
	Promisable,
	ZugferdContext,
	ZugferdOptions,
} from "../types";
import type { PDFAMetadata } from "../formatter/pdf";
import { validateDocument } from "./validate";
import { colors } from "../utils/logger";
import { ZugferdError } from "../error";

export const createDocument =
	<O extends ZugferdOptions>(ctx: Promisable<ZugferdContext>) =>
	async (data: InferSchema<O["profile"]>) => {
		const context = await ctx;

		const toObj = () => {
			return context.options.profile.parse({
				context,
				data,
			});
		};

		const toXML = async () => {
			const xml = context.xml.format(toObj());
			const runValidate = await validateDocument(context);
			const res = await runValidate(xml);
			if (!res.valid) {
				const code = res.code ?? "VALIDATION_ERROR";
				const message =
					res.messages?.join("\n\n") ?? "An unknown error occurred";
				context.logger.error(`${code}: ${message}`);
				throw new ZugferdError(code, message);
			}
			return xml;
		};

		const embedInPdf = async (
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
			const { profile } = context.options;

			const now = new Date();
			metadata ??= {};
			metadata.createDate ??= now;
			metadata.modifyDate ??= metadata.createDate;

			let pdfDoc =
				pdf instanceof PDFDocument ? pdf : await PDFDocument.load(pdf);

			context.logger.debug(
				`[${embedInPdf.name}] Attaching ${colors.bright}${profile.documentFileName}${colors.reset}`,
			);
			await pdfDoc.attach(Buffer.from(xml), profile.documentFileName, {
				mimeType: "application/xml",
				description: "Factur-X",
				creationDate: metadata.createDate,
				modificationDate: metadata.modifyDate,
				afRelationship: AFRelationship.Alternative,
			});
			context.logger.debug(
				`[${embedInPdf.name}] Attached ${colors.bright}${profile.documentFileName}${colors.reset}`,
			);

			context.logger.debug(`[${embedInPdf.name}] Setting PDF metadata`);
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

			context.logger.debug(
				`[${embedInPdf.name}] Applying PDF/A-3b enhancements`,
			);
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
					version: profile.version,
				},
			});

			if (opts.additionalFiles?.length && opts.additionalFiles.length > 0) {
				context.logger.debug(
					`[${embedInPdf.name}] Attaching ${colors.bright}${opts.additionalFiles.length}${colors.reset} additional file(s)`,
				);
				for (const item of opts.additionalFiles) {
					const { filename, content, relationship, ...fileOptions } = item;

					await pdfDoc.attach(content, filename, {
						...fileOptions,
						afRelationship: !!relationship
							? AFRelationship[relationship]
							: AFRelationship.Unspecified,
					});
				}
			} else {
				context.logger.debug(
					`[${embedInPdf.name}] No additional files to attach`,
				);
			}

			context.logger.debug(`[${embedInPdf.name}] Saving PDF`);
			return await pdfDoc.save();
		};

		return {
			toObj,
			toXML,
			embedInPdf,
		};
	};
