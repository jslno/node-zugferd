import { createProfile } from "../factory";
import { type InferSchema } from "../../types/schema";
import { BASIC } from "../basic";
import { en16931Schema } from "./schema";
import { getAsset } from "../../utils/asset";

export const EN16931 = createProfile({
	id: "en16931",
	contextParameter: "urn:cen.eu:en16931:2017",
	extends: [...BASIC.extends, BASIC],
	schema: en16931Schema,
	xsdPath: getAsset("Factur-X_1.07.2_EN16931.xsd"),
	conformanceLevel: "EN 16931",
	documentFileName: "factur-x.xml",
	documentType: "INVOICE",
	version: "1.0",
});

export type ProfileEN16931 = InferSchema<typeof EN16931>;

export { EN16931 as COMFORT };

export type { ProfileEN16931 as ProfileComfort };
