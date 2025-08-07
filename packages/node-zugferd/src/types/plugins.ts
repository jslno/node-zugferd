import type { ZugferdContext } from "../init";
import type { LiteralString, Promisable } from "./helper";

export type ZugferdPlugin = {
	id: LiteralString;
	handlers: {
		[key: string]: (ctx: Promisable<ZugferdContext>) => (...args: any) => any;
	};
};
