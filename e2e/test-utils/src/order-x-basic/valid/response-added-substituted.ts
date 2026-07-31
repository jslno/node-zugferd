import type { orderXBasic } from "@node-zugferd/order-x-basic";

export const responseAddedSubstitutedData: typeof orderXBasic.$Infer.Input = {
	processControl: {
		testIndicator: false,
	},
	exchangedDocument: {
		orderId: "R3659489",
		orderTypeCode: "231",
		statusCode: "3",
		orderIssueDate: new Date("2020-01-10"),
		copyIndicator: false,
		purposeCode: "11",
		requestedResponseCode: "AC",
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "1",
					lineStatusCode: "1",
				},
				item: {
					sellerAssignedId: "986721",
					name: "FRAIS DE PORT",
				},
				priceDetails: {
					netPrice: {
						chargeAmount: 50,
						basisQuantity: {
							value: 1,
							unitCode: "C62",
						},
					},
				},
				delivery: {
					requestedQuantity: {
						value: 1,
						unitCode: "C62",
					},
					agreedQuantity: {
						value: 1,
						unitCode: "C62",
					},
				},
				billing: {
					itemTotals: {
						lineTotalAmount: 50,
					},
				},
			},
			{
				position: {
					lineId: "2",
					lineStatusCode: "7",
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
						lineId: "3",
					},
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
					agreedQuantity: {
						value: 0,
						unitCode: "C62",
					},
				},
				billing: {
					itemTotals: {
						lineTotalAmount: 0,
					},
				},
			},
			{
				position: {
					lineId: "3",
					lineStatusCode: "1",
					includedNotes: [
						{
							content: "dont DEEE - 1,67 EUROS",
							subjectCode: "TXD",
						},
					],
				},
				substitutedItem: {
					globalId: [
						{
							value: "3546334931513",
							schemeId: "0160",
						},
					],
					sellerAssignedId: "493151",
					name: "RSS MAJORQUE SOUFF 1400W BLC SAT",
				},
				priceDetails: {
					associatedOrder: {
						lineId: "3",
					},
					netPrice: {
						chargeAmount: 236.02,
						basisQuantity: {
							value: 1,
							unitCode: "C62",
						},
					},
				},
				delivery: {
					partialDeliveryAllowed: true,
					requestedQuantity: {
						value: 0,
						unitCode: "C62",
					},
					agreedQuantity: {
						value: 5,
						unitCode: "C62",
					},
				},
				billing: {
					itemTotals: {
						lineTotalAmount: 1180.1,
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
		},
		debit: {
			orderCurrency: "EUR",
			documentTotals: {
				lineTotalAmount: 1090.1,
				taxBasisTotalAmount: 1090.1,
				grandTotalAmount: 1090.1,
			},
		},
	},
};
