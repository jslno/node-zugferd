import { parseFromSchema } from "../parse-from-schema";
import type { ProfileMapEntry } from "../types";

export const en16931 = {
	match: (ctx) =>
		// ctx.isPdfA3Conformant() &&
		ctx.matchesExtensionSchemaProfile() &&
		ctx.matchesSpecificationIdentifier("urn:cen.eu:en16931:2017"),
	parse: (ctx) => parseFromSchema(ctx),
} satisfies ProfileMapEntry;
