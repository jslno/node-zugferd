import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import { getMetadata } from "../methods";
import type { ObjectEntries, ObjectEntriesAsync } from "../schemas/object";

type AnySchema =
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;

type ObjectLikeSchema = {
	readonly type: "object";
	readonly entries: ObjectEntries | ObjectEntriesAsync;
};

function isNullishSchema(
	schema: AnySchema,
): schema is AnySchema & { wrapped: AnySchema } {
	return schema.type === "nullish" && "wrapped" in schema;
}

function isPipeSchema(
	schema: AnySchema,
): schema is AnySchema & { pipe: readonly [AnySchema, ...unknown[]] } {
	return "pipe" in schema && Array.isArray(schema.pipe);
}

export function unwrapSchema(schema: AnySchema): AnySchema {
	let current: AnySchema = schema;

	while (true) {
		if (isPipeSchema(current)) {
			current = current.pipe[0]!;
			continue;
		}

		if (isNullishSchema(current)) {
			current = current.wrapped;
			continue;
		}

		break;
	}

	return current;
}

export function isObjectLikeSchema(
	schema: AnySchema,
): schema is AnySchema & ObjectLikeSchema {
	const unwrapped = unwrapSchema(schema);
	return unwrapped.type === "object" && "entries" in unwrapped;
}

export function isArrayLikeSchema(schema: AnySchema): boolean {
	const unwrapped = unwrapSchema(schema);
	return unwrapped.type === "array" || unwrapped.type === "as_array";
}

export const ARRAY_PATH_WILDCARD = "*";

export function getArrayItemSchema(schema: AnySchema): AnySchema | undefined {
	const unwrapped = unwrapSchema(schema);

	if (unwrapped.type === "array" || unwrapped.type === "as_array") {
		return (unwrapped as any).item;
	}

	return undefined;
}

export function getObjectEntries(
	schema: AnySchema,
): ObjectEntries | ObjectEntriesAsync | undefined {
	const unwrapped = unwrapSchema(schema);

	if (!isObjectLikeSchema(unwrapped)) {
		return undefined;
	}

	return unwrapped.entries;
}

export type FieldSchemaEntry = {
	readonly path: readonly string[];
	readonly schema: AnySchema;
};

export function isIntersectSchema(schema: AnySchema): schema is AnySchema & {
	readonly options: readonly AnySchema[];
} {
	const unwrapped = unwrapSchema(schema);
	return (
		unwrapped.type === "intersect" &&
		"options" in unwrapped &&
		Array.isArray(unwrapped.options)
	);
}

function getIntersectOptions(schema: AnySchema): readonly AnySchema[] {
	const unwrapped = unwrapSchema(schema);
	return (unwrapped as AnySchema & { options: readonly AnySchema[] }).options;
}

function flattenIntersectOptions(schema: AnySchema): AnySchema[] {
	if (isIntersectSchema(schema)) {
		return getIntersectOptions(schema).flatMap(flattenIntersectOptions);
	}

	return [schema];
}

type MergedField = {
	readonly fieldSchema: AnySchema;
	/** Merged item schema when object profiles were upgraded to arrays. */
	readonly walkItemSchema?: AnySchema;
};

function replaceArrayItem(schema: AnySchema, item: AnySchema): AnySchema {
	if (isPipeSchema(schema)) {
		return {
			...schema,
			pipe: [replaceArrayItem(schema.pipe[0]!, item), ...schema.pipe.slice(1)],
		} as unknown as AnySchema;
	}

	if (isNullishSchema(schema)) {
		return {
			...schema,
			wrapped: replaceArrayItem(schema.wrapped, item),
		} as unknown as AnySchema;
	}

	const unwrapped = unwrapSchema(schema);

	if (unwrapped.type === "as_array" || unwrapped.type === "array") {
		return {
			...unwrapped,
			item,
		} as unknown as AnySchema;
	}

	return schema;
}

function synthesizeObjectSchema(
	entries: ObjectEntries | ObjectEntriesAsync,
): AnySchema {
	return {
		kind: "schema",
		type: "object",
		async: false,
		expects: "Object",
		entries,
	} as unknown as AnySchema;
}

function mergeObjectSchemas(a: AnySchema, b: AnySchema): AnySchema {
	const aEntries = getObjectEntries(a) ?? {};
	const bEntries = getObjectEntries(b) ?? {};
	const merged: Record<string, AnySchema> = { ...aEntries };

	for (const key of Object.keys(bEntries)) {
		const prev = merged[key];
		const next = bEntries[key]!;

		if (!prev) {
			merged[key] = next;
			continue;
		}

		const combined = mergeMergedField({ fieldSchema: prev }, next);
		merged[key] =
			combined.walkItemSchema && isArrayLikeSchema(combined.fieldSchema)
				? replaceArrayItem(combined.fieldSchema, combined.walkItemSchema)
				: combined.fieldSchema;
	}

	return synthesizeObjectSchema(merged);
}

