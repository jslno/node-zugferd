import { describe, expect, test } from "vitest";
import { de } from "../src/i18n/translations/de";
import { en } from "../src/i18n/translations/en";
import { fr } from "../src/i18n/translations/fr";
import type { InvoiceView } from "../src/view-model";
import { invoiceView } from "../src/view-model";

const code = (value: string) => ({ value, codelist: "test" });
const ident = (identifier: string, schemeId?: string) =>
	schemeId ? { identifier, schemeId } : { identifier };
const dated = (iso: string) => ({
	date: new Date(`${iso}T00:00:00.000Z`),
	value: iso.replaceAll("-", ""),
	format: "102",
});
const amount = (value: number, currency?: string) =>
	currency ? { value, currency } : { value };

const richInvoice = {
	processControl: {
		businessContextInfo: {
			processType: "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",
		},
	},
	exchangedDocument: {
		invoiceNumber: ident("INV-1001"),
		invoiceTypeCode: code("380"),
		invoiceIssueDate: dated("2026-03-05"),
		invoiceNotes: [
			{ content: "Thank you for your order." },
			{
				content: "Registered capital 10000 EUR.",
				subjectCode: code("REG"),
			},
		],
	},
	transaction: {
		line: [
			{
				position: { lineId: ident("1") },
				item: {
					sellerAssignedId: ident("SKU-1"),
					name: "Paper",
					description: "A4 reams",
				},
				priceDetails: { netPrice: { chargeAmount: 40 } },
				delivery: { billedQuantity: { value: 3, unitCode: "H87" } },
				billing: {
					vatBreakdown: { categoryCode: code("S") },
					itemTotals: { lineTotalAmount: amount(120) },
				},
			},
		],
		contract: {
			buyerReference: "BUY-10",
			seller: {
				id: "SELLER-29",
				globalId: ident("4000001123452", "0088"),
				name: "Acme Seller",
				organization: {
					tradingName: "Acme Trade",
					id: ident("12345678900015"),
				},
				postalAddress: {
					line1: "1 Market Street",
					postCode: "75001",
					city: "Paris",
					countryCode: code("FR"),
				},
				electronicAddress: ident("seller@example.com", "EM"),
				contact: {
					personName: "Ada Seller",
					phoneNumber: "+33 1 00 00 00 00",
					emailAddress: "ada@example.com",
				},
				taxRegistration: {
					vat: { id: ident("DE123456789") },
					local: { id: ident("201/113/40209") },
				},
			},
			buyer: {
				id: "BUYER-46",
				globalId: ident("4000009988776", "0088"),
				name: "Acme Buyer",
				organization: {
					tradingName: "Acme Buyer Trade",
					id: ident("98765432100017"),
				},
				postalAddress: {
					line1: "15 Customer Road",
					postCode: "10115",
					city: "Berlin",
					countryCode: code("DE"),
				},
				electronicAddress: ident("buyer@example.com", "EM"),
				contact: {
					personName: "Bea Buyer",
					departmentName: "Accounts",
					phoneNumber: "+49 30 000000",
					emailAddress: "bea@example.com",
				},
				taxRegistration: { vat: { id: ident("FR32123456789") } },
			},
			sellerTaxRepresentative: {
				name: "Tax Rep SAS",
				postalAddress: {
					line1: "2 Tax Lane",
					postCode: "69001",
					city: "Lyon",
					countryCode: code("FR"),
				},
				taxRegistration: { vat: { id: ident("FR11987654321") } },
			},
			associatedContract: { issuerAssignedId: "CONTRACT-12" },
			associatedOrder: { issuerAssignedId: "PO-13" },
			sellerOrderReferencedDocument: { issuerAssignedId: "SO-14" },
			tenderOrLotReferences: { issuerAssignedId: "LOT-17" },
			invoicedObjectIdentifier: {
				issuerAssignedId: ident("OBJECT-18"),
				referenceTypeCode: "130",
			},
			projectReference: { id: "PROJECT-11", name: "Harbor" },
		},
		delivery: {
			recipient: {
				locationId: ident("LOC-71"),
				globalLocationId: ident("4000000000071", "0088"),
				name: "Warehouse North",
				postalAddress: {
					line1: "9 Dock Road",
					postCode: "20095",
					city: "Hamburg",
					countryCode: code("DE"),
				},
			},
			actualDelivery: { date: dated("2026-03-04") },
			despatchAdvice: { issuerAssignedId: "SHIP-16" },
			associatedGoodsReceipt: { issuerAssignedId: "REC-15" },
		},
		debit: {
			invoiceCurrencyCode: code("EUR"),
			paymentReference: "REM-83",
			creditorReferenceId: ident("CRED-90"),
			allowances: [
				{
					basisAmount: amount(220),
					actualAmount: amount(22),
					calculationPercent: 10,
					reason: "Volume discount",
					categoryTradeTax: { categoryCode: code("S") },
				},
			],
			charges: [
				{
					basisAmount: amount(25),
					actualAmount: amount(25),
					calculationPercent: 100,
					reason: "Freight",
					categoryTradeTax: { categoryCode: code("S") },
				},
			],
			vatBreakdown: [
				{
					calculatedAmount: amount(16),
					basisAmount: amount(160),
					categoryCode: code("S"),
					rateApplicablePercent: 10,
					exemptionReason: "Exempt because of intra-community supply",
					exemptionReasonCode: code("VATEX-EU-IC"),
					dueDateTypeCode: code("5"),
				},
			],
			paymentTerms: {
				description: "Payable within 30 days.",
				dueDate: dated("2026-04-04"),
			},
			invoicingPeriod: {
				startDate: dated("2026-02-01"),
				endDate: dated("2026-02-28"),
			},
			precendingInvoices: [
				{ issuerAssignedId: "PREV-25", issueDate: dated("2026-01-15") },
			],
			accounting: { buyerReference: "ACC-19" },
			payee: {
				name: "Payee Co",
				id: ident("PAYEE-60"),
				globalId: ident("4000000000060", "0088"),
				organization: { id: ident("PAYEE-61") },
			},
			paymentMeans: {
				typeCode: code("58"),
				information: "SEPA credit transfer",
				creditTransfers: [
					{
						iban: ident("DE89370400440532013000"),
						proprietaryId: ident("ACCT-84"),
						accountName: "Acme Treasury",
					},
				],
				sellerBankDetails: { bic: ident("TESTBIC1") },
			},
			documentTotals: {
				taxBasisTotalAmount: amount(533),
				taxTotalAmount: amount(60.6, "EUR"),
				taxTotalAmountAccountingCurrency: amount(60.6, "EUR"),
				grandTotalAmount: amount(593.6),
				prepaidAmount: amount(0),
				roundingAmount: amount(0.01),
				duePayableAmount: amount(593.6),
			},
		},
	},
};

