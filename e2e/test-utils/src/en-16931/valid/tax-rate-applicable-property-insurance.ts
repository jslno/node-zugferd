import type { en16931 } from "@node-zugferd/en-16931";

export const taxRateApplicablePropertyInsuranceData: typeof en16931.$Infer.Input =
	{
		exchangedDocument: {
			invoiceNumber: "00.123.456.7-2018-1",
			invoiceTypeCode: "575",
			invoiceIssueDate: new Date("2018-04-18"),
			invoiceNotes: [
				{
					content:
						"Sachversicherungsvertrag Nr: 00.123.456.7 (Bei Schriftwechsel und Zahlung bitte angeben.)",
				},
				{
					content: [
						"MVM Musterhafter",
						"Versicherungsverein Musterstadt a.G.",
						"Versicherungsbüro",
						"Muster",
						"Musterstr. 12",
						"12345 Musterstadt",
						"Tel.: 0123/45678",
						"Fax.: 01231/99 45678",
						"Mo.-Fr. 08.30 - 12.30 Uhr",
						"Mo.-Fr. 14.00 - 17.00 Uhr",
						"Mo-Fr 8.00-20.00 Uhr, Sa 8.00-14.00 Uhr",
					].join("\n"),
					subjectCode: "REG",
				},
			],
		},
		transaction: {
			line: [
				{
					position: {
						lineId: "1",
					},
					item: {
						name: "Verbundene Wohngebäudeversicherung",
						description: [
							"- Feuerversicherung - Teil A § 2 62.000 MK1914",
							"- Leitungswasserversicherung - Teil A § 3 62.000 MK1914",
							"- Sturm- und Hagelversicherung - Teil A § 4 Ziff. 2 62.000 MK1914",
							"- WohngebäudePlus und zusätzliche Einschlüsse gemäß Antrag",
							"- Weitere Elementargefahren - Teil A § 4 Ziff. 3 62.000 MK1914",
							"\n",
							"Enthält 16,34 % Versicherungssteuer = 163,40 €",
						].join("\n"),
					},
					priceDetails: {
						grossPrice: {
							chargeAmount: 1163.4,
						},
						netPrice: {
							chargeAmount: 1000,
						},
					},
					delivery: {
						billedQuantity: {
							value: 1,
							unitCode: "H87",
						},
					},
					billing: {
						vatBreakdown: {
							typeCode: "VAT",
							categoryCode: "E",
							rateApplicablePercent: 0,
						},
						itemTotals: {
							lineTotalAmount: 1163.4,
						},
					},
				},
			],
			contract: {
				seller: {
					id: "549910",
					globalId: {
						value: "1234567890128",
						schemeId: "0088",
					},
					name: "MVM Musterhafter Versicherungsverein Musterstadt a.G.",
					postalAddress: {
						postCode: "12345",
						line1: "Musterstr. 12",
						city: "Musterstadt",
						countryCode: "DE",
					},
					taxRegistration: {
						vat: {
							id: "DE234567891",
						},
					},
				},
				buyer: {
					name: "Herrn Max Mustermann",
					postalAddress: {
						postCode: "12346",
						line1: "Musterstr. 11",
						city: "Bad Musterhausen",
						countryCode: "DE",
					},
				},
			},
			delivery: {
				actualDelivery: {
					date: new Date("2018-05-21"),
				},
			},
			debit: {
				invoiceCurrencyCode: "EUR",
				vatBreakdown: [
					{
						calculatedAmount: 0,
						typeCode: "VAT",
						exemptionReason: "Umsatzsteuerbefreit nach §4 Nr. 10a UStG",
						basisAmount: 1163.4,
						categoryCode: "E",
						rateApplicablePercent: 0,
					},
				],
				paymentTerms: {
					description:
						"Einen zu zahlenden Beitrag überweisen Sie bitte auf folgende Bankverbindung: IBAN DE75123456780000001234, BIC WELADED1MST, Sparkasse Musterstadt Ost. Einfacher für Sie ist es, wenn Sie uns ein SEPA-Lastschriftmandat erteilen. Wir würden dann zu der Fälligkeit 21.05.2018 den Beitrag von dem uns bekannten Konto abbuchen. In diesem Fall würden Sie, sofern sich keine Beitragsänderung ergibt, zukünftig keine Zwischenrechnung erhalten. Beitragsgutschriften aus Ihrem Vertrag erstatten wir per Scheck.",
				},
				documentTotals: {
					lineTotalAmount: 1163.4,
					chargeTotalAmount: 0,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 1163.4,
					taxTotalAmount: {
						value: 0,
						currency: "EUR",
					},
					grandTotalAmount: 1163.4,
					prepaidAmount: 0,
					duePayableAmount: 1163.4,
				},
			},
		},
	};
