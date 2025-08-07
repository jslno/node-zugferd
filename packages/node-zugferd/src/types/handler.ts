import type { ZugferdContext } from "../init";
import type { Promisable } from "./helper";

export type HandlerContext = {
	context: ZugferdContext;
};
export type Handler = (ctx: HandlerContext) => (...args: any[]) => any;

export const createHandler = <H extends Handler>(handler: H) => {
	return async (ctx: Promisable<ZugferdContext>) => {
		return async (...args: Parameters<ReturnType<H>>) => {
			const context = await ctx;

			const internalContext = {
				context,
			};

			return await handler(internalContext)(...args);
		};
	};
};
