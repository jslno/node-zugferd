import defu from "defu";
import type { InferRawSchema, Schema, SchemaField } from "../../types/schema";
import type { Profile } from "../../types/profile";
import { XMLBuilder, type XmlBuilderOptions } from "fast-xml-parser";
import { ZugferdError } from "../../error";
import type { InternalContext } from "../../init";
import { colors } from "../../utils/logger";

const findFieldByKey = (obj: any, key: string): any | undefined => {
	if (typeof obj !== "object" || obj === null) return undefined;

	if (obj.key === key) return obj;

	for (const value of Object.values(obj)) {
		if (typeof value === "object" && value !== null) {
			const found = findFieldByKey(value, key);
			if (found !== undefined) return found;
		}
	}

	return undefined;
};

const hasValue = (val: any, fieldType: string | string[]) => {
	if (val === undefined || val === null) return false;
	const typeToCheck = Array.isArray(fieldType) ? fieldType[0] : fieldType;
	if (typeToCheck === "string" && val === "") return false;
	if (typeToCheck === "object") {
		if (Array.isArray(val)) return true;
		if (typeof val === "object" && Object.keys(val).length === 0) return false;
	}
	return true;
};

const applyMask = (
	schema: Schema,
	mask: Record<string, any>,
): Record<string, any> => {
	const res = Object.entries(mask).reduce(
		(acc, [key, value]) => {
			if (Array.isArray(value) && value.length) {
				const nestedSchema = findFieldByKey(schema, value[0]);
				if (nestedSchema) {
					acc[key] = {
						...nestedSchema,
						shape: applyMask(nestedSchema.shape || nestedSchema, value[1]),
					};
				}
			} else {
				const nestedSchema = findFieldByKey(schema, value);
				if (nestedSchema !== undefined) {
					acc[key] = nestedSchema;
				}
			}
			return acc;
		},
		{} as Record<string, any>,
	);
	return res;
};

const updateDefaultValues = (base: Schema, override: Schema): Schema => {
	const result: Schema = {};

	for (const key in base) {
		const baseField = base[key];
		const overrideField = override[key];

		if (baseField && overrideField) {
			if (baseField.shape && overrideField.shape) {
				result[key] = {
					...baseField,
					shape: updateDefaultValues(baseField.shape, overrideField.shape),
				};
			} else {
				result[key] = {
					...baseField,
					defaultValue: overrideField.defaultValue ?? baseField.defaultValue,
				};
			}
		} else {
			result[key] = baseField;
		}
	}

	return result;
};

export const mergeSchemas = (profile: Profile): Schema => {
	if (!profile.extends) {
		return profile.mask
			? applyMask(profile.schema, profile.mask)
			: profile.schema;
	}

	const mergedExtensions = defu(
		{},
		...(profile.extends?.map((p) => p.schema) || []),
	);

	const mergedSchema = updateDefaultValues(
		defu({}, mergedExtensions, profile.schema),
		profile.schema,
	);

	return profile.mask ? applyMask(mergedSchema, profile.mask) : mergedSchema;
};

export type ParseSchemaOptions = {
	groupIndices?: GroupIndices;
};

const collectAdditionalXmlFields = (
	def: Schema,
	data: any,
	localGroupIndices: GroupIndices,
	fullData: any,
): Array<{
	position: string;
	field: SchemaField;
	value: any;
	rawValue: any;
}> => {
	const additionalFields: Array<{
		position: string;
		field: SchemaField;
		value: any;
		rawValue: any;
	}> = [];

	for (const [key, field] of Object.entries(def)) {
		const rawValue = (data as any)[key];

		const _value =
			field.type !== "object"
				? (rawValue ?? field.defaultValue)
				: typeof rawValue === "object" && rawValue !== null
					? Object.keys(rawValue).length <= 0
						? field.defaultValue
						: rawValue
					: (rawValue ?? field.defaultValue);

		const value = field.transform?.input
			? field.transform.input(_value)
			: _value;

		if (
			field.additionalXml &&
			rawValue !== undefined &&
			hasValue(value, field.type)
		) {
			additionalFields.push({
				position: key,
				field: field,
				value: value,
				rawValue: rawValue,
			});
		}
	}

	return additionalFields;
};