const minimumInvoice = {
	exchangedDocument: {
		invoiceNumber: ident("MIN-1"),
		invoiceTypeCode: code("380"),
		invoiceIssueDate: dated("2020-01-15"),
	},
	transaction: {
		contract: {
			seller: {
				name: "Acme Seller",
				postalAddress: { countryCode: code("DE") },
			},
			buyer: { name: "Acme Buyer" },
		},
		debit: {
			invoiceCurrencyCode: code("EUR"),
			documentTotals: {
				taxBasisTotalAmount: amount(100),
				taxTotalAmount: amount(19, "EUR"),
				grandTotalAmount: amount(119),
				duePayableAmount: amount(119),
			},
		},
	},
};

const collect = (view: InvoiceView) => {
	const sections = [
		view.document,
		view.seller,
		view.taxRepresentative,
		view.buyer,
		view.buyerIdentifiers,
		view.references,
		view.invoicing,
		view.delivery,
		view.payee,
		view.payment,
		view.notes,
		view.regulatoryNotes,
	].filter((section) => section !== undefined);
	return [
		...sections.flatMap((section) => [
			section.title,
			...section.rows.flatMap((row) => [row.label, row.value]),
		]),
		...view.lines.flatMap((line) => Object.values(line)),
		...view.allowances.flatMap((row) => Object.values(row)),
		...view.charges.flatMap((row) => Object.values(row)),
		...view.vatRows.flatMap((row) => Object.values(row)),
		view.paymentTerms?.label,
		view.paymentTerms?.value,
		view.dueDate?.label,
		view.dueDate?.value,
		...view.totals.flatMap((row) => [row.label, row.value]),
	]
		.filter((value): value is string => !!value)
		.join("\n");
};

