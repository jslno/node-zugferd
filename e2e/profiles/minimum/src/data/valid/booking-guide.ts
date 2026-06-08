import type { invoicer } from "../../invoicer.js";

export const bookingGuideData: typeof invoicer.$Infer.Input.Minimum = {
	exchangedDocument: {
		invoiceNumber: "471102",
		invoiceTypeCode: "751",
		invoiceIssueDate: new Date("2020-03-05"),
	},
	transaction: {
		contract: {
			seller: {
				name: "Lieferant GmbH",
				postalAddress: {
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
			},
		},
		delivery: {},
		debit: {
			invoiceCurrencyCode: "EUR",
			documentTotals: {
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
