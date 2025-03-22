import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import type { Renderer } from "../types/renderer";

export const renderer = {
	render: (ctx) => {
		const app = createSSRApp({
			data: ctx.data,
			template: ctx.options.template,
		});

		return renderToString(app);
	},
	$Infer: {
		Template: {} as string,
	},
} satisfies Renderer;
