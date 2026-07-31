import type { extended } from "@node-zugferd/extended";

export const subInvoiceLineHardwareData: typeof extended.$Infer.Input = {
	exchangedDocument: {
		invoiceNumber: "99877",
		invoiceTypeCode: "380",
		invoiceIssueDate: new Date("2026-05-30"),
		invoiceNotes: [
			{
				content: "Geschäftsführer: Herr Geschäftsführer , Muster Bau GmbH etc.",
				subjectCode: "REG",
			},
			{
				content:
					"Es bestehen Vereinbarungen, aus denen sich Minderungen des Entgelts ergeben können.",
				subjectCode: "AAI",
			},
			{
				content: "ZUGFeRD vers 2.4.0 Extended",
				subjectCode: "ACB",
			},
			{
				content:
					"Dies ist eine Beispiel-Rechnung zur empfohlenen Darstellung von Unterpositionen",
				subjectCode: "ACB",
			},
		],
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "0101",
					parentLineId: "01",
					lineStatusReasonCode: "DETAIL",
				},
				item: {
					globalId: {
						value: "88888886349852",
						schemeId: "0160",
					},
					sellerAssignedId: "123456789",
					buyerAssignedId: "987654321",
					name: "Laser printer B/W",
					description: "Schwarzweiß Laserdrucker",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 300,
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
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
					itemTotals: {
						lineTotalAmount: 600,
					},
				},
			},
			{
				position: {
					lineId: "0102",
					parentLineId: "01",
					lineStatusReasonCode: "DETAIL",
				},
				item: {
					globalId: {
						value: "77777776349852",
						schemeId: "0160",
					},
					sellerAssignedId: "2345678910",
					buyerAssignedId: "876543219",
					name: "Ink printer color",
					description: "Farbdrucker",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 150,
					},
				},
				delivery: {
					billedQuantity: {
						value: 3,
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
						lineTotalAmount: 450,
					},
				},
			},
			{
				position: {
					lineId: "01",
					lineStatusReasonCode: "GROUP",
				},
				item: {
					globalId: {
						value: "6666656349852",
						schemeId: "0160",
					},
					sellerAssignedId: "345678912",
					buyerAssignedId: "765432198",
					name: "Subtotal hardware",
					description: "Hardware Gesamt",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 1050,
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
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
					itemTotals: {
						lineTotalAmount: 1050,
					},
				},
			},
			{
				position: {
					lineId: "0201",
					parentLineId: "02",
					lineStatusReasonCode: "DETAIL",
				},
				item: {
					globalId: {
						value: "55555556349852",
						schemeId: "0160",
					},
					sellerAssignedId: "456789123",
					buyerAssignedId: "654321987",
					name: "Toner",
					description: "Toner",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 120,
					},
				},
				delivery: {
					billedQuantity: {
						value: 3,
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
						lineTotalAmount: 360,
					},
				},
			},
			{
				position: {
					lineId: "0202",
					parentLineId: "02",
					lineStatusReasonCode: "DETAIL",
				},
				item: {
					globalId: {
						value: "5555556349852",
						schemeId: "0160",
					},
					sellerAssignedId: "",
					buyerAssignedId: "",
					name: "PAPER",
					description: "Kopierpapier",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 9,
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
						lineTotalAmount: 90,
					},
				},
			},
			{
				position: {
					lineId: "02",
					lineStatusReasonCode: "GROUP",
				},
				item: {
					globalId: {
						value: "2222256349852",
						schemeId: "0160",
					},
					sellerAssignedId: "9345678912",
					buyerAssignedId: "9765432198",
					name: "Subtotal Accessories",
					description: "Zubehör Gesamt",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 450,
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
							categoryCode: "S",
							rateApplicablePercent: 19,
						},
					],
					itemTotals: {
						lineTotalAmount: 450,
					},
				},
			},
		],
		contract: {
			buyerReference: "Kundenref. BT-10",
			seller: {
				id: "998877",
				name: "Musterbetrieb Systemhaus AG",
				organization: {
					id: "HRA 45678",
				},
				contact: [
					{
						personName: "Kontaktperson",
						phoneNumber: "5578",
						emailAddress: "absender@musterbetrieb.de",
					},
				],
				postalAddress: {
					postCode: "37079",
					line1: "August-Müller-Strasse 222",
					city: "Göttingen",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE09687654321",
					},
				},
			},
			buyer: {
				id: "330145",
				name: "Auftraggeber Firmenkunde GmbH",
				contact: [
					{
						personName: "Herr Thomas Auftraggeber",
						phoneNumber: "+49 321 456789",
						emailAddress: "thomas.auftraggeber@Firmenkunde.de",
					},
				],
				postalAddress: {
					postCode: "37073",
					line1: "Musterstraße 1212",
					city: "Göttingen",
					countryCode: "DE",
				},
				taxRegistration: {
					vat: {
						id: "DE1234567890",
					},
				},
			},
			sellerOrderReferencedDocument: {
				issuerAssignedId: "G12042-1-01",
			},
			associatedOrder: {
				issuerAssignedId: "BT-13",
			},
			associatedContract: {
				issuerAssignedId: "Vertragsnr. BT-12",
			},
			tenderOrLotReferences: [
				{
					issuerAssignedId: "Vergabenr. BT-17",
				},
			],
			projectReference: {
				id: "Projektnr. BT-11",
				name: "Project reference",
			},
		},
		delivery: {
			recipient: {
				name: "Auftraggeber Firmenkunde GmbH",
				postalAddress: {
					postCode: "37073",
					line1: "Musterstraße 1212",
					city: "Göttingen",
					countryCode: "DE",
				},
			},
			actualDelivery: {
				date: new Date("2026-05-30"),
			},
		},
		debit: {
			invoiceCurrencyCode: "EUR",
			paymentMeans: {
				typeCode: "58",
				creditTransfers: [
					{
						iban: "DE75512108001245126199",
						accountName: "Musterbetrieb Kontoname",
					},
				],
				sellerBankDetails: {
					bic: "PBNKDEFF",
				},
			},
			vatBreakdown: [
				{
					calculatedAmount: 285,
					typeCode: "VAT",
					basisAmount: 1500,
					categoryCode: "S",
					rateApplicablePercent: 19,
				},
			],
			paymentTerms: [
				{
					description:
						"Bei Zahlung bis zum 06.06.2026 zahlen Sie mit 2,00 % Skonto € 1749,30 €",
					dueDate: new Date("2026-06-06"),
					discountTerms: [
						{
							basisAmount: 1785,
							calculationPercent: 2,
						},
					],
				},
				{
					description: "Bis zum zum 13.06.2026 ohne Abzug",
					dueDate: new Date("2026-06-13"),
				},
			],
			documentTotals: {
				lineTotalAmount: 1500,
				chargeTotalAmount: 0,
				allowanceTotalAmount: 0,
				taxBasisTotalAmount: 1500,
				taxTotalAmount: {
					value: 285,
					currency: "EUR",
				},
				grandTotalAmount: 1785,
				prepaidAmount: 0,
				duePayableAmount: 1785,
			},
			accounting: {
				buyerReference: "Kostenstelle BT-19",
			},
		},
	},
};
