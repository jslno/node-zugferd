import { createProfile, type Profile } from "../profile";
import type { MergeProfileConfig, ProfileConfig } from "../types";
import { mergeSchema } from "./merge-schema";

export const extendProfile = <
	A extends ProfileConfig,
	B extends Partial<ProfileConfig>,
>(
	original: A,
	extension: B,
): Profile<MergeProfileConfig<A, B>> => {
	const mergedConfig: Record<string, any> = {
		...original,
	};

	if (extension.id) {
		mergedConfig.id = extension.id;
	}
	if (extension.extensionSchema) {
		// TODO: merge properties individually?
		mergedConfig.extensionSchema = extension.extensionSchema;
	}
	if (extension.interpolate) {
		mergedConfig.interpolate = extension.interpolate;
	}
	if (extension.schema) {
		mergedConfig.schema = mergeSchema(mergedConfig.schema, extension.schema);
	}
	if (extension.config) {
		if (!mergedConfig.config) {
			mergedConfig.config = extension.config;
		} else {
			// top-level merge
			for (const attr of Object.keys(extension.config)) {
				// @ts-expect-error
				mergedConfig.config[attr] = extension.config[attr];
			}
		}
	}

	return createProfile(mergedConfig as any);
};
