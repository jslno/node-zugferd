import type { Zugferd } from "node-zugferd";
import { createApiEndpoint } from "../call";
import type { InferSchema } from "node-zugferd/types";
import z from "zod";
import { generatePdf } from "../generate-pdf";

export const preview = <I extends Zugferd, T extends Record<string, any>>() =>
	createApiEndpoint(
		"/preview",
		{
			method: "POST",
			body: z.object({
				template: z.string(),
				data: z.record(z.string(), z.any()),
			}),
			metadata: {
				$Infer: {
					body: {} as {
						template: Exclude<keyof T, number | symbol>;
						data: InferSchema<I["options"]["profile"]>;
					},
				},
			},
		},
		async (ctx) => {
			const { context } = ctx;

			const canPreviewDocument = await ctx.context.authorize(ctx);
			context.context.logger.debug(
				`[api:${preview.name}] Authorization result: ${canPreviewDocument}`,
			);

			if (!canPreviewDocument) {
				context.context.logger.error(
					`[api:${preview.name}] Unauthorized request`,
				);
				throw ctx.error("UNAUTHORIZED");
			}

			const pdf = await generatePdf(ctx);

			return new Response(pdf, {
				headers: new Headers({
					"Content-Type": "application/pdf; charset=binary",
					"Content-Disposition": "inline; filename=document.pdf",
				}),
			});
		},
	);
