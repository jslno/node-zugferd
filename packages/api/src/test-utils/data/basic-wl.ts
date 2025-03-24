import type { ProfileBasicWL } from "node-zugferd/profile";

const data: ProfileBasicWL = {
	number: "TX-471102",
	typeCode: "380",
	issueDate: new Date("2024-11-15"),
	includedNote: [
		{
			content: "Rechnung gemäß Taxifahrt vom 14.11.2024",
		},
		{
			content: `Taxiunternehmen TX GmbH				
Lieferantenstraße 20				
10369 Berlin				
Deutschland				
Geschäftsführer: Hans Mustermann
Handelsregisternummer: H A 123`,
		},
		{
			content: `Unsere GLN: 4000001123452
Ihre GLN: 4000001987658
Ihre Kundennummer: GE2020211`,
		},
	],
	transaction: {
		tradeAgreement: {
			seller: {
				name: "Taxiunternehmen TX GmbH",
				postalAddress: {
					postCode: "10369",
					line1: "Lieferantenstraße 20",
					city: "Berlin",
					countryCode: "DE",
				},
				taxRegistration: {
					vatIdentifier: "DE123456789",
				},
			},
			buyer: {
				name: "Taxi-Gast AG Mitte",
				postalAddress: {
					postCode: "13351",
					line1: "Hans Mustermann",
					line2: "Kundenstraße 15",
					city: "Berlin",
					countryCode: "DE",
				},
			},
		},
		tradeDelivery: {
			information: {
				deliveryDate: new Date("2024-09-19"),
			},
		},
		tradeSettlement: {
			currencyCode: "EUR",
			vatBreakdown: [
				{
					calculatedAmount: "1.18",
					typeCode: "VAT",
					basisAmount: "16.90",
					categoryCode: "S",
					rateApplicablePercent: "7",
				},
			],
			paymentTerms: {
				dueDate: new Date("2024-12-15"),
			},
			monetarySummation: {
				lineTotalAmount: "16.90",
				chargeTotalAmount: "0.00",
				allowanceTotalAmount: "0.00",
				taxBasisTotalAmount: "16.90",
				taxTotal: {
					currencyCode: "EUR",
					amount: "1.18",
				},
				grandTotalAmount: "18.08",
				duePayableAmount: "18.08",
			},
		},
	},
};

export default data;
