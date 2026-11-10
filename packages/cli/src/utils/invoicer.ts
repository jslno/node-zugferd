import type { ZugferdPlugin } from "@node-zugferd/core";
import { zugferd } from "node-zugferd";
import type { ImportPackageConfig } from "./import";
import { importPlugin, importProfile } from "./import";

type PluginInput = {
	id: string;
	path: string;
	arguments?: unknown | unknown[] | undefined;
	$Infer?: ZugferdPlugin | ((...args: any) => ZugferdPlugin) | undefined;
} & ImportPackageConfig;

type InferPlugin<K extends PluginInput, T extends ZugferdPlugin> = K extends {
	optional: true;
}
	? T extends { actions: (...args: infer A) => infer R }
		? Omit<T, "actions"> & { actions: (...args: A) => Partial<R> }
		: T
	: T;

type InferPlugins<T extends readonly PluginInput[]> = {
	[I in keyof T]: T[I] extends infer K extends PluginInput
		? K extends { $Infer: infer U }
			? U extends (...args: any) => infer R
				? R extends ZugferdPlugin
					? InferPlugin<K, R>
					: never
				: U extends ZugferdPlugin
					? InferPlugin<K, U>
					: never
			: ZugferdPlugin
		: never;
};

export const getInvoicerInstance = async <
	const Cfg extends {
		profiles: string[];
		plugins?: PluginInput[] | undefined;
	},
>(
	cfg: Cfg,
) => {
	const [profiles, plugins] = await Promise.all([
		Promise.all(
			cfg.profiles.map((id) =>
				importProfile(id).then(({ data: profile, error }) => {
					if (error) throw error;
					return profile;
				}),
			),
		),
		Promise.all(
			(cfg.plugins ?? []).map((input) =>
				importPlugin(input.id, { optional: input.optional }).then(
					({ data: plugin, error }) => {
						if (error) throw error;
						return typeof plugin === "function"
							? (plugin as any)(
									...(Array.isArray(input.arguments)
										? input.arguments
										: [input.arguments]),
								)
							: plugin;
					},
				),
			),
		),
	]);

	return zugferd({
		profiles,
		plugins: plugins as Cfg["plugins"] extends PluginInput[]
			? InferPlugins<Cfg["plugins"]>
			: [],
	});
};
