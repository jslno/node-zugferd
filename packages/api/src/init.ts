import type { ZugferdApiOptions } from "./types/options";
import type { ZugferdContext } from "node-zugferd/types";
import type { Renderer } from "./types/renderer";

export const init = async (
	renderer: Renderer,
	options: ZugferdApiOptions,
	context: ZugferdContext,
) => {
	const ctx: ZugferdApiContext = {
		renderer,
		options,
		context,
	};

	return ctx;
};

export type ZugferdApiContext = {
	renderer: Renderer;
	options: ZugferdApiOptions;
	context: ZugferdContext;
};
