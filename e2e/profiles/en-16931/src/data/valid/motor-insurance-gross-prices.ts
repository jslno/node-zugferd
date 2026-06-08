import type { invoicer } from "../../invoicer.js";

export const motorInsuranceGrossPricesData: typeof invoicer.$Infer.Input.En16931 =
	{
		exchangedDocument: {
			invoiceNumber: "00.123.456.7-2018-1",
			invoiceTypeCode: "575",
			invoiceIssueDate: new Date("2018-03-11"),
			invoiceNotes: [
				{
					content:
						"Beitragsrechnung zur Kraftfahrtversicherung Nr. 00.123.456.7",
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
						name: "Kfz-Haftpflicht SF25 (30 %) Typkl. 18 Regio R9",
						description: "Enthählt 19% Versicherungssteuer = 12,7726 €",
					},
					priceDetails: {
						grossPrice: {
							chargeAmount: 80.0006,
						},
						netPrice: {
							chargeAmount: 67.2244,
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
							lineTotalAmount: 80,
						},
					},
				},
				{
					position: {
						lineId: "2",
					},
					item: {
						name: "Vollkasko SF25 (30 %) Typkl. 21 Regio R4",
						description: "Enthält 19% Versicherungssteuer = 22,3529 €",
					},
					priceDetails: {
						grossPrice: {
							chargeAmount: 140,
						},
						netPrice: {
							chargeAmount: 117.6471,
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
							lineTotalAmount: 140,
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
					date: new Date("2018-06-30"),
				},
			},
			debit: {
				invoiceCurrencyCode: "EUR",
				vatBreakdown: [
					{
						calculatedAmount: 0,
						typeCode: "VAT",
						exemptionReason: "Umsatzsteuerbefreit nach §4 Nr. 10a UStG",
						basisAmount: 220,
						categoryCode: "E",
						rateApplicablePercent: 0,
					},
				],
				paymentTerms: {
					description: [
						"Einen zu zahlenden Beitrag überweisen Sie bitte auf folgende Bankverbindung:",
						"DE75123456780000001234, BIC WELADED1MST, Sparkasse Musterstadt Ost. Einfacher für Sie ist es, wenn Sie uns ein SEPA-Lastschriftmandat erteilen. Wir würden dann zu den Fälligkeiten 01.07.2018, 01.10.2018 den jeweiligen Beitrag von dem uns bekannten Konto abbuchen. In diesem Fall würden Sie, sofern sich keine Beitragsänderung ergibt, zukünftig keine Zwischenrechnung erhalten.",
						"Beitragsgutschriften aus Ihrem Vertrag erstatten wir per Scheck.",
						"Rabattservice: Wenn Sie im laufenden Kalenderjahr nur einen Kfz-Haftpflichtschaden oder nur einen Vollkaskoschaden melden, gilt für Sie der Rabattretter.",
					].join("\n"),
				},
				documentTotals: {
					lineTotalAmount: 220,
					chargeTotalAmount: 0,
					allowanceTotalAmount: 0,
					taxBasisTotalAmount: 220,
					taxTotalAmount: {
						value: 0,
						currency: "EUR",
					},
					grandTotalAmount: 220,
					prepaidAmount: -220,
					duePayableAmount: 440,
				},
			},
		},
	};
