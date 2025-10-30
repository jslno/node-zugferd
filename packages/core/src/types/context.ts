import type { Profile } from "../profile";
import type { ZugferdOptions } from "./options";

export type ZugferdContext = {
	options: ZugferdOptions;
	profile: Profile;
	// TODO:
	logger: never;
};
