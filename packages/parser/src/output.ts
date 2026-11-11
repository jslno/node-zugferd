import type { Prettify } from "@node-zugferd/core/types";

/**
 * What `parse` returns for a profile schema.
 *
 * The parser does not run schema transforms, so some leaves are not the schema
 * output: dates are `{ format, date, value }` with a plain `string` format, codes and literals are the XML
 * text, identifiers use `value` (or a bare string), binary objects are `File`,
 * and amount currencies and quantity units are plain strings.
 */
export type ParserOutput<
	Schema extends { "~types"?: { output: unknown } | undefined },
> = ParserData<SchemaOutput<Schema>>;

type SchemaOutput<
	Schema extends { "~types"?: { output: unknown } | undefined },
> = NonNullable<Schema["~types"]>["output"];

type ParserData<T> = T extends any ? ParserNode<T> : never;

type ParserNode<T> = T extends null | undefined
	? T
	: T extends Date
		? Date
		: T extends string
			? string extends T
				? T
				: string
			: T extends number
				? number extends T
					? T
					: string
				: T extends boolean
					? boolean extends T
						? T
						: string
					: number extends keyof T
						? ParserData<T[number]>[]
						: [Leaf<T>] extends [false]
							? T extends object
								? {
										[Key in keyof T]: ParserData<Exclude<T[Key], undefined>>;
									}
								: T
							: Leaf<T>;

/**
 * `false` means this node is not a parser leaf.
 * The failure value must not be `never`: `never` is assignable to `string`,
 * and that turned the whole invoice into `string`.
 */
type Leaf<T> =
	IsDateLeaf<T> extends true
		? { format: string; date: Date; value: string }
		: IsBinaryLeaf<T> extends true
			? File
			: IsIdentifierLeaf<T> extends infer Id
				? [Id] extends [false]
					? IsCodeLeaf<T> extends true
						? string
						: IsMeasuredLeaf<T> extends true
							? Prettify<{ value: number } & ParserUnit<T> & ParserCurrency<T>>
							: false
					: [Id] extends [string]
						? ParserIdentifier<T, Id>
						: false
				: false;

type Keys<T> = keyof T;

type IsDateLeaf<T> =
	Keys<T> extends "date" | "value" | "format"
		? T extends { date: Date; value: string }
			? true
			: false
		: false;

type IsBinaryLeaf<T> =
	Keys<T> extends "content" | "mimeType" | "filename"
		? T extends { content: Uint8Array; mimeType: string; filename: string }
			? true
			: false
		: false;

type IsIdentifierLeaf<T> =
	Keys<T> extends "identifier" | "schemeId" | "schemeVersion"
		? T extends { identifier: infer Id extends string }
			? Id
			: false
		: false;

type IsCodeLeaf<T> =
	Keys<T> extends "value" | "codelist"
		? "codelist" extends Keys<T>
			? true
			: false
		: false;

type IsMeasuredLeaf<T> =
	Keys<T> extends "value" | "currency" | "unitCode"
		? T extends { value: number }
			? true
			: false
		: false;

type ParserIdentifier<T, Id extends string> =
	HasText<T, "schemeId"> extends true
		? string | Prettify<{ value: Id } & ParserScheme<T>>
		: HasText<T, "schemeVersion"> extends true
			? string | Prettify<{ value: Id } & ParserScheme<T>>
			: string;

type ParserScheme<T> = (HasText<T, "schemeId"> extends true
	? undefined extends T["schemeId" & keyof T]
		? { schemeId?: string }
		: { schemeId: string }
	: {}) &
	(HasText<T, "schemeVersion"> extends true
		? undefined extends T["schemeVersion" & keyof T]
			? { schemeVersion?: string }
			: { schemeVersion: string }
		: {});

/** A key whose type is only `undefined` or `never` is not read from the XML. */
type HasText<T, Key extends string> = Key extends keyof T
	? [T[Key]] extends [undefined]
		? false
		: true
	: false;

type ParserUnit<T> = "unitCode" extends keyof T
	? [T["unitCode"]] extends [undefined]
		? {}
		: undefined extends T["unitCode"]
			? { unitCode?: string }
			: { unitCode: string }
	: {};

type ParserCurrency<T> = "currency" extends keyof T
	? [T["currency"]] extends [undefined]
		? {}
		: undefined extends T["currency"]
			? { currency?: string }
			: { currency: string }
	: {};
