import type { ZugferdContext } from "./context";
import type { ZugferdOptions } from "./options";
import type { DeepPartial, LiteralString } from "./utils";

export interface ZugferdPlugin {
	id: LiteralString;
	version?: string | undefined;
	init?:
		| ((ctx: ZugferdContext) => {
				options?:
					| (DeepPartial<ZugferdOptions> & Record<string, any>)
					| undefined;
		  } | void)
		| undefined;
	actions?: ((ctx: ZugferdContext) => Record<string, unknown>) | undefined;
	options?: Record<string, unknown> | undefined;
	$Infer?: Record<string, unknown> | undefined;
}
