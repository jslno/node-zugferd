import type {
	BaseIssue,
	BaseSchema,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export interface BooleanIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "boolean";
	readonly expected: "boolean";
}

export interface BooleanSchema<
	TMessage extends ErrorMessage<BooleanIssue> | undefined = undefined,
> extends BaseSchema<boolean, boolean, BooleanIssue> {
	readonly type: "boolean";
	readonly reference: typeof boolean;
	readonly expects: "boolean";
	readonly message: TMessage;
}

export function boolean(): BooleanSchema;
export function boolean<const M extends ErrorMessage<BooleanIssue>>(
	message: M,
): BooleanSchema<M>;
export function boolean(
	message?: ErrorMessage<BooleanIssue>,
): BooleanSchema<ErrorMessage<BooleanIssue> | undefined> {
	return {
		kind: "schema",
		type: "boolean",
		reference: boolean,
		expects: "boolean",
		async: false,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (typeof dataset.value === "boolean") {
				// @ts-expect-error
				dataset.typed = true;
			} else {
				addIssue(this, "type", dataset, config);
			}
			return dataset as unknown as OutputDataset<boolean, BooleanIssue>;
		},
	};
}
