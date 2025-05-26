import {
	createSSRApp,
	defineComponent,
	h,
	type DefineComponent,
	type PropType,
} from "vue";
import { renderToString } from "vue/server-renderer";
import type { Renderer } from "../types/renderer";

export const renderer = {
	render: (ctx, component) => {
		const app = createSSRApp({
			data: () => ({ data: ctx.data }),
			template: component,
		});

		return renderToString(app);
	},
	$Infer: {
		Template: {} as string | DefineComponent,
	},
} satisfies Renderer;

export type DocumentProps = {
	children?: any;
	head?: any;
	html?: Record<string, any>;
	body?: Record<string, any>;
};

export const Document = defineComponent({
	name: "Document",
	props: {
		children: {
			type: [String, Object, Array] as PropType<any>,
			default: null,
		},
		head: {
			type: [String, Object, Array] as PropType<any>,
			default: null,
		},
		html: {
			type: Object as PropType<Record<string, any>>,
			default: () => ({}),
		},
		body: {
			type: Object as PropType<Record<string, any>>,
			default: () => ({}),
		},
	},
	setup: (props: DocumentProps) => {
		return () => {
			return (
				"<!DOCTYPE html>" +
				h("html", props.html, [
					h("head", null, [
						h("meta", { charset: "UTF-8" }),
						h("meta", {
							name: "viewport",
							content: "width=device-width, initial-scale=1",
						}),
						props.head,
					]),
					h("body", props.body, props.children),
				])
			);
		};
	},
});
