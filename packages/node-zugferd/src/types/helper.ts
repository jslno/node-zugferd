export type Promisable<T> = T | Promise<T>;

export type LiteralString = "" | (string & Record<never, never>);

export type PickRequired<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;

export type UnionToIntersection<U> = (
	U extends any
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never;

export type IsExact<T, U> = (<G>() => G extends T ? 1 : 2) extends <
	G,
>() => G extends U ? 1 : 2
	? true
	: false;
