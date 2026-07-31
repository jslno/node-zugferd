import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
} from "@node-zugferd/core/data-types";
import type { InferIssue, InferOutput } from "../types";
import { DEFAULT_CONFIG } from "../utils/config";
import type { DataTypeContext } from "../context";
import { withContext } from "../context";

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
	config?:
		| (Config<InferIssue<Schema>> & {
				context?: DataTypeContext | undefined;
		  })
		| undefined,
): Promise<SafeParseResult<Schema>> {
	let { context, ...cfg } = config ?? {};
	if (Object.keys(cfg).length === 0) {
		cfg = DEFAULT_CONFIG as Config<InferIssue<Schema>>;
	}

	const run = () => schema["~run"]({ value: input }, cfg);

	const dataset = await (!context ? run() : withContext(context, run));
	return {
		typed: dataset.typed,
		success: !dataset.issues,
		output: dataset.value,
		issues: dataset.issues,
	} as SafeParseResult<Schema>;
}
