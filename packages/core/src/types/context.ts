import type { Profile } from "../profile";
import type { ZugferdHooks, ZugferdOptions } from "./options";

export type ZugferdContext = {
	options: ZugferdOptions;
	profile: Profile;
	hooks: ZugferdHooks;
	// TODO:
	logger: never;
};
