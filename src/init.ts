import { mergeSchemas, parseSchema } from './xml-formatter'
import { ZugferdOptions } from './types/options'

export const init = (options: ZugferdOptions) => {
	const ctx: ZugferdContext = {
		options,
		...getInternalTools(options)
	}

	return ctx
}

export type ZugferdContext = {
	options: ZugferdOptions
} & InternalTools

type InternalTools = ReturnType<typeof getInternalTools>

const getInternalTools = (_options: ZugferdOptions) => ({
	parseSchema,
	mergeSchemas
})