import type { invoicer } from "../../invoicer.js";

export const liabilityInsuranceInsuranceTaxData: typeof invoicer.$Infer.Input.En16931 =
	{
		exchangedDocument: {
			invoiceNumber: "01.234.567.8-2018-1",
			invoiceTypeCode: "575",
			invoiceIssueDate: new Date("2018-12-06"),
			invoiceNotes: [
				{
					content:
						"Allgemeine Haftpflichtversicherung VSNR: 01.234.567.8\n(Bei Schriftwechsel und Zahlung bitte angeben.)",
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
						name: "Privathaftpflicht",
					},
					priceDetails: {
						grossPrice: {
							chargeAmount: 50,
						},
						netPrice: {
							chargeAmount: 50,
						},
					},
					delivery: {
						billedQuantity: {
							value: 1,
							unitCode: "C62",
						},
					},
					billing: {
						vatBreakdown: {
							typeCode: "VAT",
							categoryCode: "E",
							rateApplicablePercent: 0,
						},
						itemTotals: {
							lineTotalAmount: 50,
						},
					},
				},
				{
					position: {
						lineId: "2",
					},
					item: {
						name: "Lebensgefährte/in zur Privathaftpflicht",
					},
					priceDetails: {
						grossPrice: {
							chargeAmount: 0,
						},
						netPrice: {
							chargeAmount: 0,
						},
					},
					delivery: {
						billedQuantity: {
							value: 1,
							unitCode: "C62",
						},
					},
					billing: {
						vatBreakdown: {
							typeCode: "VAT",
							categoryCode: "E",
							rateApplicablePercent: 0,
						},
						itemTotals: {
							lineTotalAmount: 0,
						},
					},
				},
			],
			contract: {
				seller: {
					id: "549910",
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
					date: new Date("2018-12-06"),
				},
			},
			debit: {
				invoiceCurrencyCode: "EUR",
				vatBreakdown: [
					{
						calculatedAmount: 0,
						typeCode: "VAT",
						exemptionReason: "Umsatzsteuerbefreit nach §4 Nr. 10a UStG",
						basisAmount: 50,
						categoryCode: "E",
						rateApplicablePercent: 0,
					},
				],
				paymentTerms: {
					description: [
						"Einen zu zahlenden Beitrag überweisen Sie bitte auf folgende Bankverbindung: IBAN DE75123456780000001234, BIC WELADED1MST, Sparkasse Musterstadt Ost.",
						"Einfacher für Sie ist es, wenn Sie uns ein SEPA-Lastschriftmandat erteilen. Wir würden dann zu der Fälligkeit 06.12.2018 den Beitrag von dem uns bekannten Konto abbuchen. In diesem Fall würden Sie, sofern sich keine Beitragsänderung ergibt, zukünftig keine Zwischenrechnung erhalten.",
						"\n",
						"Beitragsgutschriften aus Ihrem Vertrag erstatten wir per Scheck.",
					].join("\n"),
				},
				documentTotals: {
					lineTotalAmount: 50,
					chargeTotalAmount: 0,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 50,
					taxTotalAmount: {
						value: 0,
						currency: "EUR",
					},
					grandTotalAmount: 50,
					prepaidAmount: 0,
					duePayableAmount: 50,
				},
			},
		},
	};
