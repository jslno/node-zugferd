import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";

export function unwrap<
	TSchema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(schema: TSchema): TSchema extends { wrapped: infer R } ? R : TSchema;
export function unwrap(
	schema:
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
):
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> {
	if ("wrapped" in schema) {
		return schema.wrapped as any;
	}
	return schema;
}
