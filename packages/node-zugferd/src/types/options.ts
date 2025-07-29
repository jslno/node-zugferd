import type { Logger } from "../utils/logger";
import type { ZugferdPlugin } from "./plugins";
import { type ProfileContext } from "./profile";

export type ZugferdOptions = {
	profile: ProfileContext;
	strict?: boolean;
	plugins?: ZugferdPlugin[];
	debugLogs?: boolean;
	logger?: Logger;
};
