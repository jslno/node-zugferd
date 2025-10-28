import type { LiteralString, PrettifyDeep } from "./helper";
import type { StandardSchemaV1 } from ".";

export type FieldType =
	| StandardSchemaV1
	| "object"
	| "object[]"
	| LiteralString[];

export type FieldAttributes<T extends FieldType = FieldType> = {
	key?: LiteralString;
	required?: boolean;
	shape?: T extends "object" | "object[]" ? Schema : never;
};

export type Field<T extends FieldType = FieldType> = {
	type: T;
} & FieldAttributes<T>;

export type Schema = {
	[key: string]: Field;
};

export type InferValueType<T extends FieldType> = T extends StandardSchemaV1
	? StandardSchemaV1.InferInput<T>
	: T extends Array<any>
		? T[number]
		: never;

type IsFieldOptional<F extends Field> = F["required"] extends false
	? true
	: F["type"] extends StandardSchemaV1<infer I>
		? undefined extends I
			? true
			: false
		: F["type"] extends "object"
			? F["shape"] extends Schema
				? AllOptional<F["shape"]>
				: false
			: F["type"] extends "object[]"
				? F["shape"] extends Schema
					? AllOptional<F["shape"]>
					: false
				: false;

type AllOptional<S extends Schema> = {
	[K in keyof S]: IsFieldOptional<S[K]> extends true ? never : K;
}[keyof S] extends never
	? true
	: false;

export type InferSchema<S extends Schema> = PrettifyDeep<
	{
		[K in keyof S as IsFieldOptional<S[K]> extends true
			? K
			: never]?: InferField<S[K]>;
	} & {
		[K in keyof S as IsFieldOptional<S[K]> extends true
			? never
			: K]: InferField<S[K]>;
	}
>;

export type InferField<F extends Field> = F["type"] extends "object"
	? F["shape"] extends Schema
		? InferSchema<F["shape"]>
		: {}
	: F["type"] extends "object[]"
		? F["shape"] extends Schema
			? InferSchema<F["shape"]>[]
			: []
		: InferValueType<F["type"]>;
