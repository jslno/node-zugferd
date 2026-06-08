import type { invoicer } from "../../invoicer.js";

export const publicTransportData: typeof invoicer.$Infer.Input.En16931 = {
	exchangedDocument: {
		invoiceNumber: "E2018092011804",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2018-09-20"),
		invoiceNotes: [
			{
				content:
					"Bei Schriftwechsel bitte Ihre Kundennummer 35040727 und Belegnummer 2018092011804 angeben",
				subjectCode: "ADU",
			},
		],
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "0",
				},
				item: {
					name: "4-Fahrten-Karte Berlin AB",
					description:
						"Gültig ab 20.09.2018 15:39 Uhr bis 20.09.2018 17:39 Uhr Abschnitt: 1/4",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 8.41,
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
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
					itemTotals: {
						lineTotalAmount: 8.41,
					},
				},
			},
		],
		contract: {
			buyerReference: "05 158 004 - 11023 - 45",
			seller: {
				id: "549910",
				name: "Verkehrsbetriebe GmbH",
				contact: {
					personName: "Torti Mayer",
					phoneNumber: "+493012345678",
					emailAddress: "tm@verkehrsbetriebe.de",
				},
				postalAddress: {
					postCode: "12345",
					line1: "Musterstraße 3",
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
				id: "Liselotte Müllermann",
				name: "Liselotte Müllermann",
				postalAddress: {
					postCode: "12345",
					line1: "Beispielstraße 24",
					city: "Berlin",
					countryCode: "DE",
				},
			},
			associatedOrder: {
				issuerAssignedId: "2018092011804",
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2018-09-20"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			paymentMeans: {
				typeCode: "30",
				creditTransfers: [
					{
						iban: "DE12 1234 5678 9012 3456 78",
						accountName: "Verkehrsbetriebe GmbH",
					},
				],
			},
			vatBreakdown: [
				{
					calculatedAmount: 0.59,
					typeCode: "VAT",
					basisAmount: 8.41,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
			],
			paymentTerms: {
				description:
					"Zahlungsbedingungen: Der Rechnungsbetrag wurde bereits beglichen.",
				dueDate: new Date("2018-10-03"),
			},
			documentTotals: {
				lineTotalAmount: 8.41,
				taxBasisTotalAmount: 8.41,
				taxTotalAmount: {
					value: 0.59,
					currency: "EUR",
				},
				grandTotalAmount: 9,
				duePayableAmount: 9,
			},
		},
	},
};
