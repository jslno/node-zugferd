import type {
	AmountSchema,
	IdentifierSchema,
	QuantitySchema,
} from "@node-zugferd/data-types";
import {
	ARRAY_PATH_WILDCARD,
	collectFieldSchemas,
	getMetadata,
	isArrayLikeSchema,
	unwrapSchema,
	walkSchema,
} from "@node-zugferd/data-types";
import { base64 } from "@node-zugferd/utils";
import type { ParseContext } from "./types";
import type { XPathMethods, XPathNode } from "./xpath";

function getSelector(metadata: Record<string, unknown>): string | undefined {
	const xpath = metadata.xpath;

	if (!xpath) {
		return undefined;
	}

	return Array.isArray(xpath) ? xpath[0] : String(xpath);
}

/** xmlbuilder2 object mode keeps entity escapes in text nodes. */
function decodeXmlEntities(value: string): string {
	return value
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, "&");
}

/**
 * xmlbuilder2 represents empty elements as `{}` and text+attrs as
 * `{ "#": "…", "@attr": "…" }`. Plain strings are returned as-is.
 */
function readXmlText(value: unknown): unknown {
	if (typeof value === "string" || value == null) {
		return value;
	}

	if (typeof value === "object" && !Array.isArray(value)) {
		const record = value as Record<string, unknown>;

		if ("#" in record) {
			return record["#"] ?? "";
		}

		const keys = Object.keys(record);
		if (keys.length === 0 || keys.every((key) => key.startsWith("@"))) {
			return "";
		}
	}

	return value;
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

function _parentPathKey(pathKey: string): string | undefined {
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
	let previousAbsolute: string | undefined;
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
		const absolute = getAbsoluteSelector(fields, partialKey);
		let selector = segment;

		if (absolute) {
			if (previousAbsolute && absolute.startsWith(`${previousAbsolute}/`)) {
				selector = absolute.slice(previousAbsolute.length + 1);
			} else if (cursor === 0) {
				selector = absolute;
			} else {
				// Nested array whose absolute path is not under the previous
				// absolute — try stripping known ancestor prefixes from fields.
				const ancestor = previousAbsolute;
				selector = absolute.replace(/^\//, "");
				if (ancestor && absolute.startsWith(`${ancestor}/`)) {
					selector = absolute.slice(ancestor.length + 1);
				}
			}
			previousAbsolute = absolute;
		}

		const nodes = current.querySelectorAll(selector);
		const index = indexes[cursor++];

		if (index === undefined) {
			return null;
		}

		const next = nodes[index];

		if (!next) {
			return null;
		}

		current = next;

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

/**
 * `navigateToPath` only descends through array segments. For a nested array
 * like `line.*.priceDetails.grossPrice.discount`, the navigable ancestor is
 * `line` (not `grossPrice`), and relative xpaths must be rooted there.
 */
function nearestNavigableAncestorKey(
	arrayPath: readonly string[],
): string | undefined {
	const parentSegments = arrayPath.slice(0, -1);
	const wildcardIndex = parentSegments.lastIndexOf(ARRAY_PATH_WILDCARD);

	if (wildcardIndex === -1) {
		return parentSegments.length > 0 ? pathKey(parentSegments) : undefined;
	}

	return pathKey(parentSegments.slice(0, wildcardIndex));
}

function resolveArrayLength(
	xpath: XPathMethods,
	fields: Map<string, { path: readonly string[]; schema: unknown }>,
	arrayPath: readonly string[],
	indexes: readonly number[],
): number {
	const key = pathKey(arrayPath);
	const segment = arrayFieldSegment(key);
	const absoluteSelector = getAbsoluteSelector(fields, key) ?? segment;
	const parentSegments = arrayPath.slice(0, -1);

	// Arrays not nested under another array can be counted from the document root.
	if (
		parentSegments.length === 0 ||
		!parentSegments.includes(ARRAY_PATH_WILDCARD)
	) {
		return xpath.querySelectorAll(absoluteSelector).length;
	}

	const ancestorKey = nearestNavigableAncestorKey(arrayPath);

	if (!ancestorKey) {
		return xpath.querySelectorAll(absoluteSelector).length;
	}

	const parentNode = navigateToPath(xpath, fields, ancestorKey, indexes);

	if (!parentNode) {
		return 0;
	}

	const ancestorSelector = getAbsoluteSelector(fields, ancestorKey);

	if (ancestorSelector && absoluteSelector.startsWith(`${ancestorSelector}/`)) {
		return parentNode.querySelectorAll(
			absoluteSelector.slice(ancestorSelector.length + 1),
		).length;
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

	// asArray/array of scalars: the leaf path ends at `*` and the array
	// element node is the field value itself.
	if (lastWildcardIndex === path.length - 1) {
		return parentNode;
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

function assertType<
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
): asserts value is InferAssertedType<T> {
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
}

export function parseFromSchema<R = Record<string, unknown>>({
	profile,
	xml,
	xpath,
	context,
	decodeEntities = false,
}: Omit<ParseContext, "pdf">): R {
	const fields = collectFieldSchemas(profile.schema);
	const result: Record<string, unknown> = {};
	const maybeDecode = (value: string) =>
		decodeEntities ? decodeXmlEntities(value) : value;

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

				// asArray/array of scalars: path ends at `*` and the item IS the value.
				if (isLeaf) {
					current[index] = transformValue ? transformValue(value) : value;
					return;
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

			// Scalar asArray/array items often inherit xpath from the array field.
			const selector =
				getSelector(metadata) ??
				(path.at(-1) === ARRAY_PATH_WILDCARD
					? getAbsoluteSelector(fields, navigationPathKey(pathKey(path)))
					: undefined);

			if (!selector) return;

			const node = resolveFieldNode(xpath, fields, path, indexes, selector);

			if (!node) return;

			const unwrappedSchema = unwrapSchema(schema);
			const isSchemaType = (type: string) =>
				unwrappedSchema.kind === "schema" && unwrappedSchema.type === type;

			assignByPath(path, node.original, indexes, (value) => {
				const fieldPath = pathKey(path);
				// `text()` / `documentReference()` are typed as "string" with a subType.
				if (
					isSchemaType("string") ||
					isSchemaType("code") ||
					isSchemaType("literal")
				) {
					const result = readXmlText(value);
					assertType(result, "string", fieldPath, {
						received:
							result && typeof result === "object"
								? `object(${Object.keys(result as object).join(",")})`
								: undefined,
					});
					return maybeDecode(result);
				}
				if (isSchemaType("quantity")) {
					const result: Record<string, any> = {
						value: Number(readXmlText(value)),
					};
					const quantitySchema = unwrappedSchema as QuantitySchema<any>;
					assertType(result.value, "number");
					const unitCode = value["@unitCode"];
					if (quantitySchema.config?.requireUnitCode !== "never") {
						if (quantitySchema.config?.requireUnitCode === "always") {
							assertType(unitCode, "string");
							result.unitCode = unitCode;
						} else if (unitCode !== undefined) {
							assertType(unitCode, "string", undefined, {
								expected: "string | undefined",
							});
							result.unitCode = unitCode;
						}
					} else {
						assertType(unitCode, "undefined");
					}
					return result;
				}
				if (isSchemaType("unit-price-amount") || isSchemaType("percentage")) {
					const result = Number(readXmlText(value));
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
						value: Number(readXmlText(value)),
					};
					const amountSchema = unwrappedSchema as AmountSchema<any>;
					assertType(result.value, "number");
					const currency = value["@currencyID"];
					if (amountSchema.config.requireCurrency !== "never") {
						if (amountSchema.config.requireCurrency === "always") {
							assertType(currency, "string");
							result.currency = currency;
						} else if (currency !== undefined) {
							assertType(currency, "string", undefined, {
								expected: "string | undefined",
							});
							result.currency = currency;
						}
					} else {
						assertType(currency, "undefined");
					}
					return result;
				}
				if (isSchemaType("boolean")) {
					const val = readXmlText(value);
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
					const rawValue = readXmlText(value);
					assertType(rawValue, "string", fieldPath, {
						received:
							rawValue && typeof rawValue === "object"
								? `object(${Object.keys(rawValue as object).join(",")})`
								: undefined,
					});
					const result: Record<string, string> = {
						value: maybeDecode(rawValue),
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

					if (Object.keys(result).length === 1) {
						return result.value;
					}
					return result;
				}
				if (isSchemaType("date")) {
					const str = readXmlText(value);
					const format =
						value && typeof value === "object"
							? (value as Record<string, unknown>)["@format"]
							: undefined;
					assertType(str, "string", fieldPath);

					let hour = 0;
					let minute = 0;
					const year = Number(str.slice(0, 4));
					const month = Number(str.slice(4, 6)) - 1;
					const day = Number(str.slice(6, 8));
					if (format === "204") {
						hour = Number(str.slice(8, 10));
						minute = Number(str.slice(10, 12));
					}
					const date =
						format === "102" || (hour === 0 && minute === 0 && !format)
							? new Date(Date.UTC(year, month, day))
							: new Date(year, month, day, hour, minute);
					return {
						format: typeof format === "string" ? format : "102",
						value: date,
						raw: str,
					};
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
