import puppeteer from "puppeteer";
import type { GenericEndpointContext, Template } from "../types";

export const generatePdf = async (ctx: GenericEndpointContext) => {
	const { context } = ctx;

	context.context.logger.debug(
		`[api:${generatePdf.name}] Launching Puppeteer with options:`,
		context.options.advanced?.puppeteer,
	);
	const browser = await puppeteer.launch(
		context.options.advanced?.puppeteer?.launch,
	);

	try {
		const page = await browser.newPage();

		context.context.logger.debug(
			`[api:${generatePdf.name}] Available templates:`,
			Object.keys(context.options.templates).join(", "),
		);

		const templateEntry: Template | undefined =
			context.options.templates[ctx.body.template];

		if (!templateEntry) {
			context.context.logger.error(
				`[api:${generatePdf.name}] Template "${ctx.body.template}" not found.`,
			);
			throw ctx.error("BAD_REQUEST", {
				code: "TEMPLATE_NOT_FOUND",
				message: "Template not found.",
			});
		}

		context.context.logger.debug(
			`[api:${generatePdf.name}] Using template "${ctx.body.template}"`,
		);

		context.context.logger.debug(`[api:${generatePdf.name}] Rendering HTML...`);

		const document = {
			layout: ({ head, body }) =>
				`<!DOCTYPE html><html><head>${head ?? ""}</head><body>${body}</body></html>`,
			...(await templateEntry(ctx.body.data)),
		} satisfies ReturnType<Template>;

		const rawContent = await context.options.renderer.render(document.body);
		const content = await document.layout(rawContent);

		await page.setContent(content, {
			waitUntil: "networkidle0",
		});

		const headerTemplate: string | undefined =
			document.displayHeaderFooter && document.header
				? (await context.options.renderer.render(document.header)).body
				: undefined;
		const footerTemplate: string | undefined =
			document.displayHeaderFooter && document.footer
				? (await context.options.renderer.render(document.footer)).body
				: undefined;

		context.context.logger.debug(
			`[api:${generatePdf.name}] Rendered HTML length: ${content.length}`,
		);
		if (headerTemplate) {
			context.context.logger.debug(
				`[api:${generatePdf.name}] Rendered Header length: ${headerTemplate.length}`,
			);
		}
		if (footerTemplate) {
			context.context.logger.debug(
				`[api:${generatePdf.name}] Rendered Footer length: ${footerTemplate.length}`,
			);
		}

		context.context.logger.debug(`[api:${generatePdf.name}] Generating PDF...`);
		const pdf = await page.pdf({
			format: "A4",
			headerTemplate,
			footerTemplate,
			...document,
		});
		context.context.logger.debug(
			`[api:${generatePdf.name}] Generated PDF size: ${pdf.length}`,
		);

		return pdf;
	} catch (err) {
		throw err;
	} finally {
		await browser.close();
		context.context.logger.debug(`[api:${generatePdf.name}] Browser closed`);
	}
};
