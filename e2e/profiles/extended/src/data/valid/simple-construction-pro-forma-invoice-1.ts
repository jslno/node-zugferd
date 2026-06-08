import type { invoicer } from "../../invoicer";

export const simpleConstructionProFormaInvoice1Data: typeof invoicer.$Infer.Input.Extended =
	{
		exchangedDocument: {
			invoiceNumber: "210111",
			invoiceTypeCode: "875",
			invoiceIssueDate: new Date("2025-05-30"),
			invoiceNotes: [
				{
					content: "1. Abschlagsrechnung",
					subjectCode: "ACB",
				},
				{
					content:
						"Geschäftsführer: Herr Geschäftsführer , Muster Bau GmbH etc.",
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
						"Dies ist eine Beispiel-Rechnung zur empfohlenen Darstellung einer einfachen Bau-Abschlags-Rechnung",
					subjectCode: "ACB",
				},
				{
					content:
						"Betreff zum LV für eine Kurzinformation zum Bauvorhaben BT-22",
					subjectCode: "ACB",
				},
				{
					content:
						"Kopftext für zusätzliche Beschreibungen zur Rechnung. Z.B. als Anschreiben für die Rechnung BT-22",
					subjectCode: "ACB",
				},
				{
					content:
						"ergänzneder Fußtext für die Rechnung mit zusätzlichen Angaben. Z.B: Ist kein gesondertes Lieferdatum angegeben, entspricht das Rechnungsdatum dem Datum der Lieferung und Leistung",
					subjectCode: "ACB",
				},
				{
					content: "freier Text zur Rechnung BT-22",
					subjectCode: "ACB",
				},
			],
		},
		transaction: {
			line: [
				{
					position: {
						lineId: "01.01",
					},
					item: {
						name: "Baugelände abräumen Anfallender Schutt, Pflanzenreste und Müll entsorgen",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 7,
						},
					},
					delivery: {
						billedQuantity: {
							value: 300,
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
							lineTotalAmount: 2100,
						},
					},
				},
				{
					position: {
						lineId: "01.02",
					},
					item: {
						name: "Pflasterfläche vorbereiten, Planum herstellen und verdichten",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 6,
						},
					},
					delivery: {
						billedQuantity: {
							value: 250,
							unitCode: "MTK",
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
							lineTotalAmount: 1500,
						},
					},
				},
			],
			contract: {
				buyerReference: "Kundenref. BT-10",
				seller: {
					id: "998877",
					name: "Musterbetrieb AG Demodaten",
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
						line1: "August-Spindler-Strasse 20",
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
							phoneNumber: "03332 218915",
							emailAddress: "thomas.auftraggeber@Firmenkunde.de",
						},
					],
					postalAddress: {
						postCode: "37073",
						line1: "Gartenstraße 1112",
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
						line1: "Gartenstraße 1112",
						city: "Göttingen",
						countryCode: "DE",
					},
				},
				actualDelivery: {
					date: new Date("2025-05-30"),
				},
			},
			debit: {
				invoiceCurrencyCode: "EUR",
				paymentMeans: {
					typeCode: "58",
					creditTransfers: [
						{
							iban: "DE75512108001245126199",
							accountName: "Rechnungsempfänger AG",
						},
					],
					sellerBankDetails: {
						bic: "PBNKDEFF",
					},
				},
				vatBreakdown: [
					{
						calculatedAmount: 684,
						typeCode: "VAT",
						basisAmount: 3600,
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				],
				invoicingPeriod: {
					startDate: new Date("2025-05-13"),
					endDate: new Date("2025-05-30"),
				},
				paymentTerms: [
					{
						description:
							"Bei Zahlung bis zum 06.06.2025 zahlen Sie mit 2,50 % Skonto € 4.176,90",
						dueDate: new Date("2025-06-06"),
						discountTerms: [
							{
								basisAmount: 4284,
								calculationPercent: 2.5,
							},
						],
					},
					{
						description: "Bis zum zum 13.06.2025 ohne Abzug",
						dueDate: new Date("2025-06-13"),
					},
				],
				documentTotals: {
					lineTotalAmount: 3600,
					chargeTotalAmount: 0,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 3600,
					taxTotalAmount: {
						value: 684,
						currency: "EUR",
					},
					grandTotalAmount: 4284,
					prepaidAmount: 0,
					duePayableAmount: 4284,
				},
				accounting: {
					buyerReference: "Kostenstelle BT-19",
				},
			},
		},
	};
