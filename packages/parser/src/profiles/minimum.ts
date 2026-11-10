import { parseFromSchema } from "../parse-from-schema";
import type { ProfileMapEntry } from "../types";

export const minimum = {
	match: (ctx) =>
		!ctx.context.hasPlugin("mustang") &&
		ctx.isPdfA3Conformant() &&
		ctx.matchesExtensionSchemaProfile() &&
		ctx.matchesSpecificationIdentifier("urn:factur-x.eu:1p0:minimum"),
	parse: (ctx) => parseFromSchema(ctx),
} satisfies ProfileMapEntry;
