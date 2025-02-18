export type LiteralString = "" | (string & Record<never, never>);

export type PickRequired<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;
