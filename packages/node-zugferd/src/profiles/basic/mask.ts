export const basicMask = {
	businessProcessType: "BT-23",
	specificationIdentifier: "BT-24",
	number: "BT-1",
	typeCode: "BT-3",
	issueDate: "BT-2",
	includedNote: "BG-1",
	transaction: [
		"BG-25-00",
		{
			line: [
				"BG-25",
				{
					identifier: "BT-126",
					note: "BT-127",
					tradeProduct: [
						"BG-31",
						{
							globalIdentifier: "BT-157",
							name: "BT-153",
						},
					],
					tradeAgreement: [
						"BG-29",
						{
							grossTradePrice: [
								"BT-148-00",
								{
									chargeAmount: "BT-148",
									basisQuantity: "BT-149-1",
									discounts: [
										"BT-147-00",
										{
											chargeIndicator: "BT-147-01",
											actualAmount: "BT-147",
										},
									],
								},
							],
							netTradePrice: [
								"BT-146-00",
								{
									chargeAmount: "BT-146",
									basisQuantity: "BT-149",
								},
							],
						},
					],
					tradeDelivery: [
						"BT-129-00",
						{
							billedQuantity: "BT-129",
							unitMeasureCode: "BT-130",
						},
					],
					tradeSettlement: [
						"BG-30-00",
						{
							tradeTax: [
								"BG-30",
								{
									typeCode: "BT-151-0",
									categoryCode: "BT-151",
									rateApplicablePercent: "BT-152",
								},
							],
							linePeriod: [
								"BG-26",
								{
									startDate: "BT-134",
									endDate: "BT-135",
								},
							],
							allowances: [
								"BG-27",
								{
									chargeIndicator: "BG-27-0",
									actualAmount: "BT-136",
									reasonCode: "BT-140",
									reason: "BT-139",
								},
							],
							charges: [
								"BG-28",
								{
									chargeIndicator: "BG-28-0",
									actualAmount: "BT-141",
									reasonCode: "BT-145",
									reason: "BT-144",
								},
							],
							monetarySummation: [
								"BT-131-00",
								{
									lineTotalAmount: "BT-131",
								},
							],
						},
					],
				},
			],
			tradeAgreement: [
				"BT-10-00",
				{
					buyerReference: "BT-10",
					seller: [
						"BG-4",
						{
							identifier: "BT-29",
							globalIdentifier: "BT-29-0",
							name: "BT-27",
							organization: [
								"BT-30-00",
								{
									registrationIdentifier: "BT-30",
									tradingName: "BT-28",
								},
							],
							postalAddress: [
								"BG-5",
								{
									postCode: "BT-38",
									line1: "BT-35",
									line2: "BT-36",
									line3: "BT-162",
									city: "BT-37",
									countryCode: "BT-40",
									countrySubdivision: "BT-39",
								},
							],
							electronicAddress: "BT-34",
							taxRegistration: [
								"seller-tax-registration",
								{
									vatIdentifier: "BT-31",
									localIdentifier: "BT-32",
								},
							],
						},
					],
					buyer: [
						"BG-7",
						{
							identifier: "BT-46",
							globalIdentifier: "BT-46-00",

							name: "BT-44",
							organization: [
								"BT-47-00",
								{
									registrationIdentifier: "BT-47",
								},
							],
							postalAddress: [
								"BG-8",
								{
									postCode: "BT-53",
									line1: "BT-50",
									line2: "BT-51",
									line3: "BT-163",
									city: "BT-52",
									countryCode: "BT-55",
									countrySubdivision: "BT-54",
								},
							],
							electronicAddress: "BT-49",
							taxRegistration: [
								"buyer-tax-registration",
								{
									vatIdentifier: "BT-48",
								},
							],
						},
					],
					sellerTaxRepresentative: [
						"BG-11",
						{
							name: "BT-62",
							postalAddress: [
								"BG-12",
								{
									postCode: "BT-67",
									line1: "BT-64",
									line2: "BT-65",
									line3: "BT-164",
									city: "BT-66",
									countryCode: "BT-69",
									countrySubdivision: "BT-68",
								},
							],
						},
					],
					associatedOrder: [
						"BT-13-00",
						{
							purchaseOrderReference: "BT-13",
						},
					],
					associatedContract: [
						"BT-12-00",
						{
							reference: "BT-12",
						},
					],
				},
			],
			tradeDelivery: [
				"BG-13-00",
				{
					shipTo: [
						"BG-13",
						{
							identifier: "BT-71",
							globalIdentifier: "BT-71-00",
							name: "BT-70",
							postalAddress: [
								"BG-15",
								{
									postCode: "BT-78",
									line1: "BT-75",
									line2: "BT-76",
									line3: "BT-165",
									city: "BT-77",
									countryCode: "BT-80",
									countrySubdivision: "BT-79",
								},
							],
						},
					],
					information: [
						"BT-72-00",
						{
							deliveryDate: "BT-72",
						},
					],
					despatchAdvice: [
						"BT-16-00",
						{
							issuerAssignedID: "BT-16",
						},
					],
				},
			],
			tradeSettlement: [
				"BG-19",
				{
					creditorIdentifier: "BT-90",
					remittanceInformation: "BT-83",
					vatAccountingCurrencyCode: "BT-6",
					currencyCode: "BT-5",
					payee: [
						"BG-10",
						{
							identifier: "BT-60",
							globalIdentifier: "BT-60-0",
							name: "BT-59",
							organization: [
								"BT-61-00",
								{
									registrationIdentifier: "BT-61",
								},
							],
						},
					],
					paymentInstruction: [
						"BG-16",
						{
							typeCode: "BT-81",
							debitedAccountIdentifier: "BT-91",
							transfers: [
								"BG-17",
								{
									paymentAccountIdentifier: "BT-84",
									nationalAccountNumber: "BT-84-0",
								},
							],
						},
					],
					vatBreakdown: [
						"BG-23",
						{
							calculatedAmount: "BT-117",
							typeCode: "BT-118-0",
							exemptionReasonText: "BT-120",
							basisAmount: "BT-116",
							categoryCode: "BT-118",
							exemptionReasonCode: "BT-121",
							dueDateTypeCode: "BT-8",
							rateApplicablePercent: "BT-119",
						},
					],
					invoicingPeriod: [
						"BG-14",
						{
							startDate: "BT-73",
							endDate: "BT-74",
						},
					],
					allowances: [
						"BG-20",
						{
							chargeIndicator: "BG-20-0",
							calculationPercent: "BT-94",
							basisAmount: "BT-93",
							actualAmount: "BT-92",
							reasonCode: "BT-98",
							reason: "BT-97",
							categoryTradeTax: [
								"BT-95-00",
								{
									categoryCode: "BT-95",
									vatRate: "BT-96",
								},
							],
						},
					],
					charges: [
						"BG-21",
						{
							chargeIndicator: "BG-21-0",
							calculationPercent: "BT-101",
							basisAmount: "BT-100",
							actualAmount: "BT-99",
							reasonCode: "BT-105",
							reason: "BT-104",
							categoryTradeTax: [
								"BT-102-00",
								{
									categoryCode: "BT-102",
									vatRate: "BT-103",
								},
							],
						},
					],
					paymentTerms: [
						"BT-20-00",
						{
							description: "BT-20",
							dueDate: "BT-9",
							mandateReferenceIdentifier: "BT-89",
						},
					],
					monetarySummation: [
						"BG-22",
						{
							lineTotalAmount: "BT-106",
							chargeTotalAmount: "BT-108",
							allowanceTotalAmount: "BT-107",
							taxBasisTotalAmount: "BT-109",
							taxTotal: "BT-110",
							grandTotalAmount: "BT-112",
							paidAmount: "BT-113",
							duePayableAmount: "BT-115",
						},
					],
					precendingInvoices: [
						"BG-3",
						{
							reference: "BT-25",
							issueDate: "BT-26",
						},
					],
					buyerAccountant: [
						"BT-19-00",
						{
							reference: "BT-19",
						},
					],
				},
			],
		},
	],
} as const;
