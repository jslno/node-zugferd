import type { invoicer } from "../../invoicer";

export const subInvoiceLineCoffeeBundleSetData: typeof invoicer.$Infer.Input.Extended =
	{
		exchangedDocument: {
			invoiceNumber: "50099877",
			invoiceTypeCode: "380",
			invoiceIssueDate: new Date("2026-05-30"),
			invoiceNotes: [
				{
					content: "Geschäftsführer: Herr Geschäftsführer , Muster GmbH etc.",
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
						"Dies ist eine Beispiel-Rechnung zur empfohlenen Darstellung von Unterpositionen im Bundle mit verschiedenen Steuersätzen",
					subjectCode: "ACB",
				},
			],
		},
		transaction: {
			line: [
				{
					position: {
						lineId: "1",
						lineStatusReasonCode: "GROUP",
						includedNote: [
							{
								content:
									"Positionswert nicht Rechnungs- bzw. Steuerrelevant - Zusammenfassung der steuerrelevanten Unterpositionen",
							},
						],
					},
					item: {
						globalId: {
							value: "88888886349852",
							schemeId: "0160",
						},
						sellerAssignedId: "123456789",
						buyerAssignedId: "987654321",
						name: 'Kaffee-Display "Delicous"',
						description:
							"Kaffee-Display / Bundle/Set bestehend aus folgenden Positionen",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 108,
						},
					},
					delivery: {
						billedQuantity: {
							value: 2,
							unitCode: "H87",
						},
						packageQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
					billing: {
						itemTotals: {
							lineTotalAmount: 216,
						},
					},
				},
				{
					position: {
						lineId: "1.1",
						parentLineId: "1",
						lineStatusReasonCode: "DETAIL",
					},
					item: {
						globalId: {
							value: "77777776349852",
							schemeId: "0160",
						},
						sellerAssignedId: "2345678910",
						buyerAssignedId: "876543219",
						name: "Kenia Röstung",
						description: "feinste Röstung",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 5,
						},
					},
					delivery: {
						billedQuantity: {
							value: 6,
							unitCode: "H87",
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
						itemTotals: {
							lineTotalAmount: 30,
						},
					},
				},
				{
					position: {
						lineId: "1.2",
						parentLineId: "1",
						lineStatusReasonCode: "DETAIL",
					},
					item: {
						globalId: {
							value: "0000006349852",
							schemeId: "0160",
						},
						sellerAssignedId: "99992345678910",
						buyerAssignedId: "88888876543219",
						name: "Dunkle Röstung",
						description: "feinste Röstung dunkel",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 5,
						},
					},
					delivery: {
						billedQuantity: {
							value: 12,
							unitCode: "H87",
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
						itemTotals: {
							lineTotalAmount: 60,
						},
					},
				},
				{
					position: {
						lineId: "1.3",
						parentLineId: "1",
						lineStatusReasonCode: "GROUP",
						includedNote: [
							{
								content:
									"Positionswert nicht Rechnungs- bzw. Steuerrelevant - Zusammenfassung der steuerrelevanten Unterpositionen",
							},
						],
					},
					item: {
						globalId: {
							value: "6666656349852",
							schemeId: "0160",
						},
						sellerAssignedId: "345678912",
						buyerAssignedId: "765432198",
						name: "Colombia Bundle",
						description: "Bundle/Set kolumbianische Röstung",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 21,
						},
					},
					delivery: {
						billedQuantity: {
							value: 6,
							unitCode: "H87",
						},
					},
					billing: {
						itemTotals: {
							lineTotalAmount: 126,
						},
					},
				},
				{
					position: {
						lineId: "1.3.1",
						parentLineId: "1.3",
						lineStatusReasonCode: "DETAIL",
					},
					item: {
						globalId: {
							value: "55555556349852",
							schemeId: "0160",
						},
						sellerAssignedId: "456789123",
						buyerAssignedId: "654321987",
						name: "Colombia Roast",
						description: "kolumbianische Röstung",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 5,
						},
					},
					delivery: {
						billedQuantity: {
							value: 18,
							unitCode: "H87",
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
						itemTotals: {
							lineTotalAmount: 90,
						},
					},
				},
				{
					position: {
						lineId: "1.3.2",
						parentLineId: "1.3",
						lineStatusReasonCode: "DETAIL",
					},
					item: {
						globalId: {
							value: "5555556349852",
							schemeId: "0160",
						},
						sellerAssignedId: "567891234",
						buyerAssignedId: "543219876",
						name: "Becher",
						description: "Kaffeebecher Sonderanfertigung",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 2,
						},
					},
					delivery: {
						billedQuantity: {
							value: 18,
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
							lineTotalAmount: 36,
						},
					},
				},
			],
			contract: {
				buyerReference: "Kundenref. BT-10",
				seller: {
					id: "998877",
					name: "Musterbetrieb Kaffee AG",
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
							id: "DE106008386",
						},
					},
				},
				buyer: {
					id: "330145",
					name: "Auftraggeber Kaffeehaus GmbH",
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
							id: "DE727081482",
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
					name: "Auftraggeber Kaffeehaus GmbH",
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
						calculatedAmount: 12.6,
						typeCode: "VAT",
						basisAmount: 180,
						categoryCode: "S",
						rateApplicablePercent: 7,
					},
					{
						calculatedAmount: 6.84,
						typeCode: "VAT",
						basisAmount: 36,
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				],
				paymentTerms: [
					{
						description:
							"Bei Zahlung bis zum 06.06.2026 zahlen Sie mit 2,00 % Skonto € 230,73 €",
						dueDate: new Date("2026-06-06"),
						discountTerms: [
							{
								basisAmount: 235.44,
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
					lineTotalAmount: 216,
					chargeTotalAmount: 0,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 216,
					taxTotalAmount: {
						value: 19.44,
						currency: "EUR",
					},
					grandTotalAmount: 235.44,
					prepaidAmount: 0,
					duePayableAmount: 235.44,
				},
				accounting: {
					buyerReference: "Kostenstelle BT-19",
				},
			},
		},
	};
