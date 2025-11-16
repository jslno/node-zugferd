import type { Profile } from "../profile";
import type { createLogger } from "../utils";
import type { ZugferdHooks, ZugferdOptions } from "./options";

export type ZugferdContext<P extends Profile = Profile> = {
	options: ZugferdOptions<P>;
	profile: P;
	hooks: ZugferdHooks;
	logger: ReturnType<typeof createLogger>;
};
