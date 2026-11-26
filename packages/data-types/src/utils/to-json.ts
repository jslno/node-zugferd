import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import { toJsonSchema } from "@valibot/to-json-schema";
import { getMetadata } from "../methods/get-metadata";
import { getCodelist } from "../storages";

type JsonSchema = Record<string, unknown>;

export function toJSONSchema(
	schema:
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	typeMode: "input" | "output" | "ignore",
	options?: {
		target?: "draft-07" | "draft-2020-12" | "openapi-3.0" | undefined;
	},
): Record<string, unknown> {
	const jsonSchema = toJsonSchema(schema as never, {
		target: options?.target ?? "draft-2020-12",
		typeMode,
		errorMode: "throw",
		overrideSchema(context) {
			const custom = context.valibotSchema as unknown as {
				type: string;
				config?: Record<string, unknown>;
				codelist?: string;
				codelistId?: string;
				literal?: unknown;
				item?: unknown;
				options?: unknown[];
				wrapped?: unknown;
				registryId?: string;
			};

			switch (custom.type) {
				case "as_array":
					return {
						type: "array",
						items: toJSONSchema(
							custom.item as BaseSchema<unknown, unknown, BaseIssue<unknown>>,
							typeMode,
							options,
						),
					};
				case "amount":
				case "quantity": {
					const isQuantity = custom.type === "quantity";
					const requirePrimary = isQuantity
						? custom.config?.requireUnitCode === "always"
						: custom.config?.requireCurrency === "always";
					const forbidPrimary = isQuantity
						? custom.config?.requireUnitCode === "never"
						: custom.config?.requireCurrency === "never";
					const primaryName = isQuantity ? "unitCode" : "currency";

					if (typeMode === "output") {
						const properties: Record<string, unknown> = {
							value: { type: "number" },
						};
						if (!forbidPrimary) {
							properties[primaryName] = isQuantity
								? { type: "string" }
								: codelistSchema("currency");
						}
						return {
							type: "object",
							properties,
							required: ["value", ...(requirePrimary ? [primaryName] : [])],
							additionalProperties: false,
						};
					}

					const objectSchema: JsonSchema = {
						type: "object",
						properties: {
							value: { anyOf: [{ type: "string" }, { type: "number" }] },
							[primaryName]: isQuantity
								? { type: "string" }
								: codelistSchema("currency"),
						},
						required: ["value", ...(requirePrimary ? [primaryName] : [])],
						additionalProperties: false,
					};
					return forbidPrimary
						? { anyOf: [{ type: "string" }, { type: "number" }, objectSchema] }
						: { anyOf: [{ type: "string" }, { type: "number" }, objectSchema] };
				}
				case "percentage":
					return { type: "number", minimum: 0, maximum: 100 };
				case "unit-price-amount":
					return { type: "number" };
				case "date":
					return typeMode === "output"
						? {
								type: "object",
								properties: {
									date: { type: "string", format: "date-time" },
									format: { type: "string" },
									value: { type: "string" },
								},
								required: ["date", "format", "value"],
								additionalProperties: false,
							}
						: {
								anyOf: [
									{ type: "string" },
									{ type: "number" },
									{ type: "string", format: "date-time" },
								],
							};
				case "code":
					return typeMode === "output"
						? {
								type: "object",
								properties: {
									value: codelistSchema(custom.codelistId ?? custom.codelist),
									codelist: { type: "string" },
								},
								required: ["value", "codelist"],
								additionalProperties: false,
							}
						: codelistSchema(custom.codelistId ?? custom.codelist);
				case "identifier":
					return typeMode === "output"
						? {
								type: "object",
								properties: {
									identifier: { type: "string" },
									schemeId: { type: "string" },
									schemeVersion: { type: "string" },
								},
								required: ["identifier"],
								additionalProperties: false,
							}
						: {
								anyOf: [
									{ type: "string" },
									{
										type: "object",
										properties: {
											value: { type: "string" },
											schemeId: { type: "string" },
											schemeVersion: { type: "string" },
										},
										required: ["value"],
										additionalProperties: false,
									},
								],
							};
				case "binary_object":
					return {
						type: "object",
						properties: {
							content: {},
							mimeType: { type: "string" },
							filename: { type: "string" },
						},
						required: ["content", "mimeType", "filename"],
						additionalProperties: false,
					};
				default:
					return undefined;
			}
		},
	}) as Record<string, unknown>;

	const jsonSchemaWithMetadata = {
		...jsonSchema,
		...getSerializableMetadata(getMetadata(schema)),
	};

	return sanitizeJsonSerializable(jsonSchemaWithMetadata) as Record<
		string,
		unknown
	>;
}

function getSerializableMetadata(
	metadata: Record<string, unknown>,
): JsonSchema {
	const result: JsonSchema = {};

	for (const [key, value] of Object.entries(metadata)) {
		try {
			const serialized = JSON.stringify(value);
			if (serialized !== undefined) {
				result[key] = JSON.parse(serialized);
			}
		} catch {
			// Omit values that cannot be represented in JSON Schema JSON.
		}
	}

	return result;
}

const OMIT_JSON_VALUE = Symbol("omit-json-value");

function sanitizeJsonSerializable(
	value: unknown,
	seen = new WeakSet<object>(),
): unknown {
	if (
		value === null ||
		typeof value === "string" ||
		typeof value === "boolean"
	) {
		return value;
	}
	if (typeof value === "number") {
		return Number.isFinite(value) ? value : null;
	}
	if (
		value === undefined ||
		typeof value === "bigint" ||
		typeof value === "symbol" ||
		typeof value === "function"
	) {
		return OMIT_JSON_VALUE;
	}
	if (typeof value !== "object") {
		return OMIT_JSON_VALUE;
	}
	if (seen.has(value)) {
		return OMIT_JSON_VALUE;
	}
	seen.add(value);

	if (Array.isArray(value)) {
		const result: unknown[] = [];
		for (const item of value) {
			const sanitized = sanitizeJsonSerializable(item, seen);
			result.push(sanitized === OMIT_JSON_VALUE ? null : sanitized);
		}
		seen.delete(value);
		return result;
	}

	if (typeof (value as { toJSON?: unknown }).toJSON === "function") {
		try {
			const serialized = JSON.stringify(value);
			if (serialized !== undefined) {
				const result = JSON.parse(serialized);
				seen.delete(value);
				return result;
			}
		} catch {
			seen.delete(value);
			return OMIT_JSON_VALUE;
		}
	}

	const result: Record<string, unknown> = {};
	for (const [key, item] of Object.entries(value)) {
		const sanitized = sanitizeJsonSerializable(item, seen);
		if (sanitized !== OMIT_JSON_VALUE) {
			result[key] = sanitized;
		}
	}
	seen.delete(value);
	return result;
}

function codelistSchema(id: string | undefined): JsonSchema {
	if (!id) {
		return { type: "string" };
	}

	const codelist = getCodelist(id);
	if (!codelist?.length) {
		return { type: "string" };
	}

	return {
		type: "string",
		enum: codelist.map((entry) => entry.value),
	};
}
