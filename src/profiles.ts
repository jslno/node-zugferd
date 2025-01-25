import type { Profile, ProfileContext } from './types/profile'
import type { InferSchema } from './types/schema'
import { ZugferdContext } from './init'
import { validateXML } from 'xsd-schema-validator'

export const createProfile = <P extends Profile>(options: P) => {
	const ctx = {
		...options,
		parse: (ctx) => {
			const combinedSchemas = ctx.context.mergeSchemas(
				options.schema,
				options.extends
			)

			const xmlObj = ctx.context.parseSchema(
				ctx.data as InferSchema<P>,
				combinedSchemas,
				{
					contextParameter: options.contextParameter,
					groupIndices: {}
				},
				{},
				ctx.data
			)

			return xmlObj
		},
		validate: async (data: string | Buffer | { file: string }) => {
			const res = await validateXML(data, options.xsdPath)

			return res.valid
		}
	} satisfies ProfileContext

	return ctx
}

/*
import { Profile, ProfileContext } from './types/profile'
import { InferRawSchema, InferSchema, Schema } from './types/schema'
import { ZugferdContext } from './init'
import defu from 'defu'

const mergeSchemas = (schema: Schema, use?: Profile): Schema => {
	if (!use) {
		return schema
	}
	return defu(schema, mergeSchemas(use.schema, use.extends))
}

export const createProfile = <P extends Profile>(options: P) => {
	const ctx = {
		...options,
		parse: (ctx) => {
			const combinedSchemas = mergeSchemas(
				options.schema,
				options.extends
			)

			const xml = parseSchema(
				ctx.data as InferSchema<P>,
				combinedSchemas,
				{
					contextParameter: options.contextParameter
				},
				0,
				ctx.data
			)

			return xml
		},
		/**
		 * ! TODO:
		 */
/*
		validate: () => {}
	} satisfies ProfileContext

	return ctx
}

const mergeXml = (target: any, source: any): any => {
	for (const key in source) {
		if (key in target) {
			if (key === '#' || key.startsWith('@')) {
				target[key] = source[key]
			} else if (
				Array.isArray(target[key]) &&
				Array.isArray(source[key])
			) {
				source[key].forEach((item, index) => {
					if (target[key][index] === undefined) {
						target[key][index] = item
					} else if (
						typeof item === 'object' &&
						typeof target[key][index] === 'object'
					) {
						target[key][index] = mergeXml(target[key][index], item)
					}
				})
			} else if (
				typeof target[key] === 'object' &&
				typeof source[key] === 'object'
			) {
				target[key] = mergeXml(target[key], source[key])
			} else {
				target[key] = source[key]
			}
		} else {
			target[key] = source[key]
		}
	}
	return target
}

const buildXmlStructure = (
	xpath: string,
	value: any,
	currentIndex: number = 0
): any => {
	const parts = xpath.split('/').filter(Boolean)
	let result: any = {}
	let current = result

	parts.forEach((part, index) => {
		// Match node name and optional index (i.e., ram:IncludedNote[i])
		const match = part.match(/^(.+?)(?:\[(\d+|i)\])?$/)
		if (!match) return

		const [, nodeName, arrayIndex] = match
		const isAttribute = nodeName.startsWith('@')

		if (value === undefined || value === null) {
			return
		}

		// If it's the last part of the path, set the value
		if (index === parts.length - 1) {
			if (arrayIndex !== undefined) {
				// Handle array indices (e.g., ram:IncludedNote[i])
				const idx =
					arrayIndex === 'i' ? currentIndex : parseInt(arrayIndex, 10)
				current[nodeName] = current[nodeName] || []
				current[nodeName][idx] = isAttribute
					? String(value) // If it's an attribute, directly store the value
					: { '#': String(value) } // Otherwise, use # to store the value
			} else {
				// If no array index, just store the value as is
				current[nodeName] = isAttribute
					? String(value)
					: { '#': String(value) }
			}
		} else {
			// Handle the case for intermediate parts of the path
			if (arrayIndex !== undefined) {
				// Handle array indices (e.g., ram:IncludedNote[i])
				const idx =
					arrayIndex === 'i' ? currentIndex : parseInt(arrayIndex, 10)
				current[nodeName] = current[nodeName] || []
				current[nodeName][idx] = current[nodeName][idx] || {}
				current = current[nodeName][idx] // Move into the correct index
			} else {
				// No array index, continue down the path
				current[nodeName] = current[nodeName] || {}
				current = current[nodeName]
			}
		}
	})

	return result
}
type ParseSchemaOptions = {
	contextParameter: string
}
*/
/**
 * ! TODO: simplify this uggly shit
 */
