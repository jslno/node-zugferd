import { Country } from "@node-zugferd/codelist-country";
import { Currency } from "@node-zugferd/codelist-currency";
import { Untdid1001 } from "@node-zugferd/codelist-untdid-1001";
import type { Schema } from "@node-zugferd/core";
import { t } from "@node-zugferd/shared";

export const schema = {
	context: {
		key: "BT-23-00",
		type: "object",
		required: false,
		shape: {
			// BG-23-00
			businessProcessType: {
				key: "BT-23",
				type: t.Text,
				required: false,
			},
			// BG-24-00
			specificationIdentifier: {
				key: "BT-24",
				type: t.withDefault(t.Identifier, "urn:factur-x.eu:1p0:minimum"),
			},
		},
	},
	document: {
		key: "BT-1-00",
		type: "object",
		required: false,
		shape: {
			number: {
				key: "BT-1",
				type: t.Identifier,
			},
			typeCode: {
				key: "BT-3",
				type: t.Code("Untdid1001", Object.values(Untdid1001)),
			},
			// BT-2-00
			issueDate: {
				key: "BT-2",
				type: t.Date,
			},
		},
	},
	tradeTransaction: {
		key: "BG-25-00",
		type: "object",
		required: false,
		shape: {
			tradeAgreement: {
				type: "object",
				required: false,
				shape: {
					buyerReference: {
						key: "BT-10",
						type: t.Text,
						required: false,
					},
					seller: {
						key: "BG-4",
						type: "object",
						shape: {
							name: {
								key: "BT-27",
								type: t.Text,
							},
							organization: {
								key: "BT-30-00",
								type: "object",
								required: false,
								shape: {
									legalRegistrationID: {
										key: "BT-30",
										type: t.object({
											value: t.Identifier,
											schemeID: t.optional(t.string()),
										}),
										required: false,
									},
								},
							},
							postalAddress: {
								key: "BG-5",
								type: "object",
								shape: {
									countryCode: {
										key: "BT-40",
										type: t.Code("country", Object.values(Country)),
									},
								},
							},
							taxInformation: {
								key: ["BT-31-00", "BT-32-00"],
								type: "object",
								required: false,
								shape: {
									vatID: {
										key: "BT-31",
										required: false,
										type: t.Identifier,
									},
									localID: {
										key: "BT-32",
										required: false,
										type: t.Identifier,
									},
								},
							},
						},
					},
					buyer: {
						key: "BG-7",
						type: "object",
						shape: {
							name: {
								key: "BT-44",
								type: t.Text,
							},
							organization: {
								key: "BT-47-00",
								type: "object",
								required: false,
								shape: {
									legalRegistrationID: {
										key: "BT-47",
										type: t.object({
											value: t.Identifier,
											schemeID: t.optional(t.string()),
										}),
										required: false,
									},
								},
							},
						},
					},
					associatedOrder: {
						key: "BT-13-00",
						type: "object",
						required: false,
						shape: {
							reference: {
								key: "BT-13",
								type: t.DocumentReference,
								required: false,
							},
						},
					},
				},
			},
			tradeDelivery: {
				key: "BG-13-00",
				type: "object",
				required: false,
				shape: {},
			},
			tradeSettlement: {
				key: "BG-19",
				type: "object",
				required: false,
				shape: {
					invoiceCurrencyCode: {
						key: "BT-5",
						type: t.Code("currency", Object.values(Currency)),
					},
					monetarySummation: {
						key: "BG-22",
						type: "object",
						shape: {
							taxBasisTotalAmount: {
								key: "BT-109",
								type: t.Amount,
							},
							taxTotalAmount: {
								key: "BT-110",
								type: t.Amount,
								required: false,
							},
							currencyCode: {
								key: "BT-110-0",
								type: t.Code("currency", Object.values(Currency)),
								// Field is required but we fallback to BT-5 if not set
								required: false,
							},
							grandTotalAmount: {
								key: "BT-112",
								type: t.Amount,
							},
							duePayableAmount: {
								key: "BT-115",
								type: t.Amount,
							},
						},
					},
				},
			},
		},
	},
} as const satisfies Schema;
