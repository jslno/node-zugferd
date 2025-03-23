import type { InferSchema, Profile } from "node-zugferd/types";
import { createApiEndpoint } from "../call";
import { z, ZodType } from "zod";
import puppeteer from "puppeteer";

export const create = <P extends Profile>() =>
	createApiEndpoint(
		"/create",
		{
			method: "POST",
			body: z.object({
				data: z.record(z.string(), z.any()) as any as ZodType<InferSchema<P>>,
			}),
		},
		async (ctx) => {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();

			const targetURL = `${ctx.context.baseURL}/preview`;

			await page.setRequestInterception(true);

			page.on("request", (request) => {
				if (request.url() === targetURL && request.method() === "GET") {
					request.continue({
						method: "POST",
						postData: JSON.stringify(ctx.body),
						headers: {
							...request.headers(),
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
					"Content-Type": "application/pdf",
				}),
			});
		},
	);
