import type { en16931 } from "@node-zugferd/en-16931";

export const smallBusinessOwnerWithoutVatData: typeof en16931.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "123",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-06-03"),
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "1",
				},
				item: {
					name: "Testprodukt",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 1,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
				},
				delivery: {
					billedQuantity: {
						value: 1,
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "E",
						rateApplicablePercent: 0,
					},
					itemTotals: {
						lineTotalAmount: 1,
					},
				},
			},
		],
		contract: {
			buyerReference: "991-01484-64",
			seller: {
				id: "22 00 0 001 00001",
				name: "Test company",
				description: "Kleinunternehmer gemäß § 19 UStG",
				contact: {
					personName: "Hans Test",
					phoneNumber: "+49123456789",
					emailAddress: "test@example.org",
				},
				postalAddress: {
					postCode: "55232",
					line1: "teststr",
					city: "teststadt",
					countryCode: "DE",
				},
				electronicAddress: {
					value: "sender@example.com",
					schemeId: "EM",
				},
				taxRegistration: {
					local: {
						id: "22 00 0 001 00001",
					},
				},
			},
			buyer: {
				name: "Franz Müller",
				postalAddress: {
					postCode: "55232",
					line1: "teststr.12",
					city: "Entenhausen",
					countryCode: "DE",
				},
				electronicAddress: {
					value: "recipient@sample.org",
					schemeId: "EM",
				},
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2025-06-03"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			paymentMeans: {
				typeCode: "58",
				information: "SEPA credit transfer",
				creditTransfers: [
					{
						iban: "DE12500105170648489890",
						accountName: "kontoinhaber",
					},
				],
				sellerBankDetails: {
					bic: "COBADEFXXX",
				},
			},
			vatBreakdown: [
				{
					calculatedAmount: 0,
					typeCode: "VAT",
					exemptionReason:
						"Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß § 19 UStG",
					basisAmount: 1,
					categoryCode: "E",
					rateApplicablePercent: 0,
				},
			],
			paymentTerms: {
				dueDate: new Date("2025-06-03"),
			},
			documentTotals: {
				lineTotalAmount: 1,
				chargeTotalAmount: 0,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 1,
				taxTotalAmount: {
					value: 0,
					currency: "EUR",
				},
				grandTotalAmount: 1,
				prepaidAmount: 0,
				duePayableAmount: 1,
			},
		},
	},
};
