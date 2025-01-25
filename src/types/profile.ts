import { InferSchema, Schema } from './schema'
import { ZugferdContext } from '../init'

export type Profile = {
	extends?: Profile
	schema: Schema
	contextParameter: string
	xsdPath: string
}

export type ProfileContext<P extends Profile = Profile> = P & {
	parse: (ctx: { context: ZugferdContext; data: InferSchema<P> }) => any
	validate: (data: string | Buffer | { file: string }) => Promise<boolean>
}
