import React, { type JSX } from "react";
import { renderToPipeableStream } from "react-dom/server";
import type { Renderer } from "../types/renderer";
import { PassThrough } from "stream";

export const renderer = {
	render: async (ctx, Component) => {
		const stream = new PassThrough();
		const element = await Component({
			data: ctx.data,
		});

		return await new Promise<string>((resolve, reject) => {
			let html = "";

			const { pipe } = renderToPipeableStream(element, {
				onAllReady() {
					pipe(stream);
				},
				onError(err) {
					reject(err);
				},
			});

			stream.on("data", (chunk) => {
				html += chunk.toString();
			});

			stream.on("end", () => {
				resolve("<!DOCTYPE html>" + html);
			});
		});
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
