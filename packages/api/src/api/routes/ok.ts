import { HIDE_METADATA } from "../../utils/hide-metadata";
import { createApiEndpoint } from "../call";

export const ok = createApiEndpoint(
	"/ok",
	{
		method: "GET",
		metadata: {
			...HIDE_METADATA,
		},
	},
	async (ctx) => {
		return ctx.json({
			ok: true,
		});
	},
);
