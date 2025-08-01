import type { Renderer } from "../types/renderer";
import type { Component, SvelteComponent } from "svelte";
import { render } from "svelte/server";

export const svelteRenderer = (options?: {
	context?: Map<any, any>;
	idPrefix?: string;
}) =>
	({
		render: ({ component, props }) => {
			const res = render(component, {
				props,
				...options,
			});

			return {
				head: res.head,
				body: res.body,
			};
		},
		$Infer: {
			Component: {} as {
				component: Component<any> | SvelteComponent<any>;
				props: any;
			},
		},
	}) satisfies Renderer;
