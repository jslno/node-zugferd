import type { Logger } from "../utils";
import type { ZugferdContext } from "./context";
import type { ZugferdPlugin } from "./plugin";
import type { ZugferdProfile } from "./profile";

export interface ZugferdOptions {
	profiles: ZugferdProfile[];
	plugins?: ZugferdPlugin[] | undefined;
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
}
