import type { invoicer } from "../../invoicer.js";

export const partialInvoice2Data: typeof invoicer.$Infer.Input.En16931 = {
	exchangedDocument: {
		invoiceNumber: "471113",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-06-13"),
		invoiceNotes: [
			{
				content: "Rechnung gemäß Bestellung Nr. 2025-471331 vom 01.03.2025. ",
			},
			{
				content: "Es bestehen Rabatt- und Bonusvereinbarungen.",
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
					lineId: "1",
					includedNote: {
						content:
							"Bestellt wurden 5 kg Schweinesteak. Mit dieser Rechnung werden die nachgelieferten 4 kg Steaks berechnet.",
					},
				},
				item: {
					globalId: {
						value: "4000050986428",
						schemeId: "0160",
					},
					sellerAssignedId: "SFK5",
					buyerAssignedId: "BY_SFK5",
					name: "Schweinesteak",
					description: "Schweinesteak aus Deutschland",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 5.5,
					},
					netPrice: {
						chargeAmount: 5.5,
					},
				},
				delivery: {
					billedQuantity: {
						value: 4,
						unitCode: "KGM",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
					itemTotals: {
						lineTotalAmount: 22,
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
				id: "GE2020211",
				name: "Kunden AG Mitte",
				postalAddress: {
					postCode: "69876",
					line1: "Kundenstraße 15",
					city: "Frankfurt",
					countryCode: "DE",
				},
			},
			associatedOrder: {
				issuerAssignedId: "2025-471331",
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2025-06-03"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			vatBreakdown: [
				{
					calculatedAmount: 1.54,
					typeCode: "VAT",
					basisAmount: 22,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
			],
			paymentTerms: {
				description:
					"Zahlbar innerhalb 30 Tagen netto bis 04.07.2025, 3% Skonto innerhalb 10 Tagen bis 15.06.2025",
			},
			documentTotals: {
				lineTotalAmount: 22,
				taxBasisTotalAmount: 22,
				taxTotalAmount: {
					value: 1.54,
					currency: "EUR",
				},
				grandTotalAmount: 23.54,
				duePayableAmount: 23.54,
			},
		},
	},
};
