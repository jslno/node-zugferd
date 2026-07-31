import type { basicWL } from "@node-zugferd/basic-wl";

export const simpleData: typeof basicWL.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "TX-471102",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2019-10-30"),
		invoiceNotes: [
			{
				content: "Rechnung gemäß Taxifahrt vom 29.10.2019",
			},
			{
				content: [
					"Taxiunternehmen TX GmbH",
					"Lieferantenstraße 20",
					"10369 Berlin",
					"Deutschland",
					"Geschäftsführer: Hans Mustermann",
					"Handelsregisternummer: H A 123",
				].join("\n"),
			},
			{
				content: [
					"Unsere GLN: 4000001123452",
					"Ihre GLN: 4000001987658",
					"Ihre Kundennummer: GE2020211",
				].join("\n"),
			},
		],
	},
	transaction: {
		contract: {
			seller: {
				name: "Taxiunternehmen TX GmbH",
				postalAddress: {
					postCode: "10369",
					line1: "Lieferantenstraße 20",
					city: "Berlin",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE123456789",
					},
				},
			},
			buyer: {
				name: "Taxi-Gast AG Mitte",
				postalAddress: {
					postCode: "13351",
					line1: "Hans Mustermann",
					line2: "Kundenstraße 15",
					city: "Berlin",
					countryCode: "DE",
				},
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2019-10-29"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			vatBreakdown: [
				{
					calculatedAmount: "1.18",
					typeCode: "VAT",
					basisAmount: 16.9,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
			],
			paymentTerms: {
				dueDate: new Date("2019-11-29"),
			},
			documentTotals: {
				lineTotalAmount: 16.9,
				chargeTotalAmount: 0,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 16.9,
				taxTotalAmount: {
					value: 1.18,
					currency: "EUR",
				},
				grandTotalAmount: 18.08,
				duePayableAmount: 18.08,
			},
		},
	},
};
