import {
	ARRAY_PATH_WILDCARD,
	collectFieldSchemas,
	getMetadata,
	isArrayLikeSchema,
	isObjectLikeSchema,
	walkSchema,
} from "@node-zugferd/data-types";
import type { ParseContext } from "./types";
import type { XPathMethods, XPathNode } from "./xpath";

function getSelector(metadata: Record<string, unknown>): string | undefined {
	const id = metadata.xpath ?? metadata.id;

	if (!id) {
		return undefined;
	}

	return Array.isArray(id) ? id[0] : String(id);
}

function pathKey(path: readonly string[]): string {
	return path.join(".");
}

function schemaPathSegments(pathKey: string): string[] {
	return pathKey
		.split(".")
		.filter((segment) => segment !== ARRAY_PATH_WILDCARD);
}

function stripSelectorToPath(selector: string, pathKey: string): string {
	const schemaSegments = schemaPathSegments(pathKey);
	const lastSchemaSegment = schemaSegments[schemaSegments.length - 1];

	if (!lastSchemaSegment) {
		return selector;
	}

	const xpathParts = selector.split("/");
	const segmentIndex = xpathParts.indexOf(lastSchemaSegment);

	if (segmentIndex === -1) {
		return xpathParts.slice(0, schemaSegments.length).join("/");
	}

	return xpathParts.slice(0, segmentIndex + 1).join("/");
}

function getAbsoluteSelector(
	fields: Map<string, { path: readonly string[]; schema: unknown }>,
	pathKey: string,
): string | undefined {
	const entry = fields.get(pathKey);

	if (entry) {
		const direct = getSelector(getMetadata(entry.schema as never));

		if (direct) {
			return stripSelectorToPath(direct, pathKey);
		}
	}

	const prefix = `${pathKey}.`;

	for (const [key, { schema }] of fields) {
		if (!key.startsWith(prefix)) {
			continue;
		}

		const descendant = getSelector(getMetadata(schema as never));

		if (descendant) {
			return stripSelectorToPath(descendant, pathKey);
		}
	}

	return undefined;
}

function parentPathKey(pathKey: string): string | undefined {
	const wildcardIndex = pathKey.lastIndexOf(`.${ARRAY_PATH_WILDCARD}`);

	if (wildcardIndex === -1) {
		return undefined;
	}

	return pathKey.slice(0, wildcardIndex);
}

function arrayFieldSegment(pathKey: string): string {
	if (pathKey.includes(`.${ARRAY_PATH_WILDCARD}.`)) {
		return pathKey.split(`.${ARRAY_PATH_WILDCARD}.`).pop()!.split(".")[0]!;
	}

	return pathKey.split(".").pop()!;
}

function navigateToPath(
	xpath: XPathMethods,
	fields: Map<string, { path: readonly string[]; schema: unknown }>,
	pathKey: string,
	indexes: readonly number[] = [],
): XPathNode | null {
	let current: XPathMethods = xpath;
	let cursor = 0;
	const segments = pathKey.split(".");
	const builtPath: string[] = [];

	for (let i = 0; i < segments.length; i++) {
		const segment = segments[i]!;

		if (segment === ARRAY_PATH_WILDCARD) {
			continue;
		}

		builtPath.push(segment);
		const nextSegment = segments[i + 1];
		const selectsArrayItem =
			nextSegment === ARRAY_PATH_WILDCARD ||
			(i === segments.length - 1 && cursor < indexes.length);

		if (!selectsArrayItem) {
			continue;
		}

		const partialKey = builtPath.join(".");
		const selector =
			cursor === 0
				? (getAbsoluteSelector(fields, partialKey) ?? segment)
				: segment;
		const nodes = current.querySelectorAll(selector);
		const index = indexes[cursor++];

		if (index === undefined) {
			return null;
		}

		current = nodes[index] ?? xpath;

		if (!current) {
			return null;
		}

		if (nextSegment === ARRAY_PATH_WILDCARD) {
			builtPath.push(ARRAY_PATH_WILDCARD);
			i++;
		}
	}

	return current as XPathNode;
}

