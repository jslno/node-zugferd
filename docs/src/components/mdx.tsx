import defaultMdxComponents from "@fumadocs/base-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { TypeTable } from "./type-table";
import { CodeBlock, Pre } from "./codeblock";

export function getMDXComponents(components?: MDXComponents) {
	return {
		...defaultMdxComponents,
		TypeTable,
		...components,
	} satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
	type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
