import type { InferSchema, Profile } from "node-zugferd/types";
import { createApiEndpoint } from "../call";
import { z, ZodType } from "zod";

export const preview = <P extends Profile>() =>
	createApiEndpoint(
		"/preview",
		{
			method: "POST",
			body: z.object({
				data: z.record(z.string(), z.any()) as any as ZodType<InferSchema<P>>,
			}),
		},
		async (ctx) => {
			const data = ctx.body.data as InferSchema<P>;

			const body = await ctx.context.renderer.render({
				data,
				...ctx.context,
			});
			return new Response(body, {
				headers: new Headers({
					"Content-Type": "text/html",
				}),
			});
		},
	);
