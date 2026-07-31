import type { orderX } from "@node-zugferd/order-x";

export const responseMultipleDelData: typeof orderX.$Infer.Input = {
	processControl: {
		testIndicator: false,
	},
	exchangedDocument: {
		orderId: "",
		orderTypeCode: "231",
		statusCode: "3",
		orderIssueDate: new Date("2020-01-10"),
		copyIndicator: false,
		purposeCode: "9",
		requestedResponseCode: "AC",
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "1",
					lineStatusCode: "6",
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
					associatedOrder: {
						lineId: "2",
					},
					netPrice: {
						chargeAmount: 90.03,
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
					agreedQuantity: {
						value: 4,
						unitCode: "C62",
					},
					requestedDelivery: {
						date: new Date("2020-01-15"),
					},
				},
				billing: {
					itemTotals: {
						lineTotalAmount: 360.12,
					},
				},
			},
			{
				position: {
					lineId: "2",
					lineStatusCode: "6",
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
					associatedOrder: {
						lineId: "2",
					},
					netPrice: {
						chargeAmount: 90.03,
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
					agreedQuantity: {
						value: 1,
						unitCode: "C62",
					},
					requestedDelivery: {
						period: {
							endDate: new Date("2020-01-18"),
						},
					},
				},
				billing: {
					itemTotals: {
						lineTotalAmount: 90.03,
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
				name: "",
				description: "",
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
					vat: [
						{
							id: "FR86508102159",
						},
					],
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
				contact: [
					{
						personName: "ALAIN DUPOND",
						phoneNumber: "06 78 56 23 00",
						emailAddress: "alain.dupond@saint-gobain.com",
					},
				],
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
					vat: [
						{
							id: "FR94572141885",
						},
					],
				},
			},
			associatedOrder: {
				issuerAssignedId: "1861727",
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
				organization: {
					id: {
						value: "57214188502180",
						schemeId: "0002",
					},
				},
				contact: [
					{
						personName: "ALAIN DUPOND",
						phoneNumber: "06 78 56 23 00",
						emailAddress: "alain.dupond@saint-gobain.com",
					},
				],
				postalAddress: {
					postCode: "01500",
					line1: "Avenue Leon Blum",
					city: "Amberieu en bugey",
					countryCode: "FR",
				},
			},
		},
		debit: {
			orderCurrency: "EUR",
			invoicee: {
				globalId: [
					{
						value: "3306949923804",
						schemeId: "0088",
					},
				],
				name: "DISTRIB. SANITAIRE CHAUFFAGE",
				organization: {
					id: {
						value: "57214188502180",
						schemeId: "0002",
					},
				},
				postalAddress: {
					postCode: "60550",
					line1: "ZAC du Parc ALATA",
					city: "VERNEUIL EN HALATTE",
					countryCode: "FR",
				},
				taxRegistration: {
					vat: [
						{
							id: "FR94572141885",
						},
					],
				},
			},
			documentTotals: {
				lineTotalAmount: 900.3,
				taxBasisTotalAmount: 900.3,
				grandTotalAmount: 900.3,
			},
		},
	},
};
