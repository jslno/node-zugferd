import { parseFromSchema } from "../parse-from-schema";
import type { ProfileMapEntry } from "../types";

export const basic = {
	match: (ctx) =>
		// ctx.isPdfA3Conformant() &&
		ctx.matchesExtensionSchemaProfile() &&
		ctx.matchesSpecificationIdentifier(
			"urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic",
		),
	parse: (ctx) => parseFromSchema(ctx),
} satisfies ProfileMapEntry;
