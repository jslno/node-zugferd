import type { Logger } from "../utils/logger";
import type { ZugferdPlugin } from "./plugins";
import { type ProfileContext } from "./profile";
import type { Validator } from "./validator";

export type ZugferdOptions = {
	profile: ProfileContext;
	plugins?: ZugferdPlugin[];
	logger?: Logger;
	strict?: boolean
	validator: Validator | false | undefined;
};
