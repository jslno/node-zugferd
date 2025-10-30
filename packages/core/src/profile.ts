import { XMLBuilder } from "fast-xml-parser";
import type { InferSchema, Schema } from "./types";
import type { ProfileConfig } from "./types/profile";
import type { ZugferdContext } from "./types/context";

export type Profile<O extends ProfileConfig = ProfileConfig> = O & {
	toXML: (input: InferSchema<O["schema"]>, ctx?: ZugferdContext) => string;
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
		toXML: (input, ctx) => {
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
	};
}
