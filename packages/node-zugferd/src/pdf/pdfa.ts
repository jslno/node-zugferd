import type { ZugferdProfile } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import type { PDFDict } from "pdf-lib";
import {
	AFRelationship,
	PDFArray,
	PDFDocument,
	PDFHexString,
	PDFName,
	PDFNumber,
	PDFString,
} from "pdf-lib";
import { subtle } from "uncrypto";
import { COLOR_PROFILE } from "./color-profile";
import type { PDFOptions } from "./types";
import { buildXmp } from "./xmp";

export async function toPdfA(
	profile: ZugferdProfile,
	doc: PDFDocument | string | Uint8Array | ArrayBuffer,
	options: PDFOptions = {},
	config?:
		| {
				type?: string | undefined;
		  }
		| undefined,
) {
	const pdf =
		doc instanceof PDFDocument
			? doc
			: await PDFDocument.load(doc, {
					updateMetadata: false,
				});

	const modifiedAt = new Date();
	const createdAt = pdf.getCreationDate() || modifiedAt;

	const addMetadata = () => {
		const { metadata = {} } = options;
		if (metadata.producer) {
			pdf.setProducer(metadata.producer);
		}
		pdf.setCreator(
			metadata.creator ||
				pdf.getCreator() ||
				`node-zugferd@v${NODE_ZUGFERD_VERSION || "1.0.0"} <https://github.com/jslno/node-zugferd>`,
		);
		if (metadata.subject) {
			pdf.setSubject(metadata.subject);
		}
		pdf.setModificationDate(modifiedAt);
		pdf.setCreationDate(createdAt);

		const xmp = buildXmp(pdf, profile, config);
		const stream = pdf.context.stream(xmp, {
			Type: "Metadata",
			Subtype: "XML",
			Length: xmp.length,
		});
		const ref = pdf.context.register(stream);
		pdf.catalog.set(PDFName.of("Metadata"), ref);
	};

	const addAttachments = async () => {
		if (options.attachments?.length && options.attachments.length > 0) {
			await Promise.all(
				options.attachments.map(async (attachment) => {
					return pdf.attach(
						typeof attachment.data === "string"
							? new TextEncoder().encode(attachment.data)
							: attachment.data,
						attachment.filename,
						{
							afRelationship:
								AFRelationship[
									attachment.dataRelationship as keyof typeof AFRelationship
								] || AFRelationship.Unspecified,
							description: attachment.description,
							mimeType: attachment.mimeType,
							creationDate: attachment.createdAt,
							modificationDate: attachment.modifiedAt,
						},
					);
				}),
			);
		}
	};

	const addTrailerInfoId = async () => {
		const hash = await subtle.digest(
			"SHA-256",
			new TextEncoder().encode(pdf.getSubject() || ""),
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
		for (const [_i, page] of pages.entries()) {
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

	await addTrailerInfoId();
	addMetadata();
	addMarkInfo();
	addStructTreeRoot();
	addICCProfile();
	fixLinkAnnotations();
	await addAttachments();

	return pdf;
}
