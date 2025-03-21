import { createProfile } from "../factory";
import { type InferSchema } from "../../types/schema";
import { EN16931 } from "../en16931";
import { extendedSchema } from "./schema";
import { getAsset } from "../../utils/asset";
import { extendedMask } from "./mask";

export const EXTENDED = createProfile({
	id: "extended",
	contextParameter:
		"urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended",
	extends: [...EN16931.extends, EN16931],
	schema: extendedSchema,
	mask: extendedMask,
	xsdPath: getAsset("Factur-X_1.07.2_EXTENDED.xsd"),
	conformanceLevel: "EXTENDED",
	documentFileName: "factur-x.xml",
	documentType: "INVOICE",
	version: "1.0",
});

export type ProfileExtended = InferSchema<typeof EXTENDED>;
