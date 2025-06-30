import type { ZugferdApiOptions } from "./types/options";
import type { ZugferdContext } from "node-zugferd/types";
import type { Renderer } from "./types/renderer";
import { getBaseURL } from "./utils/url";
import type { GenericEndpointContext } from "./types/context";
import { defu } from "defu";

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
		authorize: options.authorize || (() => true),
	};

	return runPluginInit(ctx).context;
};

export type ZugferdApiContext = {
	renderer: Renderer;
	options: ZugferdApiOptions;
	context: ZugferdContext;
	baseURL: string;
	trustedOrigins: string[];
	authorize: (ctx: GenericEndpointContext) => Promise<boolean> | boolean;
};

const runPluginInit = (ctx: ZugferdApiContext) => {
	let options = ctx.options;
	const plugins = options.plugins || [];
	let context: ZugferdApiContext = ctx;
	for (const plugin of plugins) {
		if (plugin.init) {
			const result = plugin.init(context);
			if (typeof result === "object") {
				if (result.options) {
					options = defu(options, result.options);
				}
				if (result.context) {
					context = {
						...context,
						...(result.context as Partial<ZugferdApiContext>),
					};
				}
			}
		}
	}

	context.options = options;
	return { context };
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
