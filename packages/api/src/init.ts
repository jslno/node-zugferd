import type { ZugferdApiOptions } from "./types/options";
import type { ZugferdContext } from "node-zugferd/types";
import type { Renderer } from "./types/renderer";
import { getBaseURL } from "./utils/url";

export const init = async (
	renderer: Renderer,
	options: ZugferdApiOptions,
	context: ZugferdContext,
) => {
	const baseURL = getBaseURL(options.baseURL, options.basePath) || "";

	const ctx: ZugferdApiContext = {
		renderer,
		options,
		context,
		baseURL,
	};

	return ctx;
};

export type ZugferdApiContext = {
	renderer: Renderer;
	options: ZugferdApiOptions;
	context: ZugferdContext;
	baseURL: string;
};
