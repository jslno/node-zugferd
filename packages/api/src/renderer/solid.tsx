import type { Renderer } from "../types/renderer";
import type { JSX } from "solid-js";
import { renderToString } from "solid-js/web";

export const renderer = {
	render: (ctx) => renderToString(() => <ctx.options.template {...ctx.data} />),
	$Infer: {
		Template: {} as (data: any) => JSX.Element,
	},
} satisfies Renderer;
