import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
} from "@node-zugferd/core/data-types";
import type { MaybePromise } from "@node-zugferd/core/types";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { InferInput, InferIssue, InferOutput } from "../types/infer";
import { DEFAULT_CONFIG } from "./config";

const cache = new WeakMap<
	object,
	StandardSchemaV1<unknown, unknown>["~standard"]
>();

export function getStandardProps<
	Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(
	context: Schema,
): StandardSchemaV1<InferInput<Schema>, InferOutput<Schema>>["~standard"] {
	let cached = cache.get(context);
	if (!cached) {
		cached = {
			version: 1,
			vendor: "node-zugferd",
			validate(value) {
				return context["~run"](
					{ value },
					DEFAULT_CONFIG as Config<InferIssue<Schema>>,
				) as MaybePromise<StandardSchemaV1.Result<InferOutput<Schema>>>;
			},
		};
		cache.set(context, cached);
	}
	return cached as StandardSchemaV1<
		InferInput<Schema>,
		InferOutput<Schema>
	>["~standard"];
}
