import type {
	BaseIssue,
	BaseSchema,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export interface DateIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "date";
	readonly expected: "(Date | number | string)";
}

export interface DateSchema<
	Message extends ErrorMessage<DateIssue> | undefined = undefined,
> extends BaseSchema<Date | number | string, string, DateIssue> {
	readonly type: "date";
	readonly reference: typeof date;
	readonly expects: "(Date | number | string)";
	readonly message: Message;
}

export function date(): DateSchema;
export function date<
	const Message extends ErrorMessage<DateIssue> | undefined,
>(): DateSchema<Message>;
export function date(
	message?: ErrorMessage<DateIssue>,
): DateSchema<ErrorMessage<DateIssue> | undefined> {
	return {
		kind: "schema",
		type: "date",
		reference: date,
		expects: "(Date | number | string)",
		async: false,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (
				dataset.value instanceof Date ||
				typeof dataset.value === "string" ||
				typeof dataset.value === "number"
			) {
				const date = new Date(dataset.value);
				if (!isNaN(+date)) {
					// @ts-expect-error
					dataset.typed = true;
					dataset.value = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
				} else {
					addIssue(this, "type", dataset, config, {
						received: '"Invalid Date"',
					});
				}
			} else {
				addIssue(this, "type", dataset, config);
			}
			return dataset as unknown as OutputDataset<string, DateIssue>;
		},
	};
}
