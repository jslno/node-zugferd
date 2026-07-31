import type { extended } from "@node-zugferd/extended";

export const goodsInvoiceData: typeof extended.$Infer.Input = {
	processControl: {
		testIndicator: true,
	},
	exchangedDocument: {
		invoiceNumber: "R87654321012345",
		name: "WARENRECHNUNG",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-10-01"),
		invoiceNotes: [
			{
				content:
					"Geschäftsführer: Herr Geschäftsführer ,  MUSTERLIEFERANT GmbH",
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
				content: "Dies ist ein Waren-Rechnungs-Beispiel",
				subjectCode: "ACB",
			},
			{
				contentCode: "ST3",
				content: "Es bestehen Rabatt- oder Bonusvereinbarungen.",
				subjectCode: "AAK",
			},
			{
				contentCode: "EEV",
				content:
					"Der Verkäufer bleibt Eigentümer der Waren bis zu vollständigen Erfüllung der Kaufpreisforderung.",
				subjectCode: "AAJ",
			},
			{
				content: "Leergutwert: 46,50",
			},
			{
				content:
					"Wichtige Information: Bei Bestellungen bis zum 19.12. ist die Auslieferung bis spätestens 23.12. garantiert.",
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
					attributes: [
						{
							description: "Verpackungsart",
							value: "BO",
						},
					],
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
						value: 100,
						unitCode: "H87",
					},
					packageQuantity: {
						value: 4,
						unitCode: "XCT",
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
						lineTotalAmount: 100,
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
						value: 50,
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
						lineTotalAmount: 72.5,
					},
				},
			},
			{
				position: {
					lineId: "3",
				},
				item: {
					globalId: {
						value: "",
						schemeId: "0160",
					},
					sellerAssignedId: "GZ250",
					name: "Gelierzucker Extra 250g",
					description: "Artikel wie vereinbart ohne Berechnung",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 0,
					},
					netPrice: {
						chargeAmount: 0,
					},
				},
				delivery: {
					billedQuantity: {
						value: 10,
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
						lineTotalAmount: 0,
					},
				},
			},
			{
				position: {
					lineId: "4",
				},
				item: {
					globalId: {
						value: "4100130013294",
						schemeId: "0160",
					},
					sellerAssignedId: "2031",
					name: "Bierbau Pils 20/0500",
					description: "EAN-VKE: 4100130913297",
					attributes: [
						{
							description: "Verpackung",
							value: "Kiste",
						},
					],
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 12,
					},
					netPrice: {
						chargeAmount: 12,
					},
				},
				delivery: {
					billedQuantity: {
						value: 15,
						unitCode: "XBC",
					},
					packageQuantity: {
						value: 20,
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
						lineTotalAmount: 180,
					},
				},
			},
			{
				position: {
					lineId: "5",
				},
				item: {
					globalId: {
						value: "2001015001325",
						schemeId: "0160",
					},
					sellerAssignedId: "1805",
					buyerAssignedId: "4711",
					name: "Leergutpfand 20 x 0,51",
					attributes: [
						{
							description: "Verpackung",
							value: "unverpackt",
						},
					],
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 3.1,
					},
					netPrice: {
						chargeAmount: 3.1,
					},
				},
				delivery: {
					billedQuantity: {
						value: 15,
						unitCode: "H87",
					},
					packageQuantity: {
						value: 1,
						unitCode: "XBC",
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
						lineTotalAmount: 46.5,
					},
				},
			},
			{
				position: {
					lineId: "6",
				},
				item: {
					globalId: {
						value: "4123456000038",
						schemeId: "0160",
					},
					sellerAssignedId: "MP107",
					name: "Mischpalette Joghurt Karton 3 x 20",
					attributes: [
						{
							description: "Verpackung",
							value: "Karton",
						},
					],
					includedReferencedProducts: [
						{
							globalId: [
								{
									value: "4123456001035",
									schemeId: "0160",
								},
							],
							sellerAssignedId: "JOG103",
							name: "Erdbeer 20 x 150g Becher",
							unitQuantity: {
								value: 20,
								unitCode: "H87",
							},
						},
						{
							globalId: [
								{
									value: "4123456002032",
									schemeId: "0160",
								},
							],
							sellerAssignedId: "JOG203",
							name: "Banane 20 x 150g Becher",
							unitQuantity: {
								value: 20,
								unitCode: "H87",
							},
						},
						{
							globalId: [
								{
									value: "4123456003039",
									schemeId: "0160",
								},
							],
							sellerAssignedId: "JOG303",
							name: "Schoko 20 x 150g Becher",
							unitQuantity: {
								value: 20,
								unitCode: "H87",
							},
						},
					],
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 30,
						discount: [
							{
								actualAmount: 0.9,
								reason: "Artikelrabatt 1",
							},
						],
					},
					netPrice: {
						chargeAmount: 29.1,
					},
				},
				delivery: {
					billedQuantity: {
						value: 2,
						unitCode: "H87",
					},
					packageQuantity: {
						value: 1,
						unitCode: "XPX",
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
						lineTotalAmount: 58.2,
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
					postCode: "99199",
					line1: "BAHNHOFSTRASSE 99",
					city: "MUSTERHAUSEN",
					countryCode: "DE",
				},
				electronicAddress: {
					value: "info@musterlieferant.de",
					schemeId: "0088",
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
					postCode: "40235",
					line1: "KUNDENWEG 88",
					city: "KUNDENSTADT",
					countryCode: "DE",
				},
			},
			associatedOrder: {
				issuerAssignedId: "B123456789",
			},
			tenderOrLotReferences: [
				{
					issuerAssignedId: "A456123",
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
					postCode: "31157",
					line1: "HAUPTSTRASSE 44",
					city: "SARSTEDT",
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
					postCode: "40235",
					line1: "KUNDENWEG 88",
					city: "DUESSELDORF",
					countryCode: "DE",
				},
			},
			vatBreakdown: [
				{
					calculatedAmount: 61.07,
					typeCode: "VAT",
					basisAmount: 321.4,
					lineTotalBasisAmount: 326.5,
					allowanceChargeBasisAmount: -5.1,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
				{
					calculatedAmount: 8.93,
					typeCode: "VAT",
					basisAmount: 127.59,
					lineTotalBasisAmount: 130.7,
					allowanceChargeBasisAmount: -3.11,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
			],
			allowances: [
				{
					calculationPercent: 2,
					basisAmount: 280,
					actualAmount: 5.6,
					reason: "Rechnungsrabatt 1",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
				{
					calculationPercent: 2,
					basisAmount: 130.7,
					actualAmount: 2.61,
					reason: "Rechnungsrabatt 1",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
				},
				{
					basisAmount: 280,
					actualAmount: 2.5,
					reason: "Rechnungsrabatt 2",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
				{
					basisAmount: 130.7,
					actualAmount: 0.5,
					reason: "Rechnungsrabatt 2",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
				},
			],
			logisticsServiceFees: [
				{
					description: "Transportkosten",
					feeAmount: 3,
					appliedTradeTax: [
						{
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
				},
			],
			paymentTerms: [
				{
					description:
						"Bei Zahlung innerhalb 14 Tagen gewähren wir 2,0% Skonto.",
					discountTerms: [
						{
							dueDatePeriodBasis: {
								value: 14,
								unitCode: "DAY",
							},
							calculationPercent: 2,
						},
					],
				},
			],
			documentTotals: {
				lineTotalAmount: 457.2,
				chargeTotalAmount: 3,
				allowanceTotalAmount: 11.21,
				taxBasisTotalAmount: 448.99,
				taxTotalAmount: {
					value: 70,
					currency: "EUR",
				},
				grandTotalAmount: 518.99,
				prepaidAmount: 0,
				duePayableAmount: 518.99,
			},
		},
	},
};
