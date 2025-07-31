import {
	APIError,
	createRouter,
	toResponse,
	type EndpointContext,
	type EndpointOptions,
	type InputContext,
} from "better-call";
import type { ZugferdApiContext } from "../init";
import type { Promisable } from "../types/helper";
import type { ApiEndpoint } from "./call";
import { originCheckMiddleware } from "./middlewares";
import { create, ok, preview } from "./routes";
import type { Zugferd } from "node-zugferd";
import type { Renderer, Templates, ZugferdApiOptions } from "../types";

export const getEndpoints = <
	C extends ZugferdApiContext,
	O extends ZugferdApiOptions,
	R extends Renderer,
	I extends Zugferd,
	T extends Templates<R["$Infer"]["Component"], I>,
>(
	ctx: Promisable<C>,
) => {
	const baseEndpoints = {
		create: create<I, T>(),
		preview: preview<I, T>(),
	};

	const endpoints = {
		...baseEndpoints,
		ok,
	};

	const api = toApiEndpoints(endpoints, ctx);

	return {
		api: api as typeof endpoints,
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

export type Router<
	C extends ZugferdApiContext,
	O extends ZugferdApiOptions,
	R extends Renderer,
	I extends Zugferd,
	T extends Templates<R["$Infer"]["Component"], I>,
> = ReturnType<typeof router<C, O, R, I, T>>;

export const router = <
	C extends ZugferdApiContext,
	O extends ZugferdApiOptions,
	R extends Renderer,
	I extends Zugferd,
	T extends Templates<R["$Infer"]["Component"], I>,
>(
	ctx: C,
) => {
	const { api } = getEndpoints<C, O, R, I, T>(ctx);

	return createRouter(api, {
		routerContext: ctx,
		basePath: new URL(ctx.baseURL).pathname,
		openapi: {
			disabled: true,
		},
		routerMiddleware: [
			{
				path: "/**",
				middleware: originCheckMiddleware,
			},
		],
	});
};

export * from "./middlewares";
export * from "./call";

export { APIError as ZugferdApiError } from "better-call";
