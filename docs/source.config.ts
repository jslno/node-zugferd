import { basic } from "@node-zugferd/basic";
import { basicWL } from "@node-zugferd/basic-wl";
import { en16931 } from "@node-zugferd/en-16931";
import { extended } from "@node-zugferd/extended";
import { minimum } from "@node-zugferd/minimum";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import {
	getProfileKeyFromMdxNode,
	stringifyProfileSchemaForLlm,
} from "@/lib/serialize-profile-schema";

const profiles = {
	minimum,
	basicWL,
	basic,
	en16931,
	extended,
};

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
	dir: "content/docs",
	docs: {
		schema: pageSchema,
		postprocess: {
			includeProcessedMarkdown: {
				stringify(node, parent, state, info) {
					if (
						node.type === "mdxJsxFlowElement" &&
						node.name === "ProfileTree"
					) {
						const profileKey = getProfileKeyFromMdxNode(node);
						if (profileKey && profileKey in profiles) {
							return stringifyProfileSchemaForLlm(
								profiles[profileKey as keyof typeof profiles].schema,
								profileKey,
							);
						}
					}
				},
			},
		},
	},
	meta: {
		schema: metaSchema,
	},
});

export default defineConfig({
	mdxOptions: {
		// MDX options
	},
});
