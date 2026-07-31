import type { en16931 } from "@node-zugferd/en-16931";

export const invoiceCorrectionData: typeof en16931.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "RK21012345",
		invoiceTypeCode: "384",
		invoiceIssueDate: new Date("2018-09-16"),
		invoiceNotes: [
			{
				content: "Es bestehen Rabatt- oder Bonusvereinbarungen.",
				subjectCode: "AAK",
			},
			{
				content: [
					"MUSTERLIEFERANT GMBH",
					"BAHNHOFSTRASSE 99",
					"99199 MUSTERHAUSEN",
					"Geschäftsführung:",
					"Max Mustermann",
					"USt-IdNr: DE123456789",
					"Telefon: +49 932 431 0",
					"www.musterlieferant.de",
					"HRB Nr. 372876",
					"Amtsgericht Musterstadt",
					"GLN 4304171000002",
				].join("\n"),
				subjectCode: "REG",
			},
			{
				content: [
					"Bei Rückfragen:",
					"Telefon: +49 932 431 500",
					"E-Mail : max.muster@musterlieferant.de",
				].join("\n"),
			},
			{
				content:
					"Ursprungsbeleg-Nr  : R87654321012345\nReklamationsnummer : REKLA-2018-235",
			},
			{
				content: [
					"Warenempfänger",
					"GLN 430417088093",
					"MUSTER-MARKT",
					"\n",
					"HAUPTSTRASSE 44",
					"31157 SARSTEDT",
					"\n",
					"Abteilung : 8211",
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
						value: "4123456000014",
						schemeId: "0088",
					},
					sellerAssignedId: "ZS997",
					name: "Zitronensäure 100ml",
					description: "Verpackung: Flasche\nVKE/Geb: 1",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 1,
					},
					netPrice: {
						chargeAmount: 1,
					},
				},
				delivery: {
					billedQuantity: {
						value: -5,
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
						lineTotalAmount: -5,
					},
				},
			},
			{
				position: {
					lineId: "2",
				},
				item: {
					globalId: {
						value: "4123456000021",
						schemeId: "0088",
					},
					sellerAssignedId: "GZ250",
					name: "Gelierzucker Extra 250mg",
					description: "Verpackung: Karton\nVKE/Geb: 1",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 1.5,
						discount: {
							actualAmount: 0.05,
						},
					},
					netPrice: {
						chargeAmount: 1.45,
					},
				},
				delivery: {
					billedQuantity: {
						value: -2,
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
						lineTotalAmount: -2.9,
					},
				},
			},
		],
		contract: {
			seller: {
				id: "549910",
				globalId: {
					value: "4333741000005",
					schemeId: "0088",
				},
				name: "MUSTERLIEFERANT GMBH",
				postalAddress: {
					postCode: "99199",
					line1: "BAHNHOFSTRASSE 99",
					city: "MUSTERHAUSEN",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE123456789",
					},
				},
			},
			buyer: {
				id: "009420",
				name: "MUSTER-KUNDE GMBH",
				postalAddress: {
					postCode: "40235",
					line1: "KUNDENWEG 88",
					city: "DUESSELDORF",
					countryCode: "DE",
				},
			},
			associatedOrder: {
				issuerAssignedId: "B123456789",
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2018-08-05"),
			},
			despatchAdvice: {
				issuerAssignedId: "L87654321012345",
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			vatBreakdown: [
				{
					calculatedAmount: -0.92,
					typeCode: "VAT",
					basisAmount: -4.85,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
				{
					calculatedAmount: -0.2,
					typeCode: "VAT",
					basisAmount: -2.82,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
			],
			allowances: [
				{
					actualAmount: -0.1,
					reason: "Rechnungsrabatt 1 -2,00% Basisbetrag: -5,00, MwSt. % 19,0",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
				{
					actualAmount: -0.06,
					reason: "Rechnungsrabatt 1 -2,00% Basisbetrag: -2,90, MwSt. % 7,0",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
				},
				{
					actualAmount: -0.05,
					reason: "Rechnungsrabatt 2  Basisbetrag: -5,00, MwSt. % 19,0",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
				{
					actualAmount: -0.02,
					reason: "Rechnungsrabatt 2  Basisbetrag: -2,90, MwSt. % 7,0",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
				},
			],
			documentTotals: {
				lineTotalAmount: -7.9,
				chargeTotalAmount: 0,
				allowanceTotalAmount: -0.23,
				taxBasisTotalAmount: -7.67,
				taxTotalAmount: {
					value: -1.12,
					currency: "EUR",
				},
				grandTotalAmount: -8.79,
				prepaidAmount: 0,
				duePayableAmount: -8.79,
			},
		},
	},
};
