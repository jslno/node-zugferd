import type {
	Awaitable,
	InterpolateSchemaContext,
	Profile,
	ZugferdValidator,
} from "@node-zugferd/core";
import type { Logger } from "../utils/logger";
import type { ZugferdPlugin } from "./plugins";

export type ZugferdOptions = {
	profile: Profile;
	validator?: ZugferdValidator | undefined;
	plugins?: ZugferdPlugin[] | undefined;
	hooks?: ZugferdHooks | undefined;
	logger?: Logger | undefined;
	xml?:
		| {
				/**
				 * @default "compact"
				 */
				format?: "compact" | "pretty";
		  }
		| undefined;
};

export type ZugferdHooks = {
	xml?:
		| {
				interpolate?:
					| {
							before?:
								| ((ctx: InterpolateSchemaContext) => Awaitable<{
										context: InterpolateSchemaContext;
								  } | void>)
								| undefined;
							after?:
								| ((
										tree: Record<string, any>,
								  ) => Awaitable<{ tree: Record<string, any> } | void>)
								| undefined;
					  }
					| undefined;
				build?:
					| {
							before?:
								| ((
										tree?: Record<string, any>,
								  ) => Awaitable<{ tree: Record<string, any> } | void>)
								| undefined;
							after?: ((xml: string) => Awaitable<string | void>) | undefined;
					  }
					| undefined;
		  }
		| undefined;
	// TODO:
	pdfa?: {} | undefined;
};
