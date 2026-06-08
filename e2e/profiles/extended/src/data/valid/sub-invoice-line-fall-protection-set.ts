import type { invoicer } from "../../invoicer";

export const subInvoiceLineFallProtectionSetData: typeof invoicer.$Infer.Input.Extended =
	{
		exchangedDocument: {
			invoiceNumber: "9099999999",
			name: "RECHNUNG",
			invoiceTypeCode: "380",
			invoiceIssueDate: new Date("2026-10-31"),
			invoiceNotes: [
				{
					content:
						"Geschäftsführer: Herr Geschäftsführer , Muster Maschinenbau GmbH etc.",
					subjectCode: "REG",
				},
				{
					content:
						"Es bestehen Vereinbarungen, aus denen sich Minderungen des Entgelts ergeben können.",
					subjectCode: "AAI",
				},
				{
					content: "ZUGFeRD vers 2.4.0 (Extended)",
					subjectCode: "ACB",
				},
				{
					content:
						"Dies ist eine Beispiel-Rechnung zur empfohlenen Darstellung von Unterpositionen für ein Verkaufsset",
					subjectCode: "ACB",
				},
			],
		},
		transaction: {
			line: [
				{
					position: {
						lineId: "01",
						lineStatusReasonCode: "DETAIL",
					},
					item: {
						globalId: {
							value: "99999999999",
							schemeId: "0160",
						},
						sellerAssignedId: "99999000000090 1",
						name: "INDIVIDUELLES Fallschutzset",
						description: "Kundenindividuelles Sortiment Fallschutz",
					},
					priceDetails: {
						grossPrice: {
							chargeAmount: 4500,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 4500,
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
						recipient: {
							id: "0009999999",
							name: "Muster Bau und Fassaden GmbH",
							postalAddress: {
								postCode: "76543",
								line1: "Muster Str. 19",
								city: "Musterhausen",
								countryCode: "DE",
							},
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
						invoicePeriod: {
							startDate: new Date("2026-10-06"),
							endDate: new Date("2026-10-21"),
						},
						itemTotals: {
							lineTotalAmount: 45_000,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "2133367983",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
				{
					position: {
						lineId: "01.01",
						parentLineId: "01",
						lineStatusReasonCode: "INFORMATION",
					},
					item: {
						globalId: {
							value: "9947376819504",
							schemeId: "0160",
						},
						sellerAssignedId: "1239932943961 1",
						name: "RUCKSACK-Fallschutz",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 0,
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
						itemTotals: {
							lineTotalAmount: 0,
						},
					},
				},
				{
					position: {
						lineId: "01.02",
						parentLineId: "01",
						lineStatusReasonCode: "INFORMATION",
					},
					item: {
						globalId: {
							value: "9961975355683",
							schemeId: "0160",
						},
						sellerAssignedId: "1234300430961 1",
						name: "Gehörschutz",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 0,
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
						itemTotals: {
							lineTotalAmount: 0,
						},
					},
				},
				{
					position: {
						lineId: "01.03",
						parentLineId: "01",
						lineStatusReasonCode: "INFORMATION",
					},
					item: {
						globalId: {
							value: "9945727365021",
							schemeId: "0160",
						},
						sellerAssignedId: "1234102250061 1",
						name: "Schutzbrille-KLAR",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 0,
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
						itemTotals: {
							lineTotalAmount: 0,
						},
					},
				},
				{
					position: {
						lineId: "01.04",
						parentLineId: "01",
						lineStatusReasonCode: "INFORMATION",
					},
					item: {
						globalId: {
							value: "9953479245027",
							schemeId: "0160",
						},
						sellerAssignedId: "1234200243961 1",
						name: "Schutzhelm-6PUNKT-WEISS",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 0,
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
						itemTotals: {
							lineTotalAmount: 0,
						},
					},
				},
			],
			contract: {
				seller: {
					globalId: {
						value: "GLN4000000000",
						schemeId: "0088",
					},
					name: "Lieferant GmbH & Co. KG",
					contact: [
						{
							personName: "Georg Verkäufer",
							phoneNumber: "0160 123456789",
							emailAddress: "georg.Verkäufer@lieferant.de",
						},
					],
					postalAddress: {
						postCode: "98765",
						line1: "Lieferanten-Str.12-17",
						city: "Lieferstadt",
						countryCode: "DE",
					},
					electronicAddress: {
						value: "info@lieferant.de",
						schemeId: "0088",
					},
					taxRegistration: {
						local: {
							id: "78910/12345",
						},
						vat: {
							id: "DE12435679",
						},
					},
				},
				buyer: {
					id: "",
					name: "Muster Maschinenbau GmbH",
					postalAddress: {
						postCode: "87654",
						line1: "Käufer-Str. 12",
						city: "Käuferstadt",
						countryCode: "DE",
					},
				},
				sellerOrderReferencedDocument: {
					issuerAssignedId: "555555555",
					date: new Date("2026-10-31"),
				},
				associatedOrder: {
					issuerAssignedId: "456789123",
				},
			},
			delivery: {
				recipient: {
					locationId: "0009999999",
					name: "Muster Bau und Fassaden GmbH",
					postalAddress: {
						postCode: "76543",
						line1: "Muster Str. 19",
						city: "Musterhausen",
						countryCode: "DE",
					},
				},
				actualDelivery: {
					date: new Date("2026-10-31"),
				},
				deliveryNoteReferencedDocuments: [
					{
						issuerAssignedId: "8876543219",
						date: new Date("2026-10-31"),
					},
				],
			},
			debit: {
				paymentReference:
					"Kundennummer:. 8888855555 Rechnungsnummer:. 6069999999",
				invoiceCurrencyCode: "EUR",
				paymentMeans: {
					typeCode: "58",
					information: "Bezahlung per SEPA Überweisung",
					creditTransfers: [
						{
							iban: "DE75512108001245126199",
						},
					],
					sellerBankDetails: {
						bic: "SOLADESTXYZ",
					},
				},
				vatBreakdown: [
					{
						calculatedAmount: 8550,
						typeCode: "VAT",
						basisAmount: 45_000,
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				],
				paymentTerms: [
					{
						description: "Bis zum 29.11.2026 ohne Abzug",
						dueDate: new Date("2026-11-29"),
					},
				],
				documentTotals: {
					lineTotalAmount: 45_000,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 45_000,
					taxTotalAmount: {
						value: 8550,
						currency: "EUR",
					},
					grandTotalAmount: 53_550,
					duePayableAmount: 53_550,
				},
			},
		},
	};
