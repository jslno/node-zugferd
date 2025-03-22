import type { ZugferdOptions } from ".";
import type { createDocumentFactory } from "../document/create";
import type { validateDocumentFactory } from "../document/validate";
import type { ZugferdContext } from "../init";

export type ZugferdPlugin = (
	ctx: ZugferdContext & {
		document: {
			create: ReturnType<typeof createDocumentFactory<ZugferdOptions>>;
			validate: ReturnType<typeof validateDocumentFactory>;
		};
	},
) => {
	[key: string]: unknown;
};
