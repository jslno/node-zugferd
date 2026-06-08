import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
	UnknownDataset,
} from "@node-zugferd/core/data-types";
import type { NullishSchema, NullishSchemaAsync } from "../schemas/nullish";
import type { InferIssue } from "../types/infer";

type SchemaWithDefault = NullishSchema<
	BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	unknown
>;
type SchemaWithDefaultAsync = NullishSchemaAsync<
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	unknown
>;

export type InferDefault<
	Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
		| SchemaWithDefault
		| SchemaWithDefaultAsync,
> = Schema extends SchemaWithDefault | SchemaWithDefaultAsync
	? Schema["default"] extends (...args: any) => any
		? ReturnType<Schema["default"]>
		: Schema["default"]
	: undefined;

export function getDefault<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	dataset?: UnknownDataset | undefined,
	config?: Config<InferIssue<Schema>> | undefined,
) {
	// @ts-expect-error
	return typeof schema.default === "function"
		? // @ts-expect-error
			schema.default(dataset, config)
		: // @ts-expect-error
			schema.default;
}
