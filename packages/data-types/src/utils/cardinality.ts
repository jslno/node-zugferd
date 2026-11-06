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

function cardinalityLengthAtPath(
	input: unknown,
	path: readonly string[],
): number {
	const value = getAtPath(input, path);

	if (Array.isArray(value)) {
		return value.length;
	}

	if (value === null || value === undefined) {
		return 0;
	}

	return 1;
}

function pickCardinalityItem(value: unknown, index: number): unknown {
	if (Array.isArray(value)) {
		return value[index] ?? value[0];
	}

	return value;
}

function isTopLevelCardinalityPath(path: readonly string[]): boolean {
	return !path.includes(ARRAY_PATH_WILDCARD);
}

/**
 * Run an object-side intersect option once per upgraded array element so
 * fields that only exist on the object schema are preserved for every item.
 *
 * Only top-level (non-nested) cardinality paths are expanded. Nested paths
 * under `*` still unwrap to `[0]` via `adaptInputForOption` — expanding those
 * at the document root would corrupt sibling array contexts (e.g. lines).
 */
export function expandObjectOptionInput(
	input: unknown,
	optionIndex: number,
	rules: readonly CardinalityRule[],
): unknown[] {
	const objectRules = rules.filter(
		(rule) =>
			rule.objectOptionIndex === optionIndex &&
			isTopLevelCardinalityPath(rule.path),
	);

	if (objectRules.length === 0) {
		return [adaptInputForOption(input, optionIndex, rules)];
	}

	const length = Math.max(
		0,
		...objectRules.map((rule) => cardinalityLengthAtPath(input, rule.path)),
	);

	if (length <= 1) {
		return [adaptInputForOption(input, optionIndex, rules)];
	}

	const expanded: unknown[] = [];

	for (let index = 0; index < length; index++) {
		const adapted = structuredClone(input) as Record<string, unknown>;

		for (const rule of rules) {
			if (optionIndex > rule.objectOptionIndex) {
				continue;
			}

			if (
				rule.objectOptionIndex === optionIndex &&
				isTopLevelCardinalityPath(rule.path)
			) {
				const value = getAtPath(input, rule.path);
				setAtPath(adapted, rule.path, pickCardinalityItem(value, index));
				continue;
			}

			// Nested / other object-side rules: keep unwrap-to-first behavior.
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

		expanded.push(adapted);
	}

	return expanded;
}

export function assembleObjectOptionOutput(
	input: unknown,
	itemOutputs: readonly unknown[],
	optionIndex: number,
	rules: readonly CardinalityRule[],
): unknown {
	if (itemOutputs.length === 0) {
		return undefined;
	}

	if (itemOutputs.length === 1) {
		return itemOutputs[0];
	}

	const objectRules = rules.filter(
		(rule) =>
			rule.objectOptionIndex === optionIndex &&
			isTopLevelCardinalityPath(rule.path),
	);
	const result = structuredClone(itemOutputs[0]);

	for (const rule of objectRules) {
		const inputValue = getAtPath(input, rule.path);

		if (!Array.isArray(inputValue) || inputValue.length <= 1) {
			continue;
		}

		const items = itemOutputs.map((output) => getAtPath(output, rule.path));
		setAtPath(result, rule.path, items);
	}

	return result;
}

function setAtPathWithWildcardIndexes(
	root: unknown,
	path: readonly string[],
	wildcardIndexes: readonly number[],
	nextValue: unknown,
): void {
	let current: unknown = root;
	let wildcardCursor = 0;

	for (let i = 0; i < path.length; i++) {
		const segment = path[i]!;
		const isLeaf = i === path.length - 1;

		if (segment === ARRAY_PATH_WILDCARD) {
			const index = wildcardIndexes[wildcardCursor++];
			if (!Array.isArray(current) || index === undefined) {
				return;
			}
			if (isLeaf) {
				current[index] = nextValue;
				return;
			}
			current = current[index];
			continue;
		}

		if (!current || typeof current !== "object") {
			return;
		}

		const record = current as Record<string, unknown>;
		if (isLeaf) {
			record[segment] = nextValue;
			return;
		}
		current = record[segment];
	}
}

function getAtPathWithWildcardIndexes(
	root: unknown,
	path: readonly string[],
	wildcardIndexes: readonly number[],
): unknown {
	let current: unknown = root;
	let wildcardCursor = 0;

	for (const segment of path) {
		if (segment === ARRAY_PATH_WILDCARD) {
			const index = wildcardIndexes[wildcardCursor++];
			if (!Array.isArray(current) || index === undefined) {
				return undefined;
			}
			current = current[index];
			continue;
		}

		if (!current || typeof current !== "object") {
			return undefined;
		}

		current = (current as Record<string, unknown>)[segment];
	}

	return current;
}

function forEachConcreteArrayAtPath(
	root: unknown,
	path: readonly string[],
	visit: (array: unknown[], wildcardIndexes: readonly number[]) => void,
): void {
	const walk = (
		value: unknown,
		remaining: readonly string[],
		wildcardIndexes: readonly number[],
	): void => {
		if (!remaining.length) {
			if (Array.isArray(value)) {
				visit(value, wildcardIndexes);
			}
			return;
		}

		const [head, ...rest] = remaining;

		if (head === ARRAY_PATH_WILDCARD) {
			if (!Array.isArray(value)) {
				return;
			}

			for (let index = 0; index < value.length; index++) {
				walk(value[index], rest, [...wildcardIndexes, index]);
			}
			return;
		}

		if (!value || typeof value !== "object") {
			return;
		}

		walk((value as Record<string, unknown>)[head!], rest, wildcardIndexes);
	};

	walk(root, path, []);
}

function adaptNestedElementInput(
	input: unknown,
	optionIndex: number,
	rules: readonly CardinalityRule[],
	rule: CardinalityRule,
	wildcardIndexes: readonly number[],
	element: unknown,
): unknown {
	const adapted = structuredClone(input) as Record<string, unknown>;

	for (const other of rules) {
		if (optionIndex > other.objectOptionIndex) {
			continue;
		}

		if (other === rule) {
			setAtPathWithWildcardIndexes(
				adapted,
				other.path,
				wildcardIndexes,
				element,
			);
			continue;
		}

		mutateAtPath(adapted, other.path, (value) => {
			if (value === null || value === undefined) {
				return value;
			}
			return Array.isArray(value) ? value[0] : value;
		});
	}

	return adapted;
}

/**
 * Re-run an object-side option once per nested upgraded array element so
 * object-only fields (e.g. discount.actualAmount) are kept on every item.
 */
export function rehydrateNestedObjectArrays(
	input: unknown,
	output: unknown,
	optionIndex: number,
	rules: readonly CardinalityRule[],
	run: (adaptedInput: unknown) => unknown,
): unknown {
	const nestedRules = rules.filter(
		(rule) =>
			rule.objectOptionIndex === optionIndex &&
			!isTopLevelCardinalityPath(rule.path),
	);

	if (nestedRules.length === 0) {
		return output;
	}

	const result = structuredClone(output);

	for (const rule of nestedRules) {
		forEachConcreteArrayAtPath(input, rule.path, (array, wildcardIndexes) => {
			if (array.length <= 1) {
				return;
			}

			const items = array.map((element) => {
				const adapted = adaptNestedElementInput(
					input,
					optionIndex,
					rules,
					rule,
					wildcardIndexes,
					element,
				);
				return getAtPathWithWildcardIndexes(
					run(adapted),
					rule.path,
					wildcardIndexes,
				);
			});

			setAtPathWithWildcardIndexes(result, rule.path, wildcardIndexes, items);
		});
	}

	return result;
}

export async function rehydrateNestedObjectArraysAsync(
	input: unknown,
	output: unknown,
	optionIndex: number,
	rules: readonly CardinalityRule[],
	run: (adaptedInput: unknown) => Promise<unknown>,
): Promise<unknown> {
	const nestedRules = rules.filter(
		(rule) =>
			rule.objectOptionIndex === optionIndex &&
			!isTopLevelCardinalityPath(rule.path),
	);

	if (nestedRules.length === 0) {
		return output;
	}

	const result = structuredClone(output);

	for (const rule of nestedRules) {
		const jobs: Promise<void>[] = [];

		forEachConcreteArrayAtPath(input, rule.path, (array, wildcardIndexes) => {
			if (array.length <= 1) {
				return;
			}

			jobs.push(
				(async () => {
					const items = await Promise.all(
						array.map(async (element) => {
							const adapted = adaptNestedElementInput(
								input,
								optionIndex,
								rules,
								rule,
								wildcardIndexes,
								element,
							);
							return getAtPathWithWildcardIndexes(
								await run(adapted),
								rule.path,
								wildcardIndexes,
							);
						}),
					);

					setAtPathWithWildcardIndexes(
						result,
						rule.path,
						wildcardIndexes,
						items,
					);
				})(),
			);
		});

		await Promise.all(jobs);
	}

	return result;
}
