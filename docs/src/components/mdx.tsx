import defaultMdxComponents from "@fumadocs/base-ui/mdx";
import * as Twoslash from "fumadocs-twoslash/ui";
import type { MDXComponents } from "mdx/types";
import { Step, Steps } from "@/components/steps";
import * as TabsComponents from "./tabs";
import { TypeTable } from "./type-table";

export function getMDXComponents(components?: MDXComponents) {
	return {
		...defaultMdxComponents,
		Steps,
		Step,
		TypeTable,
		...Twoslash,
		...TabsComponents,
		...components,
	} satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
	type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
