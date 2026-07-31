import { test, describe, expect } from "vitest";
import { zugferd } from "node-zugferd";
import { en16931 } from "@node-zugferd/en-16931";
import { simpleData } from "@node-zugferd-test/test-utils/en-16931/valid/simple.ts";
import { blankPdf, pdfEmbedsFile, pdfHasMetadata } from "./utils";

describe("create", () => {
	const invoicer = zugferd({
		profiles: [en16931],
		logger: {
			level: "debug",
		},
	});

	test("should embed XML and XMP metadata in PDF/A", async () => {
		const invoice = await invoicer.create("en-16931", simpleData);
		const pdf = await invoice.toPDF(await blankPdf());

		expect(pdfHasMetadata(pdf)).toBe(true);
		await expect(
			pdfEmbedsFile(pdf, en16931.extensionSchema.fileName),
		).resolves.toBe(true);
	});
});
