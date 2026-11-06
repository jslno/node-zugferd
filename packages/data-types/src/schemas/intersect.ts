import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import type { MaybeReadonly } from "@node-zugferd/core/types";
import type { InferIssue } from "../types/infer";
import type {
	FlattenIntersectOptions,
	FoldIntersectInputs,
	FoldIntersectOutputs,
} from "../types/intersect-merge";
import { addIssue } from "../utils/add-issue";
import {
	assembleObjectOptionOutput,
	buildCardinalityPlan,
	expandObjectOptionInput,
	rehydrateNestedObjectArrays,
	rehydrateNestedObjectArraysAsync,
} from "../utils/cardinality";
import { joinExpects } from "../utils/join-expects";
import { getStandardProps } from "../utils/standard-props";

type MergeDataset =
	| { value: unknown; issue?: undefined }
	| { value?: undefined; issue: true };

function merge(a: unknown, b: unknown): MergeDataset {
	if (typeof a === typeof b) {
		if (a === b || (a instanceof Date && b instanceof Date && +a === +b)) {
			return { value: a };
		}

		if (a && b && a.constructor === Object && b.constructor === Object) {
			const nextValue = { ...a };

			for (const key in b) {
				// @ts-expect-error
				if (key in a) {
					// @ts-expect-error
					const dataset = merge(a[key], b[key]);

					if (dataset.issue) {
						return dataset;
					}

					// @ts-expect-error
					nextValue[key] = dataset.value;
				} else {
					// @ts-expect-error
					nextValue[key] = b[key];
				}
			}

			return { value: nextValue };
		}

		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length === b.length) {
				const nextValue = [...a];

				for (let index = 0; index < a.length; index++) {
					const dataset = merge(a[index], b[index]);

					if (dataset.issue) {
						return dataset;
					}

					nextValue[index] = dataset.value;
				}

				return { value: nextValue };
			}
		}

		// Object↔array merges come from profile cardinality upgrades (object →
		// asArray). The object side was validated against array[0] only, so it
		// must enrich just the first element — never overwrite every item.
		if (a && b && a.constructor === Object && Array.isArray(b)) {
			if (b.length === 0) {
				return { value: [a] };
			}

			const first = merge(a, b[0]);

			if (first.issue) {
				return first;
			}

			return { value: [first.value, ...b.slice(1)] };
		}

		if (Array.isArray(a) && b && b.constructor === Object) {
			if (a.length === 0) {
				return { value: [b] };
			}

			const first = merge(a[0], b);

			if (first.issue) {
				return first;
			}

			return { value: [first.value, ...a.slice(1)] };
		}
	}

	return { issue: true };
}

type IntersectOption =
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;

export type InferIntersectInput<
	TOptions extends IntersectOptions | IntersectOptionsAsync,
> =
	FlattenIntersectOptions<TOptions> extends infer Flat extends
		readonly IntersectOption[]
		? FoldIntersectInputs<Flat>
		: unknown;

/**
 * Infer intersect output type.
 */
export type InferIntersectOutput<
	TOptions extends IntersectOptions | IntersectOptionsAsync,
> =
	FlattenIntersectOptions<TOptions> extends infer Flat extends
		readonly IntersectOption[]
		? FoldIntersectOutputs<Flat>
		: unknown;

export interface IntersectIssue<
	SubIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> extends BaseIssue<unknown> {
	/**
	 * The issue kind.
	 */
	readonly kind: "schema";
	/**
	 * The issue type.
	 */
	readonly type: "intersect";
	/**
	 * The expected property.
	 */
	readonly expected: string;
	readonly issues?: [SubIssue, ...SubIssue[]];
}

export type IntersectOptions = MaybeReadonly<
	BaseSchema<unknown, unknown, BaseIssue<unknown>>[]
>;

export type IntersectOptionsAsync = MaybeReadonly<
	(
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
	)[]
>;

export interface IntersectSchema<
	TOptions extends IntersectOptions,
	TMessage extends
		| ErrorMessage<IntersectIssue<InferIssue<TOptions[number]>>>
		| undefined = undefined,
> extends BaseSchema<
		InferIntersectInput<TOptions>,
		InferIntersectOutput<TOptions>,
		IntersectIssue<InferIssue<TOptions[number]>> | InferIssue<TOptions[number]>
	> {
	/**
	 * The schema type.
	 */
	readonly type: "intersect";
	/**
	 * The schema reference.
	 */
	readonly reference: typeof intersect;
	/**
	 * The intersect options.
	 */
	readonly options: TOptions;
	/**
	 * The error message.
	 */
	readonly message: TMessage;
}

export function intersect<const TOptions extends IntersectOptions>(
	options: TOptions,
): IntersectSchema<TOptions>;
export function intersect<
	const TOptions extends IntersectOptions,
	const Message extends
		| ErrorMessage<IntersectIssue<InferIssue<TOptions[number]>>>
		| undefined,
>(options: TOptions, message: Message): IntersectSchema<TOptions, Message>;
export function intersect(
	options: IntersectOptions,
	message?: ErrorMessage<IntersectIssue<BaseIssue<unknown>>> | undefined,
): IntersectSchema<
	IntersectOptions,
	ErrorMessage<IntersectIssue<BaseIssue<unknown>>> | undefined
