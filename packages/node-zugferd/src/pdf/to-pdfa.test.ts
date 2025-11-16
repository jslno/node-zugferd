import { PDFDocument, PDFName } from "@cantoo/pdf-lib";
import type { Profile } from "@node-zugferd/core";
import { describe, expect, it } from "vitest";
import { toPDFa } from "./to-pdfa";

describe("toPDFa", () => {
	it("should add metadata to the PDF document", async () => {
		const pdf = await PDFDocument.create();

		const profile: any = {
			id: "test-profile",
			config: { supportsPDFA: true },
			extensionSchema: {
				conformanceLevel: "MINIMUM",
				documentFileName: "factur-x.xml",
			},
			toXML: async () => "<root/>",
		} satisfies Partial<Profile>;

		expect(pdf.catalog.get(PDFName.of("Metadata"))).toBeUndefined();

		const out = await toPDFa(pdf, profile, {} as any, {
			metadata: { subject: "some-subject" },
		});
		expect(out.catalog.get(PDFName.of("Metadata"))).toBeDefined();
	});

	it("should add output intents to the PDF document", async () => {
		const pdf = await PDFDocument.create();

		const profile: any = {
			id: "test-profile",
			config: { supportsPDFA: true },
			extensionSchema: {
				conformanceLevel: "MINIMUM",
				documentFileName: "factur-x.xml",
			},
			toXML: async () => "<root/>",
		} satisfies Partial<Profile>;

		expect(pdf.catalog.get(PDFName.of("OutputIntents"))).toBeUndefined();

		const out = await toPDFa(pdf, profile, {} as any, {
			metadata: { subject: "some-subject" },
		});
		expect(out.catalog.get(PDFName.of("OutputIntents"))).toBeDefined();
	});

	it("should add mark info to the PDF document", async () => {
		const pdf = await PDFDocument.create();

		const profile: any = {
			id: "test-profile",
			config: { supportsPDFA: true },
			extensionSchema: {
				conformanceLevel: "MINIMUM",
				documentFileName: "factur-x.xml",
			},
			toXML: async () => "<root/>",
		} satisfies Partial<Profile>;

		expect(pdf.catalog.get(PDFName.of("MarkInfo"))).toBeUndefined();

		const out = await toPDFa(pdf, profile, {} as any, {
			metadata: { subject: "some-subject" },
		});
		expect(out.catalog.get(PDFName.of("MarkInfo"))).toBeDefined();
	});

	it("should add trailer info id to the PDF document", async () => {
		const pdf = await PDFDocument.create();

		const profile: any = {
			id: "test-profile",
			config: { supportsPDFA: true },
			extensionSchema: {
				conformanceLevel: "MINIMUM",
				documentFileName: "factur-x.xml",
			},
			toXML: async () => "<root/>",
		} satisfies Partial<Profile>;

		expect(pdf.context.trailerInfo.ID).toBeUndefined();

		const out = await toPDFa(pdf, profile, {} as any, {
			metadata: { subject: "some-subject" },
		});
		expect(out.context.trailerInfo.ID).toBeDefined();
	});

	it("should add struct tree root to the PDF document", async () => {
		const pdf = await PDFDocument.create();

		const profile: any = {
			id: "test-profile",
			config: { supportsPDFA: true },
			extensionSchema: {
				conformanceLevel: "MINIMUM",
				documentFileName: "factur-x.xml",
			},
			toXML: async () => "<root/>",
		} satisfies Partial<Profile>;

		expect(pdf.catalog.get(PDFName.of("StructTreeRoot"))).toBeUndefined();

		const out = await toPDFa(pdf, profile, {} as any, {
			metadata: { subject: "some-subject" },
		});
		expect(out.catalog.get(PDFName.of("StructTreeRoot"))).toBeDefined();
	});

	it("should attach xml file to the PDF document", async () => {
		const pdf = await PDFDocument.create();

		const profile: any = {
			id: "test-profile",
			config: { supportsPDFA: true },
			extensionSchema: {
				conformanceLevel: "MINIMUM",
				documentFileName: "factur-x.xml",
			},
			toXML: async () => "<root/>",
		} satisfies Partial<Profile>;

		const out = await toPDFa(pdf, profile, {} as any, {
			metadata: { subject: "some-subject" },
		});

		expect(out.getAttachments().length).toStrictEqual(1);
	});

	it("should attach additional files to the PDF document when allowed", async () => {
		const pdf = await PDFDocument.create();

		const profile: any = {
			id: "test-profile",
			config: {
				supportsPDFA: true,
				allowedAttachmentFormats: ["application/pdf"],
			},
			extensionSchema: {
				conformanceLevel: "MINIMUM",
				documentFileName: "factur-x.xml",
			},
			toXML: async () => "<root/>",
		} satisfies Partial<Profile>;

		const out = await toPDFa(pdf, profile, {} as any, {
			metadata: { subject: "some-subject" },
			additionalFiles: [
				new File([], "additional.pdf", {
					type: "application/pdf",
					lastModified: Date.now(),
				}),
			],
		});

		const attachment = out
			.getAttachments()
			.find((attachment) => attachment.name === "additional.pdf");

		expect(attachment).toBeDefined();
	});

	it("should validate attachment mime types and throw when disallowed", async () => {
		const pdf = await PDFDocument.create();

		const profile: any = {
			id: "test-profile",
			config: {
				supportsPDFA: true,
				allowedAttachmentFormats: ["text/xml"],
			},
			extensionSchema: {
				conformanceLevel: "MINIMUM",
				documentFileName: "factur-x.xml",
			},
			toXML: async () => "<root/>",
		} satisfies Partial<Profile>;

		await expect(
			toPDFa(pdf, profile, {} as any, {
				metadata: { subject: "some-subject" },
				additionalFiles: [
					new File([], "additional.pdf", {
						type: "application/pdf",
						lastModified: Date.now(),
					}),
				],
			}),
		).rejects.toThrowErrorMatchingInlineSnapshot(
			`[ZugferdError: Attachment with mime type "application/pdf" is not allowed in profile "test-profile".]`,
		);

		expect(pdf.getAttachments().length).toStrictEqual(0);
	});
});
