import type { ZugferdContext, ZugferdOptions } from "@node-zugferd/core";
import { createLogger } from "@node-zugferd/core/utils";
import { getInternalPlugins } from "./internal-plugins";

export function createContext<Opts extends ZugferdOptions>(
	opts: Opts,
): ZugferdContext<Opts> {
	return {
		options: {
			...opts,
			plugins: [...getInternalPlugins(opts), ...(opts.plugins ?? [])],
		},
		logger: createLogger(opts.logger),
		getProfile(id, cfg) {
			const profile = this.options.profiles.find((p) => p.id === id);
			if (cfg?.throw === true && !profile) {
				throw new Error(`Profile with id "${id}" not found.`);
			}
			return (profile ?? null) as any;
		},
		hasProfile(id) {
			return this.options.profiles.some((p) => p.id === id) as any;
		},
		getPlugin(id, cfg) {
			const plugin = this.options.plugins?.find((p) => p.id === id);
			if (cfg?.throw === true && !plugin) {
				throw new Error(`Plugin with id "${id}" not found.`);
			}
			return (plugin ?? null) as any;
		},
		hasPlugin(id) {
			return this.options.plugins?.some((p) => p.id === id) as any;
		},
	};
}
