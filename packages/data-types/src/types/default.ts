import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
	UnknownDataset,
} from "@node-zugferd/core/data-types";
import type { MaybeDeepReadonly, MaybePromise } from "@node-zugferd/core/types";
import type { InferInput, InferIssue } from "./infer";

export type Default<
	Wrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	Input extends null | undefined,
> =
	| MaybeDeepReadonly<InferInput<Wrapped> | Input>
	| ((
			dataset?: UnknownDataset,
			config?: Config<InferIssue<Wrapped>>,
	  ) => MaybeDeepReadonly<InferInput<Wrapped> | Input>)
	| undefined;

export type DefaultAsync<
	Wrapped extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	Input extends null | undefined,
> =
	| MaybeDeepReadonly<InferInput<Wrapped> | Input>
	| ((
			dataset?: UnknownDataset,
			config?: Config<InferIssue<Wrapped>>,
	  ) => MaybePromise<MaybeDeepReadonly<InferInput<Wrapped> | Input>>)
	| undefined;

export type DefaultValue<
	TDefault extends
		| Default<
				BaseSchema<unknown, unknown, BaseIssue<unknown>>,
				null | undefined
		  >
		| DefaultAsync<
				| BaseSchema<unknown, unknown, BaseIssue<unknown>>
				| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
				null | undefined
		  >,
> =
	TDefault extends DefaultAsync<
		infer TWrapped extends
			| BaseSchema<unknown, unknown, BaseIssue<unknown>>
			| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
		infer TInput
	>
		? TDefault extends (
				dataset?: UnknownDataset,
				config?: Config<InferIssue<TWrapped>>,
			) => MaybePromise<MaybeDeepReadonly<InferInput<TWrapped> | TInput>>
			? Awaited<ReturnType<TDefault>>
			: TDefault
		: never;
