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
	adaptInputForOption,
	buildCardinalityPlan,
} from "../utils/cardinality-plan";
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

		if (a && b && a.constructor === Object && Array.isArray(b)) {
			const nextValue = b.map((item) => {
				const dataset = merge(a, item);
				return dataset.issue ? item : dataset.value;
			});

			return { value: nextValue };
		}

		if (Array.isArray(a) && b && b.constructor === Object) {
			const nextValue = a.map((item) => {
				const dataset = merge(item, b);
				return dataset.issue ? item : dataset.value;
			});

			return { value: nextValue };
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
					const adaptedInput = adaptInputForOption(
						input,
						optionIndex,
						cardinalityRules,
					);
					const optionDataset = schema["~run"]({ value: adaptedInput }, config);

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

					if (dataset.typed) {
						if (outputs) {
							outputs.push(optionDataset.value);
						} else {
							outputs = [optionDataset.value];
						}
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
					this.options.map((schema, optionIndex) => {
						const adaptedInput = adaptInputForOption(
							input,
							optionIndex,
							cardinalityRules,
						);
						return schema["~run"]({ value: adaptedInput }, config);
					}),
				);

				for (const optionDataset of optionDatasets) {
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

					if (dataset.typed) {
						if (outputs) {
							outputs.push(optionDataset.value);
						} else {
							outputs = [optionDataset.value];
						}
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
