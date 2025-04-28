export const minimumMask = {
	businessProcessType: "BT-23",
	specificationIdentifier: "BT-24",
	number: "BT-1",
	typeCode: "BT-3",
	issueDate: "BT-2",
	transaction: [
		"BG-25-00",
		{
			tradeAgreement: [
				"BT-10-00",
				{
					buyerReference: "BT-10",
					seller: [
						"BG-4",
						{
							name: "BT-27",
							organization: [
								"BT-30-00",
								{
									registrationIdentifier: "BT-30",
								},
							],
							postalAddress: [
								"BG-5",
								{
									countryCode: "BT-40",
								},
							],
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
							name: "BT-44",
							organization: [
								"BT-47-00",
								{
									registrationIdentifier: "BT-47",
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
				},
			],
			tradeDelivery: "BG-13-00",
			tradeSettlement: [
				"BG-19",
				{
					currencyCode: "BT-5",
					monetarySummation: [
						"BG-22",
						{
							taxBasisTotalAmount: "BT-109",
							taxTotal: "BT-110",
							grandTotalAmount: "BT-112",
							duePayableAmount: "BT-115",
						},
					],
				},
			],
		},
	],
} as const;
