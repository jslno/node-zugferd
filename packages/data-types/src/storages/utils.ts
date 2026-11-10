export const entries = <const T extends Record<PropertyKey, unknown>>(
	obj: T,
) => {
	return Object.entries(obj) as {
		[K in keyof T]: [K, T[K]];
	}[keyof T][];
};

export const getStore = <R, S extends symbol = symbol>(
	symbol: S,
	defaultValue: R | ((symbol: S) => R),
) => {
	if (!(globalThis as any)[symbol]) {
		(globalThis as any)[symbol] =
			typeof defaultValue === "function"
				? (defaultValue as (symbol: S) => R)(symbol)
				: defaultValue;
	}
	return (globalThis as any)[symbol] as R;
};
