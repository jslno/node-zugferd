import { createProfile } from "@node-zugferd/core";
import { schema } from "./schema";

export const MINIMUM = createProfile({
	id: "minimum",
	extensionSchema: {
		conformanceLevel: "MINIMUM",
	},
	schema,
	// TODO:
	interpolate: {} as any,
	config: {
		dataRelationship: "Data",
	},
});
