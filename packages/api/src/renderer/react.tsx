import React, { type JSX } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Renderer } from "../types/renderer";

export const renderer = {
	render: async (ctx, Component) => {
		const element = await Component({
			data: ctx.data,
		});

		return await renderToStaticMarkup(element);
	},
	$Infer: {
		Template: {} as (props: { data: any }) =>
			| JSX.Element
			| Promise<JSX.Element>,
	},
} satisfies Renderer;

export type DocumentProps = {
	children?: React.ReactNode;
	head?: React.ReactNode;
	html?: Omit<React.ComponentProps<"html">, "children">;
	body?: Omit<React.ComponentProps<"body">, "children">;
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
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				{head}
			</head>
			<body {...bodyProps}>{children}</body>
		</html>
	);
};
