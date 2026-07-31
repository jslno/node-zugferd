import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import type { BundledLanguage, BundledTheme, CodeToHastOptions } from "shiki";
import { codeToHast } from "shiki";

export const highlight = async (
	code: string,
	lang: BundledLanguage,
	cfg?:
		| Omit<CodeToHastOptions<BundledLanguage, BundledTheme>, "lang" | "themes">
		| undefined,
) => {
	const out = await codeToHast(code, {
		lang,
		themes: {
			dark: "vitesse-dark",
			light: "vitesse-light",
		},
		...cfg,
	});

	return toJsxRuntime(out, {
		Fragment,
		jsx,
		jsxs,
	});
};
