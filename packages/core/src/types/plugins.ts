import type { DeepPartial, LiteralString } from "@node-zugferd/core";
import type { ZugferdContext } from "./context";
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

export type InferPluginActions<T extends ZugferdPlugin> = NonNullable<
	T["init"]
> extends (...args: any[]) => infer R
	? R extends { actions?: Record<string, any> }
		? NonNullable<R["actions"]>
		: Record<string, never>
	: Record<string, never>;
