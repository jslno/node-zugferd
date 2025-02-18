import { InferSchema, Schema } from './schema'
import { ZugferdContext } from '../init'
import { z, ZodSchema } from 'zod'
import { LiteralString } from './helper'

export type Profile = {
	extends?: Profile[]
	schema: Schema
	contextParameter: LiteralString
	xsdPath: string
	conformanceLevel: string
	documentFileName: string
	/**
	 * @default 'INVOICE'
	 */
	documentType?: 'INVOICE' | 'ORDER'
	version: string
}

export type ProfileParseHandlerContext<P extends Profile = Profile> = {
	context: ZugferdContext
	data: InferSchema<P>
}

export type ProfileParseHandler<P extends Profile = Profile> = (ctx: {
	context: ZugferdContext
	data: InferSchema<P>
}) => any

export type ProfileValidateHandler = (
	data: string | Buffer | { file: string }
) => Promise<boolean>

export type ProfileContext<P extends Profile = Profile> = P & {
	parse: ProfileParseHandler<P>
	validate: ProfileValidateHandler
}
