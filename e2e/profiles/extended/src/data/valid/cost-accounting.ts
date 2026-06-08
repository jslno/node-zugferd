import type { invoicer } from "../../invoicer";

export const costAccountingData: typeof invoicer.$Infer.Input.Extended = {
	processControl: {
		testIndicator: true,
	},
	exchangedDocument: {
		invoiceNumber: "KR87654321012",
		name: "KOSTENRECHNUNG",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-12-01"),
		invoiceNotes: [
			{
				contentCode: "ST3",
				content: "Es bestehen Rabatt- oder Bonusvereinbarungen.",
				subjectCode: "AAK",
			},
			{
				contentCode: "EEV",
				content:
					"Der Verkäufer bleibt Eigentümer der Waren bis zur vollständigen Erfüllung der Kaufpreisforderung.",
				subjectCode: "AAJ",
			},
			{
				content: "Geschäftsführer: Max Mustermann",
				subjectCode: "REG",
			},
			{
				content: "Handelsregister: HRB Nr. 372876",
				subjectCode: "REG",
			},
			{
				content: "Amtsgericht Musterstadt",
				subjectCode: "REG",
			},
			{
				content: "ZUGFeRD vers 2.4.0 (Extended)",
				subjectCode: "ACB",
			},
			{
				content: "Dies ist ein Beispiel für eine Kostenrechnung",
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
					sellerAssignedId: "WA997",
					name: "Wirkarbeit HT",
					attributes: [
						{
							description: "Zählpunkt",
							value: "DE0001346484600000000000000100038",
						},
					],
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 0.052,
					},
					netPrice: {
						chargeAmount: 0.052,
					},
				},
				delivery: {
					billedQuantity: {
						value: 1000,
						unitCode: "KWH",
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
						lineTotalAmount: 52,
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
					sellerAssignedId: "ÖST250",
					name: "Ökosteuer Lieferant",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 0.0205,
					},
					netPrice: {
						chargeAmount: 0.0205,
					},
				},
				delivery: {
					billedQuantity: {
						value: 1000,
						unitCode: "KWH",
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
						lineTotalAmount: 20.5,
					},
				},
			},
			{
				position: {
					lineId: "3",
				},
				item: {
					globalId: {
						value: "4260331811362",
						schemeId: "0088",
					},
					name: "Kommissionierer 1250032 D. Muster",
					description: "Besteller: Hr. Mayer, Personalnr. 4488",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 15,
						discount: [
							{
								actualAmount: 4.5,
								reason: "Artikelrabatt 1",
							},
						],
					},
					netPrice: {
						chargeAmount: 10.5,
					},
				},
				delivery: {
					billedQuantity: {
						value: 27.5,
						unitCode: "HUR",
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
						lineTotalAmount: 288.75,
					},
				},
			},
			{
				position: {
					lineId: "4",
				},
				item: {
					globalId: {
						value: "2001015001325",
						schemeId: "0088",
					},
					sellerAssignedId: "FB05",
					name: "FALTENBEUTEL 16x6x28 CM",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 0.0105,
					},
					netPrice: {
						chargeAmount: 0.0105,
					},
				},
				delivery: {
					billedQuantity: {
						value: 3500,
						unitCode: "H87",
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
						lineTotalAmount: 36.75,
					},
				},
			},
			{
				position: {
					lineId: "5",
				},
				item: {
					globalId: {
						value: "4123456000038",
						schemeId: "0088",
					},
					sellerAssignedId: "KOP05",
					name: "Kopierpapier A4",
					description: "Zählerstand von-bis: 543210 - 544420",
					attributes: [
						{
							description: "Zähler-Nr.",
							value: "MG-X79318",
						},
					],
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 0.01,
					},
					netPrice: {
						chargeAmount: 0.01,
					},
				},
				delivery: {
					billedQuantity: {
						value: 1210,
						unitCode: "H87",
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
						lineTotalAmount: 12.1,
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
				taxRegistration: {
					local: {
						id: "201/113/40209",
					},
				},
			},
			buyer: {
				id: "339420",
				globalId: {
					value: "4304171000002",
					schemeId: "0088",
				},
				name: "MUSTER-KUNDE GMBH",
				postalAddress: {
					postCode: "40235",
					line1: "KUNDENWEG 88",
					city: "DUESSELDORF",
					countryCode: "DE",
				},
			},
			invoicedObjectIdentifier: [
				{
					issuerAssignedId: "A777123",
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
						departmentName: "7322",
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
				date: new Date("2025-11-11"),
			},
			deliveryNoteReferencedDocuments: [
				{
					issuerAssignedId: "L87654321012",
				},
			],
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			invoicee: {
				id: "339420",
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
					calculatedAmount: 76.67,
					typeCode: "VAT",
					basisAmount: 403.55,
					lineTotalBasisAmount: 410.1,
					allowanceChargeBasisAmount: -6.55,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			allowances: [
				{
					basisAmount: 410.1,
					actualAmount: 21.55,
					reason: "Sonderrabatt",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
			],
			logisticsServiceFees: [
				{
					description: "Transportkosten: Frachtbetrag",
					feeAmount: 15,
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
						"Skontovereinbarung: 2% bei Zahlung innerhalb 10 Tagen nach Rechnungsdatum",
					discountTerms: [
						{
							dueDatePeriodBasis: {
								value: 2,
								unitCode: "DAY",
							},
							calculationPercent: 2,
						},
					],
				},
			],
			documentTotals: {
				lineTotalAmount: 410.1,
				chargeTotalAmount: 15,
				allowanceTotalAmount: 21.55,
				taxBasisTotalAmount: 403.55,
				taxTotalAmount: {
					value: 76.67,
					currency: "EUR",
				},
				grandTotalAmount: 480.22,
				prepaidAmount: 0,
				duePayableAmount: 480.22,
			},
		},
	},
};
