import { type InferSchema, type Profile } from "@node-zugferd/core";
import type { ZugferdOptions } from "./types/options";

export function createZugferd<const O extends ZugferdOptions>(options: O) {
	const context: ZugferdContext = {
		options,
		profile: options.profile,
		logger: {} as never,
	};

	return {
		$context: context,
		createInvoice: (input: InferSchema<O["profile"]["schema"]>) => {
			return {
				values: input,
				toXML: async () => {
					const xml = context.profile.toXML(input);
					// TODO: Run validator
					return xml;
				},
			};
		},
		$Infer: {
			Schema: {} as InferSchema<O["profile"]["schema"]>,
		},
	};
}

export type ZugferdContext = {
	options: ZugferdOptions;
	profile: Profile;
	// TODO:
	logger: never;
};
