import type { Renderer } from "../types/renderer";
import type { Component } from "svelte";
import { render } from "svelte/server";

export const renderer = {
	render: (ctx, component) => {
		const res = render(component, {
			props: { data: ctx.data },
		});

		return `<!DOCTYPE html><html><head><meta charset="UTF-8 /><meta name="viewport" content="width=device-width, initial-scale=1" />${res.head}</head><body>${res.body}</body></html>`;
	},
	$Infer: {
		Template: {} as Component,
	},
} satisfies Renderer;
