import type { ProfileBasic } from "node-zugferd/profile";

const data: ProfileBasic = {
	number: "471102",
	typeCode: "380",
	issueDate: new Date("2024-11-15"),
	includedNote: [
		{
			content: "Rechnung gemäß Bestellung vom 01.11.2024.",
		},
		{
			content: `Lieferant GmbH				
Lieferantenstraße 20				
80333 München				
Deutschland				
Geschäftsführer: Hans Muster
Handelsregisternummer: H A 123`,
		},
		{
			content: `Unsere GLN: 4000001123452
Ihre GLN: 4000001987658
Ihre Kundennummer: GE2020211


Zahlbar innerhalb 30 Tagen netto bis 25.12.2024, 3% Skonto innerhalb 10 Tagen bis 25.11.2024.`,
		},
	],
	transaction: {
		line: [
			{
				identifier: "1",
				tradeProduct: {
					globalIdentifier: {
						schemeIdentifier: "0160",
						value: "4012345001235",
					},
					name: `GTIN: 4012345001235
Unsere Art.-Nr.: TB100A4
Trennblätter A4`,
				},
				tradeAgreement: {
					netTradePrice: {
						chargeAmount: "9.90",
					},
				},
				tradeDelivery: {
					billedQuantity: {
						unitMeasureCode: "H87",
						amount: "20.0000",
					},
				},
				tradeSettlement: {
					tradeTax: {
						typeCode: "VAT",
						categoryCode: "S",
						rateApplicablePercent: "19",
					},
					monetarySummation: {
						lineTotalAmount: "198.00",
					},
				},
			},
		],
		tradeAgreement: {
			seller: {
				name: "Lieferant GmbH",
				postalAddress: {
					postCode: "80333",
					line1: "Lieferantenstraße 20",
					city: "München",
					countryCode: "DE",
				},
				taxRegistration: {
					localIdentifier: "201/113/40209",
					vatIdentifier: "DE123456789",
				},
			},
			buyer: {
				name: "Kunden AG Mitte",
				postalAddress: {
					postCode: "69876",
					line1: "Hans Muster",
					line2: "Kundenstraße 15",
					city: "Frankfurt",
					countryCode: "DE",
				},
			},
		},
		tradeDelivery: {
			information: {
				deliveryDate: new Date("2024-11-14"),
			},
		},
		tradeSettlement: {
			currencyCode: "EUR",
			vatBreakdown: [
				{
					calculatedAmount: "37.62",
					typeCode: "VAT",
					basisAmount: "198.00",
					categoryCode: "S",
					rateApplicablePercent: "19.00",
				},
			],
			paymentTerms: {
				dueDate: new Date("2024-12-15"),
			},
			monetarySummation: {
				lineTotalAmount: "198.00",
				chargeTotalAmount: "0.00",
				allowanceTotalAmount: "0.00",
				taxBasisTotalAmount: "198.00",
				taxTotal: {
					amount: "37.62",
					currencyCode: "EUR",
				},
				grandTotalAmount: "235.62",
				duePayableAmount: "235.62",
			},
		},
	},
};

export default data;
