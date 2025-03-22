// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React, { type JSX } from "react";
import { renderToString } from "react-dom/server";
import type { Renderer } from "../types/renderer";

export const renderer = {
	render: (ctx) => renderToString(<ctx.options.template {...ctx.data} />),
	$Infer: {
		Template: {} as (data: any) => JSX.Element,
	},
} satisfies Renderer;
