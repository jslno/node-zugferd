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
		if (isNullishSchema(current)) {
			current = current.wrapped;
			continue;
		}

		if (isPipeSchema(current)) {
			current = current.pipe[0];
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

export type WalkSchemaOptions = {
	resolveArrayLength?: (
		arrayPath: readonly string[],
		indexes: readonly number[],
	) => number;
};

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
		for (const option of schema.options) {
			walkSchemaFields(option, basePath, indexes, cb, resolveArrayLength);
		}

		return;
	}

	const entries = getObjectEntries(schema);

	if (!entries) {
		return;
	}

	for (const key in entries) {
		const entrySchema = entries[key]!;
		const path = [...basePath, key];

		cb({
			path,
			schema: entrySchema,
			metadata: getMetadata(entrySchema),
			indexes,
		});

		if (isObjectLikeSchema(entrySchema)) {
			walkSchemaFields(entrySchema, path, indexes, cb, resolveArrayLength);
		} else if (isArrayLikeSchema(entrySchema)) {
			const itemSchema = getArrayItemSchema(entrySchema);

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
		}
	}
}

export function collectFieldSchemas(
	schema: AnySchema,
	basePath: readonly string[] = [],
): Map<string, FieldSchemaEntry> {
	if (isIntersectSchema(schema)) {
		const merged = new Map<string, FieldSchemaEntry>();

		for (const option of schema.options) {
			for (const [pathKey, entry] of collectFieldSchemas(option, basePath)) {
				merged.set(pathKey, entry);
			}
		}

		return merged;
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
