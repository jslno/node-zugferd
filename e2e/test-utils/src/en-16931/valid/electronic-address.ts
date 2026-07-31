import type { en16931 } from "@node-zugferd/en-16931";

export const electronicAddressData: typeof en16931.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "9314110911/00/M/00/N",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2018-10-01"),
		invoiceNotes: [
			{
				content: [
					"MUSTER-Autovermietung GMBH",
					"Musterstr. 99",
					"99199 MUSTERHAUSEN",
					"Geschäftsführung:",
					"Maxima Musterfrau",
					"USt-IdNr: DE136695976",
					"Telefon: +49 711-50885524",
					"www.musterlieferant.de",
					"HRB Nr. 372876",
					"Amtsgericht Musterstadt",
					"GLN 4304171000002",
				].join("\n"),
				subjectCode: "REG",
			},
			{
				content: [
					"Bei Rückfragen:",
					"Telefon: +49 711-50885524",
					"E-Mail : info@muster-autovermietung.de",
				].join("\n"),
			},
			{
				content: [
					"Übergabe am 29.09.2018/ 10:35",
					"Ort: Frankfurt a. M.",
					"km: 17791",
				].join("\n"),
			},
			{
				content: [
					"Rückgabe am 01.10.2018/ 10:19",
					"Ort: Frankfurt a. M.",
					"km: 18664",
				].join("\n"),
			},
			{
				content: [
					"Übernahme: Frankfurt",
					"Datum: 01.10.2018",
					"Zeit: 10:19",
					"km/out: 177791",
					"km/in: 18664",
					"km gefahren: 873",
					"Kennzeichen: M-MM 0000",
					"CO2: 150",
					"Bruttolistenpreis: 68300",
				].join("\n"),
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
					name: "Miettage",
					attributes: [
						{
							description: "Fahrzeug-Kennzeichen",
							value: "M-MM 0000",
						},
					],
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 86.55,
					},
				},
				delivery: {
					billedQuantity: {
						value: 2,
						unitCode: "DAY",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
					itemTotals: {
						lineTotalAmount: 173.1,
					},
				},
			},
			{
				position: {
					lineId: "2",
					includedNote: {
						content: "Inklusiv-Kilometer waren: 873",
					},
				},
				item: {
					name: "Navigationssystem - Garantie",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 5.04,
					},
				},
				delivery: {
					billedQuantity: {
						value: 2,
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
						lineTotalAmount: 10.08,
					},
				},
			},
			{
				position: {
					lineId: "3",
				},
				item: {
					name: "Vollkasko",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 23.1,
					},
				},
				delivery: {
					billedQuantity: {
						value: 2,
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
						lineTotalAmount: 46.2,
					},
				},
			},
			{
				position: {
					lineId: "4",
				},
				item: {
					name: "minimale Selbstbeteiligung",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 15.55,
					},
				},
				delivery: {
					billedQuantity: {
						value: 2,
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
						lineTotalAmount: 31.1,
					},
				},
			},
			{
				position: {
					lineId: "5",
				},
				item: {
					name: "Personen-Unfallversicherung",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 7.98,
					},
				},
				delivery: {
					billedQuantity: {
						value: 2,
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
						lineTotalAmount: 15.96,
					},
				},
			},
			{
				position: {
					lineId: "6",
				},
				item: {
					name: "Choice Upgrade",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 5.04,
					},
				},
				delivery: {
					billedQuantity: {
						value: 2,
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
						lineTotalAmount: 10.08,
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
				name: "MUSTER-Autovermietung",
				postalAddress: {
					postCode: "99199",
					line1: "Musterstr. 99",
					city: "MUSTERHAUSEN",
					countryCode: "DE",
				},
				electronicAddress: {
					value: "1234567890128",
					schemeId: "0088",
				},
				taxRegistration: {
					vat: {
						id: "DE136695976",
					},
				},
			},
			buyer: {
				id: "9314110911",
				name: "MUSTER-KUNDE GMBH",
				postalAddress: {
					postCode: "40235",
					line1: "KUNDENWEG 88",
					city: "DUESSELDORF",
					countryCode: "DE",
				},
				electronicAddress: {
					value: "04 0 11 000 - 12345 12345 - 35",
					schemeId: "0204",
				},
			},
			associatedOrder: {
				issuerAssignedId: "B123456789",
			},
		},
		delivery: {
			actualDelivery: {
				date: new Date("2018-09-29"),
			},
			despatchAdvice: {
				issuerAssignedId: "L87654321012345",
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			vatBreakdown: [
				{
					calculatedAmount: 54.44,
					typeCode: "VAT",
					basisAmount: 286.52,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			paymentTerms: {
				description:
					"Die Leistung wurde erbracht im Zeitraum zwischen Übergabe und Rückgabe. Der Rechnungsbetrag wird über Ihre MasterCard-Kreditkarte abgebucht. Dies ist keine Aufforderung zur Zahlung. Rechnung für Ihre Unterlagen.",
			},
			documentTotals: {
				lineTotalAmount: 286.52,
				chargeTotalAmount: 0,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 286.52,
				taxTotalAmount: {
					value: 54.44,
					currency: "EUR",
				},
				grandTotalAmount: 340.96,
				prepaidAmount: 0,
				duePayableAmount: 340.96,
			},
		},
	},
};
