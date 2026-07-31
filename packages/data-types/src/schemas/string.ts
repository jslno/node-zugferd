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
	readonly subType?: string | undefined;
	readonly expected: "string";
}

export interface StringSchema<
	Message extends ErrorMessage<StringIssue> | undefined = undefined,
> extends BaseSchema<string, string, StringIssue> {
	readonly type: "string";
	readonly subType?: string | undefined;
	readonly reference: ReturnType<typeof createString>;
	readonly expects: "string";
	readonly message: Message;
}

const createString = (cfg?: { subType?: string | undefined } | undefined) => {
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
			subType: cfg?.subType,
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

	return string;
};

export const text = createString({ subType: "text" });
export const documentReference = createString({
	subType: "document-reference",
});
