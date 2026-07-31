import type {
	ArrayPathItem,
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import type { InferInput, InferIssue, InferOutput } from "../types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export interface ArrayIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "array";
	readonly expected: "Array";
}

export interface ArraySchema<
	Item extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	Message extends ErrorMessage<ArrayIssue> | undefined = undefined,
> extends BaseSchema<
		InferInput<Item>[],
		InferOutput<Item>[],
		ArrayIssue | InferIssue<Item>
	> {
	readonly type: "array";
	readonly reference: typeof array;
	readonly expects: "Array";
	readonly item: Item;
	readonly message: Message;
}

export interface ArraySchemaAsync<
	Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	Message extends ErrorMessage<ArrayIssue> | undefined = undefined,
> extends BaseSchemaAsync<
		InferInput<Item>[],
		InferOutput<Item>[],
		ArrayIssue | InferIssue<Item>
	> {
	readonly type: "array";
	readonly reference: typeof array | typeof arrayAsync;
	readonly expects: "Array";
	readonly item: Item;
	readonly message: Message;
}

export function array<
	const Item extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(item: Item): ArraySchema<Item>;
export function array<
	const Item extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Message extends ErrorMessage<ArrayIssue> | undefined,
>(item: Item, message: Message): ArraySchema<Item, Message>;
export function array(
	item: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	message?: ErrorMessage<ArrayIssue> | undefined,
): ArraySchema<
	BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	ErrorMessage<ArrayIssue> | undefined
> {
	return {
		kind: "schema",
		type: "array",
		reference: array,
		expects: "Array",
		async: false,
		item,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			const input = dataset.value;

			if (Array.isArray(input)) {
				// @ts-expect-error
				dataset.typed = true;
				dataset.value = [];

				for (let key = 0; key < input.length; key++) {
					const value = input[key];
					const itemDataset = this.item["~run"]({ value }, config);

					if (itemDataset.issues) {
						const pathItem: ArrayPathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value,
						};

						for (const issue of itemDataset.issues) {
							if (issue.path) {
								issue.path.unshift(pathItem);
							} else {
								// @ts-expect-error
								issue.path = [pathItem];
							}
							// @ts-expect-error
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) {
							// @ts-expect-error
							dataset.issues = itemDataset.issues;
						}

						if (config.abortEarly) {
							dataset.typed = false;
							break;
						}
					}

					if (!itemDataset.typed) {
						dataset.typed = false;
					}

					// @ts-expect-error
					dataset.value.push(itemDataset.value);
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				unknown[],
				ArrayIssue | BaseIssue<unknown>
			>;
		},
	};
}

export function arrayAsync<
	const Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(item: Item): ArraySchemaAsync<Item>;
export function arrayAsync<
	const Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Message extends ErrorMessage<ArrayIssue> | undefined,
>(item: Item, message: Message): ArraySchemaAsync<Item, Message>;
export function arrayAsync(
	item:
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	message?: ErrorMessage<ArrayIssue>,
): ArraySchemaAsync<
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	ErrorMessage<ArrayIssue> | undefined
> {
	return {
		kind: "schema",
		type: "array",
		reference: arrayAsync,
		expects: "Array",
		async: true,
		item,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		async "~run"(dataset, config) {
			const input = dataset.value;

			if (Array.isArray(input)) {
				// @ts-expect-error
				dataset.typed = true;
				dataset.value = [];

				const itemDatasets = await Promise.all(
					input.map((value) => this.item["~run"]({ value }, config)),
				);

				for (let key = 0; key < itemDatasets.length; key++) {
					const itemDataset = itemDatasets[key]!;

					if (itemDataset.issues) {
						const pathItem: ArrayPathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: input[key],
						};

						for (const issue of itemDataset.issues) {
							if (issue.path) {
								issue.path.unshift(pathItem);
							} else {
								// @ts-expect-error
								issue.path = [pathItem];
							}
							// @ts-expect-error
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) {
							// @ts-expect-error
							dataset.issues = itemDataset.issues;
						}

						if (config.abortEarly) {
							dataset.typed = false;
							break;
						}
					}

					if (!itemDataset.typed) {
						dataset.typed = false;
					}

					// @ts-expect-error
					dataset.value.push(itemDataset.value);
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				unknown[],
				ArrayIssue | BaseIssue<unknown>
			>;
		},
	};
}
