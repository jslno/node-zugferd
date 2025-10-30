import type { Field, FieldType, PrettifyDeep, Schema } from "../types";

export type MergeField<A extends Field, B extends Field> = B extends {
	shape: infer BShape extends Schema;
}
	? A extends { shape: infer AShape extends Schema }
		? Omit<A, "shape" | "type"> &
				Omit<B, "shape"> & {
					type: B["type"];
					shape: MergeSchema<AShape, BShape>;
				}
		: B // A has no shape
	: Omit<A, keyof B> & B; // shallow override

export type MergeSchema<A extends Schema, B extends Schema> = PrettifyDeep<{
	[K in keyof A | keyof B]: K extends keyof B
		? K extends keyof A
			? MergeField<A[K], B[K]>
			: B[K] // only in B
		: K extends keyof A
			? A[K] // only in A
			: never;
}> extends infer V extends Schema
	? V
	: never;

export function mergeSchema<A extends Schema, B extends Schema>(
	a: A,
	b: B,
): MergeSchema<A, B> {
	const isObjectLike = ({ type }: { type: FieldType }) => {
		return type === "object" || type === "object[]";
	};

	const mergedSchema: Schema = { ...a };

	for (const [key, field] of Object.entries(b)) {
		const existing = mergedSchema[key];

		if (!existing) {
			mergedSchema[key] = { ...field };
			continue;
		}

		const mergedField: Field = { ...existing };

		if (
			(isObjectLike(existing) && existing.shape) ||
			(isObjectLike(field) && field.shape)
		) {
			const left = existing.shape ?? {};
			const right = field.shape ?? {};
			mergedField.shape = mergeSchema(left, right);
		} else {
			if ("shape" in field) {
				mergedField.shape = field.shape;
			}
		}

		for (const attr of Object.keys(field)) {
			if (attr === "shape") continue;
			// @ts-expect-error
			mergedField[attr] = field[attr];
		}

		mergedSchema[key] = mergedField;
	}

	return mergedSchema as any;
}
