import { init, type ZugferdContext } from "./init";
import { type ZugferdOptions } from "./types/options";
import { createDocument } from "./document/create";
import { validateDocument } from "./document/validate";
import type {
	InferSchema,
	IsExact,
	Promisable,
	UnionToIntersection,
	ZugferdPlugin,
} from "./types";
import { BASIC } from "./profiles";

export const zugferd = <O extends ZugferdOptions>(options: O) => {
	const context = init(options);

	const ctx = {
		context,
		options: options as O,
		$Infer: {
			Schema: {} as InferSchema<O["profile"]>,
		},
	};

	const handlers = getHandlers(context, options as O);

	return {
		...ctx,
		...handlers,
	} satisfies Zugferd;
};

export type Zugferd<O extends ZugferdOptions = ZugferdOptions> = {
	context: Promise<ZugferdContext>;
	options: O;
} & (IsExact<O, ZugferdOptions> extends true
	? Record<string, any>
	: ReturnType<typeof getHandlers<O>>);

const getHandlers = <O extends ZugferdOptions>(
	ctx: Promisable<ZugferdContext>,
	options: O,
) => {
	const pluginHandlers = (options.plugins || []).reduce(
		(acc, plugin) => {
			return {
				...acc,
				...Object.fromEntries(
					Object.entries(plugin.handlers).map(([key, handler]) => [
						key,
						handler(ctx),
					]),
				),
			};
		},
		{} as Record<string, any>,
	);

	type PluginHandler = UnionToIntersection<
		O["plugins"] extends Array<infer T>
			? T extends ZugferdPlugin
				? T extends {
						handlers: infer H;
					}
					? H
					: {}
				: {}
			: {}
	>;

	const baseHandlers = {
		create: createDocument<O>(ctx),
		validate: validateDocument(ctx),
	};

	const handlers = {
		...baseHandlers,
		...pluginHandlers,
	};

	return handlers as typeof handlers & PluginHandler;
};

const x: Zugferd = zugferd({
	profile: BASIC,
	validator: false,
});
