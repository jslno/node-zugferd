import type { ZugferdProfile } from "@node-zugferd/core";
import type { InferInput } from "@node-zugferd/data-types";
import {
	ARRAY_PATH_WILDCARD,
	unwrapSchema,
	walkSchema,
} from "@node-zugferd/data-types";
import type { ProfileSchemaType } from "@node-zugferd/utils";
import type { ParserOutput } from "./output";

/**
 * The input accepted by `create()` for a profile.
 *
 * Profiles built with `defineProfile` carry their input type in `$Infer`.
 * Fall back to the schema input for plain `ZugferdProfile` values.
 */
type ProfileInput<Profile extends ZugferdProfile> = Profile["$Infer"] extends {
	Input: infer Input;
}
	? Input
	: Profile["schema"] extends ProfileSchemaType
		? InferInput<Profile["schema"]>
		: never;

/**
 * Turn parser output back into the structure accepted by `create()`.
 *
 * Parser leaves differ from input leaves:
 * - dates: `{ format, date: Date, value: string }` → `Date`
 * - amounts without a currency: `{ value }` → `number`
 * - quantities that do not take a unit: `{ value }` → `number`
 */
export function toInput<Profile extends ZugferdProfile>(input: {
	profile: Profile;
	data: ParserOutput<Extract<Profile["schema"], ProfileSchemaType>>;
}): ProfileInput<Profile> {
	const result = structuredClone(input.data);

	walkSchema(
		input.profile.schema,
		({ schema: fieldSchema, path, indexes }) => {
			const unwrapped = unwrapSchema(fieldSchema as never);
			if (unwrapped.kind !== "schema") return;

			const current = getAtPath(result, path, indexes);
			if (current == null) return;

			if (unwrapped.type === "date") {
				const record = asRecord(current);
				if (record?.date instanceof Date) {
					setAtPath(result, path, indexes, record.date);
				}
				return;
			}

			if (unwrapped.type === "amount") {
				const record = asRecord(current);
				const requireCurrency = (
					unwrapped as { config?: { requireCurrency?: string } }
				).config?.requireCurrency;
				if (
					record &&
					requireCurrency !== "always" &&
					record.currency == null &&
					(typeof record.value === "number" || typeof record.value === "string")
				) {
					setAtPath(result, path, indexes, Number(record.value));
				}
				return;
			}

			if (unwrapped.type === "quantity") {
				const record = asRecord(current);
				const requireUnitCode = (
					unwrapped as { config?: { requireUnitCode?: string } }
				).config?.requireUnitCode;
				if (
					record &&
					requireUnitCode === "never" &&
					record.unitCode == null &&
					(typeof record.value === "number" || typeof record.value === "string")
				) {
					setAtPath(result, path, indexes, Number(record.value));
				}
			}
		},
		{
			resolveArrayLength: (arrayPath, indexes) => {
				const value = getAtPath(result, arrayPath, indexes);
				return Array.isArray(value) ? value.length : 0;
			},
		},
	);

	return result as ProfileInput<Profile>;
}

function setAtPath(
	target: unknown,
	path: readonly string[],
	indexes: readonly number[],
	value: unknown,
) {
	let current: unknown = target;
	let indexCursor = 0;

	for (let i = 0; i < path.length; i++) {
		const segment = path[i]!;
		const isLeaf = i === path.length - 1;

		if (segment === ARRAY_PATH_WILDCARD) {
			const index = indexes[indexCursor++];
			if (index === undefined || !Array.isArray(current)) return;
			if (isLeaf) {
				current[index] = value;
				return;
			}
			current = current[index];
			continue;
		}

		if (current == null || typeof current !== "object") return;
		const record = current as Record<string, unknown>;
		if (isLeaf) {
			record[segment] = value;
			return;
		}
		current = record[segment];
	}
}

function getAtPath(
	target: unknown,
	path: readonly string[],
	indexes: readonly number[],
): unknown {
	let current: unknown = target;
	let indexCursor = 0;

	for (const segment of path) {
		if (current == null) return undefined;
		if (segment === ARRAY_PATH_WILDCARD) {
			const index = indexes[indexCursor++];
			if (index === undefined || !Array.isArray(current)) return undefined;
			current = current[index];
		} else if (typeof current === "object") {
			current = (current as Record<string, unknown>)[segment];
		} else {
			return undefined;
		}
	}

	return current;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return undefined;
	}
	return value as Record<string, unknown>;
}
