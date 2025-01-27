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