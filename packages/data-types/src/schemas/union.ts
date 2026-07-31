import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	ErrorMessage,
	FailureDataset,
	OutputDataset,
	PartialDataset,
	SuccessDataset,
} from "@node-zugferd/core/data-types";
import type { MaybeReadonly } from "@node-zugferd/core/types";
import type { InferInput, InferIssue, InferOutput } from "../types/infer";
import { addIssue } from "../utils/add-issue";
import { joinExpects } from "../utils/join-expects";
import { getStandardProps } from "../utils/standard-props";

export type UnionOptions = MaybeReadonly<
	BaseSchema<unknown, unknown, BaseIssue<unknown>>[]
>;

export interface UnionIssue<SubIssue extends BaseIssue<unknown>>
	extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "union";
	readonly expected: string;
	readonly issues?: [SubIssue, ...SubIssue[]];
}

export interface UnionSchema<
	Options extends UnionOptions,
	Message extends
		| ErrorMessage<UnionIssue<InferIssue<Options[number]>>>
		| undefined = undefined,
> extends BaseSchema<
		InferInput<Options[number]>,
		InferOutput<Options[number]>,
		UnionIssue<InferIssue<Options[number]>> | InferIssue<Options[number]>
	> {
	readonly type: "union";
	readonly reference: typeof union;
	readonly options: Options;
	readonly message: Message;
}

function subIssues(
	datasets: OutputDataset<unknown, BaseIssue<unknown>>[] | undefined,
): [BaseIssue<unknown>, ...BaseIssue<unknown>[]] | undefined {
	let issues: [BaseIssue<unknown>, ...BaseIssue<unknown>[]] | undefined;
	if (datasets) {
		for (const dataset of datasets) {
			if (issues) {
				for (const issue of dataset.issues!) {
					issues.push(issue);
				}
			} else {
				issues = dataset.issues;
			}
		}
	}
	return issues;
}

export function union<const Options extends UnionOptions>(
	options: Options,
): UnionSchema<Options>;
export function union<
	const Options extends UnionOptions,
	const Message extends
		| ErrorMessage<UnionIssue<InferIssue<Options[number]>>>
		| undefined,
>(options: Options, message: Message): UnionSchema<Options, Message>;
export function union(
	options: UnionOptions,
	message?: ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined,
): UnionSchema<
	UnionOptions,
	ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined
> {
	return {
		kind: "schema",
		type: "union",
		reference: union,
		expects: joinExpects(
			options.map((option) => option.expects),
			"|",
		),
		async: false,
		options,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			let validDataset: SuccessDataset<unknown> | undefined;
			let typedDatasets:
				| PartialDataset<unknown, BaseIssue<unknown>>[]
				| undefined;
			let untypedDatasets: FailureDataset<BaseIssue<unknown>>[] | undefined;

			for (const schema of this.options) {
				const optionDataset = schema["~run"]({ value: dataset.value }, config);

				if (optionDataset.typed) {
					if (optionDataset.issues) {
						if (typedDatasets) {
							typedDatasets.push(optionDataset);
						} else {
							typedDatasets = [optionDataset];
						}
					} else {
						validDataset = optionDataset;
						break;
					}
				} else {
					if (untypedDatasets) {
						untypedDatasets.push(optionDataset);
					} else {
						untypedDatasets = [optionDataset];
					}
				}
			}

			if (validDataset) {
				return validDataset;
			}

			if (typedDatasets) {
				if (typedDatasets.length === 1) {
					return typedDatasets[0]!;
				}

				addIssue(this, "type", dataset, config, {
					issues: subIssues(typedDatasets),
				});

				// @ts-expect-error
				dataset.typed = true;
			} else if (untypedDatasets?.length === 1) {
				return untypedDatasets[0]!;
			} else {
				addIssue(this, "type", dataset, config, {
					issues: subIssues(untypedDatasets),
				});
			}

			return dataset as unknown as OutputDataset<
				unknown,
				UnionIssue<BaseIssue<unknown>> | BaseIssue<unknown>
			>;
		},
	};
}

export type UnionOptionsAsync = MaybeReadonly<
	(
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
	)[]
>;

export interface UnionSchemaAsync<
	Options extends UnionOptionsAsync,
	Message extends
		| ErrorMessage<UnionIssue<InferIssue<Options[number]>>>
		| undefined = undefined,
> extends BaseSchemaAsync<
		InferInput<Options[number]>,
		InferOutput<Options[number]>,
		UnionIssue<InferIssue<Options[number]>> | InferIssue<Options[number]>
	> {
	readonly type: "union";
	readonly reference: typeof union | typeof unionAsync;
	readonly options: Options;
	readonly message: Message;
}

export function unionAsync<const Options extends UnionOptionsAsync>(
	options: Options,
): UnionSchemaAsync<Options>;
export function unionAsync<
	const Options extends UnionOptionsAsync,
	const Message extends
		| ErrorMessage<UnionIssue<InferIssue<Options[number]>>>
		| undefined,
>(options: Options, message: Message): UnionSchemaAsync<Options, Message>;
export function unionAsync(
	options: UnionOptionsAsync,
	message?: ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined,
): UnionSchemaAsync<
	UnionOptionsAsync,
	ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined
> {
	return {
		kind: "schema",
		type: "union",
		reference: unionAsync,
		expects: joinExpects(
			options.map((option) => option.expects),
			"|",
		),
		async: true,
		options,
		message,
		get "~standard"() {
			return getStandardProps(this);
		},
		async "~run"(dataset, config) {
			let validDataset: SuccessDataset<unknown> | undefined;
			let typedDatasets:
				| PartialDataset<unknown, BaseIssue<unknown>>[]
				| undefined;
			let untypedDatasets: FailureDataset<BaseIssue<unknown>>[] | undefined;

			for (const schema of this.options) {
				const optionDataset = await schema["~run"](
					{ value: dataset.value },
					config,
				);

				if (optionDataset.typed) {
					if (optionDataset.issues) {
						if (typedDatasets) {
							typedDatasets.push(optionDataset);
						} else {
							typedDatasets = [optionDataset];
						}
					} else {
						validDataset = optionDataset;
						break;
					}
				} else {
					if (untypedDatasets) {
						untypedDatasets.push(optionDataset);
					} else {
						untypedDatasets = [optionDataset];
					}
				}
			}

			if (validDataset) {
				return validDataset;
			}

			if (typedDatasets) {
				if (typedDatasets.length === 1) {
					return typedDatasets[0]!;
				}

				addIssue(this, "type", dataset, config, {
					issues: subIssues(typedDatasets),
				});

				// @ts-expect-error
				dataset.typed = true;
			} else if (untypedDatasets?.length === 1) {
				return untypedDatasets[0]!;
			} else {
				addIssue(this, "type", dataset, config, {
					issues: subIssues(untypedDatasets),
				});
			}

			return dataset as unknown as OutputDataset<
				unknown,
				UnionIssue<BaseIssue<unknown>> | BaseIssue<unknown>
			>;
		},
	};
}
