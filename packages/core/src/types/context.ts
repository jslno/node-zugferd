import type { createLogger } from "../utils";
import type { Codelist } from "./codelist";
import type { ZugferdOptions } from "./options";
import type { ZugferdPlugin } from "./plugin";
import type { LiteralString } from "./utils";

export interface ZugferdCodelistRegistry {}
export type ZugferdCodelistRegistryIdentifier = [
	keyof ZugferdCodelistRegistry,
] extends [never]
	? string
	: keyof ZugferdCodelistRegistry & string;
export type ZugferdCodelistRegistryValue<
	K extends ZugferdCodelistRegistryIdentifier,
> = K extends keyof ZugferdCodelistRegistry
	? ZugferdCodelistRegistry[K]
	: Codelist;

// biome-ignore lint/correctness/noUnusedVariables: declarations must have identical type parameters
export interface ZugferdPluginRegistry<ZugferdOptions, Options> {}
export type ZugferdPluginRegistryId = keyof ZugferdPluginRegistry<
	unknown,
	unknown
>;

type InferPluginID<O extends ZugferdOptions> =
	O["plugins"] extends Array<infer P>
		? P extends ZugferdPlugin
			? P["id"]
			: never
		: never;
type InferPluginOptions<
	O extends ZugferdOptions,
	ID extends ZugferdPluginRegistryId | LiteralString,
> =
	O["plugins"] extends Array<infer P>
		? P extends ZugferdPlugin
			? P["id"] extends ID
				? P extends { options: infer O }
					? O
					: never
				: never
			: never
		: never;

export type PluginContext<Options extends ZugferdOptions> = {
	getPlugin: <
		ID extends ZugferdPluginRegistryId | LiteralString,
		PluginOptions extends InferPluginOptions<Options, ID>,
		Cfg extends { throw?: boolean | undefined } | undefined = undefined,
	>(
		pluginId: ID,
		cfg?: Cfg | undefined,
	) =>
		| (ID extends ZugferdPluginRegistryId
				? ZugferdPluginRegistry<Options, PluginOptions>[ID] extends {
						creator: infer C;
					}
					? C extends (...args: any[]) => infer R
						? R
						: never
					: never
				: ZugferdPlugin)
		| (Cfg extends { throw: true } ? never : null);
	hasPlugin: <ID extends ZugferdPluginRegistryId | LiteralString>(
		pluginId: ID,
	) => ID extends InferPluginID<Options> ? true : boolean;
};

export type ProfileContext<Options extends ZugferdOptions> = {
	getProfile: <
		ID extends ZugferdOptions["profiles"][number]["id"] | LiteralString,
		Cfg extends { throw?: boolean | undefined } | undefined = undefined,
	>(
		profileId: ID,
		cfg?: Cfg | undefined,
	) =>
		| (ID extends ZugferdOptions["profiles"][number]["id"]
				? Extract<Options["profiles"][number], { id: ID }>
				: never)
		| (Cfg extends { throw: true } ? never : null);
	hasProfile: <
		ID extends ZugferdOptions["profiles"][number]["id"] | LiteralString,
	>(
		profileId: ID,
	) => ID extends Options["profiles"][number]["id"] ? true : boolean;
};

export type ZugferdContext<Options extends ZugferdOptions = ZugferdOptions> =
	PluginContext<Options> &
		ProfileContext<Options> & {
			options: Options;
			logger: ReturnType<typeof createLogger>;
			withSpan<T>(
				name: string,
				attr: Record<string, string | number | boolean>,
				fn: () => T,
			): T;
			withSpan<T>(
				name: string,
				attr: Record<string, string | number | boolean>,
				fn: () => Promise<T>,
			): Promise<T>;
		};
