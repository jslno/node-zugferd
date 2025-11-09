import type { StandardSchemaV1 } from ".";
import type { LiteralString, PrettifyDeep } from "./helper";

export type FieldType =
	| StandardSchemaV1
	| "object"
	| "object[]"
	| LiteralString[];

export type FieldAttributes<T extends FieldType = FieldType> = {
	key?: LiteralString | undefined;
	required?: boolean | undefined;
	shape?: (T extends "object" | "object[]" ? Schema : never) | undefined;
};

export type Field<T extends FieldType = FieldType> = {
	type: T;
} & FieldAttributes<T>;

export type Schema = {
	[key: string]: Field;
};

type InferValueType<
	T extends FieldType,
	U extends "input" | "output",
> = T extends StandardSchemaV1
	? U extends "output"
		? StandardSchemaV1.InferOutput<T>
		: StandardSchemaV1.InferInput<T>
	: T extends Array<any>
		? T[number]
		: never;

type IsFieldOptional<
	F extends Field,
	T extends "input" | "output",
> = F["required"] extends false
	? true
	: F["type"] extends StandardSchemaV1<infer I, infer O>
		? T extends "output"
			? undefined extends O
				? true
				: false
			: undefined extends I
				? true
				: false
		: F["type"] extends "object"
			? F["shape"] extends Schema
				? AllOptional<F["shape"], T>
				: false
			: F["type"] extends "object[]"
				? F["shape"] extends Schema
					? AllOptional<F["shape"], T>
					: false
				: false;

type AllOptional<S extends Schema, T extends "input" | "output"> = {
	[K in keyof S]: IsFieldOptional<S[K], T> extends true ? never : K;
}[keyof S] extends never
	? true
	: false;

export type InferSchema<
	S extends Schema,
	T extends "input" | "output" = "input",
> = PrettifyDeep<
	{
		[K in keyof S as IsFieldOptional<S[K], T> extends true
			? K
			: never]?: InferField<S[K], T>;
	} & {
		[K in keyof S as IsFieldOptional<S[K], T> extends true
			? never
			: K]: InferField<S[K], T>;
	}
>;

export type InferField<
	F extends Field,
	T extends "input" | "output" = "input",
> = F["type"] extends "object"
	? F["shape"] extends Schema
		? InferSchema<F["shape"], T>
		: {}
	: F["type"] extends "object[]"
		? F["shape"] extends Schema
			? InferSchema<F["shape"], T>[]
			: []
		: InferValueType<F["type"], T>;
