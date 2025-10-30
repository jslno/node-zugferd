import type { Profile } from "@node-zugferd/core";
import type { ZugferdPlugin } from "./plugins";

export type ZugferdOptions = {
	profile: Profile<any>;
	plugins?: ZugferdPlugin[];
	// logger?: Logger;
};
