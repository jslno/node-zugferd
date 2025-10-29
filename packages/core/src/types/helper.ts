export type LiteralString = "" | (string & Record<never, never>);

export type Awaitable<T> = Promise<T> | T;
export type Prettify<T> = Omit<T, never>;
export type PrettifyDeep<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any
		? T[K]
		: T[K] extends object
			? T[K] extends Array<any>
				? T[K]
				: T[K] extends Date
					? T[K]
					: PrettifyDeep<T[K]>
			: T[K];
} & {};

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

export type RequiredKeysOf<BaseType extends object> = Exclude<
	{
		[Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]>
			? Key
			: never;
	}[keyof BaseType],
	undefined
>;

export type HasRequiredKeys<BaseType extends object> =
	RequiredKeysOf<BaseType> extends never ? false : true;

export type DeepMerge<A, B> = {
	[K in keyof A | keyof B]: K extends keyof B
		? K extends keyof A
			? A[K] extends Record<string, any>
				? B[K] extends Record<string, any>
					? DeepMerge<A[K], B[K]>
					: B[K]
				: B[K]
			: B[K] // only in B
		: K extends keyof A
			? A[K] // only in A
			: never;
};
