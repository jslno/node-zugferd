import { createProfile } from "../factory";
import { type InferSchema } from "../../types/schema";
import { minimumSchema } from "./schema";
import { getAsset } from "../../utils/asset";

export const MINIMUM = createProfile({
	contextParameter: "urn:factur-x.eu:1p0:minimum",
	schema: minimumSchema,
	xsdPath: getAsset("../Factur-X_1.07.2_MINIMUM.xsd"),
	conformanceLevel: "MINIMUM",
	documentFileName: "factur-x.xml",
	documentType: "INVOICE",
	version: "1.0",
});

export type ProfileMinimum = InferSchema<typeof MINIMUM>;
