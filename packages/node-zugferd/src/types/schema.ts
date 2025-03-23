import { ZodSchema } from "zod";
import { type LiteralString } from "./helper";
import { type Profile } from "./profile";

export type FieldType =
	| "string"
	| "string[]"
	| "number"
	| "number[]"
	| "date"
	| "boolean"
	| "object"
	| "object[]"
	| "string | number"
	| "(string | number)[]"
	| Array<LiteralString>;

type Primitive = string | number | Date | null | undefined | object;

export type SchemaFieldConfig<T extends FieldType = FieldType> = {
	key?: string;
	defaultValue?: Primitive | (() => Primitive);
	validator?: ZodSchema;
	xpath?: string;
	group?: LiteralString;
	description?: string;
	required?: boolean;
	sibling?: T extends "object[]"
		? (data: any, groupIndicies: { [key: string]: number }) => any
		: never;
	shape?: T extends "object" | "object[]" ? Schema : never;
	additionalXml?: Record<string, string>;
	transform?: {
		input?: (val: any) => any;
		output?: (val: any) => any;
	};
};

export type SchemaField<T extends FieldType = FieldType> = {
	type: T;
} & SchemaFieldConfig<T>;

export type Schema = {
	[key: string]: SchemaField;
};

export type InferValueType<T extends FieldType> = T extends "string"
	? string
	: T extends "number"
		? number
		: T extends "string | number"
			? string | number
			: T extends "boolean"
				? boolean
				: T extends "date"
					? Date | string
					: T extends "string[]"
						? string[]
						: T extends "number[]"
							? number[]
							: T extends "(string | number)[]"
								? (string | number)[]
								: T extends Array<any>
									? T[number]
									: never;

type UnionToIntersection<U> = (U extends U ? (x: U) => void : never) extends (
	x: infer I,
) => void
	? I
	: never;

// The main type to infer the schema
export type InferSchema<P extends Profile> = InferRawSchema<P["schema"]> &
	(P["extends"] extends Profile[]
		? UnionToIntersection<InferSchemaHelper<P["extends"][number]>>
		: {});

// Helper type to recursively infer schema for each profile in `extends`
type InferSchemaHelper<E> = E extends Profile
	? InferRawSchema<E["schema"]> &
			(E["extends"] extends Profile[]
				? InferSchemaHelper<E["extends"][number]>
				: {})
	: {};

export type InferRawSchema<S extends Schema> = {
	[K in keyof S as S[K]["required"] extends false
		? K
		: never]?: S[K]["type"] extends "object"
		? S[K]["shape"] extends Schema
			? InferRawSchema<S[K]["shape"]>
			: {}
		: S[K]["type"] extends "object[]"
			? S[K]["shape"] extends Schema
				? Array<InferRawSchema<S[K]["shape"]>>
				: []
			: InferValueType<S[K]["type"]>;
} & {
	[K in keyof S as S[K]["required"] extends false
		? never
		: K]: S[K]["type"] extends "object"
		? S[K]["shape"] extends Schema
			? InferRawSchema<S[K]["shape"]>
			: {}
		: S[K]["type"] extends "object[]"
			? S[K]["shape"] extends Schema
				? Array<InferRawSchema<S[K]["shape"]>>
				: []
			: InferValueType<S[K]["type"]>;
};
