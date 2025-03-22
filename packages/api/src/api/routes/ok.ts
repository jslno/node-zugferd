import { createApiEndpoint } from "../call";

export const ok = createApiEndpoint(
	"/ok",
	{
		method: "GET",
	},
	async (ctx) => {
		return ctx.json({
			ok: true,
		});
	},
);
