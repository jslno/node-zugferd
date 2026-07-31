import type { invoicer } from "./invoicer";

export const data: typeof invoicer.$Infer.Input.En16931 = {
	exchangedDocument: {
		invoiceNumber: "471102",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2018-03-05"),
		invoiceNotes: [
			{
				content: "Rechnung gemäß Bestellung vom 01.03.2018.",
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
					countrySubdivision: "Hessen",
				},
				organization: {
					tradingName: "Kunden AG GmbH",
				},
				contact: {
					personName: "Frau Erika Mustermann",
					departmentName: "Einkauf",
					phoneNumber: "+49 69 1234567",
					emailAddress: "erika.mustermann@kunden.de",
				},
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2018-03-05"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			allowances: [
				{
					basisAmount: 220,
					actualAmount: 22,
					calculationPercent: 10,
					reason: "Document Level Allowance",
				},
			],
			charges: [
				{
					basisAmount: 220,
					actualAmount: 22,
					calculationPercent: 10,
					reason: "Document Level Charge",
				},
			],
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
				dueDate: new Date("2019-03-05"),
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
