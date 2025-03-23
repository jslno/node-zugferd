import { createRouter } from "better-call";
import type { ZugferdApiContext } from "../init";
import type { ZugferdApiOptions } from "../types/options";
import { ok } from "./routes/ok";
import { preview } from "./routes/preview";
import type { Profile } from "node-zugferd/types";

export const getEndpoints = <
	P extends Profile,
	C extends ZugferdApiContext,
	O extends ZugferdApiOptions,
>(
	profile: P,
	ctx: Promise<C> | C,
	options: O,
) => {
	const baseEndpoints = {
		preview: preview<P>(),
	};

	const endpoints = {
		...baseEndpoints,
		ok,
	};

	return endpoints;
};

export const router = <
	C extends ZugferdApiContext,
	O extends ZugferdApiOptions,
>(
	ctx: C,
	options: O,
) => {
	const endpoints = getEndpoints(ctx.context.options.profile, ctx, options);

	return createRouter(endpoints, {
		routerContext: ctx,
		basePath: new URL(ctx.baseURL).pathname,
		openapi: {
			disabled: true,
		},
	});
};
