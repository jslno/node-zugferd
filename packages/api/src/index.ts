import type { Profile, ZugferdPlugin } from "node-zugferd/types";
import type { ZugferdApiOptions } from "./types/options";
import { init, type ZugferdApiContext } from "./init";
import { getEndpoints, router } from "./api";
import type { Renderer } from "./types/renderer";
import { getBaseURL, getOrigin } from "./utils/url";

export const api =
	<P extends Profile>(profile?: P) =>
	<R extends Renderer, O extends ZugferdApiOptions<R>>(
		renderer: R,
		options: O,
	) => {
		return ((ctx) => {
			profile = ctx.options.profile as any as P;
			const context = init(renderer, options, ctx);

			const api = getEndpoints(profile, context, options);

			return {
				apiHandler: async (request: Request) => {
					const ctx = await context;
					const basePath = ctx.options.basePath || "/api/zugferd";
					if (!ctx.options.baseURL) {
						const baseURL = getBaseURL(undefined, basePath, request);
						if (baseURL) {
							ctx.baseURL = baseURL;
							ctx.options.baseURL = getOrigin(ctx.baseURL) || undefined;
						} else {
							// TODO: Custom error
							throw new Error(
								"Unable to retrieve the origin from the request.",
							);
						}
					}
					ctx.trustedOrigins = [
						...(options.trustedOrigins
							? Array.isArray(options.trustedOrigins)
								? options.trustedOrigins
								: await options.trustedOrigins(request)
							: []),
						ctx.options.baseURL!,
					];
					const { handler } = router(ctx, options);
					return handler(request);
				},
				apiContext: context,
				api,
			};
		}) satisfies ZugferdPlugin;
	};

export type ZugferdApi = {
	apiHandler: (request: Request) => Promise<Response>;
	apiContext: Promise<ZugferdApiContext>;
	api: ReturnType<typeof router>["endpoints"];
};
