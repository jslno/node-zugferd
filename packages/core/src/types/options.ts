import type {
	Awaitable,
	InterpolateSchemaContext,
	Profile,
} from "@node-zugferd/core";
import type { ZugferdPlugin } from "./plugins";

export type ZugferdOptions = {
	profile: Profile<any>;
	plugins?: ZugferdPlugin[];
	hooks?: ZugferdHooks;
	// logger?: Logger;
};

export type ZugferdHooks = {
	xml?: {
		interpolate?: {
			before?: (ctx: InterpolateSchemaContext) => Awaitable<{
				context: InterpolateSchemaContext;
			} | void>;
			after?: (
				tree: Record<string, any>,
			) => Awaitable<{ tree: Record<string, any> } | void>;
		};
		build?: {
			before?: (
				tree?: Record<string, any>,
			) => Awaitable<{ tree: Record<string, any> } | void>;
			after?: (xml: string) => Awaitable<string | void>;
		};
	};
	// TODO:
	pdfa?: {};
};
