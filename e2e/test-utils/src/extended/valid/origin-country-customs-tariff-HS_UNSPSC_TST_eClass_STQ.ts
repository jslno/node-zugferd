import type { extended } from "@node-zugferd/extended";

export const originCountryCustomsTariffHS_UNSPSC_TST_eClass_STQData: typeof extended.$Infer.Input =
	{
		exchangedDocument: {
			invoiceNumber: "6069999999",
			name: "RECHNUNG",
			invoiceTypeCode: "380",
			invoiceIssueDate: new Date("2026-04-10"),
			invoiceNotes: [
				{
					content:
						"Geschäftsführer: Herr Geschäftsführer , Musterlieferant GmbH etc.",
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
						"Dies ist eine Waren-Rechnung mit Beispiel-Angabe Klassifizierungen Zolltarif-Nummer (HS), UNSPSC (TST), eCl@ss (STQ) und Herkunftsland",
					subjectCode: "ACB",
				},
			],
		},
		transaction: {
			line: [
				{
					position: {
						lineId: "000001",
					},
					item: {
						globalId: {
							value: "87654321X",
							schemeId: "0160",
						},
						sellerAssignedId: "A987654",
						buyerAssignedId: "AG A987654",
						name: "Artikel A",
						description: "Artikel speziell für XXX",
						// TODO: Should be an array in extended
						classification: {
							classCode: [
								{
									value: "23456789123",
									schemeId: "HS",
									schemeVersion: "2022",
								},
							],
							className: "Zolltarifnummer",
						},
						originTradeCountry: "DE",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "93170095",
							date: new Date("2026-04-10"),
						},
						grossPrice: {
							chargeAmount: 52.52,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 52.52,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 200,
							unitCode: "H87",
						},
						recipient: {
							id: "0009876543",
							name: "Musterkunde GmbH & Co Name 2 Musterkunde",
							postalAddress: {
								postCode: "40789",
								line1: "Musterstrasse 44",
								city: "Musterstadt",
								countryCode: "DE",
							},
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408221200",
							lineId: "000010",
							date: new Date("2026-04-10"),
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
							endDate: new Date("2026-04-10"),
						},
						itemTotals: {
							lineTotalAmount: 105.04,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "22223333444",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
				{
					position: {
						lineId: "000002",
					},
					item: {
						globalId: {
							value: "123456789",
							schemeId: "0160",
						},
						sellerAssignedId: "B987654",
						name: "Artikel B",
						description: "Artikel speziell für XXX",
						classification: {
							classCode: [
								{
									value: "98765432109",
									schemeId: "TST",
									schemeVersion: "230701",
								},
							],
							className: "UNSPSC",
						},
						originTradeCountry: "DE",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "93170095",
							date: new Date("2026-04-10"),
						},
						grossPrice: {
							chargeAmount: 2.06,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 2.06,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 25,
							unitCode: "H87",
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408221200",
							lineId: "000020",
							date: new Date("2026-04-10"),
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
							endDate: new Date("2026-04-10"),
						},
						itemTotals: {
							lineTotalAmount: 51.5,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "22223333444",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
				{
					position: {
						lineId: "000003",
					},
					item: {
						globalId: {
							value: "765432198",
							schemeId: "0160",
						},
						sellerAssignedId: "C987654",
						name: "Artikel C",
						description: "Artikel speziell für XXX",
						classification: {
							classCode: [
								{
									value: "12-34-56-78",
									schemeId: "STQ",
									schemeVersion: "10.1",
								},
							],
							className: "eCl@ss",
						},
						originTradeCountry: "DE",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "93170095",
							date: new Date("2026-04-10"),
						},
						grossPrice: {
							chargeAmount: 0.77,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 0.77,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 25,
							unitCode: "H87",
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408221200",
							lineId: "000030",
							date: new Date("2026-04-10"),
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
							endDate: new Date("2026-04-10"),
						},
						itemTotals: {
							lineTotalAmount: 19.25,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "22223333444",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
				{
					position: {
						lineId: "000004",
					},
					item: {
						globalId: {
							value: "7654321987",
							schemeId: "0160",
						},
						sellerAssignedId: "D987654",
						name: "Artikel D",
						description: "Artikel speziell für XXX",
						classification: {
							classCode: [
								{
									value: "234567891",
									schemeId: "HS",
									schemeVersion: "2022",
								},
							],
							className: "Zolltarifnummer",
						},
						originTradeCountry: "DE",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "93170095",
							date: new Date("2026-04-10"),
						},
						grossPrice: {
							chargeAmount: 3.22,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 3.22,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 25,
							unitCode: "H87",
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408221200",
							lineId: "000040",
							date: new Date("2026-04-10"),
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
							endDate: new Date("2026-04-10"),
						},
						itemTotals: {
							lineTotalAmount: 80.5,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "22223333444",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
				{
					position: {
						lineId: "000005",
					},
					item: {
						globalId: {
							value: "654321987654",
							schemeId: "0160",
						},
						sellerAssignedId: "E987654",
						buyerAssignedId: "AG E987654",
						name: "Artikel E",
						description: "Artikel speziell für XXX",
						classification: {
							classCode: [
								{
									value: "654321987654",
									schemeId: "HS",
									schemeVersion: "2022",
								},
							],
						},
						originTradeCountry: "DE",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "93170095",
							date: new Date("2026-04-10"),
						},
						grossPrice: {
							chargeAmount: 49.29,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 49.29,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 150,
							unitCode: "H87",
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408221200",
							lineId: "000050",
							date: new Date("2026-04-10"),
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
							endDate: new Date("2026-04-10"),
						},
						itemTotals: {
							lineTotalAmount: 73.94,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "22223333444",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
				{
					position: {
						lineId: "000006",
					},
					item: {
						globalId: {
							value: "5432198765",
							schemeId: "0160",
						},
						sellerAssignedId: "F987654",
						name: "Artikel F",
						description: "Artikel speziell für XXX",
						classification: {
							classCode: [
								{
									value: "234567891",
									schemeId: "HS",
									schemeVersion: "2022",
								},
							],
							className: "Zolltarifnummer",
						},
						originTradeCountry: "DE",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "93170095",
							date: new Date("2026-04-10"),
						},
						grossPrice: {
							chargeAmount: 18.62,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 18.62,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 11,
							unitCode: "H87",
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408221200",
							lineId: "000060",
							date: new Date("2026-04-10"),
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
							endDate: new Date("2026-04-10"),
						},
						itemTotals: {
							lineTotalAmount: 204.82,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "22223333444",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
			],
			contract: {
				buyerReference: "BUYERREFERENCE BT-10",
				seller: {
					id: "88888",
					globalId: {
						value: "GLN4000000000",
						schemeId: "0088",
					},
					name: "Musterlieferant GmbH",
					contact: [
						{
							personName: "Max Verkäufer",
							phoneNumber: "0170 123456789",
							emailAddress: "mv@firma.de",
						},
					],
					postalAddress: {
						postCode: "12345",
						line1: "Lieferanten-Str.12-17",
						city: "Musterstadt",
						countryCode: "DE",
					},
					electronicAddress: {
						value: "info@firma.de",
						schemeId: "0088",
					},
					taxRegistration: {
						local: {
							id: "99999/22222",
						},
						vat: {
							id: "DE12435679",
						},
					},
				},
				buyer: {
					id: "22334455",
					globalId: {
						value: "GLN400000000B",
						schemeId: "0088",
					},
					name: "Musterkäufer GmbH",
					contact: [
						{
							personName: "Frau Simone Einkauf",
							phoneNumber: "0794015-9999999",
							emailAddress: "vorname.nachname@kaeufer.de",
						},
					],
					postalAddress: {
						postCode: "23456",
						line1: "Besteller-Str.12-17",
						city: "Käuferstadt",
						countryCode: "DE",
					},
					taxRegistration: {
						vat: {
							id: "DE12435679",
						},
					},
				},
				sellerOrderReferencedDocument: {
					issuerAssignedId: "22223333444",
					date: new Date("2026-04-10"),
				},
				associatedOrder: {
					issuerAssignedId: "93170095",
					date: new Date("2026-04-10"),
				},
			},
			delivery: {
				recipient: {
					globalLocationId: {
						value: "GLN400000000S",
						schemeId: "0088",
					},
					name: "Musterkäufer GmbH",
					postalAddress: {
						postCode: "34567",
						line1: "Lieferstrasse 77",
						city: "Lieferstadt",
						countryCode: "DE",
					},
				},
				actualDelivery: {
					date: new Date("2026-04-10"),
				},
				deliveryNoteReferencedDocuments: [
					{
						issuerAssignedId: "8408221200",
						date: new Date("2026-04-10"),
					},
				],
			},
			debit: {
				paymentReference:
					"Kundennummer:. 22334455 Rechnungsnummer:. 6069999999",
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
						bic: "SOLADEST600",
					},
				},
				vatBreakdown: [
					{
						calculatedAmount: 101.66,
						typeCode: "VAT",
						basisAmount: 535.05,
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				],
				paymentTerms: [
					{
						description: "Bis zum 20.04.2026 erhalten Sie 2,000 % Skonto",
						discountTerms: [
							{
								maturityReferenceDate: new Date("2026-04-10"),
								dueDatePeriodBasis: {
									value: 10,
									unitCode: "DAY",
								},
								basisAmount: 636.71,
								calculationPercent: 2,
								actualDiscountAmount: 12.73,
							},
						],
					},
					{
						description: "Bis zum 30.04.2026 ohne Abzug",
						dueDate: new Date("2026-04-30"),
					},
				],
				documentTotals: {
					lineTotalAmount: 535.05,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 535.05,
					taxTotalAmount: {
						value: 101.66,
						currency: "EUR",
					},
					grandTotalAmount: 636.71,
					duePayableAmount: 636.71,
				},
			},
		},
	};
