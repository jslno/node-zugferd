/** @jsxImportSource solid-js */

import type { Renderer } from "../types/renderer";
import type { JSX as SolidJSX } from "solid-js";
import { renderToString } from "solid-js/web";

export const renderer = {
	render: (ctx) => renderToString(() => <ctx.options.template {...ctx.data} />),
	$Infer: {
		Template: {} as (data: any) => SolidJSX.Element,
	},
} satisfies Renderer;

export type DocumentProps = {
	children?: SolidJSX.Element;
	head?: SolidJSX.Element;
	html?: Omit<SolidJSX.IntrinsicElements["html"], "children">;
	body?: Omit<SolidJSX.IntrinsicElements["body"], "children">;
};

export const Document = ({
	children,
	head,
	html: htmlProps,
	body: bodyProps,
}: DocumentProps) => {
	return (
		<html {...htmlProps}>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				{head}
			</head>
			<body {...bodyProps}>{children}</body>
		</html>
	);
};
