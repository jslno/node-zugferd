import type { invoicer } from "../../invoicer.js";

export const photovoltaicData: typeof invoicer.$Infer.Input.En16931 = {
	exchangedDocument: {
		invoiceNumber: "471102",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2024-11-15"),
		invoiceNotes: [
			{
				content: "Rechnung gemäß Bestellung vom 01.11.2024.",
			},
			{
				content: [
					"Handwerker GmbH",
					"Geschäftsführer: Hans Muster",
					"Handelsregisternummer: H A 123",
				].join("\n"),
				subjectCode: "REG",
			},
			{
				content: "ZUGFeRD 2.4.0 EN 16931 (Comfort)",
				subjectCode: "ACB",
			},
			{
				content: "Dies ist eine Rechnung über Photovoltaik mit Nullsteuersatz",
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
					globalId: {
						value: "4012345045654",
						schemeId: "0160",
					},
					sellerAssignedId: "TB100A4",
					name: "Lieferung eines Solarziegels",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 205,
					},
					netPrice: {
						chargeAmount: 205,
					},
				},
				delivery: {
					billedQuantity: {
						value: 1,
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "Z",
						rateApplicablePercent: 0,
					},
					itemTotals: {
						lineTotalAmount: 205,
					},
				},
			},
			{
				position: {
					lineId: "2",
				},
				item: {
					globalId: {
						value: "400003565778",
						schemeId: "0160",
					},
					sellerAssignedId: "ARNR2",
					name: "Lieferung und Montage von Solarhaltern mit Systemziegel",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 59,
					},
					netPrice: {
						chargeAmount: 59,
					},
				},
				delivery: {
					billedQuantity: {
						value: 52,
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "Z",
						rateApplicablePercent: 0,
					},
					itemTotals: {
						lineTotalAmount: 3068,
					},
				},
			},
		],
		contract: {
			seller: {
				id: "549910",
				globalId: {
					value: "4000001123452",
					schemeId: "0088",
				},
				name: "Handwerker GmbH",
				postalAddress: {
					postCode: "80333",
					line1: "Handwerkerstraße 20",
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
				id: "GE2020211",
				name: "Kunden AG Mitte",
				postalAddress: {
					postCode: "69876",
					line1: "Kundenstraße 15",
					city: "Frankfurt",
					countryCode: "DE",
				},
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2024-11-14"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			vatBreakdown: [
				{
					calculatedAmount: 0,
					typeCode: "VAT",
					basisAmount: 3273,
					categoryCode: "Z",
					rateApplicablePercent: 0,
				},
			],
			paymentTerms: {
				description:
					"Zahlbar innerhalb 30 Tagen netto bis 15.12.2024, 2% Skonto innerhalb 10 Tagen bis 25.11.2024",
			},
			documentTotals: {
				lineTotalAmount: 3273,
				chargeTotalAmount: 0,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 3273,
				taxTotalAmount: {
					value: 0,
					currency: "EUR",
				},
				grandTotalAmount: 3273,
				prepaidAmount: 0,
				duePayableAmount: 3273,
			},
		},
	},
};
