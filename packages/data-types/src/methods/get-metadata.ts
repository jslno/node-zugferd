import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import type { Merge, Prettify } from "@node-zugferd/core/types";
import type { MetadataAction } from "../actions/metadata";
import type { PipeItem, PipeItemAsync } from "../types/pipe";
import type { SchemaWithPipe, SchemaWithPipeAsync } from "./pipe";

type Schema =
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
	| SchemaWithPipe<
			readonly [
				BaseSchema<unknown, unknown, BaseIssue<unknown>>,
				...(
					| PipeItem<any, unknown, BaseIssue<unknown>>
					| MetadataAction<unknown, Record<string, unknown>>
				)[],
			]
	  >
	| SchemaWithPipeAsync<
			readonly [
				(
					| BaseSchema<unknown, unknown, BaseIssue<unknown>>
					| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
				),
				...(
					| PipeItem<any, unknown, BaseIssue<unknown>>
					| PipeItemAsync<any, unknown, BaseIssue<unknown>>
					| MetadataAction<unknown, Record<string, unknown>>
				)[],
			]
	  >;

type BasicPipeItem =
	| PipeItem<any, unknown, BaseIssue<unknown>>
	| PipeItemAsync<any, unknown, BaseIssue<unknown>>
	| MetadataAction<unknown, Record<string, unknown>>;

type RecursiveMerge<
	RootPipe extends readonly BasicPipeItem[],
	CollectedMetadata extends Record<string, unknown> = {},
> = RootPipe extends readonly [
	infer TFirstItem,
	...infer TPipeRest extends readonly BasicPipeItem[],
]
	? TFirstItem extends
			| SchemaWithPipe<infer TNestedPipe>
			| SchemaWithPipeAsync<infer TNestedPipe>
		? RecursiveMerge<TPipeRest, RecursiveMerge<TNestedPipe, CollectedMetadata>>
		: TFirstItem extends MetadataAction<unknown, infer TCurrentMetadata>
			? RecursiveMerge<TPipeRest, Merge<CollectedMetadata, TCurrentMetadata>>
			: RecursiveMerge<TPipeRest, CollectedMetadata>
	: CollectedMetadata;

export type InferMetadata<TSchema extends Schema> =
	BaseSchema<any, any, any> extends TSchema
		? Record<string, unknown>
		: BaseSchemaAsync<any, any, any> extends TSchema
			? Record<string, unknown>
			: TSchema extends
						| SchemaWithPipe<infer TPipe>
						| SchemaWithPipeAsync<infer TPipe>
				? Prettify<RecursiveMerge<TPipe>>
				: {};

export function getMetadata<const S extends Schema>(
	schema: S,
): InferMetadata<S> {
	const result = {};
	const depthFirstMerge = (schema: Schema): void => {
		if ("pipe" in schema) {
			for (const item of schema.pipe) {
				if (item.kind === "schema" && "pipe" in item) {
					depthFirstMerge(item);
				} else if (item.kind === "metadata" && item.type === "metadata") {
					// @ts-expect-error
					Object.assign(result, item.metadata);
				}
			}
		}
	};

	depthFirstMerge(schema);
	return result as InferMetadata<S>;
}
