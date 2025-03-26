import { createEndpoint, createMiddleware } from "better-call";
import type { ZugferdApiContext } from "../init";

export const optionsMiddleware = createMiddleware(async () => {
	return {} as ZugferdApiContext;
});

export const createApiMiddleware = createMiddleware.create({
	use: [
		optionsMiddleware,
		createMiddleware(async () => {
			return {} as {
				returned?: unknown;
				responseHeaders?: Headers;
			};
		}),
	],
});

export const createApiEndpoint = createEndpoint.create({
	use: [optionsMiddleware],
});

export type ApiMiddleware = ReturnType<typeof createApiMiddleware>;
export type ApiEndpoint = ReturnType<typeof createApiEndpoint>;
