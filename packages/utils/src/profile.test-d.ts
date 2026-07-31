import {
	amount,
	asArray,
	nullish,
	object,
	text,
} from "@node-zugferd/data-types";
import { defineProfile } from "./profile.js";

type AssertTrue<T extends true> = T;
type AssertArray<_T extends readonly unknown[]> = true;
type IsAny<T> = 0 extends 1 & T ? true : false;

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

type LeafInput = typeof leaf.$Infer.Input;

type _prepaidAmountIsOptional = AssertTrue<
	{} extends Pick<
		LeafInput["transaction"]["debit"]["documentTotals"],
		"prepaidAmount"
	>
		? true
		: false
>;

type _chargeTotalAmountIsOptional = AssertTrue<
	{} extends Pick<
		LeafInput["transaction"]["debit"]["documentTotals"],
		"chargeTotalAmount"
	>
		? true
		: false
>;

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

type ChildInput = typeof child.$Infer.Input;

type _childInputIsNotAny = AssertTrue<
	IsAny<ChildInput> extends true ? false : true
>;

type PaymentTerms = Exclude<
	ChildInput["transaction"]["debit"]["paymentTerms"],
	null | undefined
>;

type _paymentTermsIsArray = AssertTrue<AssertArray<PaymentTerms>>;

type PaymentTerm = PaymentTerms[number];

type _paymentTermShape = AssertTrue<
	PaymentTerm extends {
		description: string;
		dueDate: string;
		partialPaymentAmount: string;
	}
		? true
		: false
>;

type InvoiceNotes = Exclude<
	ChildInput["exchangedDocument"]["invoiceNotes"],
	null | undefined
>;

type _invoiceNotesKeepsParentFields = AssertTrue<
	InvoiceNotes extends {
		content: string;
		contentCode: string;
	}
		? true
		: false
>;

type _paymentTermsIsOptional = AssertTrue<
	{} extends Pick<ChildInput["transaction"]["debit"], "paymentTerms">
		? true
		: false
>;

type _invoiceNotesIsOptional = AssertTrue<
	{} extends Pick<ChildInput["exchangedDocument"], "invoiceNotes">
		? true
		: false
>;

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

type RequiredChildInput = typeof requiredChild.$Infer.Input;

type _paymentTermsIsRequired = AssertTrue<
	{} extends Pick<RequiredChildInput["transaction"]["debit"], "paymentTerms">
		? false
		: true
>;

type _paymentTermsRejectsNull = AssertTrue<
	null extends RequiredChildInput["transaction"]["debit"]["paymentTerms"]
		? false
		: true
>;

type _paymentTermsRejectsUndefined = AssertTrue<
	undefined extends RequiredChildInput["transaction"]["debit"]["paymentTerms"]
		? false
		: true
>;

type _paymentTermsKeepsFields = AssertTrue<
	RequiredChildInput["transaction"]["debit"]["paymentTerms"] extends {
		description: string;
		dueDate: string;
	}
		? true
		: false
>;
