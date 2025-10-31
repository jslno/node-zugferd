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
				// TODO: UNTDID 1001 Codelist
				type: t.Code,
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
										// TODO: Support @schemeID
										type: t.Identifier,
										required: false,
									},
								},
							},
							postalAddress: {
								key: "BG-5",
								type: "object",
								// TODO:
								shape: {},
							},
						},
					},
				},
			},
		},
	},
} as const satisfies Schema;
