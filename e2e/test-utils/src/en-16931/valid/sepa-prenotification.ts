import type { en16931 } from "@node-zugferd/en-16931";

export const sepaPrenotificationData: typeof en16931.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "471102",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2018-03-05"),
		invoiceNotes: [
			{
				content: "Rechnung gemäß Bestellung Nr. 2018-471331 vom 01.03.2018.",
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
					sellerAssignedId: "TB100A4",
					name: "Trennblätter A4",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 9.9,
					},
					netPrice: {
						chargeAmount: 9.9,
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
						lineTotalAmount: 198,
					},
				},
			},
			{
				position: {
					lineId: "2",
				},
				item: {
					globalId: {
						value: "4000050986428",
						schemeId: "0160",
					},
					sellerAssignedId: "ARNR2",
					name: "Joghurt Banane",
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
						value: 50,
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
						lineTotalAmount: 275,
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
		},
		delivery: {
			actualDelivery: {
				date: new Date("2018-03-05"),
			},
		},
		debit: {
			creditorReferenceId: "DE98ZZZ09999999999",
			invoiceCurrencyCode: "EUR",
			paymentMeans: {
				typeCode: "59",
				buyerBankDetails: {
					iban: "DE21860000000086001055",
				},
			},
			vatBreakdown: [
				{
					calculatedAmount: 19.25,
					typeCode: "VAT",
					basisAmount: 275,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
				{
					calculatedAmount: 37.62,
					typeCode: "VAT",
					basisAmount: 198,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			paymentTerms: {
				description:
					"Der Betrag in Höhe von EUR 529,87 wird am 20.03.2018 von Ihrem Konto per SEPA-Lastschrift eingezogen.",
				mandateId: "REF A-123",
			},
			documentTotals: {
				lineTotalAmount: 473,
				chargeTotalAmount: 0,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 473,
				taxTotalAmount: {
					value: 56.87,
					currency: "EUR",
				},
				grandTotalAmount: 529.87,
				prepaidAmount: 0,
				duePayableAmount: 529.87,
			},
		},
	},
};
