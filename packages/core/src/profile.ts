import { XMLBuilder } from "fast-xml-parser";
import type { InferSchema, Schema } from "./types";
import type { ZugferdContext } from "./types/context";
import type { InterpolateSchemaContext, ProfileConfig } from "./types/profile";
import { validateSchema } from "./utils";

export type Profile<O extends ProfileConfig = ProfileConfig> = O & {
	toXML: (
		input: InferSchema<O["schema"]>,
		ctx?: ZugferdContext | undefined,
	) => Promise<string>;
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
		toXML: async (input, ctx) => {
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

			let context: InterpolateSchemaContext = {
				...cfg,
				input: await validateSchema(
					config.schema,
					// @ts-expect-error
					input,
				),
			};
			if (ctx?.hooks.xml?.interpolate?.before) {
				const res = await ctx.hooks.xml.interpolate.before(context);
				if (typeof res === "object" && "context" in res) {
					context = res.context;
				}
			}
			let tree = await interpolate(context as any);
			if (ctx?.hooks.xml?.interpolate?.after) {
				const res = await ctx.hooks.xml.interpolate.after(tree);
				if (typeof res === "object" && "tree" in res) {
					tree = res.tree;
				}
			}

			if (ctx?.hooks.xml?.build?.before) {
				const res = await ctx.hooks.xml.build.before(tree);
				if (typeof res === "object" && "tree" in res) {
					tree = res.tree;
				}
			}
			let xml = build(tree);
			if (ctx?.hooks.xml?.build?.after) {
				const res = await ctx.hooks.xml.build.after(xml);
				if (typeof res === "string") {
					xml = res;
				}
			}

			return xml;
		},
	};
}
