import { createProfile } from "../factory";
import { type InferSchema } from "../../types/schema";
import { MINIMUM } from "../minimum";
import { basicWlSchema } from "./schema";
import { basicWlMask } from "./mask";

export const BASIC_WL = createProfile({
	id: "basic-wl",
	contextParameter: "urn:factur-x.eu:1p0:basicwl",
	extends: [MINIMUM],
	schema: basicWlSchema,
	mask: basicWlMask,
	conformanceLevel: "BASIC WL",
	documentFileName: "factur-x.xml",
	documentType: "INVOICE",
	version: "1.0",
});

export type ProfileBasicWL = InferSchema<typeof BASIC_WL>;
