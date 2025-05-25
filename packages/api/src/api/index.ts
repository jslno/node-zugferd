import {
	createRouter,
	type InputContext,
	type EndpointContext,
	type EndpointOptions,
	APIError,
	toResponse,
} from "better-call";
import type { ZugferdApiContext } from "../init";
import type { ZugferdApiOptions } from "../types/options";
import { ok } from "./routes/ok";
import { preview } from "./routes/preview";
import type { Profile } from "node-zugferd/types";
import { create } from "./routes/create";
import { originCheckMiddleware } from "./middlewares";
import type { ApiEndpoint } from "./call";

export const getEndpoints = <P extends Profile, O extends ZugferdApiOptions, C extends ZugferdApiContext>(
	profile: P,
	ctx: Promise<C> | C,
) => {
	const baseEndpoints = {
		preview: preview<P, O>(),
		create: create<P>(),
	};

	const endpoints = {
		...baseEndpoints,
		ok,
	};

	return toApiEndpoints(endpoints, ctx) as typeof endpoints;
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
		const endpoints = getEndpoints(profile, ctx);

		return createRouter(endpoints, {
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

export * from "./routes";
export * from "./middlewares";
export * from "./call";
export { APIError as ZugferdApiError } from "better-call";
