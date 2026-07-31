import type { basic } from "@node-zugferd/basic";

export const simpleData: typeof basic.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "471102",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2020-03-05"),
		invoiceNotes: [
			{
				content: "Rechnung gemäß Bestellung vom 01.03.2020.",
			},
			{
				content: [
					"Lieferant GmbH",
					"Lieferantenstraße 20",
					"80333 München",
					"Deutschland",
					"Geschäftsführer: Hans Muster",
					"Handelsregisternummer: H A 123",
				].join("\n"),
			},
			{
				content: [
					"Unsere GLN: 4000001123452",
					"Ihre GLN: 4000001987658",
					"Ihre Kundennummer: GE2020211",
					"\n\n",
					"Zahlbar innerhalb 30 Tagen netto bis 04.04.2020, 3% Skonto innerhalb 10 Tagen bis 15.03.2020.",
				].join("\n"),
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
					globalId: {
						value: "4012345001235",
						schemeId: "0160",
					},
					name: [
						"GTIN: 4012345001235",
						"Unsere Art.-Nr.: TB100A4",
						"Trennblätter A4",
					].join("\n"),
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 9.9,
					},
				},
				delivery: {
					billedQuantity: {
						value: "20.0000",
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
					itemTotals: {
						lineTotalAmount: 198,
					},
				},
			},
		],
		contract: {
			seller: {
				name: "Lieferant GmbH",
				postalAddress: {
					postCode: "80333",
					line1: "Lieferantenstraße 20",
					city: "München",
					countryCode: "DE",
				},
				taxRegistration: {
					local: {
						id: "201/113/40209",
					},
					vat: {
						id: "DE123456789",
					},
				},
			},
			buyer: {
				name: "Kunden AG Mitte",
				postalAddress: {
					postCode: "69876",
					line1: "Hans Muster",
					line2: "Kundenstraße 15",
					city: "Frankfurt",
					countryCode: "DE",
				},
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2020-03-05"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			vatBreakdown: [
				{
					calculatedAmount: 37.62,
					typeCode: "VAT",
					basisAmount: 198,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			paymentTerms: {
				dueDate: new Date("2020-04-04"),
			},
			documentTotals: {
				lineTotalAmount: 198,
				chargeTotalAmount: 0,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 198,
				taxTotalAmount: {
					value: 37.62,
					currency: "EUR",
				},
				grandTotalAmount: 235.62,
				duePayableAmount: 235.62,
			},
		},
	},
};
