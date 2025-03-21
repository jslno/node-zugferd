import { describe, it, expect, suite } from "vitest";
import { BASIC, BASIC_WL, EN16931, EXTENDED, MINIMUM } from "./profiles";
import fs from "fs/promises";
import { PDFDocument } from "pdf-lib";
import { isPdfA3b } from "./test-utils/pdf";
import path from "path";
import { getTestInstance } from "./test-utils/test-instance";

describe("Application Tests", async () => {
	describe("Generate invoice", async () => {
		for (const profile of [MINIMUM, BASIC_WL, BASIC, EN16931, EXTENDED]) {
			const { invoicer, data } = await getTestInstance({ profile });
			suite(profile.id, async () => {
				const invoice = await invoicer.create(data);

				expect(invoice).toBeDefined();

				const pdf = await fs.readFile(
					path.resolve(__dirname, "./test-utils/input.pdf"),
				);
				const pdfA = await invoice.embedInPdf(pdf);

				it("should generate a valid PDF/A-3b document", () => {
					expect(isPdfA3b(pdfA)).toBe(true);
				});

				it("should have factur-x.xml embedded", async () => {
					const doc = await PDFDocument.load(pdfA);
					const attachments = invoicer.context.pdf.getAttachments(doc);
					const facturXFile = attachments.find(
						(val) => val.name === BASIC.documentFileName,
					);

					expect(facturXFile).toBeDefined();

					const facturX = new TextDecoder("utf-8").decode(facturXFile?.data);

					expect(facturX).toEqual(await invoice.toXML());
				});
			});
		}
	});
});
