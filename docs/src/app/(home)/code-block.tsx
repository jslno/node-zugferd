"use client";

import type { JSX } from "react";
import { useLayoutEffect, useState } from "react";
import type { BundledLanguage } from "shiki";
import { highlight } from "@/lib/highlight";

export function CodeBlock({
	children,
	lang,
	initial,
	keepBackground = false,
	showLineNumbers = false,
	highlightedLineNumbers = [],
	className,
}: {
	children: string;
	lang: BundledLanguage;
	initial?: JSX.Element | undefined;
	keepBackground?: boolean | undefined;
	showLineNumbers?: boolean | undefined;
	highlightedLineNumbers?: number[] | undefined;
	className?: string | undefined;
}) {
	const [nodes, setNodes] = useState(initial);

	useLayoutEffect(() => {
		void highlight(children, lang, {
			transformers: showLineNumbers
				? [
						{
							pre(node) {
								node.properties["data-line-numbers"] = true;
							},
							line(node, line) {
								node.properties["data-line"] = line;
								if (highlightedLineNumbers.includes(line)) {
									this.addClassToHast(node, "highlighted");
								}
							},
						},
					]
				: undefined,
			meta: { className },
			rootStyle: keepBackground
				? "--shiki-dark-bg: transparent;--shiki-bg: transparent;"
				: undefined,
		}).then(setNodes);
	}, [
		children,
		lang,
		keepBackground,
		className,
		showLineNumbers,
		highlightedLineNumbers,
	]);

	return nodes ?? "Loading...";
}