function mergeMergedField(
	prev: MergedField,
	nextSchema: AnySchema,
): MergedField {
	const prevSchema = prev.fieldSchema;

	if (isObjectLikeSchema(prevSchema) && isArrayLikeSchema(nextSchema)) {
		const nextItem = getArrayItemSchema(nextSchema);

		if (!nextItem) {
			return { fieldSchema: nextSchema };
		}

		return {
			fieldSchema: nextSchema,
			walkItemSchema: mergeObjectSchemas(prevSchema, nextItem),
		};
	}

	if (isArrayLikeSchema(prevSchema) && isObjectLikeSchema(nextSchema)) {
		const prevItem =
			prev.walkItemSchema ?? getArrayItemSchema(prevSchema) ?? nextSchema;

		return {
			fieldSchema: prevSchema,
			walkItemSchema: mergeObjectSchemas(prevItem, nextSchema),
		};
	}

	if (isArrayLikeSchema(prevSchema) && isArrayLikeSchema(nextSchema)) {
		const prevItem = prev.walkItemSchema ?? getArrayItemSchema(prevSchema);
		const nextItem = getArrayItemSchema(nextSchema);

		if (!prevItem || !nextItem) {
			return { fieldSchema: nextSchema };
		}

		if (isObjectLikeSchema(prevItem) || isObjectLikeSchema(nextItem)) {
			return {
				fieldSchema: nextSchema,
				walkItemSchema: mergeObjectSchemas(
					isObjectLikeSchema(prevItem) ? prevItem : synthesizeObjectSchema({}),
					isObjectLikeSchema(nextItem) ? nextItem : synthesizeObjectSchema({}),
				),
			};
		}

		return {
			fieldSchema: nextSchema,
			walkItemSchema: nextItem,
		};
	}

	if (isObjectLikeSchema(prevSchema) && isObjectLikeSchema(nextSchema)) {
		return {
			fieldSchema: mergeObjectSchemas(prevSchema, nextSchema),
		};
	}

	return { fieldSchema: nextSchema };
}

function mergeIntersectEntries(schema: AnySchema): Map<string, MergedField> {
	const merged = new Map<string, MergedField>();

	for (const option of flattenIntersectOptions(schema)) {
		const entries = getObjectEntries(option);

		if (!entries) {
			continue;
		}

		for (const key of Object.keys(entries)) {
			const next = entries[key]!;
			const prev = merged.get(key);
			merged.set(
				key,
				prev ? mergeMergedField(prev, next) : { fieldSchema: next },
			);
		}
	}

	return merged;
}

export type WalkSchemaOptions = {
	resolveArrayLength?: (
		arrayPath: readonly string[],
		indexes: readonly number[],
	) => number;
};

function walkObjectEntries(
	entries: Map<string, MergedField> | (ObjectEntries | ObjectEntriesAsync),
	basePath: readonly string[],
	indexes: readonly number[],
	cb: (ctx: {
		path: readonly string[];
		schema: AnySchema;
		metadata: Record<string, any>;
		indexes: readonly number[];
	}) => void,
	resolveArrayLength?: WalkSchemaOptions["resolveArrayLength"],
) {
	const keys =
		entries instanceof Map ? [...entries.keys()] : Object.keys(entries);

	for (const key of keys) {
		const merged =
			entries instanceof Map
				? entries.get(key)!
				: { fieldSchema: (entries as Record<string, AnySchema>)[key]! };
		const entrySchema = merged.fieldSchema;
		const path = [...basePath, key];

		cb({
			path,
			schema: entrySchema,
			metadata: getMetadata(entrySchema),
			indexes,
		});

		if (isArrayLikeSchema(entrySchema)) {
			const itemSchema =
				merged.walkItemSchema ?? getArrayItemSchema(entrySchema);

			if (!itemSchema) {
				continue;
			}

			const itemPath = [...path, ARRAY_PATH_WILDCARD];

			if (resolveArrayLength) {
				const length = resolveArrayLength(path, indexes);

				for (let index = 0; index < length; index++) {
					walkSchemaFields(
						itemSchema,
						itemPath,
						[...indexes, index],
						cb,
						resolveArrayLength,
					);
				}
			} else {
				walkSchemaFields(itemSchema, itemPath, indexes, cb, resolveArrayLength);
			}
		} else if (isObjectLikeSchema(entrySchema)) {
			walkSchemaFields(entrySchema, path, indexes, cb, resolveArrayLength);
		}
	}
}

