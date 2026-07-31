import type {
	BaseIssue,
	BaseSchema,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { getStandardProps } from "../utils/standard-props";
import { addIssue } from "../utils/add-issue";

export interface UnitPriceAmountIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "unit-price-amount";
	readonly expected: "(string | number)";
}

export interface UnitPriceAmountSchema
	extends BaseSchema<string | number, number, UnitPriceAmountIssue> {
	readonly type: "unit-price-amount";
	readonly reference: typeof unitPriceAmount;
	readonly expects: "(string | number)";
}

export function unitPriceAmount(): UnitPriceAmountSchema {
	return {
		kind: "schema",
		type: "unit-price-amount",
		reference: unitPriceAmount,
		expects: "(string | number)",
		async: false,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (
				(typeof dataset.value === "number" ||
					typeof dataset.value === "string") &&
				!isNaN(Number(dataset.value))
			) {
				// @ts-expect-error
				dataset.typed = true;
				dataset.value = Number(dataset.value);
			} else {
				addIssue(this, "type", dataset, config);
			}
			return dataset as unknown as OutputDataset<number, UnitPriceAmountIssue>;
		},
	};
}
