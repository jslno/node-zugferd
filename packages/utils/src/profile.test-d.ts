import {
	amount,
	asArray,
	nullish,
	object,
	text,
} from "@node-zugferd/data-types";
import { expectTypeOf, test } from "vitest";
import { defineProfile } from "./profile.js";

const root = defineProfile({
	id: "root",
	dataRelationship: "Alternative",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "MINIMUM",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	schema: object({
		transaction: object({
			debit: object({
				documentTotals: object({
					taxBasisTotalAmount: amount({ requireCurrency: "never" }),
					grandTotalAmount: amount({ requireCurrency: "never" }),
					duePayableAmount: amount({ requireCurrency: "never" }),
				}),
			}),
		}),
	}),
	build() {},
});

const middle = defineProfile({
	id: "middle",
	dataRelationship: "Alternative",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "BASIC WL",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	use: [root],
	schema: object({
		transaction: object({
			debit: object({
				documentTotals: object({
					lineTotalAmount: amount({ requireCurrency: "never" }),
					chargeTotalAmount: nullish(amount({ requireCurrency: "never" })),
					prepaidAmount: nullish(amount({ requireCurrency: "never" })),
				}),
			}),
		}),
	}),
	build() {},
});

const leaf = defineProfile({
	id: "leaf",
	dataRelationship: "Alternative",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "BASIC",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	use: [middle],
	schema: object({
		transaction: object({
			line: nullish(
				object({
					position: object({
						lineId: text(),
					}),
				}),
			),
		}),
	}),
	build() {},
});

const parent = defineProfile({
	id: "parent",
	dataRelationship: "Alternative",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "BASIC WL",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	schema: object({
		transaction: object({
			debit: object({
				paymentTerms: nullish(
					object({
						description: text(),
						dueDate: text(),
					}),
				),
			}),
		}),
		exchangedDocument: object({
			invoiceNotes: nullish(
				object({
					content: text(),
				}),
			),
		}),
	}),
	build() {},
});

const child = defineProfile({
	id: "child",
	dataRelationship: "Alternative",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "EXTENDED",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	use: [parent],
	schema: object({
		transaction: object({
			debit: object({
				paymentTerms: nullish(
					asArray(
						object({
							partialPaymentAmount: text(),
						}),
					),
				),
			}),
		}),
		exchangedDocument: object({
			invoiceNotes: nullish(
				object({
					contentCode: text(),
				}),
			),
		}),
	}),
	build() {},
});

const nullishParent = defineProfile({
	id: "nullish-parent",
	dataRelationship: "Alternative",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "BASIC WL",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	schema: object({
		transaction: object({
			debit: object({
				paymentTerms: nullish(
					object({
						description: text(),
					}),
				),
			}),
		}),
	}),
	build() {},
});

const requiredChild = defineProfile({
	id: "required-child",
	dataRelationship: "Alternative",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "EXTENDED",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	use: [nullishParent],
	schema: object({
		transaction: object({
			debit: object({
				paymentTerms: object({
					description: text(),
					dueDate: text(),
				}),
			}),
		}),
	}),
	build() {},
});

test("keeps inherited nullish amount fields optional", () => {
	type Totals =
		(typeof leaf)["$Infer"]["Input"]["transaction"]["debit"]["documentTotals"];

	expectTypeOf<{}>().toExtend<Pick<Totals, "prepaidAmount">>();
	expectTypeOf<{}>().toExtend<Pick<Totals, "chargeTotalAmount">>();
});

test("merges a parent object into a child array and keeps both fields optional", () => {
	type ChildInput = (typeof child)["$Infer"]["Input"];

	expectTypeOf<ChildInput>().not.toBeAny();

	expectTypeOf<ChildInput["transaction"]["debit"]["paymentTerms"]>()
		.exclude<null | undefined>()
		.toExtend<readonly unknown[]>();
	expectTypeOf<ChildInput["transaction"]["debit"]["paymentTerms"]>()
		.exclude<null | undefined>()
		.items.toExtend<{
			description: string;
			dueDate: string;
			partialPaymentAmount: string;
		}>();

	expectTypeOf<ChildInput["exchangedDocument"]["invoiceNotes"]>()
		.exclude<null | undefined>()
		.toExtend<{
			content: string;
			contentCode: string;
		}>();

	expectTypeOf<{}>().toExtend<
		Pick<ChildInput["transaction"]["debit"], "paymentTerms">
	>();
	expectTypeOf<{}>().toExtend<
		Pick<ChildInput["exchangedDocument"], "invoiceNotes">
	>();
});

test("lets a child replace a nullish parent field with a required object", () => {
	type PaymentTerms =
		(typeof requiredChild)["$Infer"]["Input"]["transaction"]["debit"]["paymentTerms"];

	expectTypeOf<{}>().not.toExtend<
		Pick<
			(typeof requiredChild)["$Infer"]["Input"]["transaction"]["debit"],
			"paymentTerms"
		>
	>();
	expectTypeOf<null>().not.toExtend<PaymentTerms>();
	expectTypeOf<undefined>().not.toExtend<PaymentTerms>();
	expectTypeOf<PaymentTerms>().toExtend<{
		description: string;
		dueDate: string;
	}>();
});
