import type { extended } from "@node-zugferd/extended";

export const simpleConstructionProFormaInvoice2Data: typeof extended.$Infer.Input =
	{
		exchangedDocument: {
			invoiceNumber: "210112",
			invoiceTypeCode: "875",
			invoiceIssueDate: new Date("2025-06-06"),
			invoiceNotes: [
				{
					content: "2. Abschlagsrechnung",
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
						"Dies ist eine einfache  Darstellung von Buchungsreferenzen und dem Bezug auf vorangegangener Rechnungen. Dieser Beleg ist Teil einer Belegkette",
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
					content: [
						"Zusammenstellung: nur zur Information",
						"01 Bauabschnitt 1 - Vorarbeiten 3.600,00 €",
						"02 Bauabschnitt 2 - Pflasterarbeiten 9.250,00 €",
					].join("\n"),
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
						name: "Baugelände abräumen\nAnfallender Schutt, Pflanzenreste und Müll entsorgen",
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
				{
					position: {
						lineId: "02.01",
					},
					item: {
						name: "Frostschutzschicht aus Mineralgemisch 0/45 15 cm , Verdichtung mind. DPr 1",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 8,
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
							lineTotalAmount: 2000,
						},
					},
				},
				{
					position: {
						lineId: "02.02",
					},
					item: {
						name: "Kiestragschicht für Betonpflaster\nMineralgemisch 0/32, Schichtstärke 15 cm",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 9,
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
							lineTotalAmount: 2250,
						},
					},
				},
				{
					position: {
						lineId: "02.03",
					},
					item: {
						name: "Pflasterdecke, aus Pflastersteinen aus Beton, DIN EN 1338, ungebundene Bauweise, Maße L/B 200/100 mm, Dicke 80 mm, max. Differenzen K, Witterungswiderstand B, Abriebwiderstand H, Kante abgeschrägt, Bettung aus Baustoffgemisch Körnung 0/5 aus natürlichen gebrochenen Gesteinskörnungen (Brechsand-Splitt-Gemisch), Dicke 5 +/- 1,5 cm, Baustoffgemisch für Fugen, Körnung 0/2 aus natürlichen ungebrochenen Gesteinskörnungen (Sand) einkehren und einschlämmen.",
					},
					priceDetails: {
						netPrice: {
							chargeAmount: 20,
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
							lineTotalAmount: 5000,
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
						line1: "August-Spindler-Strasse 222",
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
						line1: "Gartenstraße 1212",
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
						line1: "Gartenstraße 1212",
						city: "Göttingen",
						countryCode: "DE",
					},
				},
				actualDelivery: {
					date: new Date("2025-06-19"),
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
						calculatedAmount: 2441.5,
						typeCode: "VAT",
						basisAmount: 12_850,
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				],
				invoicingPeriod: {
					startDate: new Date("2025-05-19"),
					endDate: new Date("2025-06-06"),
				},
				paymentTerms: [
					{
						description:
							"Bei Zahlung bis zum 13.06.2025 zahlen Sie mit 2,50  % Skonto € 15.016,31",
						dueDate: new Date("2025-06-13"),
						discountTerms: [
							{
								basisAmount: 15_291.5,
								calculationPercent: 2.5,
							},
						],
					},
					{
						description: "Bis zum zum 20.06.2025 ohne Abzug",
						dueDate: new Date("2025-05-20"),
					},
				],
				documentTotals: {
					lineTotalAmount: 12_850,
					chargeTotalAmount: 0,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 12_850,
					taxTotalAmount: {
						value: 2441.5,
						currency: "EUR",
					},
					grandTotalAmount: 15_291.5,
					prepaidAmount: 0,
					duePayableAmount: 15_291.5,
				},
				precendingInvoices: [
					{
						issuerAssignedId: "AR 210111",
						issueDate: new Date("2025-05-30"),
					},
				],
				accounting: {
					buyerReference: "Kostenstelle BT-19",
				},
			},
		},
	};
