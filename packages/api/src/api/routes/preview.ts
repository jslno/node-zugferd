import type { InferSchema, Profile } from "node-zugferd/types";
import { createApiEndpoint } from "../call";
import { z } from "zod";
import { HIDE_METADATA } from "../../utils/hide-metadata";
import { sessionMiddleware } from "../middlewares/session";
import { ZugferdApiError } from "..";
import type { ZugferdApiOptions } from "../../types";

export const preview = <P extends Profile, O extends ZugferdApiOptions>() =>
	createApiEndpoint(
		"/preview",
		{
			method: "POST",
			body: z.object({
				template: z.string(),
				data: z.record(z.string(), z.any()),
			}),
			use: [sessionMiddleware],
			metadata: {
				...HIDE_METADATA,
				$Infer: {
					body: {} as { 
						template: Exclude<keyof O["template"], number>;
						data: InferSchema<P>;
					},
				},
			},
		},
		async (ctx) => {
			const data = ctx.body.data as InferSchema<P>;

			const templateEntry = Object.entries(ctx.context.options.template).find(([key]) => key === ctx.body.template)

			if (!templateEntry) {
				throw new ZugferdApiError("BAD_REQUEST", {
					message: "Template not found",
				});
			}

			const [_, template] = templateEntry;

			const body = await ctx.context.renderer.render({
				data,
				...ctx.context,
			}, template.component);

			return new Response(body, {
				headers: new Headers({
					"Content-Type": "text/html",
				}),
			}) as any as string;
		},
	);
