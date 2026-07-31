import type { Logger } from "../utils";
import type { ZugferdContext } from "./context";
import type { ZugferdPlugin } from "./plugin";
import type { ZugferdProfile } from "./profile";
import type { Awaitable } from "./utils";

export interface ZugferdOptions<
	P extends readonly ZugferdProfile[] = readonly ZugferdProfile[],
> {
	profiles: P;
	plugins?: ZugferdPlugin[] | undefined;
	prettyPrint?: boolean | undefined;
	logger?: Logger | undefined;
	hooks?: {
		afterXMLBuild?:
			| ((ctx: {
					xml: string;
					profile: ZugferdProfile;
					context: ZugferdContext;
			  }) => Promise<void> | void)
			| undefined;
	};
	advanced?:
		| {
				instrumentation?:
					| {
							span?<T>(
								name: string,
								attr: Record<string, string | number | boolean>,
								fn: () => T,
							): T;
							span?<T>(
								name: string,
								attr: Record<string, string | number | boolean>,
								fn: () => Promise<T>,
							): Promise<T>;
					  }
					| undefined;
				handleBinaryObject?:
					| ((ctx: {
							data: {
								content: Uint8Array;
								mimeType: string;
								filename: string;
							};
							context: ZugferdContext;
							profile: ZugferdProfile;
					  }) => Awaitable<void>)
					| undefined;
		  }
		| undefined;
}
