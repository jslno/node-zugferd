import type { Renderer } from "../types";

export const vanillaRenderer = () =>
	({
		render: async (Component, props) => {
			const element =
				typeof Component === "function" ? await Component(props) : Component;
			return {
				body: element,
			};
		},
		$Infer: {
			Component: {} as string,
		},
	}) satisfies Renderer;
