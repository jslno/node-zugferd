import type {
	BaseIssue,
	Config,
	OutputDataset,
	SuccessDataset,
} from "@node-zugferd/core/data-types";

export interface BaseTransformation<
	Input,
	Output,
	Issue extends BaseIssue<unknown>,
> {
	readonly kind: "transformation";
	readonly type: string;
	readonly reference: (
		...args: any[]
	) => BaseTransformation<any, any, BaseIssue<unknown>>;
	readonly async: false;
	readonly "~run": (
		dataset: SuccessDataset<Input>,
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

export interface BaseTransformationAsync<
	Input,
	Output,
	Issue extends BaseIssue<unknown>,
> extends Omit<
		BaseTransformation<Input, Output, Issue>,
		"reference" | "async" | "~run"
	> {
	readonly reference: (
		...args: any[]
	) =>
		| BaseTransformation<any, any, BaseIssue<unknown>>
		| BaseTransformationAsync<any, any, BaseIssue<unknown>>;
	readonly async: true;
	readonly "~run": (
		dataset: SuccessDataset<Input>,
		config: Config<BaseIssue<unknown>>,
	) => Promise<OutputDataset<Output, BaseIssue<unknown> | Issue>>;
}
