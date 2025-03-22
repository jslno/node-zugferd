import { createApiEndpoint } from "../call";
import { z } from "zod";

export const pdfPreview = createApiEndpoint(
	"/pdf-preview",
	{
		method: "POST",
		body: z.object({
			// TODO: Infer profile schema
			data: z.record(z.string(), z.any()),
		}),
	},
	async (ctx) => {
		return new Response(
			await ctx.context.renderer.render({
				data: ctx.body.data,
				...ctx.context,
			}),
			{
				headers: new Headers({
					"Content-Type": "text/html",
				}),
			},
		);
	},
);
