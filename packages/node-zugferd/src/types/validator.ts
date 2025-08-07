import type { LiteralString, Promisable } from "./helper";
import type { ZugferdContext } from "../init";
import type { ZugferdOptions } from "./options";

export type Validator = {
	id: LiteralString;
	init?: (context: ZugferdContext) => any;
	run: (ctx: {
		xml: string;
		context: Omit<ZugferdContext, "options"> & {
			options: Omit<ZugferdOptions, "validator">;
		};
	}) => Promisable<{
		valid: boolean;
		messages?: string[];
		code?: string;
	}>;
};
