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
				{},
				{},
				ctx.data,
			);

			return xmlObj;
		},
		validate: async (data: string | Buffer | { file: string }) => {
			const xsdPath = await getXsdPath(options);
			if (!xsdPath) {
				return true;
			}

			try {
				let xsdValidator: any;
				try {
					xsdValidator = await import("xsd-schema-validator");
				} catch {
					throw new Error("Missing dependency xsd-schema-validator");
				}

				const res = await xsdValidator.validateXML(data, xsdPath);

				return res.valid === true;
			} catch (err: any) {
				throw new ZugferdError("INVALID_XML", err?.message || "invalid xml");
			}
		},
	} satisfies ProfileContext;

	return ctx;
};

export const getXsdPath = (
	profile:
		| Profile
		| {
				xsdPath?: Profile["xsdPath"];
		  },
) => {
	if (typeof profile.xsdPath === "function") {
		return profile.xsdPath();
	}

	return profile.xsdPath;
};
