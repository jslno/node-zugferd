import { basic } from "@node-zugferd/basic";
import { basicWL } from "@node-zugferd/basic-wl";
import allowance from "@node-zugferd/codelist-allowance";
import characteristic from "@node-zugferd/codelist-characteristic";
import charge from "@node-zugferd/codelist-charge";
import country from "@node-zugferd/codelist-country";
import currency from "@node-zugferd/codelist-currency";
import eas from "@node-zugferd/codelist-eas";
import icd from "@node-zugferd/codelist-icd";
import incoterms from "@node-zugferd/codelist-incoterms";
import item from "@node-zugferd/codelist-item";
import language from "@node-zugferd/codelist-language";
import lineReason from "@node-zugferd/codelist-line-reason";
import lineStatus from "@node-zugferd/codelist-line-status";
import payment from "@node-zugferd/codelist-payment";
import text from "@node-zugferd/codelist-text";
import time from "@node-zugferd/codelist-time";
import transport from "@node-zugferd/codelist-transport";
import unit from "@node-zugferd/codelist-unit";
import untdid1001 from "@node-zugferd/codelist-untdid-1001";
import untdid1153 from "@node-zugferd/codelist-untdid-1153";
import untdid2005 from "@node-zugferd/codelist-untdid-2005";
import untdid3035 from "@node-zugferd/codelist-untdid-3035";
import untdid3139 from "@node-zugferd/codelist-untdid-3139";
import untdid4053 from "@node-zugferd/codelist-untdid-4053";
import untdid5305 from "@node-zugferd/codelist-untdid-5305";
import vatCat from "@node-zugferd/codelist-vat-cat";
import vatex from "@node-zugferd/codelist-vatex";
import { en16931 } from "@node-zugferd/en-16931";
import { extended } from "@node-zugferd/extended";
import { minimum } from "@node-zugferd/minimum";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { remarkCodelistTable } from "@/lib/remark-codelist-table";
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

const codelists = {
	allowance,
	characteristic,
	charge,
	country,
	currency,
	eas,
	icd,
	incoterms,
	item,
	language,
	lineReason,
	lineStatus,
	payment,
	text,
	time,
	transport,
	unit,
	untdid1001,
	untdid1153,
	untdid2005,
	untdid3035,
	untdid3139,
	untdid4053,
	untdid5305,
	vatCat,
	vatex,
};

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
	dir: "content/docs",
	docs: {
		schema: pageSchema,
		postprocess: {
			includeProcessedMarkdown: {
				stringify: (node) => {
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

					if (
						node.type === "mdxJsxFlowElement" &&
						node.name === "CodelistTable"
					) {
						let codelistKey: string | undefined = undefined;
						for (const attr of node.attributes) {
							if (attr.type === "mdxJsxAttribute" && attr.name === "items") {
								if (
									typeof attr.value === "object" &&
									attr.value !== null &&
									attr.value.type === "mdxJsxAttributeValueExpression"
								) {
									codelistKey = attr.value.value;
								}
							}
						}

						const codelist =
							codelistKey && codelistKey in codelists
								? codelists[codelistKey as keyof typeof codelists]
								: null;
						if (codelist) {
							return `\`\`\`json\n${JSON.stringify(codelist)}\n\`\`\``;
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
		remarkPlugins: [[remarkCodelistTable, codelists]],
	},
});
