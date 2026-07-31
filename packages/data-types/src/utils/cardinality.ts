import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import {
	ARRAY_PATH_WILDCARD,
	collectFieldSchemas,
	isArrayLikeSchema,
	isObjectLikeSchema,
} from "./walk-schema";

type AnySchema =
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;

export type CardinalityRule = {
	readonly path: readonly string[];
	readonly mode: "object-to-array";
	readonly objectOptionIndex: number;
	readonly arrayOptionIndex: number;
};

export function buildCardinalityPlan(
	options: readonly AnySchema[],
): CardinalityRule[] {
	const fieldMaps = options.map((option) => collectFieldSchemas(option));
	const rules: CardinalityRule[] = [];
	const seen = new Set<string>();

	for (
		let arrayOptionIndex = 1;
		arrayOptionIndex < options.length;
		arrayOptionIndex++
	) {
		for (
			let objectOptionIndex = 0;
			objectOptionIndex < arrayOptionIndex;
			objectOptionIndex++
		) {
			for (const [pathKey, { path, schema: arraySchema }] of fieldMaps[
				arrayOptionIndex
			]!) {
				const objectEntry = fieldMaps[objectOptionIndex]!.get(pathKey);

				if (!objectEntry) {
					continue;
				}

				if (
					!isObjectLikeSchema(objectEntry.schema) ||
					!isArrayLikeSchema(arraySchema)
				) {
					continue;
				}

				const ruleKey = `${pathKey}:${objectOptionIndex}:${arrayOptionIndex}`;

				if (seen.has(ruleKey)) {
					continue;
				}

				seen.add(ruleKey);
				rules.push({
					path,
					mode: "object-to-array",
					objectOptionIndex,
					arrayOptionIndex,
				});
			}
		}
	}

	return rules;
}

export function getAtPath(value: unknown, path: readonly string[]): unknown {
	if (!path.length) {
		return value;
	}

	const [head, ...rest] = path;

	if (head === ARRAY_PATH_WILDCARD) {
		if (!Array.isArray(value)) {
			return undefined;
		}

		if (!rest.length) {
			return value;
		}

		return value.map((item) => getAtPath(item, rest));
	}

	if (!value || typeof value !== "object") {
		return undefined;
	}

	return getAtPath((value as Record<string, unknown>)[head!]!, rest);
}

function mutateAtPath(
	value: unknown,
	path: readonly string[],
	mutator: (current: unknown) => unknown,
): void {
	if (!path.length) {
		return;
	}

	const [head, ...rest] = path;

	if (head === ARRAY_PATH_WILDCARD) {
		if (!Array.isArray(value)) {
			return;
		}

		for (let index = 0; index < value.length; index++) {
			if (!rest.length) {
				value[index] = mutator(value[index]);
				continue;
			}

			mutateAtPath(value[index], rest, mutator);
		}

		return;
	}

	if (!head || !value || typeof value !== "object") {
		return;
	}

	const objectValue = value as Record<string, unknown>;

	if (!rest.length) {
		objectValue[head] = mutator(objectValue[head]);
		return;
	}

	mutateAtPath(objectValue[head], rest, mutator);
}

export function setAtPath(
	value: unknown,
	path: readonly string[],
	nextValue: unknown,
): void {
	mutateAtPath(value, path, () => nextValue);
}

export function adaptInputForOption(
	input: unknown,
	optionIndex: number,
	rules: readonly CardinalityRule[],
): unknown {
	if (!input || typeof input !== "object" || rules.length === 0) {
		return input;
	}

	const adapted = structuredClone(input);

	for (const rule of rules) {
		if (optionIndex > rule.objectOptionIndex) {
			continue;
		}

		mutateAtPath(adapted, rule.path, (value) => {
			if (value === null || value === undefined) {
				return value;
			}

			if (Array.isArray(value)) {
				return value[0];
			}

			return value;
		});
	}

	return adapted;
}
