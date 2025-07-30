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
			const { context } = ctx;
			const data = ctx.body.data as InferSchema<P>;

			const templateEntry = Object.entries(ctx.context.options.template).find(
				([key]) => key === ctx.body.template,
			);

			context.context.logger.debug(
				`[${preview.name}] Available templates:`,
				Object.keys(context.options.template),
			);

			if (!templateEntry) {
				context.context.logger.error(
					`[${preview.name}] Template "${ctx.body.template.toString()}" not found`,
				);
				throw new ZugferdApiError("BAD_REQUEST", {
					message: "Template not found",
				});
			}

			const [templateKey, template] = templateEntry;

			context.context.logger.debug(
				`[${preview.name}] Using template "${templateKey}"`,
			);

			context.context.logger.debug(`[${preview.name}] Rendering HTML...`);
			const body = await context.renderer.render(
				{
					data,
					...context,
				},
				template.component,
			);
			context.context.logger.debug(
				`[${preview.name}] Rendered HTML length: ${body.length}`,
			);

			return new Response(body, {
				headers: new Headers({
					"Content-Type": "text/html",
				}),
			}) as any as string;
		},
	);
