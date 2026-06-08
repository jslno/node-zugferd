import type {
	BaseIssue,
	BaseSchema,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";
import { stringify } from "../utils/stringify";

export type Literal = bigint | boolean | number | string | symbol;

export interface LiteralIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "literal";
	readonly expected: string;
}

export interface LiteralSchema<
	TLiteral extends Literal,
	TMessage extends ErrorMessage<LiteralIssue> | undefined = undefined,
> extends BaseSchema<TLiteral, TLiteral, LiteralIssue> {
	readonly type: "literal";
	readonly reference: typeof literal;
	readonly literal: TLiteral;
	readonly message: TMessage;
}

export function literal<const L extends Literal>(literal: L): LiteralSchema<L>;
export function literal<
	const L extends Literal,
	M extends ErrorMessage<LiteralIssue>,
>(literal: L, message: M): LiteralSchema<L, M>;
export function literal(
	input: Literal,
	message?: ErrorMessage<LiteralIssue> | undefined,
): LiteralSchema<Literal, ErrorMessage<LiteralIssue> | undefined> {
	return {
		kind: "schema",
		type: "literal",
		reference: literal,
		expects: stringify(input),
		literal: input,
		async: false,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (dataset.value === this.literal) {
				// @ts-expect-error
				dataset.typed = true;
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<Literal, LiteralIssue>;
		},
	};
}
