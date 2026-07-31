import {
	ARRAY_PATH_WILDCARD,
	collectFieldSchemas,
	getMetadata,
	isArrayLikeSchema,
	walkSchema,
} from "@node-zugferd/data-types";
import type { ParseContext } from "./types";
import type { XPathMethods, XPathNode } from "./xpath";
import { unwrapSchema } from "@node-zugferd/data-types";
import type { IdentifierSchema } from "@node-zugferd/data-types";
import { base64 } from "@node-zugferd/utils";
import type { QuantitySchema } from "@node-zugferd/data-types";
import type { AmountSchema } from "@node-zugferd/data-types";

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
		return xpathParts.slice(0, schemaSegments.length + 1).join("/");
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
			return direct;
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

type InferAssertedType<T> = T extends "string"
	? string
	: T extends "number"
		? number
		: T extends "bigint"
			? bigint
			: T extends "boolean"
				? boolean
				: T extends "symbol"
					? symbol
					: T extends "undefined"
						? undefined
						: T extends "object"
							? object
							: T extends "function"
								? Function
								: T;

const assertType = <
	T extends
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function"
		| (new (
				...args: any[]
		  ) => any),
>(
	value: unknown,
	type: T,
	path?: string | undefined,
	cfg?:
		| {
				received?: string | undefined;
				expected?: string | undefined;
		  }
		| undefined,
): value is InferAssertedType<T> => {
	let expected: string = typeof type === "string" ? type : type.name;
	let received: string = typeof value;

	let valid = false;
	if (typeof type === "string") {
		if (type === "number" && Number.isNaN(Number(value))) {
			received = "NaN";
			valid = false;
		} else {
			valid = typeof value === type;
		}
	} else if (value instanceof (type as any)) {
		valid = true;
	}
	if (!valid) {
		expected = cfg?.expected ?? expected;
		received = cfg?.received ?? received;

		throw new TypeError(
			`Expected value of type "${expected}", but got "${received}"${path ? ` at "${path}"` : ""}`,
		);
	}
	return true;
};

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
		transformValue?: ((value: any) => any) | undefined,
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
					throw new Error(
						`Expected array at "${path.slice(0, i).join(".")}" instead got ${typeof current}`,
					);
				}

				current[index] ??= {};
				current = current[index] as Record<string, unknown>;

				continue;
			}

			const nextSegment = path[i + 1];
			const currentObject = current as Record<string, unknown>;

			if (isLeaf) {
				currentObject[segment] = transformValue ? transformValue(value) : value;
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
			if (isArrayLikeSchema(schema)) return;

			const selector = getSelector(metadata);

			if (!selector) return;

			const node = resolveFieldNode(xpath, fields, path, indexes, selector);

			if (!node) return;

			const unwrappedSchema = unwrapSchema(schema);
			const isSchemaType = (type: string) =>
				unwrappedSchema.kind === "schema" && unwrappedSchema.type === type;

			assignByPath(path, node.original, indexes, (value) => {
				if (
					isSchemaType("text") ||
					isSchemaType("code") ||
					isSchemaType("literal")
				) {
					const result = value["#"] ?? value;
					assertType(result, "string");
					return result;
				}
				if (isSchemaType("quantity")) {
					const result: Record<string, any> = {
						value: Number(value["#"] ?? value),
						unitCode: value["@unitCode"],
					};
					const quantitySchema = unwrappedSchema as QuantitySchema<any>;
					assertType(result.value, "number");
					if (quantitySchema.config?.requireUnitCode !== "never") {
						if (quantitySchema.config?.requireUnitCode === "always") {
							assertType(result.unitCode, "string");
						} else if (result.unitCode !== undefined) {
							assertType(result.unitCode, "string", undefined, {
								expected: "string | undefined",
							});
						} else {
							delete result.unitCode;
						}
					} else {
						assertType(result.unitCode, "undefined");
						delete result.unitCode;
					}
					return result;
				}
				if (isSchemaType("unit-price-amount") || isSchemaType("percentage")) {
					const result = Number(value["#"] ?? value);
					assertType(result, "number");
					if (isSchemaType("percentage") && (result < 0 || result > 100)) {
						throw new TypeError(
							`Expected value of type "percentage" to be between 0 and 100, but got "${result}".`,
						);
					}
					return result;
				}
				if (isSchemaType("amount")) {
					const result: Record<string, any> = {
						value: Number(value["#"] ?? value),
						currency: value["@currencyID"],
					};
					const amountSchema = unwrappedSchema as AmountSchema<any>;
					assertType(result.value, "number");
					if (amountSchema.config.requireCurrency !== "never") {
						if (amountSchema.config.requireCurrency === "always") {
							assertType(result.currency, "string");
						} else if (result.currency !== undefined) {
							assertType(result.currency, "string", undefined, {
								expected: "string | undefined",
							});
						} else {
							delete result.currency;
						}
					} else {
						assertType(result.currency, "undefined");
						delete result.currency;
					}
					return result;
				}
				if (isSchemaType("boolean")) {
					const val = value["#"] ?? value;
					if (val === "true" || val === true) {
						return true;
					} else if (val === "false" || val === false) {
						return false;
					}
					throw new TypeError(
						`Expected value of type "boolean", but got "${val}".`,
					);
				}
				if (isSchemaType("identifier")) {
					const result: Record<string, string> = {
						value: value["#"] ?? value,
					};
					const identifierSchema = unwrappedSchema as IdentifierSchema<
						any,
						any
					>;

					if (
						value["@schemeID"] &&
						identifierSchema.config?.requireSchemeId !== "never"
					) {
						assertType(value["@schemeID"], "string");
						result["schemeId"] = value["@schemeID"];
					}
					if (
						value["@schemeVersion"] &&
						identifierSchema.config?.requireSchemeVersion !== "never"
					) {
						assertType(value["@schemeVersion"], "string");
						result["schemeVersion"] = value["@schemeVersion"];
					}

					assertType(result.value, "string");
					if (Object.keys(result).length === 1) {
						return result.value;
					}
					return result;
				}
				if (isSchemaType("date")) {
					const str = value["#"];
					const format = value["@format"];
					assertType(str, "string");

					let hour = 0;
					let minute = 0;
					const year = Number(str.slice(0, 4));
					const month = Number(str.slice(4, 6)) - 1;
					const day = Number(str.slice(6, 8)) + 1;
					if (format === "204") {
						hour = Number(str.slice(8, 10));
						minute = Number(str.slice(10, 12));
					}
					return new Date(year, month, day, hour, minute);
				}
				if (isSchemaType("binary_object")) {
					const mimeType = value["@mimeCode"];
					const filename = value["@filename"];
					const content = value["#"];
					assertType(mimeType, "string");
					assertType(filename, "string");
					assertType(content, "string");
					const file = new File([base64.decode(content)], filename, {
						type: mimeType,
					});
					(file as any).toJSON = () => ({
						filename: file.name,
						mimeType: file.type,
						size: file.size,
					});
					return file;
				}
				return value;
			});
		},
		{
			resolveArrayLength: (arrayPath, indexes) =>
				resolveArrayLength(xpath, fields, arrayPath, indexes),
		},
	);

	return result as R;
}
