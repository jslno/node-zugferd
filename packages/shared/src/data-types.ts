import type { PrettifyDeep, StandardSchemaV1 } from "@node-zugferd/core";
import { defu } from "defu";

type Constraint<T> = T | [T, string];
type WrapConstraints<T extends Record<string, any>> = {
	[K in keyof T]?: Constraint<T[K]>;
};
function getConstraint<T>(constraint: Constraint<T>) {
	return Array.isArray(constraint) && typeof constraint[1] === "string"
		? {
				value: constraint[0],
				message: constraint[1],
			}
		: {
				value: constraint as T,
			};
}

export function optional<T extends StandardSchemaV1>(
	type: T,
): StandardSchemaV1<
	StandardSchemaV1.InferInput<T> | undefined,
	StandardSchemaV1.InferOutput<T> | undefined
> {
	return defu(type, {
		"~standard": {
			validate(value) {
				if (value === undefined) {
					return { value };
				}
				return type["~standard"].validate(value);
			},
		} satisfies Partial<StandardSchemaV1["~standard"]>,
	});
}

export function withDefault<T extends StandardSchemaV1>(
	type: T,
	defaultValue: StandardSchemaV1.InferInput<T>,
): StandardSchemaV1<
	StandardSchemaV1.InferInput<T> | undefined,
	StandardSchemaV1.InferOutput<T>
> {
	return defu(type, {
		"~standard": {
			validate(value) {
				if (value === undefined) {
					return { value: defaultValue };
				}
				return type["~standard"].validate(value);
			},
		} satisfies Partial<StandardSchemaV1["~standard"]>,
	});
}

export function string(message?: string): StandardSchemaV1<string> {
	return {
		"~standard": {
			version: 1,
			vendor: "node-zugferd",
			validate(value) {
				if (typeof value !== "string") {
					return {
						issues: [
							{
								message: message ?? "Expected value to be type of `string`.",
							},
						],
					};
				}
				return {
					value,
				};
			},
			types: {
				input: {} as string,
				output: {} as string,
			},
		},
	};
}

type NumberConstraints = WrapConstraints<{
	finite: boolean;
	min: number;
	max: number;
	positive: boolean;
	negative: boolean;
	pattern: RegExp;
}>;

export function number(
	message?: string | undefined,
): StandardSchemaV1<string | number, number>;
export function number(
	constraints?: NumberConstraints | undefined,
	message?: string | undefined,
): StandardSchemaV1<string | number, number>;
export function number(
	constraints?: NumberConstraints | string | undefined,
	message?: string | undefined,
): StandardSchemaV1<string | number, number> {
	const constr = typeof constraints === "object" ? constraints : {};
	let msg = typeof constraints === "string" ? constraints : message;

	return {
		"~standard": {
			version: 1,
			vendor: "node-zugferd",
			validate(input: unknown) {
				let value: number = NaN;
				if (typeof input === "number") {
					value = input;
				} else if (typeof input === "string") {
					const pattern = getConstraint(constr.pattern);
					if (pattern.value !== undefined && !pattern.value.test(input)) {
						return {
							issues: [
								{
									message:
										pattern.message ?? "Value does not match the pattern.",
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
								message: msg ?? "Value must be a number or a numeric string.",
							},
						],
					};
				}
				let issues: StandardSchemaV1.Issue[] = [];
				const finite = getConstraint(constr.finite);
				const min = getConstraint(constr.min);
				const positive = getConstraint(constr.positive);

				if (finite.value !== undefined && !Number.isFinite(value)) {
					issues.push({
						message: finite.message ?? "Value must be finite.",
					});
				}

				if (min.value !== undefined) {
					if (value < min.value) {
						issues.push({
							message:
								min.message ?? `Value must be greater than ${min.value}.`,
						});
					}
				} else if (positive.value !== undefined) {
					if (value < 0) {
						issues.push({
							message: positive.message ?? "Value must be positive.",
						});
					}
				}

				const max = getConstraint(constr.max);
				const negative = getConstraint(constr.negative);

				if (max.value !== undefined) {
					if (value > max.value) {
						issues.push({
							message: max.message ?? `Value must be less than ${max.value}.`,
						});
					}
				} else if (negative.value !== undefined) {
					if (value > 0) {
						issues.push({
							message: negative.message ?? "Value must be negative.",
						});
					}
				}

				if (issues.length > 0) {
					return { issues };
				}
				return { value };
			},
			types: {
				input: {} as string | number,
				output: {} as number,
			},
		},
	};
}

export function object<Shape extends Record<string, StandardSchemaV1>>(
	shape: Shape,
): StandardSchemaV1<
	PrettifyDeep<
		{
			[K in keyof Shape as undefined extends StandardSchemaV1.InferInput<
				Shape[K]
			>
				? K
				: never]?: StandardSchemaV1.InferInput<Shape[K]>;
		} & {
			[K in keyof Shape as undefined extends StandardSchemaV1.InferInput<
				Shape[K]
			>
				? never
				: K]: StandardSchemaV1.InferInput<Shape[K]>;
		}
	>,
	{
		[K in keyof Shape]: StandardSchemaV1.InferOutput<Shape[K]>;
	}
> {
	return {
		"~standard": {
			version: 1,
			vendor: "node-zugferd",
			async validate(value) {
				if (typeof value !== "object" || value === null) {
					return {
						issues: [
							{
								message: "Expected value to be an object.",
							},
						],
					};
				}

				const result: Record<string, any> = {};
				const issues: StandardSchemaV1.Issue[] = [];

				await Promise.allSettled(
					Object.keys(shape).map(async (key) => {
						const fieldSchema = shape[key]!;
						const fieldValue = (value as Record<string, any>)[key];
						const res = await fieldSchema["~standard"].validate(fieldValue);
						if (res.issues) {
							issues.push(
								...res.issues.map((issue) => ({
									...issue,
									message: `In field "${key}": ${issue.message}`,
								})),
							);
						} else {
							result[key] = res.value;
						}
					}),
				);
				for (const key of Object.keys(shape)) {
					const fieldSchema = shape[key]!;
					const fieldValue = (value as Record<string, any>)[key];
					const res = await fieldSchema["~standard"].validate(fieldValue);
					if (res.issues) {
						issues.push(
							...res.issues.map((issue) => ({
								...issue,
								message: `In field "${key}": ${issue.message}`,
							})),
						);
					} else {
						result[key] = res.value;
					}
				}

				if (issues.length > 0) {
					return { issues };
				}

				return { value: result as any };
			},
		},
	};
}

export const Amount = number({
	finite: true,
	pattern: /^-?\d+(\.\d{1,2})?$/,
});

export const UnitPriceAmount = number({
	finite: true,
	pattern: /^-?\d+(\.\d+)?$/,
});

export const Quantity = UnitPriceAmount;

export const Percentage = number({
	min: 0,
	max: 100,
});

export const Text = string();

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
					{
						message:
							"Expected value to be a Date object or string in YYYYMMDD format.",
					},
				],
			};
		},
	},
};
export { $Date as Date };

export const Code = Text;

export const BinaryObject = Text;
