import type { xrechnung } from "@node-zugferd/xrechnung";

export const simpleData: typeof xrechnung.$Infer.Input = {
	processControl: {
		businessContextInfo: {
			processType: "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",
		},
	},
	exchangedDocument: {
		invoiceNumber: "471102",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2024-11-15"),
		invoiceNotes: [
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
			buyerReference: "04011000-12345-34",
			seller: {
				globalId: {
					value: "4000001123452",
					schemeId: "0088",
				},
				name: "Lieferant GmbH",
				contact: {
					personName: "Max Mustermann",
					departmentName: "Muster-Einkauf",
					phoneNumber: "+49891234567",
					emailAddress: "Max@Mustermann.de",
				},
				postalAddress: {
					postCode: "80333",
					line1: "Lieferantenstraße 20",
					city: "München",
					countryCode: "DE",
				},
				electronicAddress: {
					value: "info@Mustermann.de",
					schemeId: "EM",
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
				},
				electronicAddress: {
					value: "info@kunde.de",
					schemeId: "EM",
				},
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2024-11-14"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			paymentMeans: {
				typeCode: "58",
				information: "Zahlung per SEPA Überweisung.",
				creditTransfers: [
					{
						iban: "DE02120300000000202051",
						accountName: "Kunden AG",
					},
				],
				sellerBankDetails: {
					bic: "BYLADEM1001",
				},
			},
			vatBreakdown: [
				{
					typeCode: "VAT",
					calculatedAmount: 19.25,
					basisAmount: 275,
					categoryCode: "S",
					rateApplicablePercent: 7,
				},
				{
					typeCode: "VAT",
					calculatedAmount: 37.62,
					basisAmount: 198,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			paymentTerms: {
				description: "#SKONTO#TAGE=10#PROZENT=3.00#\n",
				dueDate: new Date("2025-12-15"),
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
