import type { ZugferdPlugin } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { verifyMagicBytes } from "./mime-types";
import type { MagicBytesOptions } from "./types";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOptions, Options> {
		"magic-bytes": {
			creator: typeof magicBytes;
		};
	}
}

export const magicBytes = (options?: MagicBytesOptions | undefined) => {
	const opts = {
		...(options ?? {}),
	} satisfies MagicBytesOptions;
	return {
		id: "magic-bytes",
		version: NODE_ZUGFERD_VERSION,
		init: (ctx) => {
			return {
				options: {
					advanced: {
						handleBinaryObject: async (ctx) => {
							if (!verifyMagicBytes(ctx.data)) {
								throw new ZugferdError("Unsupported file type");
							}

							await ctx.context.options.advanced?.handleBinaryObject?.(ctx);
						},
					},
				},
			};
		},
		options: opts,
	} satisfies ZugferdPlugin;
};
