export type LiteralString = "" | (string & Record<never, never>);

export type MaybeReadonly<TValue> = TValue | Readonly<TValue>;

export type DeepReadonly<TValue> = TValue extends
	| Record<string, unknown>
	| readonly unknown[]
	? { readonly [TKey in keyof TValue]: DeepReadonly<TValue[TKey]> }
	: TValue;

export type MaybeDeepReadonly<TValue> = TValue | DeepReadonly<TValue>;

export type MaybePromise<TValue> = TValue | Promise<TValue>;

export type Prettify<TObject> = { [TKey in keyof TObject]: TObject[TKey] } & {};

export type MarkOptional<TObject, TKeys extends keyof TObject> = {
	[TKey in keyof TObject]?: unknown;
} & Omit<TObject, TKeys> &
	Partial<Pick<TObject, TKeys>>;

export type Merge<TFirstObject, TSecondObject> = Omit<
	TFirstObject,
	keyof TFirstObject & keyof TSecondObject
> &
	TSecondObject;

export type DeepPartial<T> = T extends Function
	? T
	: T extends object
		? { [K in keyof T]?: DeepPartial<T[K]> }
		: T;

export type UnionToIntersection<U> = (
	U extends any
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never;
