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
