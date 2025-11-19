import { createProfile } from "@node-zugferd/core";
import { extendProfile } from "@node-zugferd/core/utils";
import { MINIMUM } from "@node-zugferd/minimum";
import { interpolator } from "@node-zugferd/shared";
import { schema } from "./schema";

export const BASIC_WL = extendProfile(
	MINIMUM,
	createProfile({
		id: "basic-wl",
		extensionSchema: {
			conformanceLevel: "BASIC WL",
		},
		schema,
		interpolate: interpolator,
		config: {
			dataRelationship: "Data",
		},
	}),
);
