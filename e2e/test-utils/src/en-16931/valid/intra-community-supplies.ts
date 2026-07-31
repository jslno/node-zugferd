import type { en16931 } from "@node-zugferd/en-16931";

export const intraCommunitySuppliesData: typeof en16931.$Infer.Input = {
	processControl: {
		businessContextInfo: {
			processType: "Beispielgeschäftsprozess",
		},
	},
	exchangedDocument: {
		invoiceNumber: "47110818",
		invoiceTypeCode: "389",
		invoiceIssueDate: new Date("2018-10-31"),
		invoiceNotes: [
			{
				content: [
					"Mitglieder der Geschäftsleitung:",
					"Geschäftsführerin: Johanna Musterfrau",
					"Prokuristin: Isabell Herrlich",
					"HRB Berlin 13086",
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
					sellerAssignedId: "CO-123/V2A",
					buyerAssignedId: "Toolbox 0815",
					name: "Stahlcoil",
					// TODO: Fix type
					originTradeCountry: "DE",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 1000,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
					netPrice: {
						chargeAmount: 100,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
				},
				delivery: {
					billedQuantity: {
						value: 10,
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "K",
						rateApplicablePercent: 0,
					},
					invoicePeriod: {
						startDate: new Date("2018-10-01"),
						endDate: new Date("2018-10-31"),
					},
					itemTotals: {
						lineTotalAmount: 1000,
					},
				},
			},
			{
				position: {
					lineId: "2",
				},
				item: {
					sellerAssignedId: "IM-712/A2A",
					buyerAssignedId: "BR-4529-ZF",
					name: "Stoßfänger",
					originTradeCountry: "DE",
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 1000,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
					netPrice: {
						chargeAmount: 100,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
				},
				delivery: {
					billedQuantity: {
						value: 10,
						unitCode: "H87",
					},
				},
				billing: {
					vatBreakdown: {
						typeCode: "VAT",
						categoryCode: "K",
						rateApplicablePercent: 0,
					},
					invoicePeriod: {
						startDate: new Date("2018-10-01"),
						endDate: new Date("2018-10-31"),
					},
					itemTotals: {
						lineTotalAmount: 1000,
					},
				},
			},
		],
		contract: {
			seller: {
				id: "12345676",
				name: "Global Supplies Ltd.",
				postalAddress: {
					postCode: "SW1B 3BN",
					line1: "153 Victoria Street",
					city: "London",
					countryCode: "GB",
				},
				taxRegistration: {
					vat: {
						id: "GB123456789",
					},
				},
			},
			buyer: {
				id: "75969813",
				name: "Metallbau Leipzig GmbH & Co. KG",
				postalAddress: {
					postCode: "12345",
					line1: "Pappelallee 15",
					line2: "Hof 3",
					city: "Leipzig",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE123456789",
					},
				},
			},
			sellerTaxRepresentative: {
				name: "Global Supplies Financial Services",
				postalAddress: {
					postCode: "12345",
					line1: "Friedrichstraße 165",
					city: "Berlin",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE987654321",
					},
				},
			},
		},
		delivery: {
			recipient: {
				locationId: "75969815",
				name: "Metallbau Leipzig GmbH & Co. KG",
				postalAddress: {
					postCode: "12347",
					line1: "Eichenpromenade 37",
					line2: "Tor 1",
					city: "Metallstadt",
					countryCode: "DE",
				},
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			payee: {
				globalId: {
					value: "432156789",
					schemeId: "0060",
				},
				name: "Global Supplies Financial Services",
			},
			paymentMeans: {
				typeCode: "58",
				creditTransfers: [
					{
						iban: "DE12 1234 4321 9876 00",
						accountName: "Global Supplies Financial Services",
					},
				],
			},
			vatBreakdown: [
				{
					calculatedAmount: 0,
					typeCode: "VAT",
					exemptionReason:
						"Mehrwertsteuerbefreiung für die innergemeinschaftliche Lieferung von Waren und Dienstleistungen in der EU",
					basisAmount: 2000,
					categoryCode: "K",
					rateApplicablePercent: 0,
				},
			],
			invoicingPeriod: {
				startDate: new Date("2018-10-01"),
				endDate: new Date("2018-10-31"),
			},
			paymentTerms: {
				dueDate: new Date("2018-11-30"),
			},
			documentTotals: {
				lineTotalAmount: 2000,
				taxBasisTotalAmount: 2000,
				taxTotalAmount: {
					value: 0,
					currency: "EUR",
				},
				grandTotalAmount: 2000,
				duePayableAmount: 2000,
			},
		},
	},
};
