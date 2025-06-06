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
			const canCreateDocument = await ctx.context.authorize(ctx);

			if (!canCreateDocument) {
				throw ctx.error("UNAUTHORIZED");
			}

			const browser = await puppeteer.launch(
				ctx.context.options.advanced?.puppeteer?.launch,
			);
			const page = await browser.newPage();

			const targetURL = `${ctx.context.baseURL}/preview`;

			await page.setRequestInterception(true);

			const token = signToken(ctx.context);

			page.on("request", (request) => {
				if (request.url() === targetURL && request.method() === "GET") {
					request.continue({
						method: "POST",
						postData: JSON.stringify(ctx.body),
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

			await page.goto(targetURL, { waitUntil: "networkidle0" });

			const pdf = await page.pdf({
				format: "A4",
			});

			await browser.close();

			const zugferdCtx = ctx.context.context;

			const invoice = await zugferdCtx.document.create(ctx.body.data || {});
			const pdfA = await invoice.embedInPdf(pdf);

			return new Response(pdfA, {
				headers: new Headers({
					"Content-Type": "application/pdf; charset=binary",
					"Content-Disposition": "inline; filename=document.pdf",
				}),
			}) as any as Blob;
		},
	);
