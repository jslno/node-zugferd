import { createRouter } from "better-call";
import type { ZugferdApiContext } from "../init";
import type { ZugferdApiOptions } from "../types/options";
import { ok } from "./routes/ok";
import { pdfPreview } from "./routes/pdf-preview";

export const getEndpoints = <
	C extends ZugferdApiContext,
	O extends ZugferdApiOptions,
>(
	ctx: Promise<C> | C,
	options: O,
) => {
	const baseEndpoints = {
		pdfPreview,
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
	const endpoints = getEndpoints(ctx, options);

	return createRouter(endpoints, {
		routerContext: ctx,
		openapi: {
			disabled: true,
		},
	});
};
