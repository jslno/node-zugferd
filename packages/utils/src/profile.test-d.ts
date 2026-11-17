import type { ZugferdProfile } from "@node-zugferd/core/types";
import {
	amount,
	asArray,
	nullish,
	object,
	text,
} from "@node-zugferd/data-types";
import { expectTypeOf, test } from "vitest";
import type { DefinedProfile } from "./profile.js";
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

const nonPdfProfile = defineProfile({
	id: "non-pdf",
	supportsPDF: false,
	schema: object({}),
	build() {},
	rules() {},
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

test("preserves PDF support on defined profiles", () => {
	expectTypeOf<typeof root.supportsPDF>().toEqualTypeOf<true | undefined>();
	expectTypeOf<
		typeof root.extensionSchema.fileName
	>().toEqualTypeOf<"factur-x.xml">();
});

test("allows profiles that do not support PDF", () => {
	type NonPdfProfile = ZugferdProfile<ReturnType<typeof object>, false>;
	type DefinedNonPdfProfile = DefinedProfile<
		"non-pdf",
		ZugferdProfile["dataRelationship"],
		unknown,
		unknown,
		ZugferdProfile["extensionSchema"],
		false
	>;

	expectTypeOf<NonPdfProfile["supportsPDF"]>().toEqualTypeOf<false>();
	expectTypeOf<NonPdfProfile["dataRelationship"]>().toEqualTypeOf<undefined>();
	expectTypeOf<NonPdfProfile["extensionSchema"]>().toEqualTypeOf<undefined>();
	expectTypeOf<DefinedNonPdfProfile["supportsPDF"]>().toEqualTypeOf<false>();
	expectTypeOf<
		DefinedNonPdfProfile["dataRelationship"]
	>().toEqualTypeOf<undefined>();
	expectTypeOf<
		DefinedNonPdfProfile["extensionSchema"]
	>().toEqualTypeOf<undefined>();
	expectTypeOf<typeof nonPdfProfile.supportsPDF>().toEqualTypeOf<false>();
	expectTypeOf<
		typeof nonPdfProfile.dataRelationship
	>().toEqualTypeOf<undefined>();
	expectTypeOf<
		typeof nonPdfProfile.extensionSchema
	>().toEqualTypeOf<undefined>();
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
