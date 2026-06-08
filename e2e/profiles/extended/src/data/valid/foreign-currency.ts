import type { invoicer } from "../../invoicer.js";

export const foreignCurrencyData: typeof invoicer.$Infer.Input.Extended = {
	processControl: {
		businessContextInfo: {
			processType: "Beispielgeschäftsprozess",
		},
	},
	exchangedDocument: {
		name: "RECHNUNG",
		invoiceNumber: "47110815",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2025-12-01"),
		invoiceNotes: [
			{
				content: [
					"Mitglieder der Geschäftsleitung",
					"H. Meier Geschäftsführer",
					"T. Müller Prokurist",
					"HRB Braunschweig 12345",
				].join("\n"),
				subjectCode: "REG",
			},
			{
				content:
					"Vom 17. Dezember 2024 bis 6. Januar 2025 haben wir Betriebsferien.",
				subjectCode: "AAI",
			},
			{
				content:
					"Aus konzern-internen Gründen wird der Steuerbetrag sowohl in der Rechungswährung (EUR) als auch in der Buchwährung (GBP) ausgegeben.",
				subjectCode: "TXD",
			},
			{
				content: "ZUGFeRD vers 2.4.0 (Extended)",
				subjectCode: "ACB",
			},
			{
				content:
					"Dies ist ein Beispiel zur empfohlenen Darstellung von Fremdwährungsrechnungen",
				subjectCode: "ACB",
			},
		],
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "1",
					includedNote: [
						{
							content:
								"Materialzertifikat X-234 gem ISO XYZ.\nWare bleibt bis zur vollständigen Bezahlung unser Eigentum.",
						},
					],
				},
				item: {
					sellerAssignedId: "CO-123/V2A",
					buyerAssignedId: "Toolbox 0815",
					name: "Stahlcoil",
					originTradeCountry: "DE",
				},
				priceDetails: {
					associatedOrder: {
						issuerAssignedId: "ORDER84359",
						lineId: "1",
					},
					grossPrice: {
						chargeAmount: 100,
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
					vatBreakdown: [
						{
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
					allowances: [
						{
							calculationPercent: 10,
							basisAmount: 1000,
							actualAmount: 100,
							reasonCode: "64",
							reason: "Lagerware",
						},
						{
							basisAmount: 1000,
							actualAmount: 50,
							reasonCode: "70",
							reason: "Direktbelieferung",
						},
					],
					itemTotals: {
						lineTotalAmount: 850,
					},
				},
			},
		],
		contract: {
			seller: {
				id: "12345676",
				name: "Rohstoff AG Salzgitter",
				postalAddress: {
					postCode: "38226",
					line1: "Marktstr. 153",
					city: "Salzgitter",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE123456789",
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
				electronicAddress: {
					value: "04011000-1234512345-35",
					schemeId: "0204",
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
						id: "DE124356789",
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
				electronicAddress: {
					value: "999999999",
					schemeId: "0060",
				},
			},
			actualDelivery: {
				date: new Date("2025-11-11"),
			},
		},
		debit: {
			taxCurrencyCode: "EUR",
			invoiceCurrencyCode: "GBP",
			payee: {
				globalId: {
					value: "432156789",
					schemeId: "0060",
				},
				name: "Global Supplies Financial Services",
				postalAddress: {
					postCode: "12345",
					line1: "Friedrichstraße 165",
					city: "Berlin",
					countryCode: "DE",
				},
			},
			currencyExchange: {
				invoiceCurrency: "GBP",
				localCurrency: "EUR",
				exchangeRate: 1.12244,
				exchangeRateDate: new Date("2025-11-11"),
			},
			paymentMeans: {
				typeCode: "58",
				creditTransfers: [
					{
						iban: "DE77 3707 0060 0321 9870 00",
						accountName: "Global Supplies Financial Services",
					},
				],
			},
			vatBreakdown: [
				{
					calculatedAmount: 163.16,
					typeCode: "VAT",
					basisAmount: 858.75,
					lineTotalBasisAmount: 850,
					allowanceChargeBasisAmount: 8.75,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			invoicingPeriod: {
				startDate: new Date("2025-11-01"),
				endDate: new Date("2025-11-30"),
			},
			charges: [
				{
					actualAmount: 30,
					reason: "Einwegverpackung",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
			],
			allowances: [
				{
					calculationPercent: 2.5,
					basisAmount: 850,
					actualAmount: 21.25,
					reasonCode: "102",
					reason: "Stammkundenrabatt",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				},
			],
			paymentTerms: [
				{
					description: "Zahlbar ohne Abschlag bis",
					dueDate: new Date("2024-12-01"),
				},
				{
					description: "Zahlbar mit 2% Skonto bis",
					dueDate: new Date("2025-12-31"),
				},
			],
			documentTotals: {
				lineTotalAmount: 850,
				chargeTotalAmount: 30,
				allowanceTotalAmount: 21.25,
				taxBasisTotalAmount: 858.75,
				taxTotalAmount: {
					value: 163.16,
					currency: "GBP",
				},
				taxTotalAmountAccountingCurrency: {
					value: 183.14,
					currency: "EUR",
				},
				grandTotalAmount: 1021.91,
				prepaidAmount: 500,
				duePayableAmount: 521.91,
			},
		},
	},
};
