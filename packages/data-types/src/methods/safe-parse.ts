import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
} from "@node-zugferd/core/data-types";
import type { InferIssue, InferOutput } from "../types";
import { DEFAULT_CONFIG } from "../utils/config";

export type SafeParseResult<
	Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> =
	| {
			readonly typed: true;
			readonly success: true;
			readonly output: InferOutput<Schema>;
			readonly issues: undefined;
	  }
	| {
			readonly typed: true;
			readonly success: false;
			readonly output: InferOutput<Schema>;
			readonly issues: [InferIssue<Schema>, ...InferIssue<Schema>[]];
	  }
	| {
			readonly typed: false;
			readonly success: false;
			readonly output: unknown;
			readonly issues: [InferIssue<Schema>, ...InferIssue<Schema>[]];
	  };

export function safeParse<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	input: unknown,
	config?: Config<InferIssue<Schema>> | undefined,
): SafeParseResult<Schema> {
	const dataset = schema["~run"](
		{ value: input },
		config ?? (DEFAULT_CONFIG as Config<InferIssue<Schema>>),
	);
	return {
		typed: dataset.typed,
		success: !dataset.issues,
		output: dataset.value,
		issues: dataset.issues,
	} as SafeParseResult<Schema>;
}

export async function safeParseAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	input: unknown,
	config?: Config<InferIssue<Schema>> | undefined,
): Promise<SafeParseResult<Schema>> {
	const dataset = await schema["~run"](
		{ value: input },
		config ?? (DEFAULT_CONFIG as Config<InferIssue<Schema>>),
	);
	return {
		typed: dataset.typed,
		success: !dataset.issues,
		output: dataset.value,
		issues: dataset.issues,
	} as SafeParseResult<Schema>;
}
