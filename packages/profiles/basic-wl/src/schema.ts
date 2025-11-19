import { Country } from "@node-zugferd/codelist-country";
import { Text } from "@node-zugferd/codelist-text";
import type { Schema } from "@node-zugferd/core";
import { t } from "@node-zugferd/shared";

export const schema = {
	document: {
		type: "object",
		shape: {
			includedNotes: {
				key: "BG-1",
				type: "object[]",
				required: false,
				shape: {
					content: {
						key: "BT-22",
						type: t.Text,
					},
					subjectCode: {
						key: "BT-21",
						type: t.Code("text", Object.values(Text)),
						required: false,
					},
				},
			},
		},
	},
	tradeTransaction: {
		type: "object",
		shape: {
			tradeAgreement: {
				type: "object",
				shape: {
					seller: {
						type: "object",
						shape: {
							identifier: {
								key: "BT-29",
								required: false,
								// TODO: Support string arrays
								type: t.Identifier,
							},
							globalIdentifier: {
								key: ["BT-29-0", "BT-29-1"],
								required: false,
								type: t.object({
									value: t.Identifier,
									schemeID: t.optional(t.string()),
								}),
							},
							organization: {
								type: "object",
								shape: {
									tradingName: {
										type: t.Text,
										key: "BT-28",
										required: false,
									},
								},
							},
							postalAddress: {
								type: "object",
								shape: {
									postCode: {
										key: "BT-38",
										type: t.Text,
										required: false,
									},
									line1: {
										key: "BT-35",
										type: t.Text,
										required: false,
									},
									line2: {
										key: "BT-36",
										type: t.Text,
										required: false,
									},
									line3: {
										key: "BT-162",
										type: t.Text,
										required: false,
									},
									city: {
										key: "BT-37",
										type: t.Text,
										required: false,
									},
									countrySubdivision: {
										key: "BT-39",
										type: t.Text,
										required: false,
									},
								},
							},
							electronicAddress: {
								key: ["BT-34-00", "BT-34", "BT-34-1"],
								type: t.object({
									value: t.optional(t.Identifier),
									schemeID: t.string(),
								}),
								required: false,
							},
						},
					},
					buyer: {
						type: "object",
						shape: {
							identifier: {
								key: "BT-46",
								type: t.Identifier,
								required: false,
							},
							globalIdentifier: {
								key: ["BT-46-0", "BT-46-1"],
								type: t.object({
									value: t.Identifier,
									schemeID: t.optional(t.string()),
								}),
								required: false,
							},
							postalAddress: {
								key: "BG-8",
								type: "object",
								shape: {
									postCode: {
										key: "BT-53",
										type: t.Text,
										required: false,
									},
									line1: {
										key: "BT-50",
										type: t.Text,
										required: false,
									},
									line2: {
										key: "BT-51",
										type: t.Text,
										required: false,
									},
									line3: {
										key: "BT-163",
										type: t.Text,
										required: false,
									},
									city: {
										key: "BT-52",
										type: t.Text,
										required: false,
									},
									countryCode: {
										key: "BT-55",
										type: t.Code("country", Object.values(Country)),
									},
									countrySubdivision: {
										key: "BT-54",
										type: t.Text,
										required: false,
									},
								},
							},
							electronicAddress: {
								key: ["BT-49-00", "BT-49", "BT-49-1"],
								type: t.object({
									value: t.optional(t.Identifier),
									schemeID: t.string(),
								}),
								required: false,
							},
							taxInformation: {
								key: "BT-48-00",
								type: "object",
								required: false,
								shape: {
									vatID: {
										key: "BT-48",
										type: t.Identifier,
										required: false,
									},
								},
							},
						},
					},
					// TODO: Interpolate fields below
					sellerTaxRepresentative: {
						key: "BG-11",
						type: "object",
						required: false,
						shape: {
							name: {
								key: "BT-62",
								type: t.Text,
							},
							postalAddress: {
								key: "BG-12",
								type: "object",
								shape: {
									postCode: {
										key: "BT-67",
										type: t.Text,
										required: false,
									},
									line1: {
										key: "BT-64",
										type: t.Text,
										required: false,
									},
									line2: {
										key: "BT-65",
										type: t.Text,
										required: false,
									},
									line3: {
										key: "BT-164",
										type: t.Text,
										required: false,
									},
									city: {
										key: "BT-66",
										type: t.Text,
										required: false,
									},
									countryCode: {
										key: "BT-69",
										type: t.Code("country", Object.values(Country)),
									},
									countrySubdivision: {
										key: "BT-68",
										type: t.Text,
										required: false,
									},
								},
							},
							taxInformation: {
								key: "BT-63-00",
								type: "object",
								required: false,
								shape: {
									vatID: {
										key: "BT-63",
										type: t.Identifier,
									},
								},
							},
						},
					},
					associatedContract: {
						key: "BT-12-00",
						type: "object",
						required: false,
						shape: {
							reference: {
								key: "BT-12",
								type: t.DocumentReference,
							},
						},
					},
				},
			},
		},
	},
} as const satisfies Schema;
