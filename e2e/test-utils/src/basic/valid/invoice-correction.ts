import type { basic } from "@node-zugferd/basic";

export const invoiceCorrectionData: typeof basic.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "RK21012345",
		invoiceTypeCode: "384",
		invoiceIssueDate: new Date("2019-09-16"),
		invoiceNotes: [
			{
				content: "Es bestehen Rabatt- oder Bonusvereinbarungen.",
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
			},
			{
				content: [
					"Bei Rückfragen:",
					"Telefon: +49 932 431 500",
					"E-Mail : max.muster@musterlieferant.de",
				].join("\n"),
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
			{
				content: [
					"Bestell-Nr         : B123456789",
					"Bestell-Datum      : 01.08.2019",
					"\n",
					"Lieferschein-Nr    : L87654321012345",
					"Lieferschein-Datum : 05.08.2019",
					"Ursprungsbeleg-Nr  : R87654321012345",
					"Reklamationsnummer : REKLA-2018-235",
				].join("\n"),
			},
			{
				content: [
					"Rechnungsempfänger",
					"GLN 4304171000002",
					"MUSTER-KUNDE GMBH",
					"\n",
					"KUNDENWEG 88",
					"40235 DUESSELDORF",
					"Kunden-Nr. : 009420",
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
					name: [
						"GTIN 4123456000014",
						"Art-Nr-Lieferant ZS9997",
						"Zitronensäure 100ml",
						"Verpackung: Flasche",
						"VKE/Geb: 1",
					].join("\n"),
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 1,
					},
				},
				delivery: {
					billedQuantity: {
						value: "-5.0000",
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
					name: [
						"GTIN 4123456000021",
						"Art-Nr-Lieferant GZ250",
						"Gelierzucker Extra 250g",
						"Verpackung: Karton",
						"VKE/Geb: 1",
					].join("\n"),
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 1.45,
					},
				},
				delivery: {
					billedQuantity: {
						value: "-2.0000",
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
				name: [
					"GLN 4333741000005",
					"Lief-Nr: 549910",
					"MUSTERLIEFERANT GMBH",
				].join("\n"),
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
				name: [
					"GLN 4304171000002",
					"Kunden-Nr. : 009420",
					"MUSTER-KUNDE GMBH",
				].join("\n"),
				postalAddress: {
					postCode: "40235",
					line1: "KUNDENWEG 88",
					city: "DUESSELDORF",
					countryCode: "DE",
				},
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2019-08-05"),
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
					actualAmount: -0.15,
					reason: "Rechnungsrabatt",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
				{
					actualAmount: -0.08,
					reason: "Rechnungsrabatt",
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
				duePayableAmount: -8.79,
			},
		},
	},
};
