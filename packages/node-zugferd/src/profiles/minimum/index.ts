import { createProfile } from "../factory";
import { type InferSchema } from "../../types/schema";
import { minimumSchema } from "./schema";
import { minimumMask } from "./mask";

export const MINIMUM = createProfile({
	id: "minimum",
	contextParameter: "urn:factur-x.eu:1p0:minimum",
	schema: minimumSchema,
	mask: minimumMask,
	conformanceLevel: "MINIMUM",
	documentFileName: "factur-x.xml",
	documentType: "INVOICE",
	version: "1.0",
});

export type ProfileMinimum = InferSchema<typeof MINIMUM>;
