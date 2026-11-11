import { describe, expect, it, vi } from "vitest";
import { zugferd } from "node-zugferd";
import { BASIC } from "node-zugferd/profile/basic";
import { EN16931 } from "node-zugferd/profile/en16931";
import { PDFDocument } from "pdf-lib";
import { pdf } from "./plugin";
import { defaultTemplate } from "./templates";
import type { InvoiceTemplate } from "./types";
import { isPdfA3b } from "./test-utils/pdf";
import { findVeraPdf, validatePdfA3b } from "./test-utils/verapdf";
import basicData from "./test-utils/data/basic";
import en16931Data from "./test-utils/data/en16931";

const getInvoicer = (template: InvoiceTemplate = defaultTemplate()) =>
	zugferd({
		profile: BASIC,
		logger: { disabled: true },
		plugins: [pdf({ template })],
	});

describe("pdf plugin", () => {
	it("registers a createPdf handler", () => {
		const invoicer = getInvoicer();
		expect(invoicer.createPdf).toBeTypeOf("function");
	});

	it("creates a PDF/A-3b document with the Factur-X XML embedded", async () => {
		const invoicer = getInvoicer(
			defaultTemplate({
				footer: {
					columns: [
						"Lieferant GmbH\nLieferantenstraße 20\n80333 München",
						"Geschäftsführer: Hans Muster\nHandelsregisternummer: H A 123",
					],
				},
			}),
		);
		const pdfA = await invoicer.createPdf(basicData, {
			metadata: { title: "Rechnung 471102" },
		});

		expect(pdfA).toBeInstanceOf(Uint8Array);
		expect(isPdfA3b(pdfA)).toBe(true);

		const doc = await PDFDocument.load(pdfA);
		expect(doc.getTitle()).toBe("Rechnung 471102");

		const attachments = invoicer.context.pdf.getAttachments(doc);
		const facturXFile = attachments.find(
			(val) => val.name === BASIC.documentFileName,
		);
		expect(facturXFile).toBeDefined();

		const facturX = new TextDecoder("utf-8").decode(facturXFile?.data);
		expect(facturX).toEqual(await invoicer.create(basicData).toXML());
	});

	it("supports the EN 16931 profile", async () => {
		const invoicer = zugferd({
			profile: EN16931,
			logger: { disabled: true },
			plugins: [pdf({ template: defaultTemplate() })],
		});
		const pdfA = await invoicer.createPdf(en16931Data);

		expect(isPdfA3b(pdfA)).toBe(true);

		const doc = await PDFDocument.load(pdfA);
		const attachments = invoicer.context.pdf.getAttachments(doc);
		expect(
			attachments.some((val) => val.name === EN16931.documentFileName),
		).toBe(true);
	});

	it("breaks long line item tables across pages", async () => {
		const invoicer = getInvoicer();
		const line = basicData.transaction.line[0]!;
		const pdfA = await invoicer.createPdf({
			...basicData,
			transaction: {
				...basicData.transaction,
				line: Array.from({ length: 60 }, (_, i) => ({
					...line,
					identifier: String(i + 1),
				})),
			},
		});

		const doc = await PDFDocument.load(pdfA);
		expect(doc.getPageCount()).toBeGreaterThan(1);
	});

	it("uses a fully custom template", async () => {
		const template = vi.fn<InvoiceTemplate>((ctx) => ({
			content: [{ text: `Invoice ${ctx.data.number}` }],
		}));
		const invoicer = getInvoicer(template);
		const pdfA = await invoicer.createPdf(basicData);

		expect(template).toHaveBeenCalledOnce();
		expect(template.mock.calls[0]?.[0]).toMatchObject({
			data: basicData,
		});
		expect(template.mock.calls[0]?.[0]?.formatters.currency).toBeTypeOf(
			"function",
		);
		expect(isPdfA3b(pdfA)).toBe(true);
	});
});

describe("defaultTemplate", () => {
	it("throws a descriptive error when the profile provides no lines", async () => {
		const invoicer = getInvoicer();
		await expect(
			invoicer.createPdf({ ...basicData, transaction: undefined }),
		).rejects.toThrow(/requires at least one invoice line/);
	});
});

describe("PDF/A-3b conformance (veraPDF)", async () => {
	const verapdf = await findVeraPdf();

	it.skipIf(!verapdf)(
		"produces a document that passes veraPDF validation",
		async () => {
			const invoicer = getInvoicer();
			const pdfA = await invoicer.createPdf(basicData, {
				metadata: { title: "Rechnung 471102" },
			});

			const result = await validatePdfA3b(verapdf!, pdfA);
			expect(result.output).toContain("PASS");
			expect(result.passed).toBe(true);
		},
		120_000,
	);
});
