import type { InferSchema, Profile } from "node-zugferd/types";
import { createApiEndpoint } from "../call";
import { z } from "zod";
import { HIDE_METADATA } from "../../utils/hide-metadata";
import { sessionMiddleware } from "../middlewares/session";

export const preview = <P extends Profile>() =>
	createApiEndpoint(
		"/preview",
		{
			method: "POST",
			body: z.object({
				data: z.record(z.string(), z.any()),
			}),
			use: [sessionMiddleware],
			metadata: {
				...HIDE_METADATA,
				$Infer: {
					body: {} as { data: InferSchema<P> },
				},
			},
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
