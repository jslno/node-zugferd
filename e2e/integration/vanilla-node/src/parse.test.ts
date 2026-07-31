import { en16931 } from "@node-zugferd/en-16931";
import { zugferd } from "node-zugferd";
import { describe, expect, test } from "vitest";
import { simpleData } from "@node-zugferd-test/test-utils/en-16931/valid/simple.js";
import { parser } from "@node-zugferd/parser";
import { blankPdf } from "./utils";

function testSimpleData(parsed: any) {
	test("exchangedDocument", () => {
		expect(parsed.exchangedDocument.invoiceNumber).toBe(
			simpleData.exchangedDocument?.invoiceNumber,
		);
		expect(parsed.exchangedDocument.invoiceTypeCode).toBe(
			simpleData.exchangedDocument?.invoiceTypeCode,
		);
		expect(
			(parsed.exchangedDocument.invoiceIssueDate as Date | undefined)
				?.toISOString()
				.split("T")[0],
		).toBe(
			(simpleData.exchangedDocument?.invoiceIssueDate as Date)
				.toISOString()
				.split("T")[0],
		);
		expect(parsed.exchangedDocument.invoiceNotes?.length).toBe(
			simpleData.exchangedDocument?.invoiceNotes?.length,
		);
		if (simpleData.exchangedDocument?.invoiceNotes?.length) {
			for (
				let i = 0;
				i < simpleData.exchangedDocument.invoiceNotes.length;
				i++
			) {
				const invoiceNote = simpleData.exchangedDocument.invoiceNotes[i]!;
				const parsedInvoiceNote = parsed.exchangedDocument.invoiceNotes?.[i]!;

				expect(parsedInvoiceNote).toBeDefined();
				expect(parsedInvoiceNote).toEqual(invoiceNote);
			}
		}
	});

	test("line items", () => {
		expect(parsed.transaction?.line?.length).toBe(
			simpleData.transaction?.line.length,
		);
		if (simpleData.transaction?.line.length) {
			for (let i = 0; i < simpleData.transaction?.line.length; i++) {
				const lineItem = simpleData.transaction?.line[i]!;
				const parsedLineItem = parsed.transaction?.line?.[i]!;

				expect(parsedLineItem).toBeDefined();
				expect(parsedLineItem.position?.lineId).toBe(lineItem.position?.lineId);
				expect(parsedLineItem.item?.globalId).toEqual(lineItem.item.globalId);
				expect(parsedLineItem.item?.sellerAssignedId).toBe(
					lineItem.item.sellerAssignedId,
				);
				expect(parsedLineItem.item?.name).toBe(lineItem.item.name);
				expect(parsedLineItem.priceDetails).toEqual(lineItem.priceDetails);
				expect(parsedLineItem.delivery).toEqual(lineItem.delivery);
				expect(parsedLineItem.billing?.vatBreakdown).toEqual(
					lineItem.billing?.vatBreakdown,
				);
				expect(parsedLineItem.billing?.itemTotals?.lineTotalAmount?.value).toBe(
					lineItem.billing?.itemTotals.lineTotalAmount,
				);
			}
		}
	});

	test("contract", () => {
		expect(parsed.transaction?.contract?.seller?.id).toBe(
			simpleData.transaction?.contract?.seller?.id,
		);
		expect(parsed.transaction?.contract?.seller?.globalId).toEqual(
			simpleData.transaction?.contract?.seller?.globalId,
		);
		expect(parsed.transaction?.contract?.seller?.name).toBe(
			simpleData.transaction?.contract?.seller?.name,
		);
		expect(parsed.transaction?.contract?.seller?.postalAddress).toEqual(
			simpleData.transaction?.contract?.seller?.postalAddress,
		);
		expect(parsed.transaction?.contract?.seller?.taxRegistration).toEqual(
			simpleData.transaction?.contract?.seller?.taxRegistration,
		);

		expect(parsed.transaction?.contract?.buyer?.id).toBe(
			simpleData.transaction?.contract?.buyer?.id,
		);
		expect(parsed.transaction?.contract?.buyer?.name).toBe(
			simpleData.transaction?.contract?.buyer?.name,
		);
		expect(parsed.transaction?.contract?.buyer?.postalAddress).toEqual(
			simpleData.transaction?.contract?.buyer?.postalAddress,
		);
	});

	test("delivery", () => {
		expect(
			parsed.transaction?.delivery?.actualDelivery?.date
				?.toISOString()
				.split("T")[0],
		).toBe(
			(simpleData.transaction?.delivery?.actualDelivery?.date as Date)
				?.toISOString()
				.split("T")[0],
		);
	});

	test("debit", () => {
		expect(parsed.transaction?.debit?.invoiceCurrencyCode).toBe(
			simpleData.transaction?.debit?.invoiceCurrencyCode,
		);
		expect(parsed.transaction?.debit?.vatBreakdown?.length).toBe(
			simpleData.transaction?.debit?.vatBreakdown?.length,
		);
		if (simpleData.transaction?.debit?.vatBreakdown?.length) {
			for (
				let i = 0;
				i < simpleData.transaction.debit.vatBreakdown.length;
				i++
			) {
				const vatBreakdown = simpleData.transaction.debit.vatBreakdown[i]!;
				const parsedVatBreakdown =
					parsed.transaction?.debit?.vatBreakdown?.[i]!;

				expect(parsedVatBreakdown).toBeDefined();
				expect(parsedVatBreakdown.basisAmount.value).toBe(
					vatBreakdown.basisAmount,
				);
				expect(parsedVatBreakdown.calculatedAmount.value).toBe(
					vatBreakdown.calculatedAmount,
				);
				expect(parsedVatBreakdown.categoryCode).toBe(vatBreakdown.categoryCode);
				expect(parsedVatBreakdown.rateApplicablePercent).toBe(
					vatBreakdown.rateApplicablePercent,
				);
			}
		}
		expect(parsed.transaction?.debit?.paymentTerms?.description).toBe(
			simpleData.transaction?.debit?.paymentTerms?.description,
		);
		expect(parsed.transaction?.debit?.documentTotals).toEqual(
			parsed.transaction?.debit?.documentTotals,
		);
	});
}

describe("parse", () => {
	const invoicer = zugferd({
		profiles: [en16931],
		plugins: [parser()],
		logger: {
			level: "debug",
		},
		prettyPrint: true,
	});

	describe("should parse XML produced by create", async () => {
		const invoice = await invoicer.create("en-16931", simpleData);
		const xml = invoice.toXML();

		const parsed = await invoicer.parse(xml);

		testSimpleData(parsed);
	});

	describe("should parse PDF/A produced by create", async () => {
		const invoice = await invoicer.create("en-16931", simpleData);
		const pdfa = await invoice.toPDF(await blankPdf());

		const parsed = await invoicer.parse(await pdfa.save());

		testSimpleData(parsed);
	});
});
