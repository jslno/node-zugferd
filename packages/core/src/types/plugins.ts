import type { DeepPartial, LiteralString } from "@node-zugferd/core";
import type { ZugferdContext } from "./context";
import type { ZugferdHooks, ZugferdOptions } from "./options";

export type ZugferdPlugin = {
	id: LiteralString;
	init?:
		| ((ctx: ZugferdContext) => {
				context?: DeepPartial<Omit<ZugferdContext, "options">>;
				options?: Partial<ZugferdOptions>;
				actions?: Record<string, any>;
		  } | void)
		| undefined;
	hooks?: ZugferdHooks | undefined;
	options?: Record<string, any> | undefined;
	$Infer?: Record<string, any> | undefined;
};

export type InferPluginActions<T extends ZugferdPlugin> = NonNullable<
	T["init"]
> extends (...args: any[]) => infer R
	? R extends { actions?: Record<string, any> }
		? NonNullable<R["actions"]>
		: Record<string, never>
	: Record<string, never>;
