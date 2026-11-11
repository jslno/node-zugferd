import { describe, expect, it } from "vitest";
import { en16931 } from "./index";

const ctx = {
	profile: en16931,
	error(id: `BR-${string}` | `CII-SR-${string}`, message: string): never {
		throw new Error(message, { cause: id });
	},
};

const attachment = {
	content: new Uint8Array([1, 2, 3]),
	mimeType: "application/pdf",
	filename: "note.pdf",
};

describe("EN 16931 business rules", () => {
	it("accepts an invoice without a payment card or supporting documents", async () => {
		await expect(check(validInvoice())).resolves.toBeUndefined();
	});

	it("requires the last 4 to 6 digits when payment card information is present", async () => {
		const missing = validInvoice();
		missing.transaction.debit.paymentMeans = {
			typeCode: "48",
			cardInfo: { cardholderName: "Jane Doe" },
		};
		await expect(check(missing)).rejects.toMatchObject({ cause: "BR-51" });

		for (const accountNumber of ["123", "1234567", "12AB", "1234 56"]) {
			const invalid = validInvoice();
			invalid.transaction.debit.paymentMeans = {
				typeCode: "48",
				cardInfo: { accountNumber },
			};
			await expect(check(invalid)).rejects.toMatchObject({ cause: "BR-51" });
		}

		for (const accountNumber of ["1234", "12345", "123456"]) {
			const valid = validInvoice();
			valid.transaction.debit.paymentMeans = {
				typeCode: "48",
				cardInfo: { accountNumber, cardholderName: "Jane Doe" },
			};
			await expect(check(valid)).resolves.toBeUndefined();
		}
	});

	it("requires a reference on every additional supporting document", async () => {
		const missing = validInvoice();
		missing.transaction.contract.additionalSupportingDocuments = [
			{ name: "Timesheet" },
		];
		await expect(check(missing)).rejects.toMatchObject({ cause: "BR-52" });

		const referenced = validInvoice();
		referenced.transaction.contract.additionalSupportingDocuments = [
			{ issuerAssignedId: "DOC-1", uri: "https://example.test/doc-1" },
			{ issuerAssignedId: { value: "DOC-2" } },
		];
		await expect(check(referenced)).resolves.toBeUndefined();
	});

	it("allows only one supporting-document name", async () => {
		const twoDocuments = validInvoice();
		twoDocuments.transaction.contract.additionalSupportingDocuments = [
			{ issuerAssignedId: "DOC-1", name: "Timesheet" },
			{ issuerAssignedId: "DOC-2", name: "Contract" },
		];
		await expect(check(twoDocuments)).rejects.toMatchObject({
			cause: "CII-SR-475",
		});

		const repeatedName = validInvoice();
		repeatedName.transaction.contract.additionalSupportingDocuments = [
			{ issuerAssignedId: "DOC-1", name: ["Timesheet", "Contract"] },
		];
		await expect(check(repeatedName)).rejects.toMatchObject({
			cause: "CII-SR-475",
		});

		const oneName = validInvoice();
		oneName.transaction.contract.additionalSupportingDocuments = [
			{ issuerAssignedId: "DOC-1", name: "Timesheet" },
			{ issuerAssignedId: "DOC-2" },
		];
		await expect(check(oneName)).resolves.toBeUndefined();
	});

	it("allows only one supporting-document attachment", async () => {
		const twoDocuments = validInvoice();
		twoDocuments.transaction.contract.additionalSupportingDocuments = [
			{ issuerAssignedId: "DOC-1", attachedDocument: attachment },
			{ issuerAssignedId: "DOC-2", attachedDocument: attachment },
		];
		await expect(check(twoDocuments)).rejects.toMatchObject({
			cause: "CII-SR-476",
		});

		const repeatedAttachment = validInvoice();
		repeatedAttachment.transaction.contract.additionalSupportingDocuments = [
			{
				issuerAssignedId: "DOC-1",
				attachedDocument: [attachment, attachment],
			},
		];
		await expect(check(repeatedAttachment)).rejects.toMatchObject({
			cause: "CII-SR-476",
		});

		const oneAttachment = validInvoice();
		oneAttachment.transaction.contract.additionalSupportingDocuments = [
			{
				issuerAssignedId: "DOC-1",
				name: "Timesheet",
				attachedDocument: attachment,
			},
			{ issuerAssignedId: "DOC-2" },
		];
		await expect(check(oneAttachment)).resolves.toBeUndefined();
	});
});

function check(data: unknown) {
	return en16931.rules?.(data as never, ctx as never);
}

type Rec = Record<string, any>;

function validInvoice(): Rec {
	return {
		processControl: {
			applicationRecommendationInfo: {
				specificationIdentifier: "urn:cen.eu:en16931:2017",
			},
		},
		exchangedDocument: {
			invoiceNumber: "471102",
			invoiceTypeCode: "380",
			invoiceIssueDate: new Date("2020-03-05"),
		},
		transaction: {
			line: [
				{
					position: { lineId: "1" },
					item: {
						name: "Item",
						globalId: { value: "4012345001235", schemeId: "0160" },
					},
					priceDetails: { netPrice: { chargeAmount: 100 } },
					delivery: { billedQuantity: { value: 1, unitCode: "C62" } },
					billing: {
						vatBreakdown: {
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
						itemTotals: { lineTotalAmount: 100 },
					},
				},
			],
			contract: {
				seller: {
					name: "Lieferant GmbH",
					postalAddress: { countryCode: "DE" },
					taxRegistration: { vat: { id: "DE123456789" } },
				},
				buyer: {
					name: "Kunden AG",
					postalAddress: { countryCode: "DE" },
				},
			},
			debit: {
				invoiceCurrencyCode: "EUR",
				paymentTerms: { description: "Payable within 30 days" },
				vatBreakdown: [
					{
						calculatedAmount: 19,
						typeCode: "VAT",
						basisAmount: 100,
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				],
				documentTotals: {
					lineTotalAmount: 100,
					taxBasisTotalAmount: 100,
					taxTotalAmount: { value: 19, currency: "EUR" },
					grandTotalAmount: 119,
					duePayableAmount: 119,
				},
			},
		},
	};
}
