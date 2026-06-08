import type { invoicer } from "../../invoicer";

export const invoiceCorrectionData: typeof invoicer.$Infer.Input.Extended = {
	processControl: {
		testIndicator: true,
		businessContextInfo: {
			processType: "Beispielgeschäftsprozess",
		},
	},
	exchangedDocument: {
		invoiceNumber: "RK21012345",
		name: "RECHNUNGS-KORREKTUR",
		invoiceTypeCode: "384",
		invoiceIssueDate: new Date("2025-10-01"),
		invoiceNotes: [
			{
				contentCode: "ST3",
				content: "Es bestehen Rabatt- oder Bonusvereinbarungen.",
				subjectCode: "AAK",
			},
			{
				content:
					"Geschäftsführer: Herr Geschäftsführer , Muster Maschinenbau GmbH etc.",
				subjectCode: "REG",
			},
			{
				content:
					"Es bestehen Vereinbarungen, aus denen sich Minderungen des Entgelts ergeben können.",
				subjectCode: "AAI",
			},
			{
				content: "ZUGFeRD vers 2.4.0 (Extended)",
				subjectCode: "ACB",
			},
			{
				content:
					"Dies ist eine Beispiel-für eine Korrektur einer Rechnung (Type 384)",
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
						value: "4123456000014",
						schemeId: "0160",
					},
					sellerAssignedId: "ZS997",
					name: "Zitronensäure 100ml",
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
					packageQuantity: {
						value: 1,
						unitCode: "XBO",
					},
				},
				billing: {
					vatBreakdown: [
						{
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
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
						schemeId: "0160",
					},
					sellerAssignedId: "GZ250",
					name: "Gelierzucker Extra 250g",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 1.5,
						discount: [
							{
								actualAmount: 0.03,
								reason: "Artikelrabatt 1",
							},
							{
								actualAmount: 0.02,
								reason: "Artikelrabatt 2",
							},
						],
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
					packageQuantity: {
						value: 1,
						unitCode: "XCT",
					},
				},
				billing: {
					vatBreakdown: [
						{
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: 7,
						},
					],
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
				contact: [
					{
						phoneNumber: "+49 932 431 500",
						emailAddress: "max.mustermann@musterlieferant.de",
					},
				],
				postalAddress: {
					postCode: "98765",
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
				globalId: {
					value: "4304171000002",
					schemeId: "0088",
				},
				name: "MUSTER-KUNDE GMBH",
				postalAddress: {
					postCode: "12345",
					line1: "KUNDENWEG 88",
					city: "KUNDENDORF",
					countryCode: "DE",
				},
			},
			associatedOrder: {
				issuerAssignedId: "B123456789",
			},
			tenderOrLotReferences: [
				{
					issuerAssignedId: "REKLA-2018-235",
				},
				{
					issuerAssignedId: "R87654321012345",
				},
			],
		},
		delivery: {
			recipient: {
				globalLocationId: {
					value: "4304171088093",
					schemeId: "0088",
				},
				name: "MUSTER-MARKT",
				contact: [
					{
						departmentName: "8211",
					},
				],
				postalAddress: {
					postCode: "54321",
					line1: "HAUPTSTRASSE 44",
					city: "LIEFERSTADT",
					countryCode: "DE",
				},
			},
			actualDelivery: {
				date: new Date("2025-10-01"),
			},
			deliveryNoteReferencedDocuments: [
				{
					issuerAssignedId: "L87654321012345",
				},
			],
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			invoicee: {
				id: "009420",
				globalId: [
					{
						value: "4304171000002",
						schemeId: "0088",
					},
				],
				name: "MUSTER-KUNDE GMBH",
				postalAddress: {
					postCode: "123456",
					line1: "KUNDENWEG 88",
					city: "KUNDENDORF",
					countryCode: "DE",
				},
			},
			vatBreakdown: [
				{
					calculatedAmount: -0.92,
					typeCode: "VAT",
					basisAmount: -4.85,
					lineTotalBasisAmount: -5,
					allowanceChargeBasisAmount: 0.15,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
				{
					calculatedAmount: -0.2,
					typeCode: "VAT",
					basisAmount: -2.82,
					lineTotalBasisAmount: -2.9,
					allowanceChargeBasisAmount: 0.08,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
			],
			allowances: [
				{
					calculationPercent: 2,
					basisAmount: -5,
					actualAmount: -0.1,
					reason: "Rechnungsrabatt 1",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
				{
					calculationPercent: 2,
					basisAmount: -2.9,
					actualAmount: -0.06,
					reason: "Rechnungsrabatt 1",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
				},
				{
					basisAmount: -5,
					actualAmount: -0.05,
					reason: "Rechnungsrabatt 2",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
				{
					basisAmount: -2.9,
					actualAmount: -0.02,
					reason: "Rechnungsrabatt 2",
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
