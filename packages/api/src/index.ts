import type { Profile, ZugferdPlugin } from "node-zugferd/types";
import type { ZugferdApiOptions } from "./types/options";
import { init, type ZugferdApiContext } from "./init";
import { getEndpoints, router, type Router } from "./api";
import type { Renderer } from "./types/renderer";
import { getBaseURL, getOrigin } from "./utils/url";
import { ZugferdError } from "node-zugferd";
import { signToken } from "./utils";

export const api =
	<P extends Profile>(profile?: P) =>
	<R extends Renderer, O extends ZugferdApiOptions<R>>(
		renderer: Renderer,
		options: O,
	) => {
		return ((ctx) => {
			profile = ctx.options.profile as any as P;
			const context = init(renderer, options, ctx);

			const { api } = getEndpoints(profile, context, options);

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
							throw new ZugferdError(
								"",
								"Unable to retrieve the baseURL from the request.",
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
					const { handler } = router(ctx.context.options.profile)(ctx, options);
					return handler(request);
				},
				apiContext: context,
				api: {
					...api,
					create: async (inputCtx: Parameters<typeof api.create>[0]) => {
						return (await api.create(inputCtx)) as any as Response;
					},
					preview: async (inputCtx: Parameters<typeof api.preview>[0]) => {
						const token = signToken(await context);

						const headers = new Headers(inputCtx.headers);

						headers.set("Authorization", `Bearer ${token}`);

						return (await api.preview({
							...inputCtx,
							headers,
						})) as any as Response;
					},
				},
			};
		}) satisfies ZugferdPlugin;
	};

export type ZugferdApi = {
	apiHandler: (request: Request) => Promise<Response>;
	apiContext: Promise<ZugferdApiContext>;
	api: Router["endpoints"];
};

export { ZugferdError };
