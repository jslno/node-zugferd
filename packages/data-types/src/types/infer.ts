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

export type InferInput<
	Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
		| BaseValidation<any, unknown, BaseIssue<unknown>>
		| BaseValidationAsync<any, unknown, BaseIssue<unknown>>
		| BaseTransformation<any, unknown, BaseIssue<unknown>>
		| BaseTransformationAsync<any, unknown, BaseIssue<unknown>>
		| BaseMetadata<any>,
> = NonNullable<Item["~types"]>["input"];

export type InferOutput<
	Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
		| BaseValidation<any, unknown, BaseIssue<unknown>>
		| BaseValidationAsync<any, unknown, BaseIssue<unknown>>
		| BaseTransformation<any, unknown, BaseIssue<unknown>>
		| BaseTransformationAsync<any, unknown, BaseIssue<unknown>>
		| BaseMetadata<any>,
> = NonNullable<Item["~types"]>["output"];

export type InferIssue<
	Item extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
		| BaseValidation<any, unknown, BaseIssue<unknown>>
		| BaseValidationAsync<any, unknown, BaseIssue<unknown>>
		| BaseTransformation<any, unknown, BaseIssue<unknown>>
		| BaseTransformationAsync<any, unknown, BaseIssue<unknown>>
		| BaseMetadata<any>,
> = NonNullable<Item["~types"]>["issue"];
