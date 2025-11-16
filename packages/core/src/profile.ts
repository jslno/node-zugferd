import type { InferSchema, Schema } from "./types";
import type { ZugferdContext } from "./types/context";
import type { InterpolateSchemaContext, ProfileConfig } from "./types/profile";
import { formatXML, validateSchema } from "./utils";

type RuntimeProfile<O extends ProfileConfig> = O & {
	toXML: (
		input: InferSchema<O["schema"]>,
		ctx?: ZugferdContext | undefined,
	) => Promise<string>;
};
export type Profile<O extends ProfileConfig = ProfileConfig> =
	RuntimeProfile<O> & {
		$Input: InferSchema<O["schema"]>;
		$Output: InferSchema<O["schema"], "output">;
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
			const { interpolate, ...cfg } = config;

			let context: InterpolateSchemaContext = {
				...cfg,
				context: ctx!,
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
				const res = await ctx.hooks.xml.interpolate.after(tree, ctx);
				if (typeof res === "object" && "tree" in res) {
					tree = res.tree;
				}
			}

			if (ctx?.hooks.xml?.build?.before) {
				const res = await ctx.hooks.xml.build.before(tree, ctx);
				if (typeof res === "object" && "tree" in res) {
					tree = res.tree;
				}
			}
			let xml = formatXML(
				{
					"?xml": {
						"@version": "1.0",
						"@encoding": "UTF-8",
					},
					...tree,
				},
				{
					format: ctx?.options.xml?.format === "pretty",
				},
			);
			if (ctx?.hooks.xml?.build?.after) {
				const res = await ctx.hooks.xml.build.after(xml, ctx);
				if (typeof res === "string") {
					xml = res;
				}
			}

			return xml;
		},
	} satisfies RuntimeProfile<O> as Profile<O>;
}
