import { parseFromSchema } from "../parse-from-schema";
import type { ProfileMapEntry } from "../types";

export const extended = {
	match: (ctx) =>
		ctx.isPdfAConformant() &&
		ctx.matchesExtensionSchemaProfile() &&
		ctx.matchesSpecificationIdentifier(
			"urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended",
		),
	parse: (ctx) => parseFromSchema(ctx),
} satisfies ProfileMapEntry;
