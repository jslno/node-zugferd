import type { Profile, ProfileContext } from "../types/profile";
import type { InferSchema } from "../types/schema";
import { ZugferdError } from "../error";

export const createProfile = <P extends Profile>(options: P) => {
	const ctx = {
		...options,
		parse: (ctx) => {
			const xmlObj = ctx.context.parseSchema(
				ctx.data as InferSchema<P>,
				ctx.context.mergeSchemas(options),
				{
					contextParameter: options.contextParameter,
				},
				{},
				ctx.data,
			);

			return xmlObj;
		},
		validate: async (data: string | Buffer | { file: string }) => {
			try {
				let xsdValidator: any;
				try {
					xsdValidator = await import("xsd-schema-validator");
				} catch {
					throw new Error("Missing dependency xsd-schema-validator");
				}

				const res = await xsdValidator.validateXML(data, options.xsdPath);

				return res.valid === true;
			} catch (err: any) {
				throw new ZugferdError("INVALID_XML", err?.message || "invalid xml");
			}
		},
	} satisfies ProfileContext;

	return ctx;
};
