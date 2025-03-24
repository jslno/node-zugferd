/**
 * @see https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/integrations/svelte-kit.ts
 */

import type { ZugferdApiOptions } from "../types/options";

export const toSvelteKitHandler = (api: {
	handler: (request: Request) => any;
	options: ZugferdApiOptions;
}) => {
	return (event: { request: Request }) => api.handler(event.request);
};

export const svelteKitHandler = async ({
	api,
	event,
	resolve,
}: {
	api: {
		handler: (request: Request) => any;
		options: ZugferdApiOptions;
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
	if (isApiPath(url.toString(), api.options)) {
		return api.handler(request);
	}
	return resolve(event);
};

export function isApiPath(url: string, options: ZugferdApiOptions) {
	const _url = new URL(url);
	const baseURL = new URL(
		`${options.baseURL || _url.origin}${options.basePath || "/api/auth"}`,
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
