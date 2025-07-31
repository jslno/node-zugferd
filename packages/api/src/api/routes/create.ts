import z from "zod";
import { createApiEndpoint } from "../call";
import type { InferSchema } from "node-zugferd/types";
import type { Zugferd } from "node-zugferd";
import { generatePdf } from "../generate-pdf";

export const create = <I extends Zugferd, T extends Record<string, any>>() =>
	createApiEndpoint(
		"/create",
		{
			method: "POST",
			body: z.object({
				template: z.string().optional(),
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
			requireHeaders: true,
		},
		async (ctx) => {
			const { context, body } = ctx;

			const canCreateDocument = await ctx.context.authorize(ctx);
			context.context.logger.debug(
				`[api:${create.name}] Authorization result: ${canCreateDocument}`,
			);

			if (!canCreateDocument) {
				context.context.logger.error(
					`[api:${create.name}] Unauthorized request`,
				);
				throw ctx.error("UNAUTHORIZED");
			}

			const pdf = await generatePdf(ctx);

			context.context.logger.debug(
				`[api:${create.name}] Interpolating document with provided data`,
			);
			const invoice = context.context.document.create(body.data || {});
			context.context.logger.debug(
				`[api:${create.name}] Generating document and embedding in PDF`,
			);
			const pdfA = await invoice.embedInPdf(pdf);
			context.context.logger.debug(
				`[api:${create.name}] Generated PDF/A-3b size: ${pdfA.length}`,
			);

			return new Response(pdfA, {
				headers: new Headers({
					"Content-Type": "application/pdf; charset=binary",
					"Content-Disposition": "inline; filename=document.pdf",
				}),
			});
		},
	);
