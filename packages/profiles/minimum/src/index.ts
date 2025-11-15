import { createProfile } from "@node-zugferd/core";
import { interpolator } from "@node-zugferd/shared";
import { schema } from "./schema";

export const MINIMUM = createProfile({
	id: "minimum",
	extensionSchema: {
		conformanceLevel: "MINIMUM",
	},
	schema,
	interpolate: interpolator(),
	config: {
		dataRelationship: "Data",
	},
});
