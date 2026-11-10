import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
	SuccessDataset,
} from "@node-zugferd/core/data-types";
import { getDefault } from "../methods/get-default";
import type { Default, DefaultAsync, DefaultValue } from "../types/default";
import type { InferInput, InferIssue, InferOutput } from "../types/infer";
import { getStandardProps } from "../utils/standard-props";

export type InferNullishOutput<
	Wrapped extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	TDefault extends DefaultAsync<Wrapped, null | undefined>,
> = undefined extends TDefault
	? InferOutput<Wrapped> | null | undefined
	: InferOutput<Wrapped> | Extract<DefaultValue<TDefault>, null | undefined>;

export interface NullishSchema<
	Wrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	TDefault extends Default<Wrapped, null | undefined>,
> extends BaseSchema<
		InferInput<Wrapped> | null | undefined,
		InferNullishOutput<Wrapped, TDefault>,
		InferIssue<Wrapped>
	> {
	readonly type: "nullish";
	readonly reference: typeof nullish;
	readonly expects: `(${Wrapped["expects"]} | null | undefined)`;
	readonly wrapped: Wrapped;
	readonly default: TDefault;
}

export interface NullishSchemaAsync<
	Wrapped extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	TDefault extends DefaultAsync<Wrapped, null | undefined>,
> extends BaseSchemaAsync<
		InferInput<Wrapped> | null | undefined,
		InferNullishOutput<Wrapped, TDefault>,
		InferIssue<Wrapped>
	> {
	readonly type: "nullish";
	readonly reference: typeof nullishAsync;
	readonly expects: `(${Wrapped["expects"]} | null | undefined)`;
	readonly wrapped: Wrapped;
	readonly default: TDefault;
}

export function nullish<
	const Wrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(wrapped: Wrapped): NullishSchema<Wrapped, undefined>;
export function nullish<
	const Wrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	const TDefault extends Default<Wrapped, null | undefined>,
>(wrapped: Wrapped, defaultValue: TDefault): NullishSchema<Wrapped, TDefault>;
export function nullish(
	wrapped: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
	defaultValue?: unknown,
): NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> {
	return {
		kind: "schema",
		type: "nullish",
		reference: nullish,
		expects: `(${wrapped.expects} | null | undefined)`,
		async: false,
		wrapped,
		default: defaultValue,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (dataset.value === null || dataset.value === undefined) {
				if (this.default !== undefined) {
					dataset.value = getDefault(this, dataset, config);
				}

				if (dataset.value === null || dataset.value === undefined) {
					// @ts-expect-error
					dataset.typed = true;
					return dataset as unknown as SuccessDataset<unknown>;
				}
			}

			return this.wrapped["~run"](dataset, config);
		},
	};
}

export function nullishAsync<
	const Wrapped extends BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(wrapped: Wrapped): NullishSchemaAsync<Wrapped, undefined>;
export function nullishAsync<
	const Wrapped extends BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	const TDefault extends DefaultAsync<Wrapped, null | undefined>,
>(
	wrapped: Wrapped,
	defaultValue: TDefault,
): NullishSchemaAsync<Wrapped, TDefault>;
export function nullishAsync(
	wrapped: BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	defaultValue?: unknown,
): NullishSchemaAsync<
	BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	unknown
> {
	return {
		kind: "schema",
		type: "nullish",
		reference: nullishAsync,
		expects: `(${wrapped.expects} | null | undefined)`,
		async: true,
		wrapped,
		default: defaultValue,
		get "~standard"() {
			return getStandardProps(this);
		},
		async "~run"(dataset, config) {
			if (dataset.value === null || dataset.value === undefined) {
				if (this.default !== undefined) {
					dataset.value = await getDefault(this, dataset, config);
				}

				if (dataset.value === null || dataset.value === undefined) {
					// @ts-expect-error
					dataset.typed = true;
					return dataset as unknown as SuccessDataset<unknown>;
				}
			}

			return this.wrapped["~run"](dataset, config);
		},
	};
}