> {
	return {
		kind: "schema",
		type: "intersect",
		reference: intersect,
		expects: joinExpects(
			options.map((option) => option.expects),
			"&",
		),
		async: false,
		options,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (this.options.length) {
				const input = dataset.value;
				const cardinalityRules = buildCardinalityPlan(this.options);

				let outputs: unknown[] | undefined;

				// @ts-expect-error
				dataset.typed = true;

				for (const [optionIndex, schema] of this.options.entries()) {
					const expandedInputs = expandObjectOptionInput(
						input,
						optionIndex,
						cardinalityRules,
					);
					const itemDatasets = expandedInputs.map((adaptedInput) =>
						schema["~run"]({ value: adaptedInput }, config),
					);

					for (const optionDataset of itemDatasets) {
						if (optionDataset.issues) {
							if (dataset.issues) {
								for (const issue of optionDataset.issues) {
									// @ts-expect-error
									dataset.issues.push(issue);
								}
							} else {
								// @ts-expect-error
								dataset.issues = optionDataset.issues;
							}

							if (config.abortEarly) {
								dataset.typed = false;
								break;
							}
						}

						if (!optionDataset.typed) {
							dataset.typed = false;
						}
					}

					if (!dataset.typed) {
						if (config.abortEarly) {
							break;
						}
						continue;
					}

					const optionValue = rehydrateNestedObjectArrays(
						input,
						assembleObjectOptionOutput(
							input,
							itemDatasets.map((item) => item.value),
							optionIndex,
							cardinalityRules,
						),
						optionIndex,
						cardinalityRules,
						(adaptedInput) =>
							schema["~run"]({ value: adaptedInput }, config).value,
					);

					if (outputs) {
						outputs.push(optionValue);
					} else {
						outputs = [optionValue];
					}
				}

				if (dataset.typed) {
					dataset.value = outputs![0];

					for (let index = 1; index < outputs!.length; index++) {
						const mergeDataset = merge(dataset.value, outputs![index]);

						if (mergeDataset.issue) {
							addIssue(this, "type", dataset, config, {
								received: "unknown",
							});
							break;
						}

						dataset.value = mergeDataset.value;
					}
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				unknown,
				IntersectIssue<BaseIssue<unknown>> | BaseIssue<unknown>
			>;
		},
	};
}

export interface IntersectSchemaAsync<
	TOptions extends IntersectOptionsAsync,
	TMessage extends
		| ErrorMessage<IntersectIssue<InferIssue<TOptions[number]>>>
		| undefined = undefined,
> extends BaseSchemaAsync<
		InferIntersectInput<TOptions>,
		InferIntersectOutput<TOptions>,
		IntersectIssue<InferIssue<TOptions[number]>> | InferIssue<TOptions[number]>
	> {
	readonly type: "intersect";
	readonly reference: typeof intersect | typeof intersectAsync;
	readonly options: TOptions;
	readonly message: TMessage;
}

export function intersectAsync<const TOptions extends IntersectOptionsAsync>(
	options: TOptions,
): IntersectSchemaAsync<TOptions>;
export function intersectAsync<
	const TOptions extends IntersectOptionsAsync,
	const Message extends
		| ErrorMessage<IntersectIssue<InferIssue<TOptions[number]>>>
		| undefined,
>(options: TOptions, message: Message): IntersectSchemaAsync<TOptions, Message>;
export function intersectAsync(
	options: IntersectOptionsAsync,
	message?: ErrorMessage<IntersectIssue<BaseIssue<unknown>>> | undefined,
): IntersectSchemaAsync<
	IntersectOptionsAsync,
	ErrorMessage<IntersectIssue<BaseIssue<unknown>>> | undefined
> {
	return {
		kind: "schema",
		type: "intersect",
		reference: intersectAsync,
		expects: joinExpects(
			options.map((option) => option.expects),
			"&",
		),
		async: true,
		options,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		async "~run"(dataset, config) {
			if (this.options.length) {
				const input = dataset.value;
				const cardinalityRules = buildCardinalityPlan(this.options);

				let outputs: unknown[] | undefined;

				// @ts-expect-error
				dataset.typed = true;

				const optionDatasets = await Promise.all(
					this.options.map(async (schema, optionIndex) => {
						const expandedInputs = expandObjectOptionInput(
							input,
							optionIndex,
							cardinalityRules,
						);
						const itemDatasets = await Promise.all(
							expandedInputs.map((adaptedInput) =>
								schema["~run"]({ value: adaptedInput }, config),
							),
						);

						const assembled = assembleObjectOptionOutput(
							input,
							itemDatasets.map((item) => item.value),
							optionIndex,
							cardinalityRules,
						);

						const value = await rehydrateNestedObjectArraysAsync(
							input,
							assembled,
							optionIndex,
							cardinalityRules,
							async (adaptedInput) => {
								const dataset = await schema["~run"](
									{ value: adaptedInput },
									config,
								);
								return dataset.value;
							},
						);

						return {
							itemDatasets,
							value,
						};
					}),
				);

				for (const { itemDatasets, value } of optionDatasets) {
					for (const optionDataset of itemDatasets) {
						if (optionDataset.issues) {
							if (dataset.issues) {
								for (const issue of optionDataset.issues) {
									// @ts-expect-error
									dataset.issues.push(issue);
								}
							} else {
								// @ts-expect-error
								dataset.issues = optionDataset.issues;
							}

							if (config.abortEarly) {
								dataset.typed = false;
								break;
							}
						}

						if (!optionDataset.typed) {
							dataset.typed = false;
						}
					}

					if (!dataset.typed) {
						if (config.abortEarly) {
							break;
						}
						continue;
					}

					if (outputs) {
						outputs.push(value);
					} else {
						outputs = [value];
					}
				}

				if (dataset.typed) {
					dataset.value = outputs![0];

					for (let index = 1; index < outputs!.length; index++) {
						const mergeDataset = merge(dataset.value, outputs![index]);

						if (mergeDataset.issue) {
							addIssue(this, "type", dataset, config, {
								received: "unknown",
							});
							break;
						}

						dataset.value = mergeDataset.value;
					}
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				unknown,
				IntersectIssue<BaseIssue<unknown>> | BaseIssue<unknown>
			>;
		},
	};
}
