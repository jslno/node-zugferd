import type { ZugferdContext } from "../init";

export type ZugferdPlugin = (ctx: ZugferdContext) => {
	[key: string]: unknown;
};
