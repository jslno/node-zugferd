import { headers } from "next/headers";

export type AcceptLanguage = {
	locale: string;
	quality: number;
};

export async function prefersLanguage(
	locale: string,
	customMatcher?: (str: string, locale: string) => boolean,
) {
	const matcher =
		customMatcher ??
		((str, locale) => str.split("-")[0].toLowerCase() === locale.toLowerCase());

	const acceptLanguages = await getAcceptLanguages();

	const localeIndex = acceptLanguages.findIndex(({ locale: lang }) =>
		matcher(lang, locale),
	);

	const englishIndex = acceptLanguages.findIndex(({ locale: lang }) =>
		matcher(lang, "en"),
	);

	return (
		localeIndex !== -1 && (englishIndex === -1 || localeIndex < englishIndex)
	);
}

export async function getAcceptLanguages(): Promise<AcceptLanguage[]> {
	const acceptLanguage = (await headers()).get("accept-language") ?? "en";

	return acceptLanguage
		.split(",")
		.map((entry) => {
			const [locale, ...params] = entry.trim().toLowerCase().split(";");

			const quality = params.find((param) => param.trim().startsWith("q="));

			return {
				locale,
				quality: quality ? Number(quality.trim().slice(2)) : 1,
			};
		})
		.filter(
			({ locale, quality }) =>
				locale.length > 0 &&
				Number.isFinite(quality) &&
				quality > 0 &&
				quality <= 1,
		)
		.sort((a, b) => b.quality - a.quality);
}
