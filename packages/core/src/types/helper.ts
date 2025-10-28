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

export type DeepPartial<T> = T extends Function
	? T
	: T extends object
		? { [K in keyof T]?: DeepPartial<T[K]> }
		: T;

export type WithoutEmpty<T, F = never> = T extends T
	? {} extends T
		? F
		: T
	: F;

export type UnionToIntersection<U> = (
	U extends any
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never;

type OptionalIfAllChildrenOptional<T> = T extends Function
	? T
	: T extends object
		? {
				[K in keyof T]-?: T[K] extends object
					? HasRequiredKeys<T[K]> extends true
						? OptionalIfAllChildrenOptional<T[K]>
						: OptionalIfAllChildrenOptional<T[K]> | undefined
					: T[K];
			} & {}
		: T;

type Example = {
	a: {
		x?: number;
		y?: string;
	};
	b: string;
	c: {
		d?: boolean;
		e: number;
	};
};

type Result = OptionalIfAllChildrenOptional<Example>;
/* Result:
		  {
			a?: {
			  x?: number;
			  y?: string;
			};
			b: string;
			c: {
			  d?: boolean;
			  e: number;
			};
		  }
		  */
