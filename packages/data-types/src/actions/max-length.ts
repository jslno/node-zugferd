import type { BaseIssue, ErrorMessage } from "@node-zugferd/core/data-types";
import type { BaseValidation } from "../types";
import { addIssue } from "../utils/add-issue";

type LengthInput = string | ArrayLike<unknown>;

export interface MaxLengthIssue<
	Input extends LengthInput,
	Requirement extends number,
> extends BaseIssue<Input> {
	readonly kind: "validation";
	readonly type: "max_length";
	readonly expected: `<${Requirement}`;
	readonly received: `${number}`;
	readonly requirement: Requirement;
}

export interface MaxLengthAction<
	Input extends LengthInput,
	Requirement extends number,
	Message extends
		| ErrorMessage<MaxLengthIssue<Input, Requirement>>
		| undefined = undefined,
> extends BaseValidation<Input, Input, MaxLengthIssue<Input, Requirement>> {
	readonly type: "max_length";
	readonly reference: typeof maxLength;
	readonly expects: `<${Requirement}`;
	readonly requirement: Requirement;
	readonly message: Message;
}

export function maxLength<
	Input extends LengthInput,
	const Requirement extends number,
>(requirement: Requirement): MaxLengthAction<Input, Requirement>;
export function maxLength<
	Input extends LengthInput,
	const Requirement extends number,
	const Message extends
		| ErrorMessage<MaxLengthIssue<Input, Requirement>>
		| undefined,
>(
	requirement: Requirement,
	message: Message,
): MaxLengthAction<Input, Requirement, Message>;
export function maxLength(
	requirement: number,
	message?: ErrorMessage<MaxLengthIssue<LengthInput, number>> | undefined,
): MaxLengthAction<
	LengthInput,
	number,
	ErrorMessage<MaxLengthIssue<LengthInput, number>> | undefined
> {
	return {
		kind: "validation",
		type: "max_length",
		reference: maxLength,
		async: false,
		expects: `<${requirement}`,
		requirement,
		message,
		"~run"(dataset, config) {
			if (dataset.typed && dataset.value.length > this.requirement) {
				addIssue(this, "length", dataset, config, {
					received: `${dataset.value.length}`,
				});
			}
			return dataset;
		},
	};
}
