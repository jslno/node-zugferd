import type { MINIMUM } from "@node-zugferd/minimum";

export const MINIMUM_Buchungshilfe = {
	document: {
		number: "421102",
		typeCode: "751",
		issueDate: new Date("2020-03-05"),
	},
	tradeTransaction: {
		tradeAgreement: {
			seller: {
				name: "Lieferant GmbH",
				postalAddress: {
					countryCode: "DE",
				},
				taxInformation: {
					localID: "201/113/40209",
					vatID: "DE123456789",
				},
			},
			buyer: {
				name: "Kunden AG Mitte",
			},
		},
		tradeSettlement: {
			invoiceCurrencyCode: "EUR",
			monetarySummation: {
				taxBasisTotalAmount: 198,
				taxTotalAmount: 37.62,
				grandTotalAmount: 235.62,
				duePayableAmount: 235.62,
			},
		},
	},
} as const satisfies typeof MINIMUM.$Input;
