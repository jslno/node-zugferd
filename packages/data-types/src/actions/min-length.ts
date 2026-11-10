import type { BaseIssue, ErrorMessage } from "@node-zugferd/core/data-types";
import type { BaseValidation } from "../types";
import { addIssue } from "../utils/add-issue";

type LengthInput = string | ArrayLike<unknown>;

export interface MinLengthIssue<
	Input extends LengthInput,
	Requirement extends number,
> extends BaseIssue<Input> {
	readonly kind: "validation";
	readonly type: "min_length";
	readonly expected: `>=${Requirement}`;
	readonly received: `${number}`;
	readonly requirement: Requirement;
}

export interface MinLengthAction<
	Input extends LengthInput,
	Requirement extends number,
	Message extends
		| ErrorMessage<MinLengthIssue<Input, Requirement>>
		| undefined = undefined,
> extends BaseValidation<Input, Input, MinLengthIssue<Input, Requirement>> {
	readonly type: "min_length";
	readonly reference: typeof minLength;
	readonly expects: `>=${Requirement}`;
	readonly requirement: Requirement;
	readonly message: Message;
}

export function minLength<
	Input extends LengthInput,
	const Requirement extends number,
>(requirement: Requirement): MinLengthAction<Input, Requirement>;
export function minLength<
	Input extends LengthInput,
	const Requirement extends number,
	const Message extends
		| ErrorMessage<MinLengthIssue<Input, Requirement>>
		| undefined,
>(
	requirement: Requirement,
	message: Message,
): MinLengthAction<Input, Requirement, Message>;
export function minLength(
	requirement: number,
	message?: ErrorMessage<MinLengthIssue<LengthInput, number>> | undefined,
): MinLengthAction<
	LengthInput,
	number,
	ErrorMessage<MinLengthIssue<LengthInput, number>> | undefined
> {
	return {
		kind: "validation",
		type: "min_length",
		reference: minLength,
		async: false,
		expects: `>=${requirement}`,
		requirement,
		message,
		"~run"(dataset, config) {
			if (dataset.typed && dataset.value.length < this.requirement) {
				addIssue(this, "length", dataset, config, {
					received: `${dataset.value.length}`,
				});
			}
			return dataset;
		},
	};
}
