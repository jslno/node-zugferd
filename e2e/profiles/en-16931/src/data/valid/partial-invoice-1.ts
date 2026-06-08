import type { invoicer } from "../../invoicer.js";

export const partialInvoice1Data: typeof invoicer.$Infer.Input.En16931 = {
	exchangedDocument: {
		invoiceNumber: "471102",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-06-05"),
		invoiceNotes: [
			{
				content: "Rechnung gemäß Bestellung Nr. 2025-471331 vom 01.03.2025.",
			},
			{
				content: "Es bestehen Rabatt- und Bonusvereinbarungen.",
				subjectCode: "AAK",
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
							"Wir erlauben uns Ihnen folgende Positionen aus der Lieferung Nr. 2025-51112 in Rechnung zu stellen:",
					},
				},
				item: {
					globalId: {
						value: "4012345001235",
						schemeId: "0160",
					},
					sellerAssignedId: "KR3M",
					buyerAssignedId: "SE_KR",
					name: "Kunstrasen grün 3m breit",
					description: "300cm x 100 cm",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 4,
						discount: {
							actualAmount: 0.6667,
						},
					},
					netPrice: {
						chargeAmount: 3.3333,
					},
				},
				delivery: {
					billedQuantity: {
						value: 3,
						unitCode: "MTK",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
					itemTotals: {
						lineTotalAmount: 10,
					},
				},
			},
			{
				position: {
					lineId: "2",
					includedNote: {
						content:
							"Bestellt wurden 5 kg Schweinesteak. Mit dieser Rechnung werden nun die bereits gelieferten Steaks berechnet. Die noch offenen 4 kg Schweinesteak werden separat geliefert und berechnet.",
					},
				},
				item: {
					globalId: {
						value: "4000050986428",
						schemeId: "0160",
					},
					sellerAssignedId: "SFK5",
					buyerAssignedId: "SE_SFK",
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
						value: 1,
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
						lineTotalAmount: 5.5,
					},
				},
			},
			{
				position: {
					lineId: "3",
				},
				item: {
					globalId: {
						value: "4000001234561",
						schemeId: "0160",
					},
					sellerAssignedId: "GTRWA5",
					buyerAssignedId: "SE_GTRWA5",
					name: "Mineralwasser Medium 12 x 1,01 PET",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 5.49,
					},
					netPrice: {
						chargeAmount: 5.49,
					},
				},
				delivery: {
					billedQuantity: {
						value: 20,
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
						lineTotalAmount: 109.8,
					},
				},
			},
			{
				position: {
					lineId: "4",
				},
				item: {
					globalId: {
						value: "4000001234578",
						schemeId: "0160",
					},
					sellerAssignedId: "PFA5",
					buyerAssignedId: "SE_PFA5",
					name: "Pfand",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 2.77,
					},
					netPrice: {
						chargeAmount: 2.77,
					},
				},
				delivery: {
					billedQuantity: {
						value: 20,
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
						lineTotalAmount: 55.4,
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
					calculatedAmount: 7.91,
					typeCode: "VAT",
					basisAmount: 113.03,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
				{
					calculatedAmount: 12.24,
					typeCode: "VAT",
					basisAmount: 64.4,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			allowances: [
				{
					basisAmount: 10,
					actualAmount: 1,
					reason: "Sondernachlass",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
				{
					basisAmount: 115.3,
					actualAmount: 8.07,
					reason: "Sondernachlass",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
				},
			],
			charges: [
				{
					basisAmount: 115.3,
					actualAmount: 5.8,
					reason: "Versandkosten",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
				},
			],
			paymentTerms: {
				description:
					"Zahlbar innerhalb 30 Tagen netto bis 04.07.2025, 3% Skonto innerhalb 10 Tagen bis 15.06.2025",
			},
			documentTotals: {
				lineTotalAmount: 180.7,
				chargeTotalAmount: 5.8,
				allowanceTotalAmount: 9.07,
				taxBasisTotalAmount: 177.43,
				taxTotalAmount: {
					currency: "EUR",
					value: 20.15,
				},
				grandTotalAmount: 197.58,
				prepaidAmount: 50,
				duePayableAmount: 147.58,
			},
		},
	},
};
