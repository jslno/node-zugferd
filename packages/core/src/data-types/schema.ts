import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { Config } from "./config";
import type { OutputDataset, UnknownDataset } from "./dataset";
import type { BaseIssue } from "./issue";

export interface BaseSchema<Input, Output, Issue extends BaseIssue<unknown>>
	extends Readonly<StandardSchemaV1<Input, Output>> {
	readonly kind: "schema";
	readonly type: string;
	readonly reference: (
		...args: any[]
	) => BaseSchema<unknown, unknown, BaseIssue<unknown>>;
	readonly expects: string;
	readonly async: false;
	readonly "~run": (
		dataset: UnknownDataset,
		config: Config<BaseIssue<unknown>>,
	) => OutputDataset<Output, Issue>;
	readonly "~types"?:
		| {
				readonly input: Input;
				readonly output: Output;
				readonly issue: Issue;
		  }
		| undefined;
}

export interface BaseSchemaAsync<
	Input,
	Output,
	Issue extends BaseIssue<unknown>,
> extends Omit<
		BaseSchema<Input, Output, Issue>,
		"reference" | "async" | "~run"
	> {
	readonly reference: (
		...args: any[]
	) =>
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;
	readonly async: true;
	readonly "~run": (
		dataset: UnknownDataset,
		config: Config<BaseIssue<unknown>>,
	) => Promise<OutputDataset<Output, Issue>>;
}