function walkSchemaFields(
	schema: AnySchema,
	basePath: readonly string[],
	indexes: readonly number[],
	cb: (ctx: {
		path: readonly string[];
		schema: AnySchema;
		metadata: Record<string, any>;
		indexes: readonly number[];
	}) => void,
	resolveArrayLength?: WalkSchemaOptions["resolveArrayLength"],
) {
	if (isIntersectSchema(schema)) {
		walkObjectEntries(
			mergeIntersectEntries(schema),
			basePath,
			indexes,
			cb,
			resolveArrayLength,
		);
		return;
	}

	const entries = getObjectEntries(schema);

	if (entries) {
		walkObjectEntries(entries, basePath, indexes, cb, resolveArrayLength);
		return;
	}

	if (isArrayLikeSchema(schema)) {
		const itemSchema = getArrayItemSchema(schema);

		if (!itemSchema) {
			return;
		}

		const itemPath = [...basePath, ARRAY_PATH_WILDCARD];

		if (resolveArrayLength) {
			const length = resolveArrayLength(basePath, indexes);

			for (let index = 0; index < length; index++) {
				walkSchemaFields(
					itemSchema,
					itemPath,
					[...indexes, index],
					cb,
					resolveArrayLength,
				);
			}
		} else {
			walkSchemaFields(itemSchema, itemPath, indexes, cb, resolveArrayLength);
		}

		return;
	}

	// Leaf schemas (identifier, text, …) reached via asArray/array items.
	if (basePath.length > 0) {
		cb({
			path: basePath,
			schema,
			metadata: getMetadata(schema),
			indexes,
		});
	}
}

export function collectFieldSchemas(
	schema: AnySchema,
	basePath: readonly string[] = [],
): Map<string, FieldSchemaEntry> {
	if (isIntersectSchema(schema)) {
		const result = new Map<string, FieldSchemaEntry>();

		for (const [key, merged] of mergeIntersectEntries(schema)) {
			const path = [...basePath, key];
			const pathKey = path.join(".");
			const fieldSchema =
				merged.walkItemSchema && isArrayLikeSchema(merged.fieldSchema)
					? replaceArrayItem(merged.fieldSchema, merged.walkItemSchema)
					: merged.fieldSchema;

			result.set(pathKey, { path, schema: fieldSchema });

			if (isArrayLikeSchema(merged.fieldSchema)) {
				const itemSchema =
					merged.walkItemSchema ?? getArrayItemSchema(merged.fieldSchema);

				if (itemSchema) {
					for (const [nestedKey, nestedEntry] of collectFieldSchemas(
						itemSchema,
						[...path, ARRAY_PATH_WILDCARD],
					)) {
						result.set(nestedKey, nestedEntry);
					}
				}
			} else if (isObjectLikeSchema(fieldSchema)) {
				for (const [nestedKey, nestedEntry] of collectFieldSchemas(
					fieldSchema,
					path,
				)) {
					result.set(nestedKey, nestedEntry);
				}
			}
		}

		return result;
	}

	const result = new Map<string, FieldSchemaEntry>();
	const entries = getObjectEntries(schema);

	if (!entries) {
		return result;
	}

	for (const key in entries) {
		const entrySchema = entries[key]!;
		const path = [...basePath, key];
		const pathKey = path.join(".");

		result.set(pathKey, { path, schema: entrySchema });

		if (isObjectLikeSchema(entrySchema)) {
			for (const [nestedKey, nestedEntry] of collectFieldSchemas(
				entrySchema,
				path,
			)) {
				result.set(nestedKey, nestedEntry);
			}
		} else if (isArrayLikeSchema(entrySchema)) {
			const itemSchema = getArrayItemSchema(entrySchema);

			if (itemSchema) {
				const itemPath = [...path, ARRAY_PATH_WILDCARD];

				for (const [nestedKey, nestedEntry] of collectFieldSchemas(
					itemSchema,
					itemPath,
				)) {
					result.set(nestedKey, nestedEntry);
				}
			}
		}
	}

	return result;
}

export function walkSchema(
	schema: AnySchema,
	cb: (ctx: {
		path: readonly string[];
		schema: AnySchema;
		metadata: Record<string, any>;
		indexes: readonly number[];
	}) => void,
	options?: WalkSchemaOptions,
) {
	const seen = new Set<string>();

	walkSchemaFields(
		schema,
		[],
		[],
		(ctx) => {
			const key = `${ctx.path.join(".")}:${ctx.indexes.join(",")}`;

			if (seen.has(key)) {
				return;
			}

			seen.add(key);
			cb(ctx);
		},
		options?.resolveArrayLength,
	);
}
