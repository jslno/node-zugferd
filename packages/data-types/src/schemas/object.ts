import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	ErrorMessage,
	ObjectPathItem,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import type {
	MarkOptional,
	MaybeReadonly,
	Prettify,
} from "@node-zugferd/core/types";
import { getDefault } from "../methods/get-default";
import type { InferInput, InferIssue, InferOutput } from "../types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";
import type { NullishSchema, NullishSchemaAsync } from "./nullish";

export type OptionalEntrySchema = NullishSchema<
	BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	unknown
>;

export type OptionalEntrySchemaAsync = NullishSchemaAsync<
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	unknown
>;

export interface ObjectEntries {
	[key: string]:
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| OptionalEntrySchema;
}

export interface ObjectEntriesAsync {
	[key: string]:
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
		| OptionalEntrySchema
		| OptionalEntrySchemaAsync;
}

export type ObjectKeys<
	TSchema extends
		| ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined>
		| ObjectSchemaAsync<
				ObjectEntriesAsync,
				ErrorMessage<ObjectIssue> | undefined
		  >,
> = MaybeReadonly<[keyof TSchema["entries"], ...(keyof TSchema["entries"])[]]>;

type InferEntriesInput<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
	-readonly [TKey in keyof TEntries]: InferInput<TEntries[TKey]>;
};

type InferEntriesOutput<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
	-readonly [TKey in keyof TEntries]: InferOutput<TEntries[TKey]>;
};

type OptionalInputKeys<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
	[TKey in keyof TEntries]: TEntries[TKey] extends
		| OptionalEntrySchema
		| OptionalEntrySchemaAsync
		? TKey
		: never;
}[keyof TEntries];

type OptionalOutputKeys<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
	[TKey in keyof TEntries]: TEntries[TKey] extends
		| OptionalEntrySchema
		| OptionalEntrySchemaAsync
		? undefined extends TEntries[TKey]["default"]
			? TKey
			: never
		: never;
}[keyof TEntries];

type InputWithQuestionMarks<
	TEntries extends ObjectEntries | ObjectEntriesAsync,
	TObject extends InferEntriesInput<TEntries>,
> = MarkOptional<TObject, OptionalInputKeys<TEntries>>;

type OutputWithQuestionMarks<
	TEntries extends ObjectEntries | ObjectEntriesAsync,
	TObject extends InferEntriesOutput<TEntries>,
> = MarkOptional<TObject, OptionalOutputKeys<TEntries>>;

export type InferObjectInput<
	TEntries extends ObjectEntries | ObjectEntriesAsync,
> = Prettify<InputWithQuestionMarks<TEntries, InferEntriesInput<TEntries>>>;

export type InferObjectOutput<
	TEntries extends ObjectEntries | ObjectEntriesAsync,
> = Prettify<OutputWithQuestionMarks<TEntries, InferEntriesOutput<TEntries>>>;

export type InferObjectIssue<
	TEntries extends ObjectEntries | ObjectEntriesAsync,
> = InferIssue<TEntries[keyof TEntries]>;

export interface ObjectIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "object";
	readonly expected: "Object" | `"${string}"`;
}

export interface ObjectSchema<
	Entries extends ObjectEntries,
	Message extends ErrorMessage<ObjectIssue> | undefined = undefined,
> extends BaseSchema<
		InferObjectInput<Entries>,
		InferObjectOutput<Entries>,
		ObjectIssue | InferObjectIssue<Entries>
	> {
	readonly type: "object";
	readonly reference: typeof object;
	readonly expects: "Object";
	readonly entries: Entries;
	readonly message: Message;
}

export interface ObjectSchemaAsync<
	Entries extends ObjectEntriesAsync,
	Message extends ErrorMessage<ObjectIssue> | undefined = undefined,
> extends BaseSchemaAsync<
		InferObjectInput<Entries>,
		InferObjectOutput<Entries>,
		ObjectIssue | InferObjectIssue<Entries>
	> {
	readonly type: "object";
	readonly reference: typeof objectAsync;
	readonly expects: "Object";
	readonly entries: Entries;
	readonly message: Message;
}

export function object<const Entries extends ObjectEntries>(
	entries: Entries,
): ObjectSchema<Entries>;
export function object<
	const Entries extends ObjectEntries,
	const Message extends ErrorMessage<ObjectIssue> | undefined,
