import type { Translations } from "./translations";

interface I18nOptions<
	T extends Record<string, Translations> = Record<string, Translations>,
> {
	translations: T;
	locale: keyof T & string;
}

export const createT = <
	const T extends Record<string, Translations>,
	const O extends I18nOptions<T>,
>(
	opts: O & { translations: T },
): T[keyof T] => {
	return opts.translations[opts.locale];
};

export type { Translations } from "./translations";
