import type { ZugferdContext } from "./context";
import type { Awaitable, LiteralString } from "./helper";

export type ZugferdValidator = {
	id: LiteralString;
	run: (xml: string, ctx: ZugferdContext) => Awaitable<void>;
};
