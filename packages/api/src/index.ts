import type { ZugferdPlugin } from "node-zugferd/types";
import type { ZugferdApiOptions } from "./types/options";
import { init, type ZugferdApiContext } from "./init";
import { getEndpoints, router } from "./api";

export const api = <O extends ZugferdApiOptions>(options: O) => {
	return ((ctx) => {
		const context = init(options, ctx);

		const api = getEndpoints(context, options);

		return {
			apiHandler: async (request: Request) => {
				const ctx = await context;
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
