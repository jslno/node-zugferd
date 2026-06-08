import type { invoicer } from "../../invoicer.js";

export const physiotherapistData: typeof invoicer.$Infer.Input.En16931 = {
	exchangedDocument: {
		invoiceNumber: "R25-31",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-10-03"),
		invoiceNotes: [
			{
				content: "Inhaber(in): Herr/Frau I(in) etc.",
				subjectCode: "REG",
			},
			{
				content: "ZUGFeRD vers 2.4.0 EN16931 (Comfort)",
				subjectCode: "ACB",
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
					sellerAssignedId: "SE0815",
					name: "Physiotherapie",
					description:
						"Behandlungen aufgrund der Verordnung von Frau Dr. Heilerin vom 05.09.2025 an folgenden Terminen: 11.09.2025; 14.09.2025; 19.09.2025; 24.09.2025; 27.09.2025; 11.10.2025; 15.10.2025; 17.10.2025; 22.10.2025; 30.10.2025",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 26,
					},
				},
				delivery: {
					billedQuantity: {
						value: 10,
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "E",
						rateApplicablePercent: 0,
					},
					itemTotals: {
						lineTotalAmount: 260,
					},
				},
			},
			{
				position: {
					lineId: "1",
				},
				item: {
					sellerAssignedId: "SE0816",
					name: "Hausbesuch",
					description:
						"An folgenden Terminen: 11.09.2025; 14.09.2025; 19.09.2025; 24.09.2025; 27.09.2025; 11.10.2025; 15.10.2025; 17.10.2025; 22.10.2025; 30.10.2025",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 12,
					},
				},
				delivery: {
					billedQuantity: {
						value: 10,
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "E",
						rateApplicablePercent: 0,
					},
					itemTotals: {
						lineTotalAmount: 120,
					},
				},
			},
		],
		contract: {
			seller: {
				name: "Physiotherapeutin",
				contact: {
					personName: "Tanja Tinder",
					phoneNumber: "015119630027",
					emailAddress: "tanja.tinder@beispiel-provider.de",
				},
				postalAddress: {
					postCode: "12345",
					line1: "Musterstraße 12",
					line2: "2. Etage",
					city: "Beispielstadt",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE136695976",
					},
				},
			},
			buyer: {
				name: "Liselotte Müller",
				postalAddress: {
					postCode: "12345",
					line1: "Rechnungsstraße 12",
					line2: "Haupteingang",
					city: "Beispielstadt",
					countryCode: "DE",
				},
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2025-10-25"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			paymentMeans: {
				typeCode: "30",
				creditTransfers: [
					{
						iban: "DE02120300000000202051",
						accountName: "Tanja Tinder",
					},
				],
			},
			vatBreakdown: [
				{
					calculatedAmount: 0,
					typeCode: "VAT",
					exemptionReason: "Steuerfreie Leistungen nach §4 Nr. 14 UStG",
					basisAmount: 380,
					categoryCode: "E",
					rateApplicablePercent: 0,
				},
			],
			invoicingPeriod: {
				startDate: new Date("2025-09-11"),
				endDate: new Date("2025-10-30"),
			},
			paymentTerms: {
				description:
					"Den Rechnungsbetrag überweisen Sie bitte bis zum 21.11.2025 auf das unten angegebene Konto.",
				dueDate: new Date("2025-11-21"),
			},
			documentTotals: {
				lineTotalAmount: 380,
				taxBasisTotalAmount: 380,
				taxTotalAmount: {
					value: 0,
					currency: "EUR",
				},
				grandTotalAmount: 380,
				duePayableAmount: 380,
			},
		},
	},
};
