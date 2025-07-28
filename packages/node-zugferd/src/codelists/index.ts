type Split<
	S extends string,
	D extends string,
> = S extends `${infer T}.${infer U}` ? [T, ...Split<U, D>] : [S];

type Get<T, Path extends string[]> = Path extends [
	infer Head extends keyof T,
	...infer Tail extends string[],
]
	? Get<T[Head], Tail>
	: T;

export type CreateEnumOptions<K extends string, V extends string> = {
	keyProp: K;
	valueProp: V;
};

const getByPath = <Obj>(obj: Obj, path: string) =>
	path.split(".").reduce((acc: any, key) => acc?.[key], obj);

export const createEnum = <
	T extends readonly Record<string, any>[],
	K extends string,
	V extends string,
>(
	data: T,
	options: CreateEnumOptions<K, V>,
) => {
	return Object.fromEntries(
		data.map((item) => [
			getByPath(item, options.keyProp),
			getByPath(item, options.valueProp),
		]),
	) as {
		[I in T[number] as Get<I, Split<K, ".">>]: Get<I, Split<V, ".">>;
	};
};
