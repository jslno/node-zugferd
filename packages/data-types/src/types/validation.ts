import type {
	BaseIssue,
	Config,
	OutputDataset,
} from "@node-zugferd/core/data-types";

export interface BaseValidation<
	Input,
	Output,
	Issue extends BaseIssue<unknown>,
> {
	readonly kind: "validation";
	readonly type: string;
	readonly reference: (
		...args: any[]
	) => BaseValidation<any, any, BaseIssue<unknown>>;
	readonly expects: string | null;
	readonly async: false;
	readonly "~run": (
		dataset: OutputDataset<Input, BaseIssue<unknown>>,
		config: Config<BaseIssue<unknown>>,
	) => OutputDataset<Output, BaseIssue<unknown> | Issue>;
	readonly "~types"?:
		| {
				readonly input: Input;
				readonly output: Output;
				readonly issue: Issue;
		  }
		| undefined;
}

export interface BaseValidationAsync<
	Input,
	Output,
	Issue extends BaseIssue<unknown>,
> extends Omit<
		BaseValidation<Input, Output, Issue>,
		"reference" | "async" | "~run"
	> {
	readonly reference: (
		...args: any[]
	) =>
		| BaseValidation<any, any, BaseIssue<unknown>>
		| BaseValidationAsync<any, any, BaseIssue<unknown>>;
	readonly async: true;
	readonly "~run": (
		dataset: OutputDataset<Input, BaseIssue<unknown>>,
		config: Config<BaseIssue<unknown>>,
	) => Promise<OutputDataset<Output, BaseIssue<unknown> | Issue>>;
}
