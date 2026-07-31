import type { extended } from "@node-zugferd/extended";

export const smallBusinessOwnerWithoutVATData: typeof extended.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "123",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-11-15"),
		invoiceNotes: [
			{
				content: "Inhaber: Herr/Frau Inhaber(in)",
				subjectCode: "REG",
			},
			{
				content:
					"Dies ist eine Beispiel-Rechnung einer Kleinunternehmer-Rechnung § 19 UStG",
				subjectCode: "ACB",
			},
			{
				content: "ZUGFeRD vers 2.4.0 (Extended)",
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
					vatBreakdown: [
						{
							typeCode: "VAT",
							categoryCode: "E",
							rateApplicablePercent: 0,
						},
					],
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
				name: "Test Company",
				description: "Kleinunternehmer gemäß § 19 UStG",
				contact: [
					{
						personName: "Hans Test",
						phoneNumber: "+49123456789",
						emailAddress: "test@example.org",
					},
				],
				postalAddress: {
					postCode: "55232",
					line1: "Teststr",
					city: "Teststadt",
					countryCode: "DE",
				},
				electronicAddress: {
					value: "sender@example.com",
					schemeId: "EM",
				},
				taxRegistration: {
					local: {
						id: "2200000100001",
					},
				},
			},
			buyer: {
				name: "Franz Müller",
				postalAddress: {
					postCode: "55232",
					line1: "Musterstr.12",
					city: "Musterstadt",
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
				date: new Date("2025-11-15"),
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
						accountName: "KontoInhaber",
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
			paymentTerms: [
				{
					dueDate: new Date("2025-11-15"),
				},
			],
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
