import type { ProfileMinimum } from "node-zugferd/profile";

const data: ProfileMinimum = {
	number: "471102",
	issueDate: new Date("2024-11-15"),
	typeCode: "380",
	transaction: {
		tradeAgreement: {
			seller: {
				name: "Lieferant GmbH",
				postalAddress: {
					countryCode: "DE",
				},
				organization: {
					registrationIdentifier: {
						schemeIdentifier: "0002",
						value: "registrationIdentifier",
					},
				},
				taxRegistration: {
					localIdentifier: "201/113/40209",
					vatIdentifier: "DE123456789",
				},
			},
			buyer: {
				name: "Kunden AG Frankreich",
				organization: {
					registrationIdentifier: {
						schemeIdentifier: "0002",
						value: "registrationIdentifier",
					},
				},
			},
			buyerReference: "buyerReference",
			associatedOrder: {
				purchaseOrderReference: "orderReference",
			},
		},
		tradeDelivery: {},
		tradeSettlement: {
			currencyCode: "EUR",
			/*vatBreakdown: [
				{
					basisAmount: "198.00",
					calculatedAmount: "37.62",
					typeCode: "VAT",
					categoryCode: "S",
					rateApplicablePercent: "19",
					dueDateTypeCode: "1",
					exemptionReasonCode: "vatex-eu-132",
					exemptionReasonText: "test",
				},
			],*/
			monetarySummation: {
				taxBasisTotalAmount: "198.00",
				taxTotal: {
					currencyCode: "EUR",
					amount: "37.62",
				},
				grandTotalAmount: "235.62",
				duePayableAmount: "235.62",
			},
			/*invoicingPeriod: {
				startDate: new Date("2024-11-15"),
				endDate: new Date("2024-11-30"),
			},*/
		},
	},
};

export default data;
