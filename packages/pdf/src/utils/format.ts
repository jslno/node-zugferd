import type { Formatters } from "../types";

/**
 * Human readable labels for the most common UN/ECE Recommendation 20 unit
 * codes on invoices. Unknown codes fall back to the raw code.
 */
const UNIT_LABELS: Record<string, string> = {
	C62: "Stk",
	H87: "Stk",
	HUR: "Std.",
	DAY: "Tage",
	MON: "Monate",
	KGM: "kg",
	GRM: "g",
	TNE: "t",
	MTR: "m",
	MTK: "m²",
	MTQ: "m³",
	KMT: "km",
	LTR: "l",
	KWH: "kWh",
	P1: "%",
};

export const createFormatters = (intlLocale = "de-DE"): Formatters => {
	const number = new Intl.NumberFormat(intlLocale, {
		maximumFractionDigits: 2,
	});
	const date = new Intl.DateTimeFormat(intlLocale, {
		dateStyle: "medium",
	});

	return {
		currency: (value, currencyCode = "EUR") =>
			new Intl.NumberFormat(intlLocale, {
				style: "currency",
				currency: currencyCode,
			}).format(Number(value)),
		date: (value) => date.format(value),
		quantity: (value, unitCode) => {
			const formatted = number.format(Number(value));
			if (!unitCode) return formatted;
			return `${formatted} ${UNIT_LABELS[unitCode] ?? unitCode}`;
		},
	};
};
