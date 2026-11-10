import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	ErrorMessage,
} from "@node-zugferd/core/data-types";
import type { InferInput, InferIssue, InferOutput } from "../types/infer";
import { getStandardProps } from "../utils/standard-props";
import { array, arrayAsync } from "./array";

export interface AsArrayIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "as_array";
	readonly expected: "Array";
}

export interface AsArraySchema<
	Item extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	Message extends ErrorMessage<AsArrayIssue> | undefined = undefined,
> extends BaseSchema<
		InferInput<Item>[],
		InferOutput<Item>[],
		AsArrayIssue | InferIssue<Item>
	> {
	readonly type: "as_array";
	readonly reference: typeof asArray;
	readonly expects: "Array";
	readonly item: Item;
	readonly message: Message;
}

export interface AsArraySchemaAsync<
	Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	Message extends ErrorMessage<AsArrayIssue> | undefined = undefined,
> extends BaseSchemaAsync<
		InferInput<Item>[],
		InferOutput<Item>[],
		AsArrayIssue | InferIssue<Item>
	> {
	readonly type: "as_array";
	readonly reference: typeof asArray | typeof asArrayAsync;
	readonly expects: "Array";
	readonly item: Item;
	readonly message: Message;
}

export function asArray<
	const Item extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(item: Item): AsArraySchema<Item>;
export function asArray<
	const Item extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Message extends ErrorMessage<AsArrayIssue> | undefined,
>(item: Item, message: Message): AsArraySchema<Item, Message>;
export function asArray(
	item: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	message?: ErrorMessage<AsArrayIssue> | undefined,
): AsArraySchema<
	BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	ErrorMessage<AsArrayIssue> | undefined
> {
	const wrapped = array(item);

	return {
		kind: "schema",
		type: "as_array",
		reference: asArray,
		expects: "Array",
		async: false,
		item,
		message,
		"~run": wrapped["~run"].bind(wrapped),
		get "~standard"() {
			return getStandardProps(this);
		},
	};
}

export function asArrayAsync<
	const Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(item: Item): AsArraySchemaAsync<Item>;
export function asArrayAsync<
	const Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Message extends ErrorMessage<AsArrayIssue> | undefined,
>(item: Item, message: Message): AsArraySchemaAsync<Item, Message>;
export function asArrayAsync(
	item:
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	message?: ErrorMessage<AsArrayIssue>,
): AsArraySchemaAsync<
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	ErrorMessage<AsArrayIssue> | undefined
> {
	const wrapped = arrayAsync(item);

	return {
		kind: "schema",
		type: "as_array",
		reference: asArrayAsync,
		expects: "Array",
		async: true,
		item,
		message,
		"~run": wrapped["~run"].bind(wrapped),
		get "~standard"() {
			return getStandardProps(this);
		},
	};
}
