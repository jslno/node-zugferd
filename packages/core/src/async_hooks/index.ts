import type { AsyncLocalStorage } from "node:async_hooks";
import { logger } from "../utils/logger";

export type { AsyncLocalStorage };

const alsPromise: Promise<typeof AsyncLocalStorage> = import(
	/* @vite-ignore */
	/* webpackIgnore: true */
	"node:async_hooks"
)
	.then((mod) => mod.AsyncLocalStorage)
	.catch((err) => {
		if ("AsyncLocalStorage" in globalThis) {
			return (globalThis as any).AsyncLocalStorage;
		}
		logger.warn(
			"AsyncLocalStorage is not available in this environment. Some features may not work as expected.",
		);
		logger.warn(
			"Read more about this warning at https://node-zugferd.jsolano.de/docs/installation",
		);
		logger.warn(
			"If you are using Cloudflare Workers, please see: https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag",
		);
		throw err;
	});

export const getAsyncLocalStorage = async (): Promise<
	typeof AsyncLocalStorage
> => await alsPromise;
