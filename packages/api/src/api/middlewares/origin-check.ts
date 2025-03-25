/**
 * @see https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/api/middlewares/origin-check.ts
 */

import { getHost, getOrigin, getProtocol } from "../../utils/url";
import { createApiMiddleware } from "../call";
import { wildcardMatch } from "../../utils/wildcard-match";
import type { GenericEndpointContext } from "../../types/context";
import { APIError } from "better-call";

/**
 * A middleware to validate origin against
 * trustedOrigins.
 */
export const originCheckMiddleware = createApiMiddleware(async (ctx) => {
	if (!ctx.request) {
		return;
	}
	const { context } = ctx;
	const originHeader =
		ctx.headers?.get("origin") || ctx.headers?.get("referer") || "";
	const trustedOrigins: string[] = Array.isArray(context.options.trustedOrigins)
		? context.trustedOrigins
		: [
				...context.trustedOrigins,
				...((await context.options.trustedOrigins?.(ctx.request)) || []),
			];

	const matchesPattern = (url: string, pattern: string): boolean => {
		if (url.startsWith("/")) {
			return false;
		}
		if (pattern.includes("*")) {
			return wildcardMatch(pattern)(getHost(url));
		}

		const protocol = getProtocol(url);
		return protocol === "http:" || protocol === "https:" || !protocol
			? pattern === getOrigin(url)
			: url.startsWith(pattern);
	};
	const validateURL = (url: string | undefined, label: string) => {
		if (!url) {
			return;
		}
		const isTrustedOrigin = trustedOrigins.some(
			(origin) =>
				matchesPattern(url, origin) ||
				(url?.startsWith("/") &&
					label !== "origin" &&
					/^\/(?!\/|\\|%2f|%5c)[\w\-.\+/]*(?:\?[\w\-.\+/=&%]*)?$/.test(url)),
		);
		if (!isTrustedOrigin) {
			console.error(`Invalid ${label}: ${url}`);
			console.info(
				`If it's a valid URL, please add ${url} to trustedOrigins in your api config\n`,
				`Current list of trustedOrigins: ${trustedOrigins}`,
			);
			throw new APIError("FORBIDDEN", {
				message: `Invalid ${label}`,
			});
		}
	};
	if (!ctx.context.options.advanced?.disableCSRFCheck) {
		validateURL(originHeader, "origin");
	}
});

export const originCheck = (
	getValue: (ctx: GenericEndpointContext) => string | string[],
) =>
	createApiMiddleware(async (ctx) => {
		if (!ctx.request) {
			return;
		}
		const { context } = ctx;
		const callbackURL = getValue(ctx);
		const trustedOrigins: string[] = Array.isArray(
			context.options.trustedOrigins,
		)
			? context.trustedOrigins
			: [
					...context.trustedOrigins,
					...((await context.options.trustedOrigins?.(ctx.request)) || []),
				];

		const matchesPattern = (url: string, pattern: string): boolean => {
			if (url.startsWith("/")) {
				return false;
			}
			if (pattern.includes("*")) {
				return wildcardMatch(pattern)(getHost(url));
			}
			return url.startsWith(pattern);
		};

		const validateURL = (url: string | undefined, label: string) => {
			if (!url) {
				return;
			}
			const isTrustedOrigin = trustedOrigins.some(
				(origin) =>
					matchesPattern(url, origin) ||
					(url?.startsWith("/") &&
						label !== "origin" &&
						/^\/(?!\/|\\|%2f|%5c)[\w\-.\+/]*(?:\?[\w\-.\+/=&%]*)?$/.test(url)),
			);
			if (!isTrustedOrigin) {
				console.error(`Invalid ${label}: ${url}`);
				console.info(
					`If it's a valid URL, please add ${url} to trustedOrigins in your api config\n`,
					`Current list of trustedOrigins: ${trustedOrigins}`,
				);
				throw new APIError("FORBIDDEN", {
					message: `Invalid ${label}`,
				});
			}
		};
		const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
		for (const url of callbacks) {
			validateURL(url, "callbackURL");
		}
	});
