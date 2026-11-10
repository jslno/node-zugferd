import type {
	BaseIssue,
	BaseSchema,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export interface PercentageIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "percentage";
	readonly expected: "(string | number) [0-100]";
}

export interface PercentageSchema<
	Message extends ErrorMessage<PercentageIssue> | undefined = undefined,
> extends BaseSchema<string | number, number, PercentageIssue> {
	readonly type: "percentage";
	readonly reference: typeof percentage;
	readonly expects: "(string | number) [0-100]";
	readonly message: Message;
}

export function percentage(): PercentageSchema;
export function percentage<
	const Message extends ErrorMessage<PercentageIssue> | undefined,
>(): PercentageSchema<Message>;
export function percentage(
	message?: ErrorMessage<PercentageIssue>,
): PercentageSchema<ErrorMessage<PercentageIssue> | undefined> {
	return {
		kind: "schema",
		type: "percentage",
		reference: percentage,
		expects: "(string | number) [0-100]",
		async: false,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (
				(typeof dataset.value === "number" ||
					typeof dataset.value === "string") &&
				!isNaN(Number(dataset.value))
			) {
				const number = Number(dataset.value);
				if (number >= 0 && number <= 100) {
					// @ts-expect-error
					dataset.typed = true;
					dataset.value = number;
				} else {
					addIssue(this, "number range", dataset, config);
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<number, PercentageIssue>;
		},
	};
}
