import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
} from "@node-zugferd/core/data-types";
import { ZugferdValidationError } from "@node-zugferd/core/error";
import type { InferIssue, InferOutput } from "../types";
import { DEFAULT_CONFIG } from "../utils/config";

export function parse<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	input: unknown,
	config?: Config<InferIssue<Schema>>,
): InferOutput<Schema> {
	const dataset = schema["~run"](
		{ value: input },
		config ?? (DEFAULT_CONFIG as Config<InferIssue<Schema>>),
	);
	if (dataset.issues) {
		throw new ZugferdValidationError(dataset.issues);
	}
	return dataset.value;
}

export async function parseAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	input: unknown,
	config?: Config<InferIssue<Schema>> | undefined,
): Promise<InferOutput<Schema>> {
	const dataset = await schema["~run"](
		{ value: input },
		config ?? (DEFAULT_CONFIG as Config<InferIssue<Schema>>),
	);
	if (dataset.issues) {
		throw new ZugferdValidationError(dataset.issues);
	}
	return dataset.value;
}
