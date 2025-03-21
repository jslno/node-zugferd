import type { ProfileExtended } from "../../profiles";

const data: ProfileExtended = {
	number: "47110819",
	typeCode: "380",
	issueDate: new Date("2024-11-15"),
	includedNote: [
		{
			content: `Mitglieder der Geschäftsleitung:
Geschäftsführerin: Johanna Musterfrau
Prokuristin: Isabell Herrlich
HRB Berlin 13086`,
		},
	],
	transaction: {
		line: [
			{
				identifier: "1",
				tradeProduct: {
					name: "Lieferung und Montage Bauträger",
				},
				tradeAgreement: {
					netTradePrice: {
						chargeAmount: "20000.00",
						basisQuantity: {
							amount: 1,
							unitMeasureCode: "H87",
						},
					},
				},
				tradeDelivery: {
					billedQuantity: {
						amount: 1,
						unitMeasureCode: "H87",
					},
				},
				tradeSettlement: {
					tradeTax: {
						typeCode: "VAT",
						categoryCode: "S",
						rateApplicablePercent: "19",
					},
					linePeriod: {
						startDate: new Date("2024-06-01"),
						endDate: new Date("2024-10-31"),
					},
					monetarySummation: {
						lineTotalAmount: "20000",
					},
				},
			},
		],
		tradeAgreement: {
			seller: {
				name: "Groß und Breit Bau AG",
				postalAddress: {
					postCode: "12345",
					line1: "Erdkuhl 5",
					city: "Berlin",
					countryCode: "DE",
				},
				taxRegistration: {
					vatIdentifier: "DE999999999",
				},
			},
			buyer: {
				identifier: "D75969813",
				name: "Metallbau Leipzig GmbH &amp; Co. KG",
				postalAddress: {
					postCode: "12345",
					line1: "Pappelallee 15",
					line2: "Hof 3",
					city: "Leipzig",
					countryCode: "DE",
				},
				taxRegistration: {
					vatIdentifier: "DE123456789",
				},
			},
		},
		tradeDelivery: {
			shipTo: {
				name: "Baustelle",
				postalAddress: {
					postCode: "98765",
					line1: "Eichenpromenade 37",
					line2: "Tor 1",
					city: "Metallstadt",
					countryCode: "DE",
				},
			},
			information: {
				deliveryDate: new Date("2024-10-31"),
			},
		},
		tradeSettlement: {
			currencyCode: "EUR",
			paymentInstruction: {
				typeCode: "58",
				transfers: [
					{
						accountName: "Groß und Breit Bau AG",
						paymentAccountIdentifier: "DE77 3707 0060 0321 9870 00",
					},
				],
			},
			vatBreakdown: [
				{
					calculatedAmount: "3800",
					typeCode: "VAT",
					basisAmount: "20000",
					categoryCode: "S",
					rateApplicablePercent: "19",
				},
			],
			paymentTerms: {
				dueDate: new Date("2024-11-29"),
			},
			monetarySummation: {
				lineTotalAmount: "20000.00",
				taxBasisTotalAmount: "20000.00",
				taxTotal: {
					currencyCode: "EUR",
					amount: "3800.00",
				},
				grandTotalAmount: "23800.00",
				paidAmount: "11900.00",
				duePayableAmount: "11900.00",
			},

			advancePayment: [
				{
					paidAmount: "2975.00",
					tradeTax: [
						{
							calculatedAmount: "1900",
							categoryCode: "S",
							rateApplicablePercent: "19",
						},
					],
					date: new Date("2024-06-07"),
					precendingInvoice: {
						issuerAssignedID: "R202406-01",
						date: new Date("2024-06-01"),
					},
				},
				{
					paidAmount: "2975.00",
					tradeTax: [
						{
							calculatedAmount: "1900",
							categoryCode: "S",
							rateApplicablePercent: "19",
						},
					],
					date: new Date("2024-06-15"),
					precendingInvoice: {
						issuerAssignedID: "R202407-01",
						date: new Date("2024-07-01"),
					},
				},
				{
					paidAmount: "2975.00",
					tradeTax: [
						{
							calculatedAmount: "1900",
							categoryCode: "S",
							rateApplicablePercent: "19",
						},
					],
					date: new Date("2024-08-12"),
					precendingInvoice: {
						issuerAssignedID: "R202408-01",
						date: new Date("2024-08-01"),
					},
				},
				{
					paidAmount: "2975.00",
					tradeTax: [
						{
							calculatedAmount: "1900",
							categoryCode: "S",
							rateApplicablePercent: "19",
						},
					],
					date: new Date("2024-09-16"),
					precendingInvoice: {
						issuerAssignedID: "R202409-01",
						date: new Date("2024-09-02"),
					},
				},
			],
		},
	},
};

export default data;
