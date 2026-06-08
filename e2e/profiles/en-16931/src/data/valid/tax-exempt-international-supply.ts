import type { invoicer } from "../../invoicer.js";

export const taxExemptInternationalSupplyData: typeof invoicer.$Infer.Input.En16931 =
	{
		exchangedDocument: {
			invoiceNumber: "6069999998",
			invoiceTypeCode: "380",
			invoiceIssueDate: new Date("2025-01-31"),
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
					content: "ZUGFeRD vers 2.4.0 EN16931",
					subjectCode: "ACB",
				},
				{
					content:
						"Dies ist eine Beispiel-Rechnung Auslandslieferung ohne Steuer",
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
							value: "4061234567891",
							schemeId: "0160",
						},
						sellerAssignedId: "123456",
						name: "TLA-LED-3XAAA",
						description: "Taschenlampe LED spezial",
					},
					priceDetails: {
						grossPrice: {
							chargeAmount: 46.5,
							basisQuantity: {
								value: 1,
								unitCode: "H87",
							},
						},
						netPrice: {
							chargeAmount: 46.5,
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
							categoryCode: "E",
							rateApplicablePercent: 0,
						},
						invoicePeriod: {
							endDate: new Date("2025-03-31"),
						},
						itemTotals: {
							lineTotalAmount: 465,
						},
					},
				},
			],
			contract: {
				buyerReference: "BT-10",
				seller: {
					id: "88888",
					name: "Musterlieferant GmbH",
					contact: {
						personName: "Max Verkäufer",
						phoneNumber: "0170 123456789",
						emailAddress: "mv@firma.de",
					},
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
					name: "Musterverkäufer GmbH",
					contact: {
						personName: "Frau Simone Einkauf",
						phoneNumber: "0794015-9999999",
						emailAddress: "vorname.nachname@kaeufer.de",
					},
					postalAddress: {
						postCode: "23456",
						line1: "Besteller-Str.12-17",
						city: "Käuferstadt",
						countryCode: "DE",
					},
					taxRegistration: {
						vat: {
							id: "DE123456789",
						},
					},
				},
				sellerOrderReferencedDocument: {
					issuerAssignedId: "2197566373",
				},
				associatedOrder: {
					issuerAssignedId: "00000001023456789",
				},
			},
			delivery: {
				recipient: {
					name: "Musterverkäufer GmbH",
					postalAddress: {
						postCode: "34567",
						line1: "Musterstrasse 99-103",
						city: "Musterstadt",
						countryCode: "DE",
					},
				},
			},
			debit: {
				paymentReference:
					"Kundennummer:. 22334455 Rechnungsnummer:. 6069999998",
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
						calculatedAmount: 0,
						typeCode: "VAT",
						exemptionReason: "Steuerfreie Ausfuhrlieferung",
						basisAmount: 465,
						categoryCode: "E",
						rateApplicablePercent: 0,
					},
				],
				paymentTerms: {
					description:
						"Bis zum 14.02.2025 erhalten Sie 2,000 % Skonto Bis zum 01.03.2025 erhalten Sie 1,500 % Skonto Bis zum 31.03.2025 ohne Abzug",
					dueDate: new Date("2025-03-31"),
				},
				documentTotals: {
					lineTotalAmount: 465,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 465,
					taxTotalAmount: {
						value: 0,
						currency: "EUR",
					},
					grandTotalAmount: 465,
					duePayableAmount: 465,
				},
			},
		},
	};
