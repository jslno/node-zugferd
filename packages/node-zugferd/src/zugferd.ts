import type {
	InferSchema,
	Profile,
} from "@node-zugferd/core";
import type { ZugferdOptions } from "./types/options";

export function createZugferd<const O extends ZugferdOptions>(options: O) {
	const context: ZugferdContext = {
		options,
		profile: options.profile,
		logger: {} as never,
	};

	return {
		$context: context,
		create: (input: InferSchema<O["profile"]["schema"]>) => {
			return {
				values: input,
				toXML: async (): Promise<string> => {
					const xml = context.profile.toXML(input);
					// TODO: Run validator
					return xml;
				},
			};
		},
		$Infer: {
			Schema: {} as InferSchema<O["profile"]["schema"]>,
		},
	} satisfies Zugferd<O>;
}

export type ZugferdContext = {
	options: ZugferdOptions;
	profile: Profile;
	// TODO:
	logger: never;
};

export type Zugferd<O extends ZugferdOptions = ZugferdOptions> = {
	$context: ZugferdContext;
	create: (input: InferSchema<O["profile"]["schema"]>) => {
		values: InferSchema<O["profile"]["schema"]>;
		toXML: () => Promise<string>;
	};
} & Record<string, any>;
