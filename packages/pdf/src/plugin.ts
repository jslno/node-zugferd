import type { ZugferdContext, ZugferdPlugin } from "node-zugferd/types";
import { renderPdf } from "./renderer";
import { createFormatters } from "./utils/format";
import type { CreatePdfOptions, PdfPluginOptions } from "./types";

/**
 * Adds a `createPdf` handler to the zugferd instance that renders the
 * invoice data with the configured template, generates the Factur-X XML
 * and returns a finished PDF/A-3b document with the XML embedded.
 *
 * ```ts
 * const invoicer = zugferd({
 *   profile: EN16931,
 *   plugins: [pdf({ template: defaultTemplate() })],
 * });
 *
 * const pdfA = await invoicer.createPdf(data);
 * ```
 */
export const pdf = (options: PdfPluginOptions) =>
	((ctx: ZugferdContext) => {
		const formatters = createFormatters(options.intlLocale);

		return {
			createPdf: async (data: any, opts?: CreatePdfOptions) => {
				ctx.logger.debug("[pdf:createPdf] Rendering template");
				const docDefinition = await options.template({
					data,
					logger: ctx.logger,
					formatters,
				});

				ctx.logger.debug("[pdf:createPdf] Generating PDF");
				const pdfBuffer = await renderPdf(docDefinition, {
					fonts: options.fonts,
				});
				ctx.logger.debug(
					`[pdf:createPdf] Generated PDF size: ${pdfBuffer.length}`,
				);

				const invoice = ctx.document.create(data);
				return await invoice.embedInPdf(pdfBuffer, opts);
			},
		};
	}) satisfies ZugferdPlugin;
