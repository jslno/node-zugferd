import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import type { BaseMetadata } from "./metadata";
import type {
	BaseTransformation,
	BaseTransformationAsync,
} from "./transformation";
import type { BaseValidation, BaseValidationAsync } from "./validation";

export type PipeAction<TInput, TOutput, TIssue extends BaseIssue<unknown>> =
	| BaseValidation<TInput, TOutput, TIssue>
	| BaseTransformation<TInput, TOutput, TIssue>
	| BaseMetadata<TInput>;

export type PipeActionAsync<
	TInput,
	TOutput,
	TIssue extends BaseIssue<unknown>,
> =
	| BaseValidationAsync<TInput, TOutput, TIssue>
	| BaseTransformationAsync<TInput, TOutput, TIssue>;

export type PipeItem<TInput, TOutput, TIssue extends BaseIssue<unknown>> =
	| BaseSchema<TInput, TOutput, TIssue>
	| PipeAction<TInput, TOutput, TIssue>;

export type PipeItemAsync<TInput, TOutput, TIssue extends BaseIssue<unknown>> =
	| BaseSchemaAsync<TInput, TOutput, TIssue>
	| PipeActionAsync<TInput, TOutput, TIssue>;

export type SchemaWithoutPipe<
	TSchema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = TSchema & { pipe?: never };
