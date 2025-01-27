import { ZodSchema } from 'zod'
import { LiteralString } from './helper'
import { Profile } from './profile'

export type FieldType =
	| 'string'
	| 'string[]'
	| 'number'
	| 'number[]'
	| 'date'
	| 'boolean'
	| 'object'
	| 'object[]'
	| 'string | number'
	| '(string | number)[]'
	| Array<LiteralString>

type Primitive = string | number | Date | null | undefined | object

export type SchemaFieldConfig<T extends FieldType = FieldType> = {
	defaultValue?: Primitive | (() => Primitive)
	validator?: ZodSchema
	xpath?: string
	group?: LiteralString
	required?: boolean
	sibling?: T extends 'object[]'
		? (data: any, groupIndicies: { [key: string]: number }) => any
		: never
	shape?: T extends 'object' | 'object[]' ? Schema : never
	additionalXml?: Record<string, string>
	transform?: {
		input?: (val: any) => any
		output?: (val: any) => any
	}
}

export type SchemaField<T extends FieldType = FieldType> = {
	type: T
} & SchemaFieldConfig<T>

export type Schema = {
	[key: string]: SchemaField
}

export type InferValueType<T extends FieldType> = T extends 'string'
	? string
	: T extends 'number'
	? number
	: T extends 'string | number'
	? string | number
	: T extends 'boolean'
	? boolean
	: T extends 'date'
	? Date
	: T extends 'string[]'
	? string[]
	: T extends 'number[]'
	? number[]
	: T extends '(string | number)[]'
	? (string | number)[]
	: T extends Array<any>
	? T[number]
	: never

export type InferSchema<
	P extends Profile,
	Depth extends number = 6
> = Depth extends 0
	? any
	: InferRawSchema<P['schema']> &
			(P['extends'] extends Profile
				? InferSchema<
						P['extends'],
						Depth extends infer D
							? D extends number
								? D
								: never
							: never
				  >
				: {})

export type InferRawSchema<S extends Schema> = {
	[K in keyof S as S[K]['required'] extends false
		? K
		: never]?: S[K]['type'] extends 'object'
		? S[K]['shape'] extends Schema
			? InferRawSchema<S[K]['shape']>
			: {}
		: S[K]['type'] extends 'object[]'
		? S[K]['shape'] extends Schema
			? Array<InferRawSchema<S[K]['shape']>>
			: []
		: InferValueType<S[K]['type']>
} & {
	[K in keyof S as S[K]['required'] extends false
		? never
		: K]: S[K]['type'] extends 'object'
		? S[K]['shape'] extends Schema
			? InferRawSchema<S[K]['shape']>
			: {}
		: S[K]['type'] extends 'object[]'
		? S[K]['shape'] extends Schema
			? Array<InferRawSchema<S[K]['shape']>>
			: []
		: InferValueType<S[K]['type']>
}
