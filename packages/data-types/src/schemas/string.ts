import type {
	BaseIssue,
	BaseSchema,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export interface StringIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "string";
	readonly expected: "string";
}

export interface StringSchema<
	Message extends ErrorMessage<StringIssue> | undefined = undefined,
> extends BaseSchema<string, string, StringIssue> {
	readonly type: "string";
	readonly reference: typeof string;
	readonly expects: "string";
	readonly message: Message;
}

function string(): StringSchema;
function string<
	const Message extends ErrorMessage<StringIssue> | undefined,
>(): StringSchema<Message>;
function string(
	message?: ErrorMessage<StringIssue>,
): StringSchema<ErrorMessage<StringIssue> | undefined> {
	return {
		kind: "schema",
		type: "string",
		reference: string,
		expects: "string",
		async: false,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (typeof dataset.value === "string") {
				// @ts-expect-error
				dataset.typed = true;
			} else {
				addIssue(this, "type", dataset, config);
			}
			return dataset as unknown as OutputDataset<string, StringIssue>;
		},
	};
}

export const text = string;
export const documentReference = string;
