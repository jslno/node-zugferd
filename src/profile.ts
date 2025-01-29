import type { Profile, ProfileContext } from './types/profile'
import type { InferSchema } from './types/schema'
import { ZugferdContext } from './init'
import { validateXML } from 'xsd-schema-validator'

export const createProfile = <P extends Profile>(options: P) => {
	const ctx = {
		...options,
		parse: (ctx) => {
			const xmlObj = ctx.context.parseSchema(
				ctx.data as InferSchema<P>,
				ctx.context.mergeSchemas(options),
				{
					contextParameter: options.contextParameter
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
