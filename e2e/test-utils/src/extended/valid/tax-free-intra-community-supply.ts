import type { extended } from "@node-zugferd/extended";

export const taxFreeIntraCommunitySupplyData: typeof extended.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "6039999999",
		name: "RECHNUNG",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2026-08-31"),
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
				content: "Steuerfreie innergemeinschaftliche Lieferung",
				subjectCode: "AAI",
			},
			{
				content: "ZUGFeRD vers 2.4.0 Extended",
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
						value: "4009999999999",
						schemeId: "0160",
					},
					sellerAssignedId: "S123456789",
					name: "Spezial-Artikel A",
					description: "Artikel für XYZ",
				},
				priceDetails: {
					associatedOrder: {
						issuerAssignedId: "4444444444",
						lineId: "000030",
						date: new Date("2026-07-07"),
					},
					quotationReferencedDocument: {
						issuerAssignedId: "ANG987654",
						lineId: "000020",
					},
					grossPrice: {
						chargeAmount: 16.8,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
					netPrice: {
						chargeAmount: 16.8,
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
					invoicePeriod: {
						startDate: new Date("2026-07-07"),
						endDate: new Date("2026-08-31"),
					},
					itemTotals: {
						lineTotalAmount: 16.8,
						totalAllowanceChargeAmount: 0,
					},
					additionalReferencedDocument: {
						issuerAssignedId: "BE12345678",
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
						value: "4008888888888",
						schemeId: "0160",
					},
					sellerAssignedId: "S23456789",
					name: "Schiene BEF",
					description: "Schiene Befestigung A4",
				},
				priceDetails: {
					associatedOrder: {
						issuerAssignedId: "4444444444",
						lineId: "000040",
						date: new Date("2026-07-07"),
					},
					grossPrice: {
						chargeAmount: 198.54,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
					netPrice: {
						chargeAmount: 198.54,
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
				},
				billing: {
					vatBreakdown: [
						{
							typeCode: "VAT",
							categoryCode: "E",
							rateApplicablePercent: 0,
						},
					],
					invoicePeriod: {
						startDate: new Date("2026-07-07"),
						endDate: new Date("2026-08-31"),
					},
					itemTotals: {
						lineTotalAmount: 397.08,
						totalAllowanceChargeAmount: 0,
					},
					additionalReferencedDocument: {
						issuerAssignedId: "BE12345678",
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
						value: "",
						schemeId: "0160",
					},
					sellerAssignedId: "4007777777777",
					name: "FESTPKT-TYPXY 987654",
					description: "Festpunkt",
				},
				priceDetails: {
					associatedOrder: {
						issuerAssignedId: "4444444444",
						lineId: "000050",
						date: new Date("2026-07-07"),
					},
					grossPrice: {
						chargeAmount: 102.75,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
					netPrice: {
						chargeAmount: 102.75,
						basisQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
				},
				delivery: {
					billedQuantity: {
						value: 4,
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
					invoicePeriod: {
						startDate: new Date("2026-07-07"),
						endDate: new Date("2026-08-31"),
					},
					itemTotals: {
						lineTotalAmount: 411,
						totalAllowanceChargeAmount: 0,
					},
					additionalReferencedDocument: {
						issuerAssignedId: "BE12345678",
						typeCode: "130",
						referenceTypeCode: "VN",
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
				id: "0008888888",
				name: "Unternehmen XYZ GmbH",
				contact: [
					{
						personName: "Herr Marcus Einkauf",
						phoneNumber: "0043 22222233333",
						emailAddress: "Marcus.Einkauf@firma.at",
					},
				],
				postalAddress: {
					postCode: "1234",
					line1: "Bahnhof Strasse 1",
					city: "Muster Ort",
					countryCode: "AT",
				},
				taxRegistration: {
					vat: {
						id: "ATU123456789",
					},
				},
			},
			sellerOrderReferencedDocument: {
				issuerAssignedId: "BE12345678",
				date: new Date("2026-07-07"),
			},
			associatedOrder: {
				issuerAssignedId: "4444444444",
				date: new Date("2026-07-07"),
			},
		},
		delivery: {
			recipient: {
				name: "Unternehmen XYZ GmbH",
				postalAddress: {
					postCode: "1234",
					line1: "Bahnhof Strasse 1",
					city: "Muster Ort",
					countryCode: "AT",
				},
				taxRegistration: {
					vat: {
						id: "ATU123456789",
					},
				},
			},
			actualDelivery: {
				date: new Date("2026-08-31"),
			},
			deliveryNoteReferencedDocuments: [
				{
					issuerAssignedId: "27010181",
					date: new Date("2026-08-31"),
				},
			],
		},
		debit: {
			paymentReference:
				"Kundennummer:. 0008888888 Rechnungsnummer:. 6039999999",
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
					exemptionReason: "Steuerfreie innergemeinschaftliche Lieferung",
					basisAmount: 824.88,
					categoryCode: "E",
					rateApplicablePercent: 0,
				},
			],
			paymentTerms: [
				{
					description: "Bis zum 29.10.2026 ohne Abzug",
					dueDate: new Date("2026-10-29"),
				},
			],
			documentTotals: {
				lineTotalAmount: 824.88,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 824.88,
				taxTotalAmount: {
					value: 0,
					currency: "EUR",
				},
				grandTotalAmount: 824.88,
				duePayableAmount: 824.88,
			},
		},
	},
};
