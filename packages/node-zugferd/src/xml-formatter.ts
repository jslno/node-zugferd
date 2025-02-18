import defu from "defu";
import type { InferRawSchema, Schema, SchemaField } from "./types/schema";
import type { Profile } from "./types/profile";
import { XMLBuilder, XmlBuilderOptions } from "fast-xml-parser";
import { ZugferdError } from "./error";

export const mergeSchemas = (profile: Profile): Schema => {
	if (!profile.extends) {
		return profile.schema;
	}
	return defu(
		profile.schema,
		...profile.extends?.map((profile) => profile.schema),
	);
};

export type ParseSchemaOptions = {
	contextParameter: string;
	groupIndices?: GroupIndices;
};

export const parseSchema = <S extends Schema>(
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
			"rsm:ExchangedDocumentContext": {
				"ram:GuidelineSpecifiedDocumentContextParameter": {
					"ram:ID": {
						"#": options.contextParameter,
					},
				},
			},
		},
	};
	const localGroupIndices: GroupIndices = { ...parentGroupIndices };

	const processField = (field: SchemaField, value: any, key: string) => {
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

		const processAdditionalXml = (value: any) => {
			if (field.additionalXml && !!value) {
				for (const [aKey, aValue] of Object.entries(field.additionalXml)) {
					const resolvedXPath = resolveXPath(aKey, localGroupIndices);
					if (Array.isArray(value)) {
						value.forEach((_, index) => {
							const itemXPath = resolvedXPath.replace(
								/\[i\]/,
								`[${index + siblingOffset}]`,
							);
							const xmlPart = buildXmlStructure(
								itemXPath,
								aValue,
								localGroupIndices,
							);
							xml = mergeXml(xml, xmlPart);
						});
					} else {
						const xmlPart = buildXmlStructure(
							resolvedXPath,
							aValue,
							localGroupIndices,
						);
						xml = mergeXml(xml, xmlPart);
					}
				}
			}
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

		processAdditionalXml(value);

		if (field?.type === "object" && field?.shape) {
			const childXml = parseSchema(
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
					transformedItem,
					field.shape || {},
					options,
					newGroupIndices,
					fullData,
				);
				xml = mergeXml(xml, childXml);

				if (field.additionalXml) {
					processAdditionalXml(value);
				}
			});
		}
	};

	for (const [key, field] of Object.entries(def)) {
		let rawValue = (data as any)[key];
		if (field.validator) {
			const { data, success, error } = field.validator.safeParse(rawValue);

			if (!success) {
				throw new ZugferdError(
					"INVALID_FIELD",
					`${key} - ${error.errors[0].message}`,
				);
			}

			rawValue = data;
		}
		const value = field.transform?.input
			? field.transform.input(rawValue ?? field.defaultValue)
			: (rawValue ?? field.defaultValue);

		processField(field, value, key);
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
	doc: any,
	options?: Omit<
		XmlBuilderOptions,
		"attributeNamePrefix" | "attributesGroupName" | "textNodeName"
	>,
) => {
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

	return parser.build(doc) as string;
};
