/** @jsxImportSource solid-js */

import type { Renderer } from "../types/renderer";
import type { JSX as SolidJSX } from "solid-js";
import { renderToStringAsync } from "solid-js/web";

export const solidRenderer = (options?: {
	timeoutMs?: number;
	nonce?: string;
	renderId?: string;
}) =>
	({
		render: async (Component, props) => {
			return {
				body: await renderToStringAsync(
					() =>
						typeof Component === "function" ? Component(props) : Component,
					options,
				),
			};
		},
		$Infer: {
			Component: {} as SolidJSX.Element,
		},
	}) satisfies Renderer;
