import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	Config,
	OutputDataset,
	UnknownDataset,
} from "@node-zugferd/core/data-types";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { InferInput, InferIssue, InferOutput } from "../types/infer";
import type {
	PipeAction,
	PipeActionAsync,
	PipeItem,
	PipeItemAsync,
} from "../types/pipe";
import { getStandardProps } from "../utils/standard-props";

type FirstTupleItem<TTuple extends readonly [unknown, ...unknown[]]> =
	TTuple[0];
type LastTupleItem<TTuple extends readonly [unknown, ...unknown[]]> =
	TTuple[TTuple extends readonly [unknown, ...infer TRest]
		? TRest["length"]
		: never];

export type SchemaWithPipe<
	Pipe extends readonly [
		BaseSchema<unknown, unknown, BaseIssue<unknown>>,
		...PipeItem<any, unknown, BaseIssue<unknown>>[],
	],
> = Omit<FirstTupleItem<Pipe>, "pipe" | "~standard" | "~run" | "~types"> & {
	readonly pipe: Pipe;
	readonly "~standard": StandardSchemaV1<
		InferInput<FirstTupleItem<Pipe>>,
		InferOutput<LastTupleItem<Pipe>>
	>["~standard"];
	readonly "~run": (
		dataset: UnknownDataset,
		config: Config<BaseIssue<unknown>>,
	) => OutputDataset<
		InferOutput<LastTupleItem<Pipe>>,
		InferIssue<Pipe[number]>
	>;
	readonly "~types"?:
		| {
				readonly input: InferInput<FirstTupleItem<Pipe>>;
				readonly output: InferOutput<LastTupleItem<Pipe>>;
				readonly issue: InferIssue<Pipe[number]>;
		  }
		| undefined;
};

export type SchemaWithPipeAsync<
	Pipe extends readonly [
		(
			| BaseSchema<unknown, unknown, BaseIssue<unknown>>
			| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
		),
		...(
			| PipeItem<any, unknown, BaseIssue<unknown>>
			| PipeItemAsync<any, unknown, BaseIssue<unknown>>
		)[],
	],
> = Omit<
	FirstTupleItem<Pipe>,
	"async" | "pipe" | "~standard" | "~run" | "~types"
> & {
	readonly pipe: Pipe;
	readonly async: true;
	readonly "~standard": StandardSchemaV1<
		InferInput<FirstTupleItem<Pipe>>,
		InferOutput<LastTupleItem<Pipe>>
	>["~standard"];
	readonly "~run": (
		dataset: UnknownDataset,
		config: Config<BaseIssue<unknown>>,
	) => Promise<
		OutputDataset<InferOutput<LastTupleItem<Pipe>>, InferIssue<Pipe[number]>>
	>;
	readonly "~types"?:
		| {
				readonly input: InferInput<FirstTupleItem<Pipe>>;
				readonly output: InferOutput<LastTupleItem<Pipe>>;
				readonly issue: InferIssue<Pipe[number]>;
		  }
		| undefined;
};
export function pipe<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>,
): SchemaWithPipe<readonly [Schema, Item1]>;
export function pipe<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item2 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>,
	item2:
		| Item2
		| PipeAction<InferOutput<Schema>, InferOutput<Item2>, InferIssue<Item2>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2]>;
export function pipe<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item2 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item3 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>,
	item2:
		| Item2
		| PipeAction<InferOutput<Schema>, InferOutput<Item2>, InferIssue<Item2>>,
	item3:
		| Item3
		| PipeAction<InferOutput<Schema>, InferOutput<Item3>, InferIssue<Item3>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3]>;
export function pipe<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item2 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item3 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item4 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>,
	item2:
		| Item2
		| PipeAction<InferOutput<Schema>, InferOutput<Item2>, InferIssue<Item2>>,
	item3:
		| Item3
		| PipeAction<InferOutput<Schema>, InferOutput<Item3>, InferIssue<Item3>>,
	item4:
		| Item4
		| PipeAction<InferOutput<Schema>, InferOutput<Item4>, InferIssue<Item4>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4]>;
