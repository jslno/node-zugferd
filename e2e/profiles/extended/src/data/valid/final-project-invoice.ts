import type { invoicer } from "../../invoicer";

export const finalProjectInvoiceData: typeof invoicer.$Infer.Input.Extended = {
	exchangedDocument: {
		invoiceNumber: "47110819",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-11-15"),
		invoiceNotes: [
			{
				content:
					"Geschäftsführer(in): Herr/Frau Geschäftsführer(in) , Muster Lieferant GmbH etc.",
				subjectCode: "REG",
			},
			{
				content:
					"Es bestehen Vereinbarungen, aus denen sich Minderungen des Entgelts ergeben können.",
				subjectCode: "AAI",
			},
			{
				content: "ZUGFeRD vers 2.4.0 (Extended)",
				subjectCode: "ACB",
			},
			{
				content:
					"Dies ist eine Beispiel-Rechnung einer Projektabschluss-Rechnung",
				subjectCode: "ACB",
			},
		],
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "1",
				},
				item: {
					name: "Lieferung und Montage Bauträger",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 20_000,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
				},
				delivery: {
					billedQuantity: {
						value: 1,
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: [
						{
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
					invoicePeriod: {
						startDate: new Date("2025-06-01"),
						endDate: new Date("2025-10-31"),
					},
					itemTotals: {
						lineTotalAmount: 20_000,
					},
				},
			},
		],
		contract: {
			seller: {
				globalId: {
					value: "GLN4000000000",
					schemeId: "0088",
				},
				name: "Lieferant GmbH & Co. KG",
				contact: [
					{
						personName: "Georg Verkäufer",
						phoneNumber: "0160 123456789",
						emailAddress: "georg.Verkäufer@lieferant.de",
					},
				],
				postalAddress: {
					postCode: "98765",
					line1: "Lieferanten-Str.12-17",
					city: "Lieferstadt",
					countryCode: "DE",
				},
				electronicAddress: {
					value: "info@lieferant.de",
					schemeId: "0088",
				},
				taxRegistration: {
					local: {
						id: "78910/12345",
					},
					vat: {
						id: "DE12435679",
					},
				},
			},
			buyer: {
				id: "21212121",
				name: "Muster Maschinenbau GmbH",
				postalAddress: {
					postCode: "87654",
					line1: "Käufer-Str. 12",
					city: "Käuferstadt",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE123456789",
					},
				},
			},
		},
		delivery: {
			recipient: {
				name: "Baustelle",
				postalAddress: {
					postCode: "98765",
					line1: "Eichenpromenade 37",
					line2: "Tor 1",
					city: "Metallstadt",
					countryCode: "DE",
				},
			},
			actualDelivery: {
				date: new Date("2025-10-31"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			paymentMeans: {
				typeCode: "58",
				creditTransfers: [
					{
						iban: "DE77 3707 0060 0321 9870 00",
						accountName: "Lieferant GmbH & Co. KG",
					},
				],
			},
			vatBreakdown: [
				{
					calculatedAmount: 3800,
					typeCode: "VAT",
					basisAmount: 20_000,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			paymentTerms: [
				{
					dueDate: new Date("2025-11-29"),
				},
			],
			documentTotals: {
				lineTotalAmount: 20_000,
				taxBasisTotalAmount: 20_000,
				taxTotalAmount: {
					value: 3800,
					currency: "EUR",
				},
				grandTotalAmount: 23_800,
				prepaidAmount: 11_900,
				duePayableAmount: 11_900,
			},
			advancePayments: [
				{
					paidAmount: 2975,
					date: new Date("2025-06-07"),
					includedTax: [
						{
							calculatedAmount: 1900,
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
					precendingInvoice: {
						issuerAssignedId: "R202506-01",
						date: new Date("2025-06-01"),
					},
				},
				{
					paidAmount: 2975,
					date: new Date("2025-08-12"),
					includedTax: [
						{
							calculatedAmount: 1900,
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
					precendingInvoice: {
						issuerAssignedId: "R202508-01",
						date: new Date("2025-08-01"),
					},
				},
				{
					paidAmount: 2975,
					date: new Date("2025-09-16"),
					includedTax: [
						{
							calculatedAmount: 1900,
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
					precendingInvoice: {
						issuerAssignedId: "R202509-01",
						date: new Date("2025-09-02"),
					},
				},
			],
		},
	},
};
