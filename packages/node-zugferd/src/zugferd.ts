import type { InferSchema, Profile } from "@node-zugferd/core";
import type { ZugferdOptions } from "./types/options";

export function createZugferd<const O extends ZugferdOptions>(
	options: O,
): StrictZugferd<O> {
	const ctx: ZugferdContext = {
		options,
		profile: options.profile,
		logger: {} as never,
	};
	const { context, actions } = runPluginInit(ctx);

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
		// TODO: Infer
		...actions,
	} satisfies Zugferd<O> as unknown as StrictZugferd<O>;
}

export type ZugferdContext = {
	options: ZugferdOptions;
	profile: Profile;
	// TODO:
	logger: never;
};

type Zugferd_base<O extends ZugferdOptions> = {
	$context: ZugferdContext;
	create: (input: InferSchema<O["profile"]["schema"]>) => {
		values: InferSchema<O["profile"]["schema"]>;
		toXML: () => Promise<string>;
	};
};

export type Zugferd<O extends ZugferdOptions = ZugferdOptions> =
	Zugferd_base<O> & Record<string, any>;

export type StrictZugferd<O extends ZugferdOptions = ZugferdOptions> = {
	$Infer: {
		Schema: InferSchema<O["profile"]["schema"]>;
	};
};

function runPluginInit(ctx: ZugferdContext) {
	let options = ctx.options;
	const plugins = options.plugins ?? [];
	let context: ZugferdContext = ctx;
	let actions: Record<string, any> = {};

	for (const plugin of plugins) {
		if (plugin.init) {
			const result = plugin.init(context);
			if (typeof result === "object") {
				if (result.options) {
					// TODO:
				}
				if (result.context) {
					// TODO:
				}
				if (result.actions) {
					actions = {
						...actions,
						...result.actions,
					};
				}
			}
		}
	}

	context.options = options;
	return { context, actions };
}
