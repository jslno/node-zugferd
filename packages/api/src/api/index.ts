import {
	createRouter,
	type InputContext,
	type EndpointContext,
	type EndpointOptions,
	APIError,
	toResponse,
	type Middleware,
} from "better-call";
import type { ZugferdApiContext } from "../init";
import type { ZugferdApiOptions } from "../types/options";
import { ok } from "./routes/ok";
import { preview } from "./routes/preview";
import type { Profile, UnionToIntersection } from "node-zugferd/types";
import { create } from "./routes/create";
import { originCheckMiddleware } from "./middlewares";
import type { ApiEndpoint } from "./call";
import type { ZugferdApiPlugin } from "../types/plugins";

export const getEndpoints = <
	P extends Profile,
	O extends ZugferdApiOptions,
	C extends ZugferdApiContext,
>(
	profile: P,
	ctx: Promise<C> | C,
	options: O,
) => {
	const pluginEndpoints = options.plugins?.reduce(
		(acc, plugin) => {
			return {
				...acc,
				...plugin.endpoints,
			};
		},
		{} as Record<string, any>,
	);

	type PluginEndpoint = UnionToIntersection<
		O["plugins"] extends Array<infer T>
			? T extends ZugferdApiPlugin
				? T extends {
						endpoints: infer E;
					}
					? E
					: {}
				: {}
			: {}
	>;

	const middlewares =
		options.plugins
			?.map((plugin) =>
				plugin.middlewares?.map((m) => {
					const middleware = (async (context: any) => {
						return m.middleware({
							...context,
							context: {
								...ctx,
								...context.context,
							},
						});
					}) as Middleware;
					middleware.options = m.middleware.options;
					return {
						path: m.path,
						middleware,
					};
				}),
			)
			.filter((plugin) => plugin !== undefined)
			.flat() || [];

	const baseEndpoints = {
		preview: preview<P, O>(),
		create: create<P, O>(),
	};

	const endpoints = {
		...baseEndpoints,
		...pluginEndpoints,
		ok,
	};

	return {
		api: toApiEndpoints(endpoints, ctx) as typeof endpoints & PluginEndpoint,
		middlewares,
	};
};

type InternalContext = InputContext<string, any> &
	EndpointContext<string, any> & {
		context: ZugferdApiContext & {
			returned?: unknown;
			responseHeaders?: Headers;
		};
	};

export const toApiEndpoints = <E extends Record<string, ApiEndpoint>>(
	endpoints: E,
	ctx: ZugferdApiContext | Promise<ZugferdApiContext>,
) => {
	const api: Record<
		string,
		((
			context: EndpointContext<string, any> & InputContext<string, any>,
		) => Promise<any>) & {
			path?: string;
			options?: EndpointOptions;
		}
	> = {};

	for (const [key, endpoint] of Object.entries(endpoints)) {
		api[key] = async (context) => {
			const apiContext = await ctx;
			const internalContext: InternalContext = {
				...context,
				context: {
					...apiContext,
					returned: undefined,
					responseHeaders: undefined,
				},
				path: endpoint.path,
				headers: context?.headers ? new Headers(context.headers) : undefined,
			};

			internalContext.asResponse = false;
			internalContext.returnHeaders = true;
			const result = (await endpoint(internalContext as any)) as any as {
				headers: Headers;
				response: any;
			};
			internalContext.context.returned = result.response;
			internalContext.context.responseHeaders = result.headers;

			if (result.response instanceof APIError && !context?.asResponse) {
				throw result.response;
			}

			return context?.asResponse
				? toResponse(result.response, {
						headers: result.headers,
					})
				: context.returnHeaders
					? {
							headers: result.headers,
							response: result.response,
						}
					: result.response;
		};
		api[key].path = endpoint.path;
		api[key].options = endpoint.options;
	}

	return api as E;
};

export type Router<P extends Profile = Profile> = ReturnType<
	ReturnType<typeof router<P>>
>;

export const router =
	<P extends Profile>(profile: P) =>
	<C extends ZugferdApiContext, O extends ZugferdApiOptions>(ctx: C) => {
		const { api, middlewares } = getEndpoints(profile, ctx, ctx.options as O);
		const basePath = new URL(ctx.baseURL).pathname;

		return createRouter(api, {
			routerContext: ctx,
			basePath,
			openapi: {
				disabled: true,
			},
			routerMiddleware: [
				{
					path: "/**",
					middleware: originCheckMiddleware,
				},
				...middlewares,
			],
			onRequest: async (req) => {
				for (const plugin of ctx.options.plugins || []) {
					if (plugin.onRequest) {
						const response = await plugin.onRequest(req, ctx);
						if (response && "response" in response) {
							return response.response;
						}
					}
				}

				return req;
			},
			onResponse: async (res) => {
				for (const plugin of ctx.options.plugins || []) {
					if (plugin.onResponse) {
						const response = await plugin.onResponse(res, ctx);
						if (response) {
							return response.response;
						}
					}
				}
				return res;
			},
		});
	};

export * from "./routes";
export * from "./middlewares";
export * from "./call";
export { APIError as ZugferdApiError } from "better-call";
