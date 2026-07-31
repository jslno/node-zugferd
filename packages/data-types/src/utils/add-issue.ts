import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
	ErrorMessage,
	IssuePathItem,
	OutputDataset,
	UnknownDataset,
} from "@node-zugferd/core/data-types";
import type { InferIssue } from "../types/infer";
import type {
	BaseTransformation,
	BaseTransformationAsync,
} from "../types/transformation";
import type { BaseValidation, BaseValidationAsync } from "../types/validation";
import { stringify } from "./stringify";

type Context =
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
	| BaseValidation<any, unknown, BaseIssue<unknown>>
	| BaseValidationAsync<any, unknown, BaseIssue<unknown>>
	| BaseTransformation<any, unknown, BaseIssue<unknown>>
	| BaseTransformationAsync<any, unknown, BaseIssue<unknown>>;

interface Other<Ctx extends Context> {
	input?: unknown | undefined;
	expected?: string | undefined;
	received?: string | undefined;
	message?: ErrorMessage<InferIssue<Ctx>> | undefined;
	path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
	issues?: [BaseIssue<unknown>, ...BaseIssue<unknown>[]] | undefined;
}

export function addIssue<const Ctx extends Context>(
	context: Ctx & {
		expects?: string | null | undefined;
		requirement?: unknown | undefined;
		message?:
			| ErrorMessage<Extract<InferIssue<Ctx>, { type: Ctx["type"] }>>
			| undefined;
	},
	label: string,
	dataset: UnknownDataset | OutputDataset<unknown, BaseIssue<unknown>>,
	config: Config<InferIssue<Ctx>>,
	other?: Other<Ctx> | undefined,
): void {
	const input = other && "input" in other ? other.input : dataset.value;
	const expected = other?.expected ?? context.expects ?? null;
	const received = other?.received ?? stringify(input);

	const issue: BaseIssue<unknown> = {
		kind: context.kind,
		type: context.type,
		input,
		expected,
		received,
		message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
		requirement: context.requirement,
		path: other?.path,
		issues: other?.issues,
		abortEarly: config.abortEarly,
	};

	const isSchema = context.kind === "schema";

	const message = other?.message ?? context.message ?? config.message;

	if (message !== undefined) {
		// @ts-expect-error
		issue.message =
			typeof message === "function"
				? // @ts-expect-error
					message(issue)
				: message;
	}

	if (isSchema) {
		dataset.typed = false;
	}

	if (dataset.issues) {
		dataset.issues.push(issue);
	} else {
		// @ts-expect-error
		dataset.issues = [issue];
	}
}
