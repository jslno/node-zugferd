import type { invoicer } from "../../invoicer";

export const machineSerialNoData: typeof invoicer.$Infer.Input.Extended = {
	exchangedDocument: {
		invoiceNumber: "6069999999",
		name: "RECHNUNG",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2026-05-02"),
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
					"Dies ist eine Beispiel-Rechnung zur empfohlenen Darstellung von Maschinen-Serien-Nummern (BT-X-307)",
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
						value: "GTIN444444444",
						schemeId: "0160",
					},
					sellerAssignedId: "S987654321",
					name: "Säge-AKKU-XYZ",
					description: "Spezial-Säge",
					instances: [
						{
							supplierAssignedSerialId: "123456789123456789",
						},
					],
				},
				priceDetails: {
					grossPrice: {
						chargeAmount: 127.6,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
					netPrice: {
						chargeAmount: 127.6,
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
					recipient: {
						id: "21212121",
						name: "Muster Maschinenbau GmbH",
						postalAddress: {
							postCode: "12345",
							line1: "Musterstr. 12",
							city: "Musterstadt",
							countryCode: "DE",
						},
					},
					deliveryNoteReferencedDocument: {
						issuerAssignedId: "8876543219",
						lineId: "000010",
						date: new Date("2026-05-02"),
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
						endDate: new Date("2026-05-02"),
					},
					itemTotals: {
						lineTotalAmount: 127.6,
						totalAllowanceChargeAmount: 0,
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
				id: "21212121",
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
				date: new Date("2026-05-02"),
			},
			associatedOrder: {
				issuerAssignedId: "456789123",
			},
		},
		delivery: {
			recipient: {
				locationId: "21212121",
				name: "Muster Maschinenbau GmbH",
				postalAddress: {
					postCode: "12345",
					line1: "Musterstr. 12",
					city: "Musterstadt",
					countryCode: "DE",
				},
			},
			actualDelivery: {
				date: new Date("2026-05-02"),
			},
			deliveryNoteReferencedDocuments: [
				{
					issuerAssignedId: "8876543219",
					date: new Date("2026-05-02"),
				},
			],
		},
		debit: {
			paymentReference: "",
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
					calculatedAmount: 24.24,
					typeCode: "VAT",
					basisAmount: 127.6,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			paymentTerms: [
				{
					description: "Bis zum 29.10.2026 ohne Abzug",
					dueDate: new Date("2026-10-29"),
				},
			],
			documentTotals: {
				lineTotalAmount: 127.6,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 127.6,
				taxTotalAmount: {
					value: 24.24,
					currency: "EUR",
				},
				grandTotalAmount: 151.84,
				duePayableAmount: 151.84,
			},
		},
	},
};
