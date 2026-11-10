import type { ZugferdContext, ZugferdProfile } from "@node-zugferd/core";
import type { AsyncLocalStorage } from "@node-zugferd/core/async_hooks";
import { getAsyncLocalStorage } from "@node-zugferd/core/async_hooks";

const ALS_SYMBOL = Symbol.for("node-zugferd::data-types:async_hooks");

export type DataTypeContext = {
	context: ZugferdContext;
	profile: ZugferdProfile;
	pdf: {
		autoAttachBinaryObjects: boolean;
		embedFile: (data: {
			filename: string;
			mimeType: string;
			content: Uint8Array;
		}) => void;
	};
} & Record<string, any>;

const ensureAsyncStorage = async () => {
	if (!(globalThis as any)[ALS_SYMBOL]) {
		const AsyncLocalStorage = await getAsyncLocalStorage();
		(globalThis as any)[ALS_SYMBOL] = new AsyncLocalStorage();
	}
	return (globalThis as any)[ALS_SYMBOL] as AsyncLocalStorage<DataTypeContext>;
};

export const getContext = async () =>
	ensureAsyncStorage()
		.then((als) => als.getStore() ?? null)
		.catch(() => null);

export const withContext = async <R>(
	ctx: DataTypeContext,
	fn: () => R,
): Promise<R> => {
	let called = false;
	return ensureAsyncStorage()
		.then(async (als) => {
			called = true;
			const result: Awaited<R> = await als.run(ctx, fn);
			return result;
		})
		.catch((err) => {
			if (!called) {
				return fn();
			}
			throw err;
		});
};
