import type { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";

export type CodelistItem = Record<string, string | undefined>;

function getItemsIdentifier(node: MdxJsxFlowElement): string | undefined {
	const itemsAttr = node.attributes?.find(
		(attr) => attr.type === "mdxJsxAttribute" && attr.name === "items",
	);

	if (
		!itemsAttr ||
		itemsAttr.type !== "mdxJsxAttribute" ||
		typeof itemsAttr.value !== "object" ||
		itemsAttr.value === null ||
		itemsAttr.value.type !== "mdxJsxAttributeValueExpression"
	) {
		return;
	}

	return itemsAttr.value.value.trim();
}

function stringifyCodelistItem(item: CodelistItem): string {
	const { value, name } = item;
	if (!value && !name) return "";
	if (!value) return name ?? "";
	if (!name) return `\`${value}\``;
	return `\`${value}\` ${name}`;
}

/**
 * Index codelist table rows for Fumadocs search via `remarkStructure`.
 *
 * Sets `node.data.structuredData` on `CodelistTable` MDX nodes so the default
 * remark-structure stringifier can add every row to `structuredData.contents`.
 */
export function remarkCodelistTable(
	codelists: Record<string, CodelistItem[]>,
): Transformer<Root, Root> {
	return (tree) => {
		visit(tree, "mdxJsxFlowElement", (node: MdxJsxFlowElement) => {
			if (node.name !== "CodelistTable") return;

			const identifier = getItemsIdentifier(node);
			if (!identifier) return;

			const items = codelists[identifier];
			if (!items) return;

			node.data ??= {};
			node.data.structuredData = {
				contents: items.map((item) => ({
					heading: undefined,
					content: stringifyCodelistItem(item),
				})),
			};
		});
	};
}
