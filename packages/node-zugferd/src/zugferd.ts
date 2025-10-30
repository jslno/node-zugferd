import type {
	InferPluginActions,
	InferSchema,
	UnionToIntersection,
	ZugferdContext,
	ZugferdHooks,
	ZugferdOptions,
	ZugferdPlugin,
} from "@node-zugferd/core";
import defu from "defu";

export function createZugferd<const O extends ZugferdOptions>(
	options: O,
): StrictZugferd<O> {
	const ctx: ZugferdContext = {
		options,
		profile: options.profile,
		logger: {} as never,
		hooks: getHooks(options),
	};
	const { context, actions } = runPluginInit(ctx);

	return {
		$context: context,
		create: (input: InferSchema<O["profile"]["schema"]>) => {
			return {
				values: input,
				toXML: async (): Promise<string> => {
					const xml = await context.profile.toXML(input, ctx);
					// TODO: Run validator
					return xml;
				},
			};
		},
		...actions,
	} satisfies Zugferd<O> as unknown as StrictZugferd<O>;
}

type Zugferd_base<O extends ZugferdOptions> = {
	$context: ZugferdContext;
	create: (input: InferSchema<O["profile"]["schema"]>) => {
		values: InferSchema<O["profile"]["schema"]>;
		toXML: () => Promise<string>;
	};
};

export type Zugferd<O extends ZugferdOptions = ZugferdOptions> =
	Zugferd_base<O> & Record<string, any>;

export type StrictZugferd<O extends ZugferdOptions = ZugferdOptions> =
	Zugferd_base<O> &
		(O["plugins"] extends ZugferdPlugin[]
			? UnionToIntersection<InferPluginActions<O["plugins"][number]>>
			: {}) & {
			$Infer: {
				Schema: InferSchema<O["profile"]["schema"]>;
			} & (O["plugins"] extends ZugferdPlugin[]
				? UnionToIntersection<O["plugins"][number]["$Infer"]>
				: {});
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
					options = defu(options, result.options)
				}
				if (result.context) {
					context = {
						...context,
						...(result.context as Partial<ZugferdContext>),
					}
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

function getHooks(options: ZugferdOptions): ZugferdHooks {
	const hooks = [
		options.hooks,
		...(options.plugins?.map((p) => p.hooks) ?? []),
	].filter(Boolean);

	const chainHooks = <R extends ((...args: any[]) => any) | undefined>(
		hooks: (ZugferdHooks | undefined)[],
		mapFn: (data: ZugferdHooks) => R,
	): NonNullable<R> | undefined => {
		const fns = hooks
			.filter(Boolean)
			.map((value) => mapFn(value!))
			.filter((fn): fn is NonNullable<R> => Boolean(fn));

		if (fns.length === 0) return undefined;

		return (async (...args: any[]) => {
			let result: any;
			for (const fn of fns) {
				const res = await fn(...args);
				if (res) result = res;
			}
			return result;
		}) as NonNullable<R>;
	};

	return {
		xml: {
			interpolate: {
				before: chainHooks(hooks, ({ xml }) => xml?.interpolate?.before),
				after: chainHooks(hooks, ({ xml }) => xml?.interpolate?.after),
			},
			build: {
				before: chainHooks(hooks, ({ xml }) => xml?.build?.before),
				after: chainHooks(hooks, ({ xml }) => xml?.build?.after),
			},
		},
		// TODO:
		pdfa: {},
	};
}