function navigationPathKey(pathKey: string): string {
	if (pathKey.endsWith(`.${ARRAY_PATH_WILDCARD}`)) {
		return pathKey.slice(0, -(ARRAY_PATH_WILDCARD.length + 1));
	}

	return pathKey;
}

function resolveArrayLength(
	xpath: XPathMethods,
	fields: Map<string, { path: readonly string[]; schema: unknown }>,
	arrayPath: readonly string[],
	indexes: readonly number[],
): number {
	const key = pathKey(arrayPath);
	const parentKey = parentPathKey(key);
	const segment = arrayFieldSegment(key);

	if (!parentKey) {
		const selector = getAbsoluteSelector(fields, key) ?? segment;

		return xpath.querySelectorAll(selector).length;
	}

	const parentNode = navigateToPath(xpath, fields, parentKey, indexes);

	if (!parentNode) {
		return 0;
	}

	return parentNode.querySelectorAll(segment).length;
}

function resolveFieldNode(
	xpath: XPathMethods,
	fields: Map<string, { path: readonly string[]; schema: unknown }>,
	path: readonly string[],
	indexes: readonly number[],
	selector: string,
): XPathNode | null {
	const wildcardCount = path.filter(
		(segment) => segment === ARRAY_PATH_WILDCARD,
	).length;

	if (wildcardCount === 0) {
		return xpath.querySelector(selector);
	}

	const lastWildcardIndex = path.lastIndexOf(ARRAY_PATH_WILDCARD);
	const parentPath = path.slice(0, lastWildcardIndex + 1);
	const parentKey = navigationPathKey(pathKey(parentPath));
	const parentNode = navigateToPath(xpath, fields, parentKey, indexes);

	if (!parentNode) {
		return null;
	}

	const parentSelector = getAbsoluteSelector(fields, parentKey);

	if (!parentSelector || !selector.startsWith(`${parentSelector}/`)) {
		return parentNode.querySelector(selector);
	}

	return parentNode.querySelector(selector.slice(parentSelector.length + 1));
}

export function parseFromSchema<R = Record<string, unknown>>({
	profile,
	xml,
	xpath,
	context,
}: Omit<ParseContext, "pdf">): R {
	const fields = collectFieldSchemas(profile.schema);
	const result: Record<string, unknown> = {};

	const assignByPath = (
		path: readonly string[],
		value: unknown,
		indexes: readonly number[],
	) => {
		let current: Record<string, unknown> | unknown[] = result;
		let cursor = 0;

		for (let i = 0; i < path.length; i++) {
			const segment = path[i]!;
			const isLeaf = i === path.length - 1;

			if (segment === ARRAY_PATH_WILDCARD) {
				const index = indexes[cursor++];

				if (index === undefined) {
					throw new Error(`Missing array index for path "${path.join(".")}"`);
				}

				if (!Array.isArray(current)) {
					throw new Error(`Expected array at "${path.slice(0, i).join(".")}"`);
				}

				current[index] ??= {};
				current = current[index] as Record<string, unknown>;

				continue;
			}

			const nextSegment = path[i + 1];
			const currentObject = current as Record<string, unknown>;

			if (isLeaf) {
				currentObject[segment] = value;
				return;
			}

			if (nextSegment === ARRAY_PATH_WILDCARD) {
				currentObject[segment] ??= [];
			} else {
				currentObject[segment] ??= {};
			}

			current = currentObject[segment] as Record<string, unknown> | unknown[];
		}
	};

	walkSchema(
		profile.schema,
		({ schema, metadata, path, indexes }) => {
			if (
				isArrayLikeSchema(schema) ||
				(isObjectLikeSchema(schema) && !("entries" in schema.entries))
			) {
				return;
			}

			const selector = getSelector(metadata);

			if (!selector) {
				return;
			}

			const node = resolveFieldNode(xpath, fields, path, indexes, selector);

			if (!node) {
				return;
			}

			assignByPath(path, node.original, indexes);
		},
		{
			resolveArrayLength: (arrayPath, indexes) =>
				resolveArrayLength(xpath, fields, arrayPath, indexes),
		},
	);

	return result as R;
}
