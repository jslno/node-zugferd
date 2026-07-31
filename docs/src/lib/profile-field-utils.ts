import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import type { FieldSchemaEntry } from "@node-zugferd/data-types";
import {
	ARRAY_PATH_WILDCARD,
	collectFieldSchemas,
	getMetadata,
} from "@node-zugferd/data-types";

export type { FieldSchemaEntry };

export type FieldCardinality = "0..1" | "1..1" | "0..n" | "1..n";
export type FieldDataType =
	| "boolean"
	| "text"
	| "date"
	| "amount"
	| "code"
	| "identifier"
	| "quantity"
	| "percentage"
	| "binary-object"
	| "unit-price-amount";

export type FieldMeta = {
	id: string | string[];
	businessTerm: string;
	cardinality?: FieldCardinality | undefined;
	description?: string | undefined;
	usageNote?: string | undefined;
	xpath: string;
	businessRule?: string | undefined;
	cius?: string | undefined;
	dataType?: FieldDataType | undefined;
};

export type AnySchema =
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;

export const mergeIds = (
	a: string | string[],
	b: string | string[] | undefined,
) => {
	if (!b || b.length === 0) return a;

	return [
		...new Set([
			...(Array.isArray(a) ? a : [a]),
			...(Array.isArray(b) ? b : [b]),
		]),
	];
};

export function unwrapSchema(schema: AnySchema): AnySchema {
	let current = schema;

	while (true) {
		if (current.type === "nullish" && "wrapped" in current) {
			current = current.wrapped as AnySchema;
			continue;
		}

		if ("pipe" in current && Array.isArray(current.pipe)) {
			current = current.pipe[0] as AnySchema;
			continue;
		}

		break;
	}

	return current;
}

export function isArrayLikeSchema(schema: AnySchema): boolean {
	const unwrapped = unwrapSchema(schema);
	return unwrapped.type === "array" || unwrapped.type === "as_array";
}

export function collectProfileFields(schema: AnySchema) {
	return collectFieldSchemas(schema);
}

function pathKey(basePath: readonly string[]): string {
	return basePath.join(".");
}

export function resolveChildPath(
	fields: Map<string, FieldSchemaEntry>,
	basePath: readonly string[],
	childKey: string,
): readonly string[] {
	const directPath = [...basePath, childKey];
	if (fields.has(pathKey(directPath))) {
		return directPath;
	}

	const arrayPath = [...basePath, ARRAY_PATH_WILDCARD, childKey];
	if (fields.has(pathKey(arrayPath))) {
		return arrayPath;
	}

	return directPath;
}

function resolveChildSchema(
	fields: Map<string, FieldSchemaEntry>,
	basePath: readonly string[],
	childKey: string,
): AnySchema | undefined {
	const childPath = resolveChildPath(fields, basePath, childKey);
	return fields.get(pathKey(childPath))?.schema;
}

export function getProfileTreeChildren(
	fields: Map<string, FieldSchemaEntry>,
	basePath: readonly string[] = [],
): Record<string, AnySchema> {
	const prefix = basePath.length ? `${pathKey(basePath)}.` : "";
	const childKeys = new Set<string>();

	for (const fieldPath of fields.keys()) {
		if (basePath.length > 0 && !fieldPath.startsWith(prefix)) {
			continue;
		}

		if (basePath.length === 0 && fieldPath.includes(".")) {
			continue;
		}

		const relative =
			basePath.length > 0 ? fieldPath.slice(prefix.length) : fieldPath;
		if (!relative) continue;

		if (relative.startsWith(`${ARRAY_PATH_WILDCARD}.`)) {
			childKeys.add(
				relative.slice(ARRAY_PATH_WILDCARD.length + 1).split(".")[0]!,
			);
			continue;
		}

		childKeys.add(relative.split(".")[0]!);
	}

	const children: Record<string, AnySchema> = {};

	for (const childKey of childKeys) {
		const schema = resolveChildSchema(fields, basePath, childKey);
		if (schema) {
			children[childKey] = schema;
		}
	}

	return children;
}

export function getSchemaMetadata(schema: AnySchema): Record<string, unknown> {
	if (schema.type === "intersect" && "options" in schema) {
		return (schema.options as AnySchema[]).reduce<Record<string, unknown>>(
			(acc, option) => ({ ...acc, ...getSchemaMetadata(option) }),
			{},
		);
	}

	return getMetadata(schema);
}

export function resolveFieldMeta(
	metadata: Record<string, unknown>,
	metaMap: Map<string, Partial<FieldMeta>>,
): FieldMeta | undefined {
	if (!("id" in metadata) || metadata.id === undefined) {
		return undefined;
	}

	const ids = Array.isArray(metadata.id) ? metadata.id : [metadata.id];

	for (const id of ids) {
		const meta = metaMap.get(id);
		if (meta) return meta as FieldMeta;
	}

	return undefined;
}
