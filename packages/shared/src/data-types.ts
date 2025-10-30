import type { StandardSchemaV1 } from "@node-zugferd/core";

export const optional = <I, O>(
	type: StandardSchemaV1<I, O>,
): StandardSchemaV1<I | undefined | null, O | undefined> => {
	return {
		...type,
		"~standard": {
			...type["~standard"],
			validate(value) {
				if (value === null || value === undefined) {
					return { value: undefined };
				}
				return type["~standard"].validate(value);
			},
		},
	};
};

export type CoerceNumber = StandardSchemaV1<string | number, number> & {
	max: (limit: number, message?: string) => CoerceNumber;
	min: (limit: number, message?: string) => CoerceNumber;
	finite: (message?: string) => CoerceNumber;
	positive: (message?: string) => CoerceNumber;
	negative: (message?: string) => CoerceNumber;
	pattern: (pattern: RegExp, message?: string) => CoerceNumber;
	optional: () => StandardSchemaV1<
		string | number | null | undefined,
		number | undefined
	>;
};

export function coerceNumber(message?: string) {
	const constraints: Partial<{
		min: number;
		max: number;
		positive: boolean;
		negative: boolean;
		finite: boolean;
		pattern: RegExp;
	}> = {};
	const messages: Partial<Record<keyof typeof constraints, string>> = {};

	const constructor = (): CoerceNumber => ({
		pattern(pattern, message) {
			constraints.pattern = pattern;
			messages.pattern = message;
			return constructor();
		},
		min(limit, message) {
			constraints.min = limit;
			messages.min = message;
			return constructor();
		},
		max(limit, message) {
			constraints.max = limit;
			messages.max = message;
			return constructor();
		},
		finite(message) {
			constraints.finite = true;
			messages.finite = message;
			return constructor();
		},
		positive(message) {
			constraints.positive = true;
			messages.positive = message;
			return constructor();
		},
		negative(message) {
			constraints.negative = true;
			messages.negative = message;
			return constructor();
		},
		optional() {
			return optional(constructor());
		},
		"~standard": {
			version: 1,
			vendor: "node-zugferd",
			validate(input) {
				let value: number = NaN;
				if (typeof input === "number") {
					value = input;
				} else if (typeof input === "string") {
					if (constraints.pattern && !constraints.pattern.test(input)) {
						return {
							issues: [
								{
									message:
										messages.pattern ?? "Value does not match the pattern.",
								},
							],
						};
					}
					value = Number(input);
				}

				if (Number.isNaN(value)) {
					return {
						issues: [
							{
								message:
									message ?? "Value must be a number or a numeric string.",
							},
						],
					};
				}
				let issues: StandardSchemaV1.Issue[] = [];

				if (constraints.finite && !Number.isFinite(value)) {
					issues.push({
						message: messages.finite ?? "Value must be finite.",
					});
				}

				if (constraints.min !== undefined) {
					if (value < constraints.min) {
						issues.push({
							message:
								messages.min ??
								`Value must be greater than ${constraints.min}.`,
						});
					}
				} else if (constraints.positive) {
					if (value < 0) {
						issues.push({
							message: messages.positive ?? "Value must be positive.",
						});
					}
				}

				if (constraints.max !== undefined) {
					if (value > constraints.max) {
						issues.push({
							message:
								messages.max ?? `Value must be less than ${constraints.max}.`,
						});
					}
				} else if (constraints.negative) {
					if (value > 0) {
						issues.push({
							message: messages.positive ?? "Value must be positive.",
						});
					}
				}

				if (issues.length > 0) {
					return { issues };
				}
				return { value };
			},
		},
	});

	return constructor();
}

export const Amount = coerceNumber()
	.finite()
	.pattern(/^-?\d+(\.\d{1,2})?$/);

export const UnitPriceAmount = coerceNumber()
	.finite()
	.pattern(/^-?\d+(\.\d+)?$/);

export const Quantity = UnitPriceAmount;

export const Percentage = coerceNumber().min(0).max(100);

export const Text: StandardSchemaV1<string> = {
	"~standard": {
		version: 1,
		vendor: "node-zugferd",
		validate(value) {
			if (typeof value !== "string") {
				return {
					issues: [
						{
							message: "Value must be type string.",
						},
					],
				};
			}
			return {
				value,
			};
		},
	},
};

export const Identifier = Text;

export const DocumentReference = Text;

const toYYYYMMDD = (date: Date): string =>
	`${date.getFullYear().toString().padStart(4, "0")}${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

const isValidDate = (year: number, month: number, day: number): boolean => {
	const d = new Date(year, month - 1, day);
	return (
		d.getFullYear() === year &&
		d.getMonth() === month - 1 &&
		d.getDate() === day
	);
};
const $Date: StandardSchemaV1<string | Date, string> = {
	"~standard": {
		version: 1,
		vendor: "node-zugferd",
		validate(value) {
			if (value instanceof Date) {
				if (isNaN(value.getTime())) {
					return { issues: [{ message: "Invalid Date object." }] };
				}
				return { value: toYYYYMMDD(value) };
			}

			if (typeof value === "string") {
				if (!/^\d{8}$/.test(value)) {
					return {
						issues: [{ message: "Date string must be in YYYYMMDD format." }],
					};
				}

				const year = Number(value.slice(0, 4));
				const month = Number(value.slice(4, 6));
				const day = Number(value.slice(6, 8));

				if (!isValidDate(year, month, day)) {
					return { issues: [{ message: "Invalid calendar date." }] };
				}

				return { value };
			}

			return {
				issues: [
					{ message: "Value must be a Date object or a YYYYMMDD string." },
				],
			};
		},
	},
};
export { $Date as Date };

export const Code = Text;

export const BinaryObject = Text;
