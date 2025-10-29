import { XMLBuilder } from "fast-xml-parser";
import type { InferSchema, Schema } from "./types";
import type {
	Interpolator,
	MergeProfileConfig,
	ProfileConfig,
} from "./types/profile";
import { t } from "@node-zugferd/shared";
import { mergeSchema, type MergeSchema } from "./utils/merge-schema";

export type Profile<O extends ProfileConfig = ProfileConfig> = O & {
	toXML: (input: InferSchema<O["schema"]>) => string;
	extend: <S extends Schema, P extends Partial<ProfileConfig<S>>>(
		profile: Omit<P, "interpolate"> & {
			schema?: S;
			interpolate?: Interpolator<MergeSchema<O["schema"], S>>;
		},
	) => Profile<MergeProfileConfig<O, P>>;
};

export function createProfile<
	const S extends Schema,
	O extends ProfileConfig<S>,
>(
	config: O & {
		schema: S;
	},
): Profile<O> {
	return {
		...config,
		toXML: (input) => {
			const { build } = new XMLBuilder({
				preserveOrder: true,
				ignoreAttributes: false,
				attributeNamePrefix: "@",
				textNodeName: "#",
				suppressBooleanAttributes: false,
				suppressEmptyNode: true,
				suppressUnpairedNode: false,
			});
			const { interpolate, ...cfg } = config;

			const tree = interpolate({
				...cfg,
				// @ts-expect-error,
				input,
			});
			return build(tree);
		},
		extend: (profile) => {
			const mergedConfig: Record<string, any> = {
				...config,
			};

			if (profile.id) {
				mergedConfig.id = profile.id;
			}
			if (profile.extensionSchema) {
				// TODO: merge properties?
				mergedConfig.extensionSchema = mergedConfig.extensionSchema;
			}
			if (profile.interpolate) {
				mergedConfig.interpolate = profile.interpolate;
			}
			if (profile.schema) {
				mergedConfig.schema = mergeSchema(mergedConfig.schema, profile.schema);
			}
			if (profile.config) {
				if (!mergedConfig.config) {
					mergedConfig.config = profile.config;
				} else {
					// top-level merge
					for (const attr of Object.keys(profile.config)) {
						// @ts-expect-error
						mergedConfig.config[attr] = profile.config[attr];
					}
				}
			}

			return createProfile(mergedConfig as any);
		},
	};
}

const profile = createProfile({
	id: "some-profile",
	schema: {
		test: {
			type: t.Text,
		},
	},
	extensionSchema: {
		conformanceLevel: "MINIMUM",
	},
	interpolate: (ctx) => {
		return {};
	},
});
