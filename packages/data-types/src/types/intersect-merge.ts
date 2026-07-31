import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import type { MarkOptional } from "@node-zugferd/core/types";
import type { InferInput, InferOutput } from "./infer";

type SchemaLike =
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;

type IsReadonlyArray<T> = [T] extends [readonly (infer _Item)[]] ? true : false;

type IsPlainObject<T> =
	IsReadonlyArray<T> extends true
		? false
		: [T] extends [Record<string, unknown>]
			? true
			: false;

type MergeObjectToArray<A, Item> =
	MergeIntersectInputs<A, Item> extends infer Merged
		? readonly Merged[]
		: never;

type MergeIntersectPropertyCore<A, B> =
	IsReadonlyArray<B> extends true
		? B extends readonly (infer BItem)[]
			? IsReadonlyArray<A> extends true
				? A extends readonly (infer AItem)[]
					? readonly MergeIntersectInputs<AItem, BItem>[]
					: A & B
				: MergeObjectToArray<A, BItem>
			: A & B
		: IsReadonlyArray<A> extends true
			? A extends readonly (infer AItem)[]
				? readonly MergeIntersectInputs<AItem, B>[]
				: A & B
			: IsPlainObject<A> extends true
				? IsPlainObject<B> extends true
					? MergeIntersectInputs<A, B>
					: A & B
				: A & B;

type IntersectLikeSchema = {
	readonly type: "intersect";
	readonly options: readonly unknown[];
};

export type FlattenIntersectOptions<TOptions extends readonly unknown[]> =
	TOptions extends readonly [
		infer Head,
		...infer Rest extends readonly unknown[],
	]
		? Head extends IntersectLikeSchema
			? readonly [
					...FlattenIntersectOptions<Head["options"]>,
					...FlattenIntersectOptions<Rest>,
				]
			: readonly [Head, ...FlattenIntersectOptions<Rest>]
		: readonly [];

export type FoldIntersectInputs<TOptions extends readonly unknown[]> =
	TOptions extends readonly [infer First]
		? First extends SchemaLike
			? InferInput<First>
			: unknown
		: TOptions extends readonly [
					infer First,
					...infer Rest extends readonly unknown[],
				]
			? First extends SchemaLike
				? MergeIntersectInputs<InferInput<First>, FoldIntersectInputs<Rest>>
				: unknown
			: unknown;

export type FoldIntersectOutputs<TOptions extends readonly unknown[]> =
	TOptions extends readonly [infer First]
		? First extends SchemaLike
			? InferOutput<First>
			: unknown
		: TOptions extends readonly [
					infer First,
					...infer Rest extends readonly unknown[],
				]
			? First extends SchemaLike
				? MergeIntersectOutputs<InferOutput<First>, FoldIntersectOutputs<Rest>>
				: unknown
			: unknown;

type MergeIntersectProperty<A, B> = [A] extends [never]
	? B
	: [B] extends [never]
		? A
		:
				| MergeIntersectPropertyCore<
						Exclude<A, null | undefined>,
						Exclude<B, null | undefined>
				  >
				// Keep nullish only when both sides still allow it.
				| (Extract<A, null | undefined> & Extract<B, null | undefined>);

type IsOptionalKey<T, K extends PropertyKey> = K extends keyof T
	? {} extends Pick<T, K>
		? true
		: false
	: false;

type IsNullishKey<T, K extends PropertyKey> = K extends keyof T
	? undefined extends T[K]
		? true
		: null extends T[K]
			? true
			: false
	: false;

type IsOptionalAfterMerge<Parent, Local, K extends keyof Local> =
	undefined extends MergeProfileProperty<
		K extends keyof Parent ? Parent[K] : never,
		Local[K]
	>
		? true
		: null extends MergeProfileProperty<
					K extends keyof Parent ? Parent[K] : never,
					Local[K]
				>
			? true
			: false;

type OptionalProfileMergeKeys<Parent, Local> = {
	[K in keyof Local]-?: IsOptionalKey<Parent, K> extends true
		? IsOptionalKey<Local, K> extends true
			? K
			: never
		: IsOptionalKey<Local, K> extends true
			? K
			: K extends keyof Parent
				? IsOptionalAfterMerge<Parent, Local, K> extends true
					? K
					: never
				: never;
}[keyof Local];

type OptionalMergeKeys<A, B> = {
	[K in keyof A | keyof B]-?: K extends keyof B
		? K extends keyof A
			? IsOptionalKey<B, K> extends true
				? IsOptionalKey<A, K> extends true
					? K
					: never
				: never
			: IsOptionalKey<B, K> extends true
				? K
				: never
		: IsOptionalKey<A, K> extends true
			? K
			: never;
}[keyof A | keyof B];

type MergeIntersectProperties<A, B> = {
	[K in keyof A | keyof B]: MergeIntersectProperty<
		K extends keyof A ? A[K] : unknown,
		K extends keyof B ? B[K] : unknown
	>;
};

export type MergeIntersectInputs<A, B> = MarkOptional<
	MergeIntersectProperties<A, B>,
	OptionalMergeKeys<A, B>
>;

type MergeLocalProperties<Parent, Local> = {
	[K in keyof Local]: MergeIntersectProperty<
		K extends keyof Parent ? Parent[K] : unknown,
		Local[K]
	>;
};

export type MergeLocalIntoParent<Parent, Local> = Omit<Parent, keyof Local> &
	MarkOptional<
		MergeLocalProperties<Parent, Local>,
		Extract<OptionalMergeKeys<Parent, Local>, keyof Local>
	>;

type NeedsStructuralMergeCore<A, B> =
	IsReadonlyArray<B> extends true
		? true
		: IsReadonlyArray<A> extends true
			? true
			: false;

type NeedsStructuralMerge<A, B> = NeedsStructuralMergeCore<
	Exclude<A, null | undefined>,
	Exclude<B, null | undefined>
>;

type MergeProfilePropertyCore<A, B> =
	IsPlainObject<A> extends true
		? IsPlainObject<B> extends true
			? MergeProfileInput<A, B>
			: A & B
		: A & B;

type MergeProfileProperty<A, B> = [A] extends [never]
	? B
	: [B] extends [never]
		? A
		: NeedsStructuralMerge<A, B> extends true
			?
					| MergeIntersectPropertyCore<
							Exclude<A, null | undefined>,
							Exclude<B, null | undefined>
					  >
					// Local wins: parent nullish is dropped unless local keeps it.
					| Extract<B, null | undefined>
			:
					| MergeProfilePropertyCore<
							Exclude<A, null | undefined>,
							Exclude<B, null | undefined>
					  >
					| Extract<B, null | undefined>;

type MergeProfileProperties<Parent, Local> = {
	[K in keyof Local]: MergeProfileProperty<
		K extends keyof Parent ? Parent[K] : unknown,
		Local[K]
	>;
};

/**
 * Lazy profile input merge: walks local keys only and uses structural merges
 * (object→array, array element shape) without fully expanding huge object trees.
 */
export type MergeProfileInput<Parent, Local> = Omit<Parent, keyof Local> &
	MarkOptional<
		MergeProfileProperties<Parent, Local>,
		OptionalProfileMergeKeys<Parent, Local>
	>;

export type MergeIntersectOutputs<A, B> = MergeIntersectInputs<A, B>;
