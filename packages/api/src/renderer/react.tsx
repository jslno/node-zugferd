import { type JSX } from "react";
import { renderToStaticMarkup, type ServerOptions } from "react-dom/server";
import type { Renderer } from "../types/renderer";

export const reactRenderer = (options?: ServerOptions) =>
	({
		render: async (Component, props) => {
			const element =
				typeof Component === "function" ? await Component(props) : Component;

			return {
				body: await renderToStaticMarkup(element, options),
			};
		},
		$Infer: {
			Component: {} as JSX.Element,
		},
	}) satisfies Renderer;
