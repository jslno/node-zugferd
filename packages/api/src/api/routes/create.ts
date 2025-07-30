import type { InferSchema, Profile } from "node-zugferd/types";
import { createApiEndpoint } from "../call";
import { z } from "zod";
import puppeteer from "puppeteer";
import { signToken } from "../../utils/token";
import type { ZugferdApiOptions } from "../../types";

export const create = <P extends Profile, O extends ZugferdApiOptions>() =>
	createApiEndpoint(
		"/create",
		{
			method: "POST",
			body: z.object({
				template: z.string(),
				data: z.record(z.string(), z.any()),
			}),
			metadata: {
				$Infer: {
					body: {} as {
						template: Exclude<keyof O["template"], number>;
						data: InferSchema<P>;
					},
				},
			},
		},
		async (ctx) => {
			const { context, body } = ctx;

			const canCreateDocument = await context.authorize(ctx);
			context.context.logger.debug(
				`[${create.name}] Authorization result: ${canCreateDocument}`,
			);

			if (!canCreateDocument) {
				context.context.logger.error(`[${create.name}] Unauthorized request`);
				throw ctx.error("UNAUTHORIZED");
			}

			context.context.logger.debug(
				`[${create.name}] Launching Puppeteer with options:`,
				context.options.advanced?.puppeteer,
			);
			const browser = await puppeteer.launch(
				context.options.advanced?.puppeteer?.launch,
			);
			const page = await browser.newPage();

			const targetURL = `${context.baseURL}/preview`;
			context.context.logger.debug(
				`[${create.name}] Target preview URL: ${targetURL}`,
			);

			await page.setRequestInterception(true);

			const token = signToken(context);
			context.context.logger.debug(
				`[${create.name}] Signed token for preview request`,
			);

			page.on("request", (request) => {
				if (request.url() === targetURL && request.method() === "GET") {
					context.context.logger.debug(
						`[${create.name}] Intercepting preview request - converting to POST`,
					);
					request.continue({
						method: "POST",
						postData: JSON.stringify(body),
						headers: {
							...request.headers(),
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					});
				} else {
					request.continue();
				}
			});

			context.context.logger.debug(
				`[${create.name}] Navigating to preview page...`,
			);
			await page.goto(targetURL, { waitUntil: "networkidle0" });

			context.context.logger.debug(`[${create.name}] Generating PDF...`);
			const pdf = await page.pdf({
				format: "A4",
			});
			context.context.logger.debug(
				`[${create.name}] Generated PDF size: ${pdf.length}`,
			);

			await browser.close();
			context.context.logger.debug(`[${create.name}] Browser closed`);

			const zugferdCtx = ctx.context.context;

			context.context.logger.debug(
				`[${create.name}] Interpolate document with provided data`,
			);
			const invoice = zugferdCtx.document.create(body.data || {});
			context.context.logger.debug(
				`[${create.name}] Generating document and embedding in PDF`,
			);
			const pdfA = await invoice.embedInPdf(pdf);
			context.context.logger.debug(
				`[${create.name}] Generated PDF/A-3b size: ${pdfA.length}`,
			);

			return new Response(pdfA, {
				headers: new Headers({
					"Content-Type": "application/pdf; charset=binary",
					"Content-Disposition": "inline; filename=document.pdf",
				}),
			}) as any as Blob;
		},
	);
