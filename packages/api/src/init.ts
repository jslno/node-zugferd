import type { ZugferdContext, ZugferdOptions } from "node-zugferd/types";
import type { ZugferdApiOptions } from "./types/options";
import { getBaseURL } from "./utils";
import type { GenericEndpointContext } from "./types/context";
import type { Promisable } from "./types/helper";
import type { Zugferd } from "node-zugferd";

export const init = async <I extends ZugferdOptions>(
	options: ZugferdApiOptions,
) => {
	options = {
		...options,
		onAPIError: {
			throw: true,
			...(options.onAPIError ?? {}),
		},
	};
	const context = await options.invoicer.context;
	context.logger.debug(`[api:${init.name}] Initializing API Plugin`);

	const baseURL = getBaseURL(options.baseURL, options.basePath) || "";

	const ctx: ZugferdApiContext<I> = {
		options,
		invoicer: options.invoicer as Zugferd<I>,
		context,
		logger: context.logger,
		baseURL,
		trustedOrigins: getTrustedOrigins(options),
		authorize: options.authorize || (() => true),
	};

	return ctx;
};

export type ZugferdApiContext<
	InvoicerOptions extends ZugferdOptions = ZugferdOptions,
> = {
	options: ZugferdApiOptions;
	context: ZugferdContext;
	invoicer: Zugferd<InvoicerOptions>;
	logger: ZugferdContext["logger"];
	baseURL: string;
	trustedOrigins: string[];
	authorize: (ctx: GenericEndpointContext) => Promisable<boolean>;
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
