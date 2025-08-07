import type { Profile, ProfileContext } from "../types/profile";
import type { InferSchema } from "../types/schema";

export const createProfile = <P extends Profile>(options: P) => {
	const ctx = {
		...options,
		parse: (ctx) => {
			const xmlObj = ctx.context.parseSchema(
				ctx.data as InferSchema<P>,
				ctx.context.mergeSchemas(options),
				{},
				{},
				ctx.data,
			);

			return xmlObj;
		},
	} satisfies ProfileContext;

	return ctx;
};