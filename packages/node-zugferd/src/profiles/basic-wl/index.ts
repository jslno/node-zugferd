import { createProfile } from "../factory";
import { type InferSchema } from "../../types/schema";
import { MINIMUM } from "../minimum";
import { basicWlSchema } from "./schema";
import { getAsset } from "../../utils/asset";
import { basicWlMask } from "./mask";

export const BASIC_WL = createProfile({
	id: "basic-wl",
	contextParameter: "urn:factur-x.eu:1p0:basicwl",
	extends: [MINIMUM],
	schema: basicWlSchema,
	mask: basicWlMask,
	xsdPath: () => getAsset("Factur-X_1.07.2_BASICWL.xsd"),
	conformanceLevel: "BASIC WL",
	documentFileName: "factur-x.xml",
	documentType: "INVOICE",
	version: "1.0",
});

export type ProfileBasicWL = InferSchema<typeof BASIC_WL>;
