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
		trustedOrigins: getTrustedOrigins(options),
	};

	return ctx;
};

export type ZugferdApiContext = {
	renderer: Renderer;
	options: ZugferdApiOptions;
	context: ZugferdContext;
	baseURL: string;
	trustedOrigins: string[];
};

const getTrustedOrigins = (options: ZugferdApiOptions) => {
	const baseURL = getBaseURL(options.baseURL, options.basePath);
	if (!baseURL) {
		return [];
	}
	const trustedOrigins = [new URL(baseURL).origin];
	if (options.trustedOrigins && Array.isArray(options.trustedOrigins)) {
		trustedOrigins.push(...options.trustedOrigins);
	}

	return trustedOrigins;
};