export function pipe<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item2 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item3 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item4 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
	const Item5 extends PipeItem<
		InferOutput<Schema>,
		unknown,
		BaseIssue<unknown>
	>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>,
	item2:
		| Item2
		| PipeAction<InferOutput<Schema>, InferOutput<Item2>, InferIssue<Item2>>,
	item3:
		| Item3
		| PipeAction<InferOutput<Schema>, InferOutput<Item3>, InferIssue<Item3>>,
	item4:
		| Item4
		| PipeAction<InferOutput<Schema>, InferOutput<Item4>, InferIssue<Item4>>,
	item5:
		| Item5
		| PipeAction<InferOutput<Schema>, InferOutput<Item5>, InferIssue<Item5>>,
): SchemaWithPipe<readonly [Schema, Item1, Item2, Item3, Item4, Item5]>;
export function pipe<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Items extends readonly PipeItem<
		InferOutput<Schema>,
		InferOutput<Schema>,
		BaseIssue<unknown>
	>[],
>(schema: Schema, ...items: Items): SchemaWithPipe<readonly [Schema, ...Items]>;
export function pipe<
	const Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const Items extends readonly PipeItem<unknown, unknown, BaseIssue<unknown>>[],
>(...pipe: [Schema, ...Items]): SchemaWithPipe<readonly [Schema, ...Items]> {
	return {
		...pipe[0],
		pipe,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			for (const item of pipe) {
				// Exclude metadata items from execution
				if (item.kind !== "metadata") {
					if (
						dataset.issues &&
						(item.kind === "schema" || item.kind === "transformation")
					) {
						dataset.typed = false;
						break;
					}

					if (
						!dataset.issues ||
						(!config.abortEarly && !config.abortPipeEarly)
					) {
						// @ts-expect-error
						dataset = item["~run"](dataset, config);
					}
				}
			}

			return dataset as unknown as OutputDataset<unknown, BaseIssue<unknown>>;
		},
	};
}

export function pipeAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends
		| PipeItem<InferOutput<Schema>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Schema>, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>
		| PipeActionAsync<
				InferOutput<Schema>,
				InferOutput<Item1>,
				InferIssue<Item1>
		  >,
): SchemaWithPipeAsync<readonly [Schema, Item1]>;
export function pipeAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends
		| PipeItem<InferOutput<Schema>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Schema>, unknown, BaseIssue<unknown>>,
	const Item2 extends
		| PipeItem<InferOutput<Item1>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item1>, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>
		| PipeActionAsync<
				InferOutput<Schema>,
				InferOutput<Item1>,
				InferIssue<Item1>
		  >,
	item2:
		| Item2
		| PipeAction<InferOutput<Item1>, InferOutput<Item2>, InferIssue<Item2>>
		| PipeActionAsync<
				InferOutput<Item1>,
				InferOutput<Item2>,
				InferIssue<Item2>
		  >,
): SchemaWithPipeAsync<readonly [Schema, Item1, Item2]>;
export function pipeAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends
		| PipeItem<InferOutput<Schema>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Schema>, unknown, BaseIssue<unknown>>,
	const Item2 extends
		| PipeItem<InferOutput<Item1>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item1>, unknown, BaseIssue<unknown>>,
	const Item3 extends
		| PipeItem<InferOutput<Item2>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item2>, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>
		| PipeActionAsync<
				InferOutput<Schema>,
				InferOutput<Item1>,
				InferIssue<Item1>
		  >,
	item2:
		| Item2
		| PipeAction<InferOutput<Item1>, InferOutput<Item2>, InferIssue<Item2>>
		| PipeActionAsync<
				InferOutput<Item1>,
				InferOutput<Item2>,
				InferIssue<Item2>
		  >,
	item3:
		| Item3
		| PipeAction<InferOutput<Item2>, InferOutput<Item3>, InferIssue<Item3>>
		| PipeActionAsync<
				InferOutput<Item2>,
				InferOutput<Item3>,
				InferIssue<Item3>
		  >,
): SchemaWithPipeAsync<readonly [Schema, Item1, Item2, Item3]>;
export function pipeAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends
		| PipeItem<InferOutput<Schema>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Schema>, unknown, BaseIssue<unknown>>,
	const Item2 extends
		| PipeItem<InferOutput<Item1>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item1>, unknown, BaseIssue<unknown>>,
	const Item3 extends
		| PipeItem<InferOutput<Item2>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item2>, unknown, BaseIssue<unknown>>,
	const Item4 extends
		| PipeItem<InferOutput<Item3>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item3>, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>
		| PipeActionAsync<
				InferOutput<Schema>,
				InferOutput<Item1>,
				InferIssue<Item1>
		  >,
	item2:
		| Item2
		| PipeAction<InferOutput<Item1>, InferOutput<Item2>, InferIssue<Item2>>
		| PipeActionAsync<
				InferOutput<Item1>,
				InferOutput<Item2>,
				InferIssue<Item2>
		  >,
	item3:
		| Item3
		| PipeAction<InferOutput<Item2>, InferOutput<Item3>, InferIssue<Item3>>
		| PipeActionAsync<
				InferOutput<Item2>,
				InferOutput<Item3>,
				InferIssue<Item3>
		  >,
	item4:
		| Item4
		| PipeAction<InferOutput<Item3>, InferOutput<Item4>, InferIssue<Item4>>
		| PipeActionAsync<
				InferOutput<Item3>,
				InferOutput<Item4>,
				InferIssue<Item4>
		  >,
): SchemaWithPipeAsync<readonly [Schema, Item1, Item2, Item3, Item4]>;
export function pipeAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Item1 extends
		| PipeItem<InferOutput<Schema>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Schema>, unknown, BaseIssue<unknown>>,
	const Item2 extends
		| PipeItem<InferOutput<Item1>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item1>, unknown, BaseIssue<unknown>>,
	const Item3 extends
		| PipeItem<InferOutput<Item2>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item2>, unknown, BaseIssue<unknown>>,
	const Item4 extends
		| PipeItem<InferOutput<Item3>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item3>, unknown, BaseIssue<unknown>>,
	const Item5 extends
		| PipeItem<InferOutput<Item4>, unknown, BaseIssue<unknown>>
		| PipeItemAsync<InferOutput<Item4>, unknown, BaseIssue<unknown>>,
