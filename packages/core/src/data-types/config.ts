import type { BaseIssue } from "./issue";

export type ErrorMessage<Issue extends BaseIssue<unknown>> =
	| ((issue: Issue) => string)
	| string;

export interface Config<Issue extends BaseIssue<unknown>> {
	readonly message?: ErrorMessage<Issue> | undefined;
	readonly abortEarly?: boolean | undefined;
	readonly abortPipeEarly?: boolean | undefined;
}