export const parseSchema = <S extends Schema>(
	ctx: InternalContext,
	data: InferRawSchema<S>,
	def: S,
	options: ParseSchemaOptions,
	parentGroupIndices: GroupIndices = {},
	fullData: any = null,
): any => {
	options.groupIndices ??= {};

	let xml: any = {
		"?xml": {
			"@version": "1.0",
			"@encoding": "UTF-8",
		},
		"rsm:CrossIndustryInvoice": {
			"@xmlns:rsm":
				"urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100",
			"@xmlns:qdt": "urn:un:unece:uncefact:data:standard:QualifiedDataType:100",
			"@xmlns:ram":
				"urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100",
			"@xmlns:xs": "http://www.w3.org/2001/XMLSchema",
			"@xmlns:udt":
				"urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100",
		},
	};
	const localGroupIndices: GroupIndices = { ...parentGroupIndices };

	const processField = (
		field: SchemaField,
		value: any,
		key: string,
		rawValue?: any,
	) => {
		ctx.logger.debug(
			`[${parseSchema.name}] Processing field ${colors.bright}${key}${colors.reset}${field.key ? ` (${field.key})` : ""} ${Array.isArray(field.type) || (field.type !== "object" && !field.type.endsWith("[]")) ? `${colors.fg.yellow}${value}${colors.reset}` : ""}`,
		);

		if (field.group) {
			localGroupIndices[field.group] = localGroupIndices[field.group] || 0;
		}

		let siblingOffset = 0;
		if (field.sibling && fullData) {
			const siblings = field.sibling(fullData, localGroupIndices);
			if (Array.isArray(siblings)) {
				siblingOffset = siblings.length;
			} else if (siblings !== undefined && siblings !== null) {
				siblingOffset = 1;
			}
		}

		const handleArrayField = (arrayValue: any[], fieldXPath: string) => {
			arrayValue.forEach((item, arrayIndex) => {
				ctx.logger.debug(
					`[${parseSchema.name}] Array item ${arrayIndex} for field: ${colors.bright}${key}${colors.reset}${field.key ? ` (${field.key})` : ""}`,
				);
				const transformedItem = field.transform?.input
					? field.transform.input(item)
					: item;
				const itemXPath = fieldXPath.replace(
					/\[i\]/,
					`[${arrayIndex + siblingOffset}]`,
				);
				const xmlPart = buildXmlStructure(
					itemXPath,
					transformedItem,
					localGroupIndices,
				);
				xml = mergeXml(xml, xmlPart);
			});
		};

		if (field?.xpath) {
			const resolvedXPath = resolveXPath(field.xpath, localGroupIndices);
			if (
				typeof field.type === "string" &&
				field.type.endsWith("[]") &&
				Array.isArray(value)
			) {
				handleArrayField(value, resolvedXPath);
			} else if (typeof value === "object" && !Array.isArray(value)) {
				const childXml = parseSchema(
					ctx,
					value,
					field.shape || {},
					options,
					localGroupIndices,
					fullData,
				);
				xml = mergeXml(xml, childXml);
			} else {
				const xmlPart = buildXmlStructure(
					resolvedXPath,
					value,
					localGroupIndices,
				);
				xml = mergeXml(xml, xmlPart);
			}
		}

		if (field?.type === "object" && field?.shape) {
			const childXml = parseSchema(
				ctx,
				value || {},
				field.shape,
				options,
				localGroupIndices,
				fullData,
			);
			xml = mergeXml(xml, childXml);
		}

		if (field?.type === "object[]" && field?.shape) {
			const arrayValue = Array.isArray(value) ? value : [];
			arrayValue.forEach((item, arrayIndex) => {
				const newGroupIndices = { ...localGroupIndices };
				if (field.group) {
					newGroupIndices[field.group] = arrayIndex + siblingOffset;
				}
				const transformedItem = field.transform?.input
					? field.transform.input(item)
					: item;
				const childXml = parseSchema(
					ctx,
					transformedItem,
					field.shape || {},
					options,
					newGroupIndices,
					fullData,
				);
				xml = mergeXml(xml, childXml);
			});
		}
	};

	const additionalXmlFields = collectAdditionalXmlFields(
		def,
		data,
		localGroupIndices,
		fullData,
	);

	for (const [key, field] of Object.entries(def)) {
		let rawValue = (data as any)[key];
		if (field.validator) {
			const { data, success, error } = field.validator.safeParse(rawValue);

			if (!success) {
				ctx.logger.debug(
					`[${parseSchema.name}] Validation failed for ${colors.bright}${key}${colors.reset}${field.key ? ` (${field.key})` : ""}: ${error.errors[0].message}`,
				);
				throw new ZugferdError(
					"INVALID_FIELD",
					`${key} - ${error.errors[0].message}`,
				);
			}

			rawValue = data;
		}
		const _value =
			field.type !== "object"
				? (rawValue ?? field.defaultValue)
				: typeof rawValue === "object" && rawValue !== null
					? Object.keys(rawValue).length <= 0
						? field.defaultValue
						: rawValue
					: (rawValue ?? field.defaultValue);

		const value = field.transform?.input
			? field.transform.input(_value)
			: _value;

		if (!hasValue(value, field.type)) {
			ctx.logger.debug(
				`[${parseSchema.name}] Skipping field without value: ${colors.bright}${key}${colors.reset}${field.key ? ` (${field.key})` : ""}`,
			);
			continue;
		}

		processField(field, value, key, rawValue);

		const additionalField = additionalXmlFields.find((f) => f.position === key);
		if (additionalField && additionalField.field.additionalXml) {
			ctx.logger.debug(
				`[${parseSchema.name}] Processing additionalXml for field: ${colors.bright}${key}${colors.reset}${additionalField.field.key ? ` (${additionalField.field.key})` : ""}`,
			);
			const additionalXml = parseSchema(
				ctx,
				data,
				additionalField.field.additionalXml,
				options,
				localGroupIndices,
				fullData,
			);
			xml = mergeXml(xml, additionalXml);
		}
	}

	return xml;
};

