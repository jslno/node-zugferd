import type { Plugin } from "./plugins";
import { PLUGINS } from "./plugins";
import type { Profile } from "./profiles";
import { PROFILES } from "./profiles";

export const INTERNAL_PLUGIN_IDS = ["~create"];

type WithId = { id: string };

export function configuredProfileIds(options: {
	profiles?: readonly WithId[] | undefined;
}): string[] {
	return (options.profiles ?? []).map((profile) => profile.id);
}

export function configuredPluginIds(options: {
	plugins?: readonly WithId[] | undefined;
}): string[] {
	return (options.plugins ?? [])
		.map((plugin) => plugin.id)
		.filter((id) => !INTERNAL_PLUGIN_IDS.includes(id));
}

export function remainingProfiles(options: {
	profiles?: readonly WithId[] | undefined;
}): Profile[] {
	const configured = new Set(configuredProfileIds(options));
	return [...PROFILES.values()].filter(
		(profile) => !configured.has(profile.id),
	);
}

export function remainingPlugins(options: {
	plugins?: readonly WithId[] | undefined;
}): Plugin[] {
	const configured = new Set(configuredPluginIds(options));
	return [...PLUGINS.values()].filter((plugin) => !configured.has(plugin.id));
}
