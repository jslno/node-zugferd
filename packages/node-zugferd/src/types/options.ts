import type { ZugferdPlugin } from "./plugins";
import { type ProfileContext } from "./profile";

export type ZugferdOptions = {
	profile: ProfileContext;
	strict?: boolean;
	plugins?: ZugferdPlugin[];
};