>(
	schema: Schema,
	item1:
		| Item1
		| PipeAction<InferOutput<Schema>, InferOutput<Item1>, InferIssue<Item1>>
		| PipeActionAsync<
				InferOutput<Schema>,
				InferOutput<Item1>,
				InferIssue<Item1>
		  >,
	item2:
		| Item2
		| PipeAction<InferOutput<Item1>, InferOutput<Item2>, InferIssue<Item2>>
		| PipeActionAsync<
				InferOutput<Item1>,
				InferOutput<Item2>,
				InferIssue<Item2>
		  >,
	item3:
		| Item3
		| PipeAction<InferOutput<Item2>, InferOutput<Item3>, InferIssue<Item3>>
		| PipeActionAsync<
				InferOutput<Item2>,
				InferOutput<Item3>,
				InferIssue<Item3>
		  >,
	item4:
		| Item4
		| PipeAction<InferOutput<Item3>, InferOutput<Item4>, InferIssue<Item4>>
		| PipeActionAsync<
				InferOutput<Item3>,
				InferOutput<Item4>,
				InferIssue<Item4>
		  >,
	item5:
		| Item5
		| PipeAction<InferOutput<Item4>, InferOutput<Item5>, InferIssue<Item5>>
		| PipeActionAsync<
				InferOutput<Item4>,
				InferOutput<Item5>,
				InferIssue<Item5>
		  >,
): SchemaWithPipeAsync<readonly [Schema, Item1, Item2, Item3, Item4, Item5]>;
export function pipeAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Items extends readonly (
		| PipeItem<InferOutput<Schema>, InferOutput<Schema>, BaseIssue<unknown>>
		| PipeItemAsync<
				InferOutput<Schema>,
				InferOutput<Schema>,
				BaseIssue<unknown>
		  >
	)[],
>(
	schema: Schema,
	...items: Items
): SchemaWithPipeAsync<readonly [Schema, ...Items]>;
export function pipeAsync<
	const Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const Items extends readonly (
		| PipeItem<unknown, unknown, BaseIssue<unknown>>
		| PipeItemAsync<unknown, unknown, BaseIssue<unknown>>
	)[],
>(
	...pipe: [Schema, ...Items]
): SchemaWithPipeAsync<readonly [Schema, ...Items]> {
	return {
		...pipe[0],
		pipe,
		async: true,
		get "~standard"() {
			return getStandardProps(this);
		},
		async "~run"(dataset, config) {
			for (const item of pipe) {
				// Exclude metadata items from execution
				if (item.kind !== "metadata") {
					if (
						dataset.issues &&
						(item.kind === "schema" || item.kind === "transformation")
					) {
						dataset.typed = false;
						break;
					}

					if (
						dataset.issues ||
						(!config.abortEarly && !config.abortPipeEarly)
					) {
						// @ts-expect-error
						dataset = await item["~run"](dataset, config);
					}
				}
			}
			return dataset as unknown as OutputDataset<unknown, BaseIssue<unknown>>;
		},
	};
}