describe("invoice view", () => {
	test("includes every readable group in en, de, and fr", () => {
		for (const translations of [en, de, fr]) {
			const view = invoiceView(
				richInvoice,
				translations,
				translations === de ? "de" : translations === fr ? "fr" : "en",
			);
			const text = collect(view);

			expect(view.document.title).toBe(translations.invoice);
			expect(view.seller?.title).toBe(translations.seller);
			expect(view.taxRepresentative?.title).toBe(
				translations.taxRepresentative,
			);
			expect(view.buyer?.title).toBe(translations.buyer);
			expect(view.buyerIdentifiers?.title).toBe(translations.buyerIdentifiers);
			expect(view.references?.title).toBe(translations.references);
			expect(view.invoicing?.title).toBe(translations.invoicing);
			expect(view.delivery?.title).toBe(translations.delivery);
			expect(view.payee?.title).toBe(translations.payee);
			expect(view.payment?.title).toBe(translations.payment);
			expect(view.notes?.title).toBe(translations.notes);
			expect(view.regulatoryNotes?.title).toBe(translations.regulatoryNotes);
			expect(view.lines).toHaveLength(1);
			expect(view.allowances).toHaveLength(1);
			expect(view.charges).toHaveLength(1);
			expect(view.vatRows).toHaveLength(1);
			expect(text).toContain("INV-1001");
			expect(text).toContain("FR32123456789");
			expect(text).toContain("DE89370400440532013000");
			expect(text).toMatch(/593[.,]60/);
			expect(text).toContain(translations.dueForPayment);
			expect(text).toContain("PO-13");
			expect(text).toContain("SHIP-16");
			expect(text).toContain("PREV-25");
			expect(text).toContain("Payee Co");
			expect(text).toContain("TESTBIC1");
			expect(text).toContain("Registered capital 10000 EUR.");
			expect(text).toContain("Thank you for your order.");
		}

		expect(de.seller).not.toBe(en.seller);
		expect(fr.seller).not.toBe(en.seller);
		expect(de.dueForPayment).not.toBe(en.dueForPayment);
		expect(fr.dueForPayment).not.toBe(en.dueForPayment);
	});

	test("names a credit note from the invoice type code", () => {
		const view = invoiceView(
			{
				...richInvoice,
				exchangedDocument: {
					...richInvoice.exchangedDocument,
					invoiceTypeCode: code("381"),
				},
			},
			en,
			"en",
		);
		expect(view.document.title).toBe(en.creditNote);
	});

	test("omits groups that a minimum invoice does not carry", () => {
		const view = invoiceView(minimumInvoice, en, "en");

		expect(view.document.title).toBe(en.invoice);
		expect(view.document.rows.map((row) => row.value).join(" ")).toContain(
			"MIN-1",
		);
		expect(view.seller?.rows.some((row) => row.value === "Acme Seller")).toBe(
			true,
		);
		expect(view.buyer?.rows.some((row) => row.value === "Acme Buyer")).toBe(
			true,
		);
		expect(view.taxRepresentative).toBeUndefined();
		expect(view.buyerIdentifiers).toBeUndefined();
		expect(view.references).toBeUndefined();
		expect(view.invoicing).toBeUndefined();
		expect(view.delivery).toBeUndefined();
		expect(view.payee).toBeUndefined();
		expect(view.payment).toBeUndefined();
		expect(view.notes).toBeUndefined();
		expect(view.regulatoryNotes).toBeUndefined();
		expect(view.lines).toEqual([]);
		expect(view.allowances).toEqual([]);
		expect(view.charges).toEqual([]);
		expect(view.vatRows).toEqual([]);
		expect(view.totals.map((row) => row.label)).toEqual([
			en.totalNet,
			en.totalVat,
			en.totalGross,
			en.dueForPayment,
		]);
		expect(view.totals.at(-1)?.emphasize).toBe(true);
	});
});
