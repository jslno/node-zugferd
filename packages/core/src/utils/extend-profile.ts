import { createProfile, type Profile } from "../profile";
import type { DeepMerge, Interpolator, ProfileConfig, Schema } from "../types";
import { type MergeSchema, mergeSchema } from "./merge-schema";

export type MergeProfileConfig<
	A extends ProfileConfig,
	B extends Partial<ProfileConfig>,
> = {
	id: B["id"] extends string ? B["id"] : A["id"];
	schema: B["schema"] extends infer BSchema extends Schema
		? MergeSchema<A["schema"], BSchema>
		: A["schema"];
	extensionSchema: B["extensionSchema"] extends ProfileConfig["extensionSchema"]
		? B["extensionSchema"]
		: A["extensionSchema"];
	interpolate: Interpolator<
		B["schema"] extends infer BSchema extends Schema
			? MergeSchema<A["schema"], BSchema>
			: A["schema"]
	>;
	config: B["config"] extends Record<string, any>
		? A["config"] extends Record<string, any>
			? DeepMerge<A["config"], B["config"]>
			: B["config"]
		: A["config"] extends Record<string, any>
			? A["config"]
			: never;
};
export type { MergeProfileConfig as MergeProfile };

export function extendProfile<
	A extends ProfileConfig,
	B extends Partial<ProfileConfig>,
>(original: A, extension: B): Profile<MergeProfileConfig<A, B>> {
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
}
