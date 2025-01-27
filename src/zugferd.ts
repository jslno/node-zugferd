import { InferSchema } from './types/schema'
import { XMLBuilder } from 'fast-xml-parser'
import { init } from './init'
import { EXTENDED } from './profiles/extended'
import { ZugferdOptions } from './types/options'

export const zugferd = <O extends ZugferdOptions>(options: O) => {
	const context = init(options)
	const { validate } = options.profile

	return {
		context,
		create: async (data: InferSchema<O['profile']>) => {
			const xmlObj = options.profile.parse({
				context,
				data
			})

			const parser = new XMLBuilder({
				ignoreAttributes: false,
				attributeNamePrefix: '@',
				textNodeName: '#',
				format: true,
				suppressBooleanAttributes: false,
				suppressEmptyNode: true
			})

			const xml = parser.build(xmlObj)

			//await validate(xml)

			return xml
		},
		validate
	}
}