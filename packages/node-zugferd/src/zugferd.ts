import { init, type ZugferdContext } from "./init";
import { type ZugferdOptions } from "./types/options";
import { createDocumentFactory } from "./document/create";
import { validateDocumentFactory } from "./document/validate";
import type { UnionToIntersection } from "./types";
import type { ZugferdPlugin } from "./types/plugins";

export const zugferd = <O extends ZugferdOptions>(options: O) => {
	const context = init(options);

	const handlers = getPluginHandlers(context, options as O);

	const ctx = {
		context,
		create: context.document.create as ReturnType<
			typeof createDocumentFactory<O>
		>,
		validate: context.document.validate,
	};

	return {
		...ctx,
		...(handlers ?? {}),
	} as typeof ctx & typeof handlers;
};

const getPluginHandlers = <
	C extends ZugferdContext & {
		document: {
			create: ReturnType<typeof createDocumentFactory<O>>;
			validate: ReturnType<typeof validateDocumentFactory>;
		};
	},
	O extends ZugferdOptions,
>(
	ctx: C,
	options: O,
) => {
	const pluginHandlers = (options.plugins || []).reduce(
		(acc, plugin) => {
			return {
				...acc,
				...plugin(ctx as any),
			};
		},
		{} as Record<string, any>,
	);

	type PluginHandler = UnionToIntersection<
		O["plugins"] extends Array<infer T>
			? T extends ZugferdPlugin
				? ReturnType<T>
				: {}
			: {}
	>;

	return pluginHandlers as PluginHandler;
};
