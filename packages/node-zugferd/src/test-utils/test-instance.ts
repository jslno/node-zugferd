import { BASIC } from "../profiles";
import type { InferSchema, ProfileContext, ZugferdOptions } from "../types";
import { zugferd } from "../zugferd";

export const getTestInstance = async <O extends Partial<ZugferdOptions>>(
	options?: O,
) => {
	const opts = {
		profile: BASIC,
	} satisfies ZugferdOptions;

	const invoicer = zugferd({
		...opts,
		...options,
	});

	const data: InferSchema<
		O["profile"] extends ProfileContext ? O["profile"] : typeof BASIC
	> = (await import(`./data/${invoicer.context.options.profile.id}.ts`))
		.default;

	return {
		invoicer,
		data,
	};
};
