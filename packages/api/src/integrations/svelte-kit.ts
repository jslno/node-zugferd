/**
 * @see https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/integrations/svelte-kit.ts
 */

import type { ZugferdApiContext } from "../init";
import type { ZugferdApiOptions } from "../types/options";

export const toSvelteKitHandler = (invoicer: {
	apiHandler: (request: Request) => any;
	apiContext: ZugferdApiContext;
}) => {
	return (event: { request: Request }) => invoicer.apiHandler(event.request);
};

export const svelteKitHandler = async ({
	invoicer,
	event,
	resolve,
}: {
	invoicer: {
		apiHandler: (request: Request) => any;
		apiContext: ZugferdApiContext;
	};
	event: { request: Request; url: URL };
	resolve: (event: any) => any;
}) => {
	//@ts-expect-error
	const { building } = await import("$app/environment")
		.catch((e) => {})
		.then((m) => m || {});
	if (building) {
		return resolve(event);
	}
	const { request, url } = event;
	if (isApiPath(url.toString(), invoicer.apiContext.options)) {
		return invoicer.apiHandler(request);
	}
	return resolve(event);
};

export function isApiPath(url: string, options: ZugferdApiOptions) {
	const _url = new URL(url);
	const baseURL = new URL(
		`${options.baseURL || _url.origin}${options.basePath || "/api/zugferd"}`,
	);
	if (_url.origin !== baseURL.origin) return false;
	if (
		!_url.pathname.startsWith(
			baseURL.pathname.endsWith("/")
				? baseURL.pathname
				: `${baseURL.pathname}/`,
		)
	)
		return false;
	return true;
}
