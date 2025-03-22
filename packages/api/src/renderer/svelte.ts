import type { Renderer } from "../types/renderer";
import type { Component } from "svelte";
import { render } from "svelte/server";

export const renderer = {
	render: (ctx) => {
		const res = render(ctx.options.template, {
			props: ctx.data,
		});

		return `<!DOCTYPE html><html><head>${res.head}</head><body>${res.body}</body></html>`;
	},
	$Infer: {
		Template: {} as Component,
	},
} satisfies Renderer;