type GroupIndices = Record<string, number>;

const resolveXPath = (xpath: string, groupIndices: GroupIndices): string => {
	return xpath.replace(/\[([^\]]+)\]/g, (match, group) => {
		if (groupIndices[group] !== undefined) {
			return `[${groupIndices[group]}]`;
		}
		return match;
	});
};

const mergeXml = (target: any, source: any): any => {
	for (const key in source) {
		if (key in target) {
			if (key === "#" || key.startsWith("@")) {
				target[key] = source[key];
			} else if (Array.isArray(target[key]) || Array.isArray(source[key])) {
				const targetArray = Array.isArray(target[key])
					? target[key]
					: [target[key]];
				const sourceArray = Array.isArray(source[key])
					? source[key]
					: [source[key]];

				target[key] = targetArray.map((item, index) => {
					if (sourceArray[index] === undefined) {
						return item;
					} else if (
						typeof item === "object" &&
						typeof sourceArray[index] === "object"
					) {
						return mergeXml(item, sourceArray[index]);
					} else {
						return sourceArray[index];
					}
				});

				if (sourceArray.length > targetArray.length) {
					target[key] = target[key].concat(
						sourceArray.slice(targetArray.length),
					);
				}
			} else if (
				typeof target[key] === "object" &&
				typeof source[key] === "object"
			) {
				target[key] = mergeXml(target[key], source[key]);
			} else {
				target[key] = source[key];
			}
		} else {
			target[key] = source[key];
		}
	}
	return target;
};

const buildXmlStructure = (
	xpath: string,
	value: any,
	groupIndices: GroupIndices,
): any => {
	const resolvedXPath = resolveXPath(xpath, groupIndices);
	const parts = resolvedXPath.split("/").filter(Boolean);
	const result: any = {};
	let current = result;

	parts.forEach((part, index) => {
		const match = part.match(/^(.+?)(?:\[(\d+|i)\])?$/);
		if (!match) return;

		const [, nodeName, arrayIndex] = match;
		const isAttribute = nodeName.startsWith("@");

		if (value === undefined || value === null) {
			return;
		}

		if (index === parts.length - 1) {
			if (arrayIndex !== undefined) {
				const idx = arrayIndex === "i" ? 0 : Number.parseInt(arrayIndex, 10);
				current[nodeName] = current[nodeName] || [];
				current[nodeName][idx] = isAttribute
					? String(value)
					: { "#": String(value) };
			} else {
				current[nodeName] = isAttribute
					? String(value)
					: { "#": String(value) };
			}
		} else {
			if (arrayIndex !== undefined) {
				const idx = arrayIndex === "i" ? 0 : Number.parseInt(arrayIndex, 10);
				current[nodeName] = current[nodeName] || [];
				current[nodeName][idx] = current[nodeName][idx] || {};
				current = current[nodeName][idx];
			} else {
				current[nodeName] = current[nodeName] || {};
				current = current[nodeName];
			}
		}
	});

	return result;
};

export const formatXml = (
	ctx: InternalContext,
	doc: any,
	options?: Omit<
		XmlBuilderOptions,
		"attributeNamePrefix" | "attributesGroupName" | "textNodeName"
	>,
) => {
	ctx.logger.debug(`[${formatXml.name}] Formatting XML started`);

	const parser = new XMLBuilder(
		defu(
			{
				ignoreAttributes: false,
				attributeNamePrefix: "@",
				textNodeName: "#",
				format: true,
				suppressBooleanAttributes: false,
				suppressEmptyNode: true,
			},
			options,
		),
	);

	const result = parser.build(doc) as string;

	ctx.logger.debug(`[${formatXml.name}] Formatting XML finished`);

	return result;
};
