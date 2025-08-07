import type { ZugferdApiOptions } from "./types/options";
import { init, type ZugferdApiContext } from "./init";
import { getBaseURL, getOrigin } from "./utils";
import { ZugferdError, type Zugferd } from "node-zugferd";
import { getEndpoints, router } from "./api";
import type { FilterActions, InferAPI } from "./types/api";
import type { Renderer, Templates } from "./types";

export const api = <
	O extends ZugferdApiOptions,
	R extends Renderer,
	I extends Zugferd,
	T extends Templates<R["$Infer"]["Component"], I>,
>(
	options: Omit<O, "invoicer" | "renderer" | "templates"> & {
		invoicer: I;
		renderer: R;
		templates: T;
	},
) => {
	type Options = O & {
		invoicer: I;
		renderer: R;
		templates: T;
	};
	const opts = options as Options;

	const context = init<I["options"]>(opts);

	const { api } = getEndpoints<Awaited<typeof context>, O, R, I, T>(context);

	const handler = (async (request: Request) => {
		const ctx = await context;
		const basePath = ctx.options.basePath || "/api/zugferd";
		if (!ctx.options.baseURL) {
			const baseURL = getBaseURL(undefined, basePath, request);
			if (baseURL) {
				ctx.baseURL = baseURL;
				ctx.options.baseURL = getOrigin(ctx.baseURL) || undefined;
			} else {
				ctx.logger.error(
					`[api:handler] Unable to retrieve the baseURL from the request.`,
				);
				throw new ZugferdError(
					"BASE_URL_NOT_FOUND",
					"Unable to retrieve the baseURL from the request.",
				);
			}
		}
		ctx.trustedOrigins = [
			...(opts.trustedOrigins
				? Array.isArray(opts.trustedOrigins)
					? opts.trustedOrigins
					: await opts.trustedOrigins(request)
				: []),
			ctx.options.baseURL!,
		];
		const { handler } = router(ctx);
		return handler(request);
	}) satisfies ZugferdApi["handler"];

	return {
		context,
		invoicer: options.invoicer as I,
		templates: options.templates as T,
		handler,
		api: api as InferAPI<typeof api>,
	} satisfies ZugferdApi<Awaited<typeof context>, O, R, I, T>;
};

export type ZugferdApi<
	C extends ZugferdApiContext = ZugferdApiContext,
	O extends ZugferdApiOptions = ZugferdApiOptions,
	R extends Renderer = Renderer,
	I extends Zugferd = Zugferd,
	T extends Templates<R["$Infer"]["Component"], I> = Templates<
		R["$Infer"]["Component"],
		I
	>,
> = {
	invoicer: I;
	templates: T;
	context: Promise<C>;
	handler: (request: Request) => Promise<Response>;
	api: FilterActions<ReturnType<typeof router<C, O, R, I, T>>["endpoints"]>;
};

export { ZugferdError };
