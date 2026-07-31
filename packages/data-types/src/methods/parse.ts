import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
} from "@node-zugferd/core/data-types";
import { ZugferdValidationError } from "@node-zugferd/core/error";
import type { InferIssue, InferOutput } from "../types";
import { DEFAULT_CONFIG } from "../utils/config";
import type { DataTypeContext } from "../context";
import { withContext } from "../context";

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
	config?:
		| (Config<InferIssue<Schema>> & {
				context?: DataTypeContext | undefined;
		  })
		| undefined,
): Promise<InferOutput<Schema>> {
	let { context, ...cfg } = config ?? {};
	if (Object.keys(cfg).length === 0) {
		cfg = DEFAULT_CONFIG as Config<InferIssue<Schema>>;
	}

	const run = () => schema["~run"]({ value: input }, cfg);

	const dataset = await (!context ? run() : withContext(context, run));
	if (dataset.issues) {
		throw new ZugferdValidationError(dataset.issues);
	}
	return dataset.value;
}
