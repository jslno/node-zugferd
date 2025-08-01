import { createSSRApp, type Component } from "vue";
import { renderToString, type SSRContext } from "vue/server-renderer";
import type { Renderer } from "../types/renderer";

export const vueRenderer = (context?: SSRContext) =>
	({
		render: async ({ component, props }) => {
			const app = createSSRApp(component, props);

			return {
				body: await renderToString(app, context),
			};
		},
		$Infer: {
			Component: {} as {
				component: Component;
				props: any;
			},
		},
	}) satisfies Renderer;
