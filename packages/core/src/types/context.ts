import type { Profile } from "../profile";
import type { createLogger } from "../utils";
import type { ZugferdHooks, ZugferdOptions } from "./options";

export type ZugferdContext = {
	options: ZugferdOptions;
	profile: Profile;
	hooks: ZugferdHooks;
	logger: ReturnType<typeof createLogger>;
};
