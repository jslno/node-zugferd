import type {
	BaseIssue,
	BaseSchema,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export interface NumberIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "number";
	readonly expected: "(string | number)";
}

export interface NumberSchema<
	Message extends ErrorMessage<NumberIssue> | undefined = undefined,
> extends BaseSchema<string | number, number, NumberIssue> {
	readonly type: "number";
	readonly reference: typeof number;
	readonly expects: "(string | number)";
	readonly message: Message;
}

function number(): NumberSchema;
function number<
	const Message extends ErrorMessage<NumberIssue> | undefined,
>(): NumberSchema<Message>;
function number(
	message?: ErrorMessage<NumberIssue>,
): NumberSchema<ErrorMessage<NumberIssue> | undefined> {
	return {
		kind: "schema",
		type: "number",
		reference: number,
		expects: "(string | number)",
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
				// @ts-expect-error
				dataset.typed = true;
				dataset.value = Number(dataset.value);
			} else {
				addIssue(this, "type", dataset, config);
			}
			return dataset as unknown as OutputDataset<number, NumberIssue>;
		},
	};
}

export const quantity = number;
export const unitPriceAmount = number;
