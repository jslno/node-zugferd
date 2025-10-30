import type { LiteralString } from "@node-zugferd/core";
import type { ZugferdContext } from "../zugferd";
import type { DeepPartial } from "@node-zugferd/core";
import type { ZugferdOptions } from "./options";

export type ZugferdPlugin = {
	id: LiteralString;
	init?: (ctx: ZugferdContext) => {
		context?: DeepPartial<Omit<ZugferdContext, "options">>;
		options?: Partial<ZugferdOptions>;
		actions?: Record<string, any>;
	} | void;
	options?: Record<string, any>;
	$Infer?: Record<string, any>;
};