>(entries: Entries, message: Message): ObjectSchema<Entries, Message>;
export function object(
	entries: ObjectEntries,
	message?: ErrorMessage<ObjectIssue> | undefined,
): ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> {
	return {
		kind: "schema",
		type: "object",
		reference: object,
		expects: "Object",
		async: false,
		entries,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				// @ts-expect-error
				dataset.typed = true;
				dataset.value = {};

				for (const key in this.entries) {
					const valueSchema = this.entries[key]!;

					if (
						key in input ||
						(valueSchema.type === "nullish" &&
							// @ts-expect-error
							valueSchema.default !== undefined)
					) {
						const value: unknown =
							key in input
								? // @ts-expect-error
									input[key]
								: getDefault(valueSchema);
						const valueDataset = valueSchema["~run"]({ value }, config);

						if (valueDataset.issues) {
							const pathItem: ObjectPathItem = {
								type: "object",
								origin: "value",
								input: input as Record<string, unknown>,
								key,
								value,
							};

							for (const issue of valueDataset.issues) {
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
								dataset.issues = valueDataset.issues;
							}

							if (config.abortEarly) {
								dataset.typed = false;
								break;
							}
						}

						if (!valueDataset.typed) {
							dataset.typed = false;
						}

						// @ts-expect-error
						dataset.value[key] = valueDataset.value;
					} else if (valueSchema.type !== "nullish") {
						addIssue(this, "key", dataset, config, {
							input: undefined,
							expected: `"${key}"`,
							path: [
								{
									type: "object",
									origin: "key",
									input: input as Record<string, unknown>,
									key,
									// @ts-expect-error
									value: input[key],
								},
							],
						});

						if (config.abortEarly) {
							break;
						}
					}
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				InferObjectOutput<ObjectEntries>,
				ObjectIssue | InferObjectIssue<ObjectEntries>
			>;
		},
	};
}

export function objectAsync<const Entries extends ObjectEntriesAsync>(
	entries: Entries,
): ObjectSchemaAsync<Entries>;
export function objectAsync<
	const Entries extends ObjectEntries,
	const Message extends ErrorMessage<ObjectIssue> | undefined,
>(entries: Entries, message: Message): ObjectSchemaAsync<Entries, Message>;
export function objectAsync(
	entries: ObjectEntriesAsync,
	message?: ErrorMessage<ObjectIssue> | undefined,
): ObjectSchemaAsync<
	ObjectEntriesAsync,
	ErrorMessage<ObjectIssue> | undefined
> {
	return {
		kind: "schema",
		type: "object",
		reference: objectAsync,
		expects: "Object",
		async: true,
		entries,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		async "~run"(dataset, config) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				// @ts-expect-error
				dataset.typed = true;
				dataset.value = {};

				const valueDatasets = await Promise.all(
					Object.entries(this.entries).map(async ([key, valueSchema]) => {
						if (
							key in input ||
							(valueSchema.type === "nullish" &&
								// @ts-expect-error
								valueSchema.default !== undefined)
						) {
							const value: unknown =
								key in input
									? // @ts-expect-error
										input[key]
									: await getDefault(valueSchema, dataset, config);
							return [
								key,
								value,
								valueSchema,
								await valueSchema["~run"]({ value }, config),
							] as const;
						}
						return [
							key,
							// @ts-expect-error
							input[key] as unknown,
							valueSchema,
							null,
						] as const;
					}),
				);

				for (const [key, value, valueSchema, valueDataset] of valueDatasets) {
					if (valueDataset) {
						if (valueDataset.issues) {
							const pathItem: ObjectPathItem = {
								type: "object",
								origin: "value",
								input: input as Record<string, unknown>,
								key,
								value,
							};

							for (const issue of valueDataset.issues) {
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
								dataset.issues = valueDataset.issues;
							}

							if (config.abortEarly) {
								dataset.typed = false;
								break;
							}
						}

						if (!valueDataset.typed) {
							dataset.typed = false;
						}

						// @ts-expect-error
						dataset.value[key] = valueDataset.value;
					} else if (valueSchema.type !== "nullish") {
						addIssue(this, "key", dataset, config, {
							input: undefined,
							expected: `"${key}"`,
							path: [
								{
									type: "object",
									origin: "key",
									input: input as Record<string, unknown>,
									key,
									value,
								},
							],
						});

						if (config.abortEarly) {
							break;
						}
					}
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				InferObjectOutput<ObjectEntriesAsync>,
				ObjectIssue | InferObjectIssue<ObjectEntriesAsync>
			>;
		},
	};
}
