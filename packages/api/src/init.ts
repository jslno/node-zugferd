import type { ZugferdApiOptions } from "./types/options";
import type { ZugferdContext } from "node-zugferd/types";

export const init = async (
	options: ZugferdApiOptions,
	context: ZugferdContext,
) => {
	const ctx: ZugferdApiContext = {
		options,
		context,
	};

	return ctx;
};

export type ZugferdApiContext = {
	options: ZugferdApiOptions;
	context: ZugferdContext;
};