/*
const parseSchema = <S extends Schema, P extends Profile>(
	data: InferRawSchema<S>,
	def: S,
	options: ParseSchemaOptions,
	index: number = 0,
	mainData: InferSchema<P>
): any => {
	let xml: any = {
		'?xml': {
			'@version': '1.0',
			'@encoding': 'UTF-8'
		},
		'rsm:CrossIndustryInvoice': {
			'@xmlns:rsm':
				'urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100',
			'@xmlns:qdt':
				'urn:un:unece:uncefact:data:standard:QualifiedDataType:100',
			'@xmlns:ram':
				'urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100',
			'@xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
			'@xmlns:udt':
				'urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100',
			'rsm:ExchangedDocumentContext': {
				'ram:GuidelineSpecifiedDocumentContextParameter': {
					'ram:ID': {
						'#': options.contextParameter
					}
				}
			}
		}
	}

	for (const [key, field] of Object.entries(def)) {
		let rawValue = (data as any)[key] // Get the raw value from data
		if (field.validator) {
			rawValue = field.validator.parse(rawValue)
		}
		const value = field.transform?.input
			? field.transform.input(rawValue ?? field.defaultValue) // Apply transform if defined
			: rawValue ?? field.defaultValue // Use defaultValue if value is undefined

		// If the field has an xpath, build XML structure
		if (field?.xpath) {
			if (typeof value === 'object' && !Array.isArray(value)) {
				const sibling = !!field.sibling
					? field.sibling(mainData, index)
					: undefined
				const siblingArr = Array.isArray(sibling) ? sibling : []
				const offset = siblingArr.length
				// Recursively process nested objects
				const childXml = parseSchema(
					value,
					field.shape || {},
					options,
					index + offset,
					mainData
				)
				xml = mergeXml(xml, childXml)
			} else if (Array.isArray(value)) {
				// Handle arrays (objects[] or string[])
				value.forEach((item, arrayIndex) => {
					const sibling = !!field.sibling
						? field.sibling(mainData, index)
						: undefined
					const siblingArr = Array.isArray(sibling) ? sibling : []
					const offset = siblingArr.length
					const transformedItem = field.transform?.input
						? field.transform.input(item)
						: item // Apply transform to array items
					const xmlPart = buildXmlStructure(
						field.xpath!,
						transformedItem,
						arrayIndex + offset
					)
					xml = mergeXml(xml, xmlPart)
				})
			} else {
				const sibling = !!field.sibling
					? field.sibling(mainData, index)
					: undefined
				const siblingArr = Array.isArray(sibling) ? sibling : []
				const offset = siblingArr.length
				// Simple field value
				const xmlPart = buildXmlStructure(
					field.xpath,
					value, // Transformed or default value
					index + offset
				)
				xml = mergeXml(xml, xmlPart)
			}
		}

		// Handle additional XML properties (attributes, etc.)
		if (field?.additionalXml && !!value) {
			for (const [aKey, aValue] of Object.entries(field.additionalXml)) {
				const sibling = !!field.sibling
					? field.sibling(mainData, index)
					: undefined
				const siblingArr = Array.isArray(sibling) ? sibling : []
				const offset = siblingArr.length
				const xmlPart = buildXmlStructure(aKey, aValue, index + offset)
				xml = mergeXml(xml, xmlPart)
			}
		}

		// If the field is an object type, recursively parse its children
		if (field?.type === 'object' && field?.shape) {
			const sibling = !!field.sibling
				? field.sibling(mainData, index)
				: undefined
			const siblingArr = Array.isArray(sibling) ? sibling : []
			const offset = siblingArr.length
			const childXml = parseSchema(
				value || {},
				field.shape,
				options,
				index + offset,
				mainData
			) // Pass empty object if value is undefined
			xml = mergeXml(xml, childXml)
		}

		// Handle object[] correctly by passing the current index
		if (field?.type === 'object[]' && field?.shape) {
			const arrayValue = Array.isArray(value) ? value : []

			arrayValue.forEach((item, arrayIndex) => {
				const transformedItem = field.transform?.input
					? field.transform.input(item)
					: item // Apply transform to each array item
				const sibling = !!field.sibling
					? field.sibling(mainData, index)
					: undefined
				const siblingArr = Array.isArray(sibling) ? sibling : []
				const offset = siblingArr.length
				const childXml = parseSchema(
					transformedItem,
					field.shape || {},
					options,
					arrayIndex + offset,
					mainData
				)
				xml = mergeXml(xml, childXml)
			})
		}

		if (
			!Array.isArray(field?.type) &&
			field.type.endsWith('[]') &&
			field.type !== 'object[]' &&
			field.xpath !== undefined &&
			Array.isArray(value)
		) {
			value.forEach((item, arrayIndex) => {
				const transformedItem = field.transform?.input
					? field.transform.input(item)
					: item // Apply transform to each string

				const sibling = !!field.sibling
					? field.sibling(mainData, index)
					: undefined
				const siblingArr = Array.isArray(sibling) ? sibling : []
				const offset = siblingArr.length
				const xmlPart = buildXmlStructure(
					field.xpath!,
					transformedItem, // Transformed string value
					arrayIndex + offset
				)
				xml = mergeXml(xml, xmlPart)
			})
		}
	}

	return xml
}*/
