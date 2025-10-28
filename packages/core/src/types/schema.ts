import type { LiteralString, Prettify, PrettifyDeep, WithoutEmpty } from "./helper";
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

export type InferSchema<S extends Schema> = Prettify<WithoutEmpty<
	{
		[K in keyof S as S[K]["required"] extends false
			? K
			: never]?: S[K]["type"] extends "object"
			? S[K]["shape"] extends Schema
				? InferSchema<S[K]["shape"]>
				: {}
			: S[K]["type"] extends "object[]"
				? S[K]["shape"] extends Schema
					? InferSchema<S[K]["shape"]>[]
					: []
				: InferValueType<S[K]["type"]>;
	} & {
		[K in keyof S as S[K]["required"] extends false
			? never
			: K]: S[K]["type"] extends "object"
			? S[K]["shape"] extends Schema
				? InferSchema<S[K]["shape"]>
				: {}
			: S[K]["type"] extends "object[]"
				? S[K]["shape"] extends Schema
					? InferSchema<S[K]["shape"]>[]
					: []
				: InferValueType<S[K]["type"]>;
	}
, Record<string, any>>>;
