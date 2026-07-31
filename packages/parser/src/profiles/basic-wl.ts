import { parseFromSchema } from "../parse-from-schema";
import type { ProfileMapEntry } from "../types";

export const basicWL = {
	match: (ctx) =>
		// TODO: ctx.isPdfA3Conformant() &&
		ctx.matchesExtensionSchemaProfile() &&
		ctx.matchesSpecificationIdentifier("urn:factur-x.eu:1p0:basicwl"),
	parse: (ctx) => parseFromSchema(ctx),
} satisfies ProfileMapEntry;
