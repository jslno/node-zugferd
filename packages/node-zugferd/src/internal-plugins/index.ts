import type { ZugferdOptions } from "@node-zugferd/core";
import { create } from "./create";

export const getInternalPlugins = <Opts extends ZugferdOptions>(
	options: Opts,
): [ReturnType<typeof create<Opts>>] => {
	return [create(options)];
};
