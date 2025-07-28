export const extendedMask = {
	testIndicator: "BT-X-1-00",
	businessProcessType: "BT-23",
	specificationIdentifier: "BT-24",
	number: "BT-1",
	name: "BT-X-2",
	typeCode: "BT-3",
	issueDate: "BT-2",
	copyIndicator: "BT-X-3-00",
	language: "BT-X-4",
	includedNote: "BG-1",
	contractualDueDate: "BT-X-6",
	transaction: [
		"BG-25-00",
		{
			line: [
				"BG-25",
				{
					identifier: "BT-126",
					parentIdentifier: "BT-X-304",
					typeCode: "BT-X-7",
					subTypeCode: "BT-X-8",
					noteContentCode: "BT-X-9",
					note: "BT-127",
					noteSubjectCode: "BT-X-10",

					tradeProduct: [
						"BG-31",
						{
							identifier: "BT-X-305",
							globalIdentifier: "BT-157",
							sellerAssignedID: "BT-155",
							buyerAssignedID: "BT-156",
							industryIdentifier: "BT-X-532",
							modelIdentifier: "BT-X-533",
							name: "BT-153",
							description: "BT-154",
							batchIdentifier: "BT-X-534",
							brandName: "BT-X-535",
							modelName: "BT-X-536",
							attributes: [
								"BG-32",
								{
									typeCode: "BT-X-11",
									name: "BT-160",
									measureValue: "BT-X-12",
									measureUnit: "BT-X-12-0",
									value: "BT-161",
								},
							],
							classifications: [
								"BT-158-00",
								{
									identifier: "BT-158",
									name: "BT-X-13",
								},
							],
							instances: [
								"BG-X-84",
								{
									batchIdentifier: "BT-X-306",
									supplierSerialIdentifier: "BT-X-307",
								},
							],
							origin: [
								"BT-159-00",
								{
									countryCode: "BT-159",
								},
							],
							referencedProduct: [
								"BG-X-1",
								{
									identifier: "BT-X-308",
									globalIdentifier: "BT-X-15",
									sellerAssignedID: "BT-X-16",
									buyerAssignedID: "BT-X-17",
									industryAssignedID: "BT-X-309",
									name: "BT-X-18",
									description: "BT-X-19",
									measureValue: "BT-X-20",
									measureUnit: "BT-X-20-1",
								},
							],
						},
					],
					tradeAgreement: [
						"BG-29",
						{
							buyerOrderReference: [
								"BT-132-00",
								{
									lineID: "BT-132",
								},
							],
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
									basisAmount: "BT-137",
									actualAmount: "BT-136",
									reasonCode: "BT-140",
									reason: "BT-139",
								},
							],
							charges: [
								"BG-28",
								{
									chargeIndicator: "BG-28-0",
									basisAmount: "BT-142",
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
							objectIdentifier: "BT-128-00",
							buyerAccountant: [
								"BT-133-00",
								{
									reference: "BT-133",
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
							typeCode: "BT-X-543",
							description: "BT-33",
							organization: [
								"BT-30-00",
								{
									registrationIdentifier: "BT-30",
									tradingName: "BT-28",
									postalAddress: [
										"BG-X-14",
										{
											postCode: "BT-X-100",
											line1: "BT-X-101",
											line2: "BT-X-102",
											line3: "BT-X-103",
											city: "BT-X-104",
											countryCode: "BT-X-105",
											countrySubdivision: "BT-X-106",
										},
									],
								},
							],
							tradeContact: [
								"BG-6",
								{
									name: "BT-41",
									departmentName: "BT-41-0",
									typeCode: "BT-X-317",
									phoneNumber: "BT-42",
									faxNumber: "BT-X-107",
									emailAddress: "BT-43",
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
							typeCode: "BT-X-544",
							description: "BT-X-334",
							organization: [
								"BT-47-00",
								{
									registrationIdentifier: "BT-47",
									tradingName: "BT-45",
									postalAddress: [
										"BG-X-15",
										{
											postCode: "BT-X-108",
											line1: "BT-X-109",
											line2: "BT-X-110",
											line3: "BT-X-111",
											city: "BT-X-112",
											countryCode: "BT-X-113",
											countrySubdivision: "BT-X-114",
										},
									],
								},
							],
							tradeContact: [
								"BG-9",
								{
									name: "BT-56",
									departmentName: "BT-56-0",
									typeCode: "BT-X-318",
									phoneNumber: "BT-57",
									faxNumber: "BT-X-115",
									emailAddress: "BT-58",
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
					salesAgent: [
						"BG-X-49",
						{
							identifier: "BT-X-337",
							globalIdentifier: "BT-X-338",
							name: "BT-X-335",
							typeCode: "BT-X-545",
							organization: [
								"BG-X-50",
								{
									identifier: "BT-X-339",
									tradingName: "BT-X-336",
									postalAddress: [
										"BG-X-53",
										{
											postCode: "BT-X-355",
											line1: "BT-X-356",
											line2: "BT-X-357",
											line3: "BT-X-358",
											city: "BT-X-359",
											countryCode: "BT-X-360",
											countrySubdivision: "BT-X-361",
										},
									],
									tradeContact: [
										"BG-X-51",
										{
											name: "BT-X-342",
											departmentName: "BT-X-343",
											typeCode: "BT-X-347",
											phoneNumber: "BT-X-344",
											faxNumber: "BT-X-345",
											emailAddress: "BT-X-346",
										},
									],
								},
							],
							postalAddress: [
								"BG-X-52",
								{
									postCode: "BT-X-348",
									line1: "BT-X-349",
									line2: "BT-X-350",
									line3: "BT-X-351",
									city: "BT-X-352",
									countryCode: "BT-X-353",
									countrySubdivision: "BT-X-354",
								},
							],
							electronicAddress: "BT-X-341-00",
							taxRegistration: [
								"BT-X-340-00",
								{
									identifier: "BT-X-340",
								},
							],
						},
					],
					buyerTaxRepresentative: [
						"BG-X-54",
						{
							identifier: "BT-X-364",
							globalIdentifier: "BT-X-365",
							name: "BT-X-362",
							typeCode: "BT-X-546",
							organization: [
								"BG-X-58",
								{
									identifier: "BT-X-366",
									tradingName: "BT-X-363",
									postalAddress: [
										"BG-X-57",
										{
											postCode: "BT-X-382",
											line1: "BT-X-383",
											line2: "BT-X-384",
											line3: "BT-X-385",
											city: "BT-X-386",
											countryCode: "BT-X-387",
											countrySubdivision: "BT-X-388",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-55",
								{
									name: "BT-X-369",
									departmentName: "BT-X-370",
									typeCode: "BT-X-371",
									phoneNumber: "BT-X-372",
									faxNumber: "BT-X-373",
									emailAddress: "BT-X-374",
								},
							],
							postalAddress: [
								"BG-X-56",
								{
									postCode: "BT-X-375",
									line1: "BT-X-376",
									line2: "BT-X-377",
									line3: "BT-X-378",
									city: "BT-X-379",
									countryCode: "BT-X-380",
									countrySubdivision: "BT-X-381",
								},
							],
							electronicAddress: "BT-X-368",
							taxRegistration: [
								"BT-X-367-00",
								{
									identifier: "BT-X-367",
								},
							],
						},
					],
					sellerTaxRepresentative: [
						"BG-11",
						{
							identifier: "BT-X-116",
							globalIdentifier: "BT-X-117",
							name: "BT-62",
							typeCode: "BT-X-547",
							organization: [
								"BG-X-16",
								{
									identifier: "BT-X-118",
									tradingName: "BT-X-119",
									postalAddress: [
										"BG-X-59",
										{
											postCode: "BT-X-389",
											line1: "BT-X-390",
											line2: "BT-X-391",
											line3: "BT-X-392",
											city: "BT-X-393",
											countryCode: "BT-X-394",
											countrySubdivision: "BT-X-395",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-17",
								{
									name: "BT-X-120",
									departmentName: "BT-X-121",
									typeCode: "BT-X-319",
									phoneNumber: "BT-X-122",
									faxNumber: "BT-X-123",
									emailAddress: "BT-X-124",
								},
							],
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
							electronicAddress: "BT-X-125",
						},
					],
					productEndUser: [
						"BG-X-18",
						{
							identifier: "BT-X-126",
							globalIdentifier: "BT-X-127",
							name: "BT-X-128",
							typeCode: "BT-X-548",
							organization: [
								"BG-X-19",
								{
									identifier: "BT-X-129",
									tradingName: "BT-X-130",
									postalAddress: [
										"BG-X-60",
										{
											postCode: "BT-X-396",
											line1: "BT-X-397",
											line2: "BT-X-398",
											line3: "BT-X-399",
											city: "BT-X-400",
											countryCode: "BT-X-401",
											countrySubdivision: "BT-X-402",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-20",
								{
									name: "BT-X-131",
									departmentName: "BT-X-132",
									typeCode: "BT-X-320",
									phoneNumber: "BT-X-133",
									faxNumber: "BT-X-134",
									emailAddress: "BT-X-135",
								},
							],
							postalAddress: [
								"BG-X-21",
								{
									postCode: "BT-X-136",
									line1: "BT-X-137",
									line2: "BT-X-138",
									line3: "BT-X-139",
									city: "BT-X-140",
									countryCode: "BT-X-141",
									countrySubdivision: "BT-X-142",
								},
							],
							electronicAddress: "BT-X-143",
							taxRegistration: [
								"BT-X-144-00",
								{
									identifier: "BT-X-144",
								},
							],
						},
					],
					tradeDeliveryTerms: [
						"BG-X-22",
						{
							typeCode: "BT-X-145",
						},
					],
					associatedOrderConfirmation: [
						"BT-14-00",
						{
							salesOrderReference: "BT-14",
							date: "BT-X-146",
						},
					],
					associatedOrder: [
						"BT-13-00",
						{
							purchaseOrderReference: "BT-13",
							date: "BT-X-147",
						},
					],
					quotationReference: [
						"BG-X-61",
						{
							issuerAssignedID: "BT-X-403",
							date: "BT-X-404",
						},
					],
					associatedContract: [
						"BT-12-00",
						{
							reference: "BT-12",
							typeCode: "BT-X-405",
							date: "BT-X-148",
						},
					],
					supportingDocuments: [
						"BG-24",
						{
							reference: "BT-122",
							externalLocation: "BT-124",
							description: "BT-123",
							content: "BT-125",
							mimeCode: "BT-125-1",
							filename: "BT-125-2",
							date: "BT-X-149",
						},
					],
					tenderOrLotReference: [
						"BT-17-00",
						{
							reference: "BT-17",
							date: "BT-X-556",
						},
					],
					objectIdentifier: [
						"BT-18-00",
						{
							reference: "BT-18",
							referenceTypeCode: "BT-18-1",
							date: "BT-X-557",
						},
					],
					buyerAgent: [
						"BG-X-62",
						{
							identifier: "BT-X-408",
							globalIdentifier: "BT-X-409",
							name: "BT-X-406",
							typeCode: "BT-X-549",
							organization: [
								"BG-X-63",
								{
									identifier: "BT-X-410",
									tradingName: "BT-X-407",
									postalAddress: [
										"BG-X-66",
										{
											postalCode: "BT-X-426",
											line1: "BT-X-427",
											line2: "BT-X-428",
											line3: "BT-X-429",
											city: "BT-X-430",
											countryCode: "BT-X-431",
											countrySubdivision: "BT-X-432",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-64",
								{
									name: "BT-X-413",
									departmentName: "BT-X-414",
									typeCode: "BT-X-415",
									phoneNumber: "BT-X-416",
									faxNumber: "BT-X-417",
									emailAddress: "BT-X-418",
								},
							],
							postalAddress: [
								"BG-X-65",
								{
									postCode: "BT-X-419",
									line1: "BT-X-420",
									line2: "BT-X-421",
									line3: "BT-X-422",
									city: "BT-X-423",
									countryCode: "BT-X-424",
									countrySubdivision: "BT-X-425",
								},
							],
							electronicAddress: "BT-X-412",
							taxRegistration: [
								"BT-X-411-00",
								{
									identifier: "BT-X-411",
								},
							],
						},
					],
					project: [
						"BT-11-00",
						{
							reference: "BT-11",
							name: "BT-11-0",
						},
					],
					customerOrderReference: [
						"BG-X-23",
						{
							issuerAssignedID: "BT-X-150",
							date: "BT-X-151",
						},
					],
				},
			],
			tradeDelivery: [
				"BG-13-00",
				{
					relatedConsignment: [
						"BG-X-24",
						{
							transportMovement: "BT-X-152-00",
							deliveryMethod: "BT-X-152",
						},
					],
					shipTo: [
						"BG-13",
						{
							identifier: "BT-71",
							globalIdentifier: "BT-71-00",
							name: "BT-70",
							typeCode: "BT-X-550",
							organization: [
								"BG-X-25",
								{
									identifier: "BT-X-153",
									tradingName: "BT-X-154",
									postalAddress: [
										"BG-X-67",
										{
											postCode: "BT-X-433",
											line1: "BT-X-434",
											line2: "BT-X-435",
											line3: "BT-X-436",
											city: "BT-X-437",
											countryCode: "BT-X-438",
											countrySubdivision: "BT-X-439",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-26",
								{
									name: "BT-X-155",
									departmentName: "BT-X-156",
									typeCode: "BT-X-321",
									phoneNumber: "BT-X-157",
									faxNumber: "BT-X-158",
									emailAddress: "BT-X-159",
								},
							],
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
							electronicAddress: "BT-X-160",
							taxRegistration: [
								"BT-X-161-00",
								{
									identifier: "BT-X-161",
								},
							],
						},
					],
					finalShipTo: [
						"BG-X-27",
						{
							identifier: "BT-X-162",
							globalIdentifier: "BT-X-163",
							name: "BT-X-164",
							typeCode: "BT-X-551",
							organization: [
								"BT-X-165-00",
								{
									identifier: "BT-X-165",
									tradingName: "BT-X-166",
									postalAddress: [
										"BG-X-68",
										{
											postCode: "BT-X-440",
											line1: "BT-X-441",
											line2: "BT-X-442",
											line3: "BT-X-443",
											city: "BT-X-444",
											countryCode: "BT-X-445",
											countrySubdivision: "BT-X-446",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-28",
								{
									name: "BT-X-167",
									departmentName: "BT-X-168",
									typeCode: "BT-X-322",
									phoneNumber: "BT-X-169",
									faxNumber: "BT-X-170",
									emailAddress: "BT-X-171",
								},
							],
							postalAddress: [
								"BG-X-29",
								{
									postCode: "BT-X-172",
									line1: "BT-X-173",
									line2: "BT-X-174",
									line3: "BT-X-175",
									city: "BT-X-176",
									countryCode: "BT-X-177",
									countrySubdivision: "BT-X-178",
								},
							],
							electronicAddress: "BT-X-179",
							taxRegistration: [
								"BT-X-180-00",
								{
									identifier: "BT-X-180",
								},
							],
						},
					],
					shipFrom: [
						"BG-X-30",
						{
							identifier: "BT-X-181",
							globalIdentifier: "BT-X-182",
							name: "BT-X-183",
							typeCode: "BT-X-552",
							organization: [
								"BT-X-184-00",
								{
									identifier: "BT-X-184",
									tradingName: "BT-X-185",
									postalAddress: [
										"BG-X-69",
										{
											postCode: "BT-X-447",
											line1: "BT-X-448",
											line2: "BT-X-449",
											line3: "BT-X-450",
											city: "BT-X-451",
											countryCode: "BT-X-452",
											countrySubdivision: "BT-X-453",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-31",
								{
									name: "BT-X-186",
									departmentName: "BT-X-187",
									typeCode: "BT-X-323",
									phoneNumber: "BT-X-188",
									faxNumber: "BT-X-189",
									emailAddress: "BT-X-190",
								},
							],
							postalAddress: [
								"BG-X-32",
								{
									postCode: "BT-X-191",
									line1: "BT-X-192",
									line2: "BT-X-193",
									line3: "BT-X-194",
									city: "BT-X-195",
									countryCode: "BT-X-196",
									countrySubdivision: "BT-X-197",
								},
							],
							electronicAddress: "BT-X-198",
							taxRegistration: [
								"BT-X-199-00",
								{
									identifier: "BT-X-199",
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
							date: "BT-X-200",
						},
					],
					associatedGoodsReceipt: [
						"BT-15-00",
						{
							reference: "BT-15",
							date: "BT-X-201",
							deliveryNote: [
								"BT-X-202-00",
								{
									issuerAssignedID: "BT-X-202",
									date: "BT-X-203",
								},
							],
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
					issuerReference: "BT-X-204",
					invoicer: [
						"BG-X-33",
						{
							identifier: "BT-X-205",
							globalIdentifier: "BT-X-206",
							name: "BT-X-207",
							typeCode: "BT-X-553",
							organization: [
								"BT-X-208-00",
								{
									identifier: "BT-X-208",
									tradingName: "BT-X-209",
									postalAddress: [
										"BG-X-70",
										{
											postCode: "BT-X-454",
											line1: "BT-X-455",
											line2: "BT-X-456",
											line3: "BT-X-457",
											city: "BT-X-458",
											countryCode: "BT-X-459",
											countrySubdivision: "BT-X-460",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-34",
								{
									name: "BT-X-210",
									departmentName: "BT-X-211",
									typeCode: "BT-X-324",
									phoneNumber: "BT-X-212",
									faxNumber: "BT-X-213",
									emailAddress: "BT-X-214",
								},
							],
							postalAddress: [
								"BG-X-35",
								{
									postCode: "BT-X-215",
									line1: "BT-X-216",
									line2: "BT-X-217",
									line3: "BT-X-218",
									city: "BT-X-219",
									countryCode: "BT-X-220",
									countrySubdivision: "BT-X-221",
								},
							],
							electronicAddress: "BT-X-222",
							taxRegistration: [
								"BT-X-223-00",
								{
									identifier: "BT-X-223",
								},
							],
						},
					],
					invoicee: [
						"BG-X-36",
						{
							identifier: "BT-X-224",
							globalIdentifier: "BT-X-225",
							name: "BT-X-226",
							typeCode: "BT-X-554",
							organization: [
								"BT-X-227-00",
								{
									identifier: "BT-X-227",
									tradeName: "BT-X-228",
									postalAddress: [
										"BG-X-71",
										{
											postCode: "BT-X-461",
											line1: "BT-X-462",
											line2: "BT-X-463",
											line3: "BT-X-464",
											city: "BT-X-465",
											countryCode: "BT-X-466",
											countrySubdivision: "BT-X-467",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-37",
								{
									name: "BT-X-229",
									departmentName: "BT-X-230",
									typeCode: "BT-X-325",
									phoneNumber: "BT-X-231",
									faxNumber: "BT-X-232",
									emailAddress: "BT-X-233",
								},
							],
							postalAddress: [
								"BG-X-38",
								{
									postCode: "BT-X-234",
									line1: "BT-X-235",
									line2: "BT-X-236",
									line3: "BT-X-237",
									city: "BT-X-238",
									countryCode: "BT-X-239",
									countrySubdivision: "BT-X-240",
								},
							],
							electronicAddress: "BT-X-241",
							taxRegistration: [
								"BT-X-242-00",
								{
									identifier: "BT-X-242",
								},
							],
						},
					],
					payee: [
						"BG-10",
						{
							identifier: "BT-60",
							globalIdentifier: "BT-60-0",
							name: "BT-59",
							typeCode: "BT-X-468",
							organization: [
								"BT-61-00",
								{
									registrationIdentifier: "BT-61",
									tradingName: "BT-X-243",
									postalAddress: [
										"BG-X-72",
										{
											postCode: "BT-X-469",
											line1: "BT-X-470",
											line2: "BT-X-471",
											line3: "BT-X-472",
											city: "BT-X-473",
											countryCode: "BT-X-474",
											countrySubdivision: "BT-X-475",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-39",
								{
									name: "BT-X-244",
									departmentName: "BT-X-245",
									typeCode: "BT-X-326",
									phoneNumber: "BT-X-246",
									faxNumber: "BT-X-247",
									emailAddress: "BT-X-248",
								},
							],
							postalAddress: [
								"BG-X-40",
								{
									postCode: "BT-X-249",
									line1: "BT-X-250",
									line2: "BT-X-251",
									line3: "BT-X-252",
									city: "BT-X-253",
									countryCode: "BT-X-254",
									countrySubdivision: "BT-X-255",
								},
							],
							electronicAddress: "BT-X-256",
							taxRegistration: [
								"BT-X-257-00",
								{
									identifier: "BT-X-257",
								},
							],
						},
					],
					payer: [
						"BG-X-73",
						{
							identifier: "BT-X-478",
							globalIdentifier: "BT-X-479",
							name: "BT-X-476",
							typeCode: "BT-X-483",
							organization: [
								"BT-X-480-00",
								{
									identifier: "BT-X-480",
									tradingName: "BT-X-477",
									postalAddress: [
										"BG-X-76",
										{
											postCode: "BT-X-497",
											line1: "BT-X-498",
											line2: "BT-X-499",
											line3: "BT-X-500",
											city: "BT-X-501",
											countryCode: "BT-X-502",
											countrySubdivision: "BT-X-503",
										},
									],
								},
							],
							tradeContact: [
								"BG-X-74",
								{
									name: "BT-X-484",
									departmentName: "BT-X-485",
									typeCode: "BT-X-486",
									phoneNumber: "BT-X-487",
									faxNumber: "BT-X-488",
									emailAddress: "BT-X-489",
								},
							],
							postalAddress: [
								"BG-X-75",
								{
									postCode: "BT-X-490",
									line1: "BT-X-491",
									line2: "BT-X-492",
									line3: "BT-X-493",
									city: "BT-X-494",
									countryCode: "BT-X-495",
									countrySubdivision: "BT-X-496",
								},
							],
							electronicAddress: "BT-X-482",
							taxRegistration: [
								"BT-X-481-00",
								{
									identifier: "BT-X-481",
								},
							],
						},
					],
					tradeCurrencyExchange: [
						"BG-X-41",
						{
							invoiceCurrency: "BT-X-258",
							localCurrency: "BT-X-259",
							exchangeRate: "BT-X-260",
							exchangeRateDate: "BT-X-261",
						},
					],
					paymentInstruction: [
						"BG-16",
						{
							typeCode: "BT-81",
							information: "BT-82",
							cardInformation: [
								"BG-18",
								{
									primaryAccountNumber: "BT-87",
									holderName: "BT-88",
								},
							],
							debitedAccountIdentifier: "BT-91",
							transfers: [
								"BG-17",
								{
									paymentAccountIdentifier: "BT-84",
									accountname: "BT-85",
									nationalAccountNumber: "BT-84-0",
								},
							],
							sellerBankInformation: [
								"BT-86-00",
								{
									serviceProviderIdentifier: "BT-86",
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
							lineTotalBasisAmount: "BT-X-262",
							allowanceChargeBasisAmount: "BT-X-263",
							categoryCode: "BT-118",
							exemptionReasonCode: "BT-121",
							taxDueDate: "BT-7",
							dueDateTypeCode: "BT-8",
							rateApplicablePercent: "BT-119",
						},
					],
					invoicingPeriod: [
						"BG-14",
						{
							description: "BT-X-264",
							startDate: "BT-73",
							endDate: "BT-74",
						},
					],
					allowances: [
						"BG-20",
						{
							chargeIndicator: "BG-20-0",
							calculationSequence: "BT-X-265",
							calculationPercent: "BT-94",
							basisAmount: "BT-93",
							basisQuantity: "BT-X-266",
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
							calculationSequence: "BT-X-268",
							calculationPercent: "BT-101",
							basisAmount: "BT-100",
							basisQuantity: "BT-X-269",
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
					logisticsServiceCharge: [
						"BG-X-42",
						{
							description: "BT-X-271",
							amount: "BT-X-272",
							tradeTax: [
								"BT-X-273-00",
								{
									typeCode: "BT-X-273-0",
									categoryCode: "BT-X-273",
									rateApplicablePercent: "BT-X-274",
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
							partialPaymentAmount: "BT-X-275",
							penaltyTerms: [
								"BG-X-43",
								{
									date: "BT-X-276",
									datePeriodMeasure: "BT-X-277",
									basisAmount: "BT-X-279",
									calculationPercent: "BT-X-280",
									penaltyAmount: "BT-X-281",
								},
							],
							discountTerms: [
								"BG-X-44",
								{
									date: "BT-X-282",
									datePeriodMeasure: "BT-X-283",
									basisAmount: "BT-X-285",
									calculationPercent: "BT-X-286",
									discountAmount: "BT-X-287",
								},
							],
							payee: [
								"BG-X-77",
								{
									identifier: "BT-X-506",
									globalIdentifier: "BT-X-507",
									name: "BT-X-504",
									typeCode: "BT-X-511",
									organization: [
										"BT-X-508-00",
										{
											identifier: "BT-X-508",
											tradingName: "BT-X-505",
											postalAddress: [
												"BG-X-80",
												{
													postCode: "BT-X-525",
													line1: "BT-X-526",
													line2: "BT-X-527",
													line3: "BT-X-528",
													city: "BT-X-529",
													countryCode: "BT-X-530",
													countrySubdivision: "BT-X-531",
												},
											],
										},
									],
									tradeContact: [
										"BG-X-78",
										{
											name: "BT-X-512",
											departmentName: "BT-X-513",
											typeCode: "BT-X-514",
											phoneNumber: "BT-X-515",
											faxNumber: "BT-X-516",
											emailAddress: "BT-X-517",
										},
									],
									postalAddress: [
										"BG-X-79",
										{
											postCode: "BT-X-518",
											line1: "BT-X-519",
											line2: "BT-X-520",
											line3: "BT-X-521",
											city: "BT-X-522",
											countryCode: "BT-X-523",
											countrySubdivision: "BT-X-524",
										},
									],
									electronicAddress: "BT-X-510",
									taxRegistration: [
										"BT-X-509-00",
										{
											identifier: "BT-X-509",
										},
									],
								},
							],
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
							roundingAmount: "BT-114",
							grandTotalAmount: "BT-112",
							paidAmount: "BT-113",
							duePayableAmount: "BT-115",
						},
					],
					precendingInvoices: [
						"BG-3",
						{
							reference: "BT-25",
							typeCode: "BT-X-555",
							issueDate: "BT-26",
						},
					],
					buyerAccountant: [
						"BT-19-00",
						{
							reference: "BT-19",
							typeCode: "BT-X-290",
						},
					],
					advancePayment: [
						"BG-X-45",
						{
							paidAmount: "BT-X-291",
							date: "BT-X-292",
							tradeTax: [
								"BG-X-46",
								{
									calculatedAmount: "BT-X-293",
									typeCode: "BT-X-294",
									exemptionReason: "BT-X-295",
									categoryCode: "BT-X-296",
									exemptionReasonCode: "BT-X-297",
									rateApplicablePercent: "BT-X-298",
								},
							],
							precendingInvoice: [
								"BG-X-85",
								{
									issuerAssignedID: "BT-X-558",
									typeCode: "BT-X-559",
									date: "BT-X-560",
								},
							],
						},
					],
				},
			],
		},
	],
} as const;
