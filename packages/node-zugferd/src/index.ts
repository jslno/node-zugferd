import type {
	Prettify,
	UnionToIntersection,
	ZugferdContext,
	ZugferdOptions,
	ZugferdPlugin,
	ZugferdProfile,
} from "@node-zugferd/core";
import { createContext } from "./context";
import type {
	CreatePlugin,
	CreatePluginActions,
} from "./internal-plugins/create";
import { deepmerge } from "./utils";
import "./internal-plugins/create";

type InferPlugins<Opts extends ZugferdOptions> =
	| CreatePlugin<Opts>
	| (Opts["plugins"] extends Array<infer P> ? P : never);

type UserPluginActions<Opts extends ZugferdOptions> =
	Opts["plugins"] extends Array<infer P>
		? P extends ZugferdPlugin
			? P extends { actions: infer A }
				? A extends (...args: any[]) => infer R
					? R
					: never
				: never
			: never
		: never;

type InferPluginActions<Opts extends ZugferdOptions> = Prettify<
	UnionToIntersection<CreatePluginActions<Opts> | UserPluginActions<Opts>>
>;

const spanActions = <Opts extends ZugferdOptions>(
	ctx: ZugferdContext<Opts>,
	plugin: ZugferdPlugin,
	actions: Record<string, unknown>,
) => {
	const wrap = (value: object, path: string[] = []): object => {
		if (typeof value === "function") {
			return (...args: any[]) => {
				const name = path.join(".");
				return ctx.withSpan(
					name,
					{
						"node-zugferd.type": "action",
						"node-zugferd.context": `plugin:${plugin.id}`,
					},
					() => (value as Function)(...args),
				);
			};
		}

		if (Array.isArray(value)) {
			return value.map((v, i) => wrap(v, [...path, `${i}`]));
		}

		if (value && typeof value === "object") {
			const result: any = {};
			for (const key in value) {
				result[key] = wrap((value as any)[key], [...path, key]);
			}
			return result;
		}

		return value;
	};

	return wrap(actions);
};

const getActions = <Opts extends ZugferdOptions>(
	ctx: ZugferdContext<Opts>,
): InferPluginActions<Opts> => {
	return (ctx.options.plugins ?? []).reduce((acc, plugin) => {
		const actions = plugin.actions?.(ctx);
		if (actions) {
			return deepmerge(acc, spanActions(ctx, plugin, actions));
		}
		return acc;
	}, {}) as InferPluginActions<Opts>;
};

const runPluginInit = <Opts extends ZugferdOptions>(
	ctx: ZugferdContext<Opts>,
) => {
	let context: ZugferdContext = { ...ctx };
	if (ctx.options.plugins?.length) {
		for (const plugin of ctx.options.plugins) {
			if (typeof plugin.init === "function") {
				const res: Record<string, unknown> | void = plugin.init(context);
				if (!res) continue;
				context = deepmerge(context, res);
			}
		}
	}
	return context as ZugferdContext<Opts>;
};

type IsAny<T> = 0 extends 1 & T ? true : false;
type ExtractPluginField<T, Field extends string> =
	IsAny<T> extends true
		? {}
		: T extends { [K in Field]?: Record<string, unknown> }
			? T[Field] extends Record<string, unknown>
				? T[Field]
				: {}
			: {};

export type Zugferd<Opts extends ZugferdOptions> = InferPluginActions<Opts> & {
	$context: ZugferdContext<Opts>;
};

export type ZugferdWithInfer<Opts extends ZugferdOptions> = Zugferd<Opts> & {
	$Infer: Prettify<
		UnionToIntersection<ExtractPluginField<InferPlugins<Opts>, "$Infer">>
	>;
};

export const zugferd = <
	const Profiles extends ZugferdProfile[],
	const Opts extends ZugferdOptions<Profiles>,
>(
	options: Opts & { profiles: Profiles },
): ZugferdWithInfer<Opts> => {
	const ctx = runPluginInit(createContext(options));
	const result = {
		...getActions(ctx),
		$context: ctx,
	} satisfies Zugferd<Opts>;

	return result as ZugferdWithInfer<Opts>;
};

export type * from "@node-zugferd/core/types";
