import { MINIMUM } from "@node-zugferd/minimum";
import { mustang } from "@node-zugferd/mustang";
import { MINIMUM_Buchungshilfe } from "@node-zugferd/test-utils/invoices/valid/MINIMUM_Buchungshilfe";
import { createZugferd, PDFDocument } from "node-zugferd";
import { describe, expect, it } from "vitest";

describe("vanilla-node", () => {
	const zugferd = createZugferd({
		profile: MINIMUM,
		plugins: [mustang()],
	});

	it("should create a valid minimum invoice", async () => {
		const invoice = zugferd.create(MINIMUM_Buchungshilfe);

		const pdf = await PDFDocument.create();

		await expect(
			invoice.toPDFa(pdf, {
				metadata: {
					subject: "Test Invoice",
				},
			}),
		).resolves.toBeInstanceOf(PDFDocument);
	});
});
