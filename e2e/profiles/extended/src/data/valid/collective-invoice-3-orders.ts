import type { invoicer } from "../../invoicer";

export const collectiveInvoice3OrdersData: typeof invoicer.$Infer.Input.Extended =
	{
		exchangedDocument: {
			invoiceNumber: "6063636771001",
			name: "RECHNUNG",
			invoiceTypeCode: "380",
			invoiceIssueDate: new Date("2026-08-27"),
			invoiceNotes: [
				{
					content:
						"Bank: LBBW Stuttgart BLZ: 999 888 77 Kto.Nr.: 1234567, IBAN: DE33 9998 8877 0001 2345 67 BIC / Swift-Code: SOLADEST600",
					subjectCode: "REG",
				},
				{
					content:
						"Lieferant GmbH & Co. KG - 98765 Lieferantenstadt - T +49 (0)7891 11-0 - F +49(0)7891 11-1000 - info@lieferant.com - www.lieferant.com Hausanschrift: Lieferanten-Strasse 12-17 - 98765 Lieferantenstadt - Sitz Lieferantenstadt, Amtsgericht Stuttgart HRA 123456 Geschäftsführer:",
					subjectCode: "REG",
				},
				{
					content:
						"Wenn nicht anders angegeben entspricht das Leistungsdatum dem Rechnungsdatum.",
					subjectCode: "AAI",
				},
				{
					content:
						"Haben Sie Fragen zur Rechnung? Gerne hilft Ihnen Ihr zuständiger Lieferant Verkäufer weiter. Die Lieferung erfolgte zu unseren bekannten Verkaufs- und Lieferbedingungen. Bitte beachten Sie hierzu unsere allgemeinen Geschäftsbedingungen unter www.lieferant.de/agb.",
					subjectCode: "AAI",
				},
				{
					content:
						"Zahlungsavis/Aufstellung/Auflistung zur Zahlung bitte an: E-mail: zahlungseingang@lieferant.com oder Fax +49 7891 11-59333",
					subjectCode: "PMT",
				},
				{
					content: "ZUGFeRD vers 2.4.0 Extended",
					subjectCode: "ACB",
				},
				{
					content: "Collective Invoice",
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
							value: "7711231873598",
							schemeId: "0160",
						},
						sellerAssignedId: "0595810 25",
						name: "GWDSTG-DIN976-A-4.8-(A2K)-M10X1000",
						description: "Gewindestange",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "Abholung 1",
							date: new Date("2026-08-27"),
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
						recipient: {
							id: "9900880077",
							name: "Musterkunde GmbH & Co Name 2 Musterkunde",
							postalAddress: {
								postCode: "40789",
								line1: "Musterstrasse 44",
								city: "Musterstadt",
								countryCode: "DE",
							},
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408230045",
							lineId: "000010",
							date: new Date("2026-08-27"),
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
							endDate: new Date("2026-08-27"),
						},
						itemTotals: {
							lineTotalAmount: 51.5,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "2156307416",
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
							value: "7748539263943",
							schemeId: "0160",
						},
						sellerAssignedId: "05899800555 150",
						buyerAssignedId: "KD-MAT POS 1 BT-156",
						name: "MUELLSACK-EXTRASTARK-BLAU-700X110X0,07",
						description: "Müllsack, -beutel",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "Abholung 1",
							date: new Date("2026-08-27"),
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
							issuerAssignedId: "8408230045",
							lineId: "000020",
							date: new Date("2026-08-27"),
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
							endDate: new Date("2026-08-27"),
						},
						itemTotals: {
							lineTotalAmount: 73.94,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "2156307416",
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
							value: "7738898142591",
							schemeId: "0160",
						},
						sellerAssignedId: "05234830152 200",
						name: "SHR-AW30-(A2K)-7,5X152",
						description: "Abstandsmontageschraube Rahmen",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "Abholung 2",
							date: new Date("2026-08-27"),
						},
						grossPrice: {
							chargeAmount: 32.76,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 32.76,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 400,
							unitCode: "H87",
						},
						recipient: {
							id: "9900880077",
							name: "Musterkunde GmbH & Co Name 2 Musterkunde",
							postalAddress: {
								postCode: "40789",
								line1: "Muster-Chaussee 77",
								city: "Musterstadt",
								countryCode: "DE",
							},
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408230046",
							lineId: "000010",
							date: new Date("2026-08-27"),
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
							endDate: new Date("2026-08-27"),
						},
						itemTotals: {
							lineTotalAmount: 131.04,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "2156307417",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
				{
					position: {
						lineId: "000004",
						includedNote: [
							{
								content: "Test",
							},
						],
					},
					item: {
						globalId: {
							value: "7711231333337",
							schemeId: "0160",
						},
						sellerAssignedId: "0531710 100",
						buyerAssignedId: "KD-MAT POS 1 BT-156",
						name: "MU-6KT-DIN934-I8I-SW17-(A2K)-M10",
						description: "Sechskantmutter",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "Abholung 2",
							date: new Date("2026-08-27"),
						},
						grossPrice: {
							chargeAmount: 9.16,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 9.16,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 500,
							unitCode: "H87",
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408230046",
							lineId: "000020",
							date: new Date("2026-08-27"),
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
							endDate: new Date("2026-08-27"),
						},
						itemTotals: {
							lineTotalAmount: 45.8,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "2156307417",
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
							value: "7711231333498",
							schemeId: "0160",
						},
						sellerAssignedId: "0531712 100",
						buyerAssignedId: "KD-MAT POS 2 BT-156",
						name: "MU-6KT-DIN934-I8I-SW19-(A2K)-M12",
						description: "Sechskantmutter",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "Abholung 2",
							date: new Date("2026-08-27"),
						},
						grossPrice: {
							chargeAmount: 13.32,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 13.32,
							basisQuantity: {
								value: 100,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 500,
							unitCode: "H87",
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408230046",
							lineId: "000030",
							date: new Date("2026-08-27"),
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
							endDate: new Date("2026-08-27"),
						},
						itemTotals: {
							lineTotalAmount: 66.6,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "2156307417",
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
							value: "7748539263943",
							schemeId: "0160",
						},
						sellerAssignedId: "05899800555 150",
						buyerAssignedId: "KD-MAT POS 1 BT-156",
						name: "MUELLSACK-EXTRASTARK-BLAU-700X1100X0,07",
						description: "Müllsack, -beutel",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "Abholung 3",
							date: new Date("2026-08-27"),
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
							value: 300,
							unitCode: "H87",
						},
						recipient: {
							id: "9900880077",
							name: "Musterkunde GmbH & Co Name 2 Musterkunde",
							postalAddress: {
								postCode: "40789",
								line1: "Musterstrasse 44",
								city: "Musterstadt",
								countryCode: "DE",
							},
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408230047",
							lineId: "000010",
							date: new Date("2026-08-27"),
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
							endDate: new Date("2026-08-27"),
						},
						itemTotals: {
							lineTotalAmount: 147.87,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "2156308418",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
				{
					position: {
						lineId: "000007",
					},
					item: {
						globalId: {
							value: "7765233128651",
							schemeId: "0160",
						},
						sellerAssignedId: "05988013679 10",
						name: "KAFFEE-ESPRESSO-GANZE-BOHNEN-1KG",
						description: "Kaffee",
					},
					priceDetails: {
						associatedOrder: {
							issuerAssignedId: "Abholung 3",
							date: new Date("2026-08-27"),
						},
						grossPrice: {
							chargeAmount: 18.9,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 18.9,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
					},
					delivery: {
						billedQuantity: {
							value: 2,
							unitCode: "H87",
						},
						deliveryNoteReferencedDocument: {
							issuerAssignedId: "8408230047",
							lineId: "000020",
							date: new Date("2026-08-27"),
						},
					},
					billing: {
						vatBreakdown: [
							{
								typeCode: "VAT",
								categoryCode: "S",
								rateApplicablePercent: 7,
							},
						],
						invoicePeriod: {
							endDate: new Date("2026-08-27"),
						},
						itemTotals: {
							lineTotalAmount: 37.8,
							totalAllowanceChargeAmount: 0,
						},
						additionalReferencedDocument: {
							issuerAssignedId: "2156307418",
							typeCode: "130",
							referenceTypeCode: "VN",
						},
					},
				},
			],
			contract: {
				buyerReference: "BUYERREFERENCE BT-10",
				seller: {
					id: "10737",
					globalId: {
						value: "0001231000000",
						schemeId: "0088",
					},
					name: "Lieferant GmbH & Co. KG",
					contact: [
						{
							personName: "Tim Kleine",
							phoneNumber: "0170 66677788",
							emailAddress: "tim.kleine@lieferant.com",
						},
					],
					postalAddress: {
						postCode: "98765",
						line1: "Lieferanten-Strasse.12-17",
						city: "Lieferantenstadt",
						countryCode: "DE",
					},
					electronicAddress: {
						value: "info@lieferant.com",
						schemeId: "0088",
					},
					taxRegistration: {
						local: {
							id: "88888/00072",
						},
						vat: {
							id: "DE946280061",
						},
					},
				},
				buyer: {
					id: "9900880077",
					name: "Musterkunde GmbH & Co Name 2 Musterkunde",
					contact: [
						{
							personName: "Herr Test Monteur",
							phoneNumber: "02173 9364",
							emailAddress: "mike.maier@lieferant.com",
						},
					],
					postalAddress: {
						postCode: "40789",
						line1: "Musterstrasse 44",
						city: "Musterstadt",
						countryCode: "DE",
					},
					taxRegistration: {
						vat: {
							id: "DE2012129398",
						},
					},
				},
			},
			delivery: {
				recipient: {
					name: "Musterkunde GmbH & Co Name 2 Musterkunde",
					postalAddress: {
						postCode: "40789",
						line1: "Musterstrasse 44",
						city: "Musterstadt",
						countryCode: "DE",
					},
					taxRegistration: {
						vat: {
							id: "DE2012129398",
						},
					},
				},
				actualDelivery: {
					date: new Date("2026-08-27"),
				},
			},
			debit: {
				paymentReference:
					"Kundennummer:. 9900880077 Rechnungsnummer:. 6063636771001",
				invoiceCurrencyCode: "EUR",
				paymentMeans: {
					typeCode: "58",
					information: "Bezahlung per SEPA Überweisung",
					creditTransfers: [
						{
							iban: "DE33600501010001234567",
						},
					],
					sellerBankDetails: {
						bic: "SOLADEST600",
					},
				},
				vatBreakdown: [
					{
						calculatedAmount: 98.18,
						typeCode: "VAT",
						basisAmount: 516.75,
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
					{
						calculatedAmount: 2.65,
						typeCode: "VAT",
						basisAmount: 37.8,
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
				],
				paymentTerms: [
					{
						description: "Bis zum 06.09.2026 erhalten Sie 2,000 % Skonto",
						discountTerms: [
							{
								maturityReferenceDate: new Date("2026-08-27"),
								dueDatePeriodBasis: {
									value: 10,
									unitCode: "DAY",
								},
								basisAmount: 655.38,
								calculationPercent: 2,
								actualDiscountAmount: 13.11,
							},
						],
					},
					{
						description: "Bis zum 16.09.2026 ohne Abzug",
						dueDate: new Date("2026-09-16"),
					},
				],
				documentTotals: {
					lineTotalAmount: 554.55,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 554.55,
					taxTotalAmount: {
						value: 100.83,
						currency: "EUR",
					},
					grandTotalAmount: 655.38,
					duePayableAmount: 655.38,
				},
			},
		},
	};
