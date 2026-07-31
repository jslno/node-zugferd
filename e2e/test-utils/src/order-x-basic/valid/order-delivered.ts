import type { orderXBasic } from "@node-zugferd/order-x-basic";

export const orderDeliveredData: typeof orderXBasic.$Infer.Input = {
	processControl: {
		testIndicator: false,
		businessContextInfo: {
			processType: "A1",
		},
	},
	exchangedDocument: {
		orderId: "1861727",
		orderTypeCode: "220",
		orderIssueDate: new Date("2020-01-09"),
		copyIndicator: false,
		purposeCode: "9",
		requestedResponseCode: "AC",
		documentNotes: [
			{
				content:
					"ARC 0142038529 LIVRAISON SUR RDV AU 02.40.32.40.12 RECEPTION DE 8H30 A 12H",
				subjectCode: "DEL",
			},
		],
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "1",
					includedNotes: [
						{
							content: "certifiés  PEFC mini 90% PEFC/10-34-97",
							subjectCode: "PRD",
						},
					],
				},
				item: {
					globalId: {
						value: "3607765426686",
						schemeId: "0160",
					},
					sellerAssignedId: "542668",
					buyerAssignedId: "198765",
					name: "HPL 0.8 mm  3070x1320",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 18.74,
						basisQuantity: {
							value: 1,
							unitCode: "MTK",
						},
					},
				},
				delivery: {
					partialDeliveryAllowed: false,
					requestedQuantity: {
						value: 4.052,
						unitCode: "MTK",
					},
				},
				billing: {
					itemTotals: {
						lineTotalAmount: 75.93,
					},
				},
			},
			{
				position: {
					lineId: "2",
				},
				item: {
					globalId: {
						value: "4024125000178",
						schemeId: "0160",
					},
					sellerAssignedId: "73796000",
					buyerAssignedId: "186954",
					name: "wedi Kit d'étanchéité Fundo",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 89.03,
						basisQuantity: {
							value: 1,
							unitCode: "C62",
						},
					},
				},
				delivery: {
					partialDeliveryAllowed: true,
					requestedQuantity: {
						value: 5,
						unitCode: "C62",
					},
				},
				billing: {
					itemTotals: {
						lineTotalAmount: 445.15,
					},
				},
			},
			{
				position: {
					lineId: "3",
				},
				item: {
					globalId: {
						value: "3546335717048",
						schemeId: "0160",
					},
					sellerAssignedId: "571704",
					buyerAssignedId: "125965",
					name: "RSS SCD CHROME 0500W",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 208.02,
						basisQuantity: {
							value: 1,
							unitCode: "C62",
						},
					},
				},
				delivery: {
					partialDeliveryAllowed: true,
					requestedQuantity: {
						value: 5,
						unitCode: "C62",
					},
				},
				billing: {
					itemTotals: {
						lineTotalAmount: 1040.1,
					},
				},
			},
		],
		contract: {
			seller: {
				globalId: [
					{
						value: "3020816001302",
						schemeId: "0088",
					},
				],
				name: "DMBP NANTES DISPANO ROUX - 1535",
				organization: {
					id: {
						value: "50810215900334",
						schemeId: "0002",
					},
				},
				postalAddress: {
					postCode: "44100",
					line1: "12 RUE DE LA FONTAINE SALEE",
					city: "NANTES",
					countryCode: "FR",
				},
				taxRegistration: {
					vat: {
						id: "FR86508102159",
					},
				},
			},
			buyer: {
				globalId: [
					{
						value: "3306949923804",
						schemeId: "0088",
					},
				],
				name: "AMBERIEU EN BUGEY CEDEO",
				organization: {
					id: {
						value: "57214188502180",
						schemeId: "0002",
					},
				},
				contact: {
					personName: "ALAIN DUPOND",
					phoneNumber: "06 78 56 23 00",
					emailAddress: "alain.dupond@saint-gobain.com",
				},
				postalAddress: {
					postCode: "01500",
					line1: "Avenue Leon Blum",
					city: "Amberieu en bugey",
					countryCode: "FR",
				},
				electronicAddress: {
					value: "alain.dupond@saint-gobain.com",
					schemeId: "EM",
				},
				taxRegistration: {
					vat: {
						id: "FR94572141885",
					},
				},
			},
		},
		delivery: {
			recipient: {
				globalId: [
					{
						value: "3306949923804",
						schemeId: "0088",
					},
				],
				name: "AMBERIEU EN BUGEY CEDEO",
				contact: {
					personName: "ALAIN DUPOND",
					phoneNumber: "06 78 56 23 00",
					emailAddress: "alain.dupond@saint-gobain.com",
				},
				postalAddress: {
					postCode: "01500",
					line1: "Avenue Leon Blum",
					city: "Amberieu en bugey",
					countryCode: "FR",
				},
			},
			requestedDeliveries: [
				{
					date: new Date("2020-01-15"),
				},
			],
		},
		debit: {
			orderCurrency: "EUR",
			documentTotals: {
				lineTotalAmount: 1561.18,
				taxBasisTotalAmount: 1561.18,
				grandTotalAmount: 1561.18,
			},
		},
	},
};
