import type { orderX } from "@node-zugferd/order-x";

export const changeData: typeof orderX.$Infer.Input = {
	processControl: {
		testIndicator: true,
		businessContextInfo: {
			processType: "A1",
		},
	},
	exchangedDocument: {
		orderId: "PO123456789-C02",
		name: "Doc Name",
		orderTypeCode: "230",
		statusCode: "38",
		orderIssueDate: new Date("2020-03-31 17:25"),
		copyIndicator: false,
		purposeCode: "9",
		requestedResponseCode: "AC",
		documentNotes: [
			{
				content: "Content of Note",
				subjectCode: "AAI",
			},
		],
		effectivePeriod: {
			startDate: new Date("2020-03-31"),
			endDate: new Date("2020-06-30"),
		},
	},
	transaction: {
		line: [
			{
				position: {
					lineId: "1",
					lineStatusCode: "3",
					includedNotes: [
						{
							content: "WEEE Tax of 0,50 euros per item included",
							subjectCode: "AAI",
						},
					],
				},
				item: {
					globalId: {
						value: "1234567890123",
						schemeId: "0160",
					},
					sellerAssignedId: "987654321",
					buyerAssignedId: "654987321",
					name: "Product Name",
					description: "Product Description",
					batchId: "Product Batch ID (lot ID)",
					attributes: [
						{
							typeCode: "Characteristic_Code",
							description: "Characteristic Description",
							value: "5 meters",
						},
					],
					classification: [
						{
							classCode: {
								value: "Class_code",
								listId: "TST",
							},
							className: "Name Class Codification",
						},
					],
					instances: [
						{
							serialId: "Product Instances Supplier Serial ID",
						},
					],
					packaging: {
						typeCode: "7B",
						dimension: {
							width: {
								value: 5,
								unitCode: "MTR",
							},
							length: {
								value: 3,
								unitCode: "MTR",
							},
							height: {
								value: 1,
								unitCode: "MTR",
							},
						},
					},
					originTradeCountry: "FR",
				},
				priceDetails: {
					associatedOrder: {
						lineId: "1",
					},
					quotationReference: {
						issuerAssignedId: "QUOT_125487",
						lineId: "3",
					},
					grossPrice: {
						chargeAmount: 10.5,
						basisQuantity: {
							value: 1,
							unitCode: "C62",
						},
						allowances: [
							{
								actualAmount: 1,
								reasonCode: "95",
								reason: "DISCOUNT",
							},
						],
						charges: [
							{
								actualAmount: 0.5,
								reasonCode: "AEW",
								reason: "WEEE",
							},
						],
					},
					netPrice: {
						chargeAmount: 10,
						basisQuantity: {
							value: 1,
							unitCode: "C62",
						},
					},
					blanketOrderReference: {
						lineId: "2",
					},
				},
				delivery: {
					partialDeliveryAllowed: true,
					requestedQuantity: {
						value: 6,
						unitCode: "C62",
					},
					packageQuantity: {
						value: 3,
						unitCode: "C62",
					},
					perPackageQuantity: {
						value: 2,
						unitCode: "C62",
					},
					requestedPickUp: {
						period: {
							startDate: new Date("2020-04-15 08:00"),
							endDate: new Date("2020-04-15 12:00"),
						},
					},
				},
				billing: {
					vatBreakdown: {
						categoryCode: "S",
						rateApplicablePercent: 20,
					},
					allowances: [
						{
							calculationPercent: 10,
							basisAmount: 60,
							actualAmount: 6,
							reasonCode: "64",
							reason: "SPECIAL AGREEMENT",
						},
					],
					charges: [
						{
							calculationPercent: 10,
							basisAmount: 60,
							actualAmount: 6,
							reasonCode: "FC",
							reason: "FREIGHT SERVICES",
						},
					],
					itemTotals: {
						lineTotalAmount: 60,
					},
					accounting: {
						buyerReference: "BUYER_ACCOUNTING_REF",
					},
				},
			},
			{
				position: {
					lineId: "2",
					lineStatusCode: "3",
					includedNotes: [
						{
							content: "WEEE Tax of 0,50 euros per item included",
							subjectCode: "TXD",
						},
					],
				},
				item: {
					globalId: {
						value: "548796523",
						schemeId: "0160",
					},
					sellerAssignedId: "598632147",
					buyerAssignedId: "698569856",
					name: "Product Name",
					description: "Product Description",
					batchId: "Product Batch ID (lot ID)",
					brandName: "Product Brand Name",
					attributes: [
						{
							typeCode: "Characteristic_Code",
							description: "Characteristic Description",
							value: "3 meters",
						},
					],
					classification: [
						{
							classCode: {
								value: "Class_code",
								listId: "TST",
							},
							className: "Name Class Codification",
						},
					],
					instances: [
						{
							batchId: "Product Instances Batch ID",
							serialId: "Product Instances Supplier Serial ID",
						},
					],
					packaging: {
						typeCode: "7B",
						dimension: {
							width: {
								value: 2,
								unitCode: "MTR",
							},
							length: {
								value: 1,
								unitCode: "MTR",
							},
							height: {
								value: 3,
								unitCode: "MTR",
							},
						},
					},
					originTradeCountry: "FR",
				},
				priceDetails: {
					associatedOrder: {
						lineId: "3",
					},
					grossPrice: {
						chargeAmount: 19.5,
						basisQuantity: {
							value: 2,
							unitCode: "C62",
						},
						charges: [
							{
								actualAmount: 0.5,
								reasonCode: "AEW",
								reason: "WEEE TAX",
							},
						],
					},
					netPrice: {
						chargeAmount: 20,
						basisQuantity: {
							value: 2,
							unitCode: "C62",
						},
					},
					blanketOrderReference: {
						lineId: "3",
					},
				},
				delivery: {
					partialDeliveryAllowed: true,
					requestedQuantity: {
						value: 10,
						unitCode: "C62",
					},
					packageQuantity: {
						value: 5,
						unitCode: "C62",
					},
					perPackageQuantity: {
						value: 5,
						unitCode: "C62",
					},
					requestedPickUp: {
						date: new Date("2020-04-15"),
					},
				},
				billing: {
					vatBreakdown: {
						categoryCode: "S",
						rateApplicablePercent: 20,
					},
					allowances: [
						{
							calculationPercent: 1,
							basisAmount: 100,
							actualAmount: 1,
							reasonCode: "64",
							reason: "SPECIAL AGREEMENT",
						},
					],
					charges: [
						{
							calculationPercent: 1,
							basisAmount: 100,
							actualAmount: 1,
							reasonCode: "FC",
							reason: "FREIGHT SERVICES",
						},
					],
					itemTotals: {
						lineTotalAmount: 100,
					},
					accounting: {
						buyerReference: "BUYER_ACCOUNTING_REF",
					},
				},
			},
			{
				position: {
					lineId: "3",
					lineStatusCode: "3",
					includedNotes: [
						{
							content: "Content of Note",
							subjectCode: "AAI",
						},
					],
				},
				item: {
					globalId: {
						value: "854721548",
						schemeId: "0160",
					},
					sellerAssignedId: "698325417",
					buyerAssignedId: "598674321",
					name: "Product Name",
					description: "Product Description",
					attributes: [
						{
							typeCode: "Characteristic_Code",
							description: "Characteristic Description",
							value: "3 meters",
						},
					],
					classification: [
						{
							classCode: {
								value: "Class_code",
								listId: "TST",
							},
							className: "Name Class Codification",
						},
					],
					packaging: {
						typeCode: "7B",
						dimension: {
							width: {
								value: 2,
								unitCode: "MTR",
							},
							length: {
								value: 1,
								unitCode: "MTR",
							},
							height: {
								value: 3,
								unitCode: "MTR",
							},
						},
					},
					originTradeCountry: "FR",
				},
				priceDetails: {
					associatedOrder: {
						lineId: "4",
					},
					grossPrice: {
						chargeAmount: 30,
						basisQuantity: {
							value: 1,
							unitCode: "C62",
						},
						allowances: [
							{
								actualAmount: 5,
							},
						],
					},
					netPrice: {
						chargeAmount: 25,
						basisQuantity: {
							value: 1,
							unitCode: "C62",
						},
					},
					blanketOrderReference: {
						lineId: "4",
					},
				},
				delivery: {
					partialDeliveryAllowed: true,
					requestedQuantity: {
						value: 6,
						unitCode: "C62",
					},
					packageQuantity: {
						value: 3,
						unitCode: "C62",
					},
					perPackageQuantity: {
						value: 2,
						unitCode: "C62",
					},
					requestedPickUp: {
						period: {
							startDate: new Date("2020-04-15"),
							endDate: new Date("2020-04-30"),
						},
					},
				},
				billing: {
					vatBreakdown: {
						categoryCode: "S",
						rateApplicablePercent: 20,
					},
					allowances: [
						{
							calculationPercent: 10,
							basisAmount: 150,
							actualAmount: 15,
							reasonCode: "64",
							reason: "SPECIAL AGREEMENT",
						},
					],
					charges: [
						{
							calculationPercent: 10,
							basisAmount: 150,
							actualAmount: 15,
							reasonCode: "FC",
							reason: "FREIGHT SERVICES",
						},
					],
					itemTotals: {
						lineTotalAmount: 150,
					},
					accounting: {
						buyerReference: "BUYER_ACCOUNTING_REF",
					},
				},
			},
		],
		contract: {
			buyerReference: "BUYER_REF_BU123",
			seller: {
				id: "SUPPLIER_ID_321654",
				globalId: [
					{
						value: "123654879",
						schemeId: "0088",
					},
				],
				name: "SELLER_NAME",
				description: "SELLER_ADD_LEGAL_INFORMATION",
				organization: {
					id: {
						value: "123456789",
						schemeId: "0002",
					},
					tradingName: "SELLER_TRADING_NAME",
				},
				contact: [
					{
						personName: "SELLER_CONTACT_NAME",
						departmentName: "SELLER_CONTACT_DEP",
						typeCode: "SR",
						phoneNumber: "+33 6 25 64 98 75",
						emailAddress: "contact@seller.com",
					},
				],
				postalAddress: {
					postCode: "75001",
					line1: "SELLER_ADDR_1",
					line2: "SELLER_ADDR_2",
					line3: "SELLER_ADDR_3",
					city: "SELLER_CITY",
					countryCode: "FR",
				},
				electronicAddress: {
					value: "sales@seller.com",
					schemeId: "EM",
				},
				taxRegistration: {
					vat: [
						{
							id: "FR 32 123 456 789",
						},
					],
					local: [
						{
							id: "SELLER_TAX_ID",
						},
					],
				},
			},
			buyer: {
				id: "BY_ID_9587456",
				globalId: [
					{
						value: "98765432179",
						schemeId: "0088",
					},
				],
				name: "BUYER_NAME",
				organization: {
					id: {
						value: "987654321",
						schemeId: "0002",
					},
					tradingName: "BUYER_TRADING_NAME",
				},
				contact: [
					{
						personName: "BUYER_CONTACT_NAME",
						departmentName: "BUYER_CONTACT_DEP",
						typeCode: "LB",
						phoneNumber: "+33 6 65 98 75 32",
						emailAddress: "contact@buyer.com",
					},
				],
				postalAddress: {
					postCode: "69001",
					line1: "BUYER_ADDR_1",
					line2: "BUYER_ADDR_2",
					line3: "BUYER_ADDR_3",
					city: "BUYER_CITY",
					countryCode: "FR",
				},
				electronicAddress: {
					value: "operation@buyer.com",
					schemeId: "EM",
				},
				taxRegistration: {
					vat: [
						{
							id: "FR 05 987 654 321",
						},
					],
					local: [
						{
							id: "BUYER_TAX_ID",
						},
					],
				},
			},
			buyerRequisitioner: {
				id: "BUYER_REQ_ID_25987",
				globalId: [
					{
						value: "654987321",
						schemeId: "0088",
					},
				],
				name: "BUYER_REQ_NAME",
				organization: {
					id: {
						value: "654987321",
						schemeId: "0002",
					},
					tradingName: "BUYER_REQ_TRADING_NAME",
				},
				contact: [
					{
						personName: "BUYER_REQ_CONTACT_NAME",
						departmentName: "BUYER_REQ_CONTACT_DEP",
						typeCode: "PD",
						phoneNumber: "+33 6 54 98 65 32",
						emailAddress: "requisitioner@buyer.com",
					},
				],
				postalAddress: {
					postCode: "69001",
					line1: "BUYER_REQ_ADDR_1",
					line2: "BUYER_REQ_ADDR_2",
					line3: "BUYER_REQ_ADDR_3",
					city: "BUYER_REQ_CITY",
					countryCode: "FR",
				},
				electronicAddress: {
					value: "purchase@buyer.com",
					schemeId: "EM",
				},
				taxRegistration: {
					vat: [
						{
							id: "FR 92 654 987 321",
						},
					],
				},
			},
			deliveryTerms: {
				deliveryCode: "FCA",
				description: "Free Carrier",
				deliveryMode: "4",
				location: {
					id: "DEL_TERMS_LOC_ID",
					name: "DEL_TERMS_LOC_NAME",
				},
			},
			salesOrderReference: {
				issuerAssignedId: "SALES_REF_ID_459875",
			},
			associatedOrder: {
				issuerAssignedId: "PO123456789",
			},
			quotationReference: {
				issuerAssignedId: "QUOT_125487",
			},
			contractReference: {
				issuerAssignedId: "CONTRACT_2020-25987",
			},
			requisitionReference: {
				issuerAssignedId: "REQ_875498",
			},
			blanketOrderReference: {
				issuerAssignedId: "BLANKET_ORDER_ID",
			},
		},
		delivery: {
			recipient: {
				id: "SHIP_TO_ID",
				globalId: [
					{
						value: "5897546912",
						schemeId: "0002",
					},
				],
				name: "SHIP_TO_NAME",
				organization: {
					id: {
						value: "951632874",
						schemeId: "0002",
					},
					tradingName: "SHIP_TO_TRADING_NAME",
				},
				contact: [
					{
						personName: "SHIP_TO_CONTACT_NAME",
						departmentName: "SHIP_TO_CONTACT_DEP",
						typeCode: "SD",
						phoneNumber: "+33 6 85 96 32 41",
						emailAddress: "shipto@customer.com",
					},
				],
				postalAddress: {
					postCode: "69003",
					line1: "SHIP_TO_ADDR_1",
					line2: "SHIP_TO_ADDR_2",
					line3: "SHIP_TO_ADDR_3",
					city: "SHIP_TO_CITY",
					countryCode: "FR",
				},
				electronicAddress: {
					value: "delivery@buyer.com",
					schemeId: "EM",
				},
				taxRegistration: {
					vat: [
						{
							id: "FR 66 951 632 874",
						},
					],
				},
			},
			sender: {
				id: "SHIP_FROM_ID",
				globalId: [
					{
						value: "875496123",
						schemeId: "0088",
					},
				],
				name: "SHIP_FROM_NAME",
				organization: {
					id: {
						value: "548963127",
						schemeId: "0002",
					},
					tradingName: "SHIP_FROM_TRADING_NAME",
				},
				contact: [
					{
						personName: "SHIP_FROM_CONTACT_NAME",
						departmentName: "SHIP_FROM_CONTACT_DEP",
						typeCode: "SD",
						phoneNumber: "+33 6 85 96 32 41",
						emailAddress: "shipfrom@seller.com",
					},
				],
				postalAddress: {
					postCode: "75003",
					line1: "SHIP_FROM_ADDR_1",
					line2: "SHIP_FROM_ADDR_2",
					line3: "SHIP_FROM_ADDR_3",
					city: "SHIP_FROM_CITY",
					countryCode: "FR",
				},
				electronicAddress: {
					value: "warehouse@seller.com",
					schemeId: "EM",
				},
				taxRegistration: {
					vat: [
						{
							id: "FR 16 548 963 127",
						},
					],
				},
			},
			requestedPickUps: [
				{
					period: {
						startDate: new Date("2020-04-15 09:00"),
						endDate: new Date("2020-04-15 18:00"),
					},
				},
			],
		},
		debit: {
			orderCurrency: "EUR",
			paymentMeans: {
				typeCode: "30",
				information: "Credit Transfer",
			},
			allowances: [
				{
					calculationPercent: 10,
					basisAmount: 310,
					actualAmount: 31,
					reasonCode: "64",
					reason: "SPECIAL AGREEMENT",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 20,
					},
				},
			],
			charges: [
				{
					calculationPercent: 10,
					basisAmount: 210,
					actualAmount: 21,
					reasonCode: "FC",
					reason: "FREIGHT SERVICES",
					categoryTradeTax: {
						categoryCode: "S",
						rateApplicablePercent: 20,
					},
				},
			],
			paymentTerms: {
				description: "PAYMENT_TERMS_DESC",
			},
			documentTotals: {
				lineTotalAmount: 310,
				chargeTotalAmount: 21,
				allowanceTotalAmount: 31,
				taxBasisTotalAmount: 300,
				taxTotalAmount: {
					value: 60,
					currency: "EUR",
				},
				grandTotalAmount: 360,
			},
			accounting: {
				buyerReference: "BUYER_ACCOUNT_REF",
			},
		},
	},
};
