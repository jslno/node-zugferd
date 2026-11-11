import type { ZugferdContext } from "node-zugferd/types";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

export type Promisable<T> = T | Promise<T>;

export type Formatters = {
	/**
	 * Formats a monetary amount including its currency symbol.
	 *
	 * @param currencyCode - ISO 4217 code
	 * @default "EUR"
	 */
	currency: (value: string | number, currencyCode?: string) => string;
	date: (value: Date) => string;
	/**
	 * Formats a quantity with a human readable unit derived from its
	 * UN/ECE Recommendation 20 code (e.g. `H87` -> `Stk`). Unknown codes
	 * fall back to the raw code.
	 */
	quantity: (value: string | number, unitCode?: string) => string;
};

export type TemplateContext<TData = any> = {
	/**
	 * The invoice data, exactly as passed to `createPdf`. This is the same
	 * data the Factur-X XML is generated from, so a template rendering only
	 * from it can never contradict the embedded XML.
	 */
	data: TData;
	logger: ZugferdContext["logger"];
	formatters: Formatters;
};

/**
 * A template turns invoice data into a pdfmake document definition.
 * Any function with this shape can be used, the built-in default template
 * is just one implementation.
 */
export type InvoiceTemplate<TData = any> = (
	ctx: TemplateContext<TData>,
) => Promisable<TDocumentDefinitions>;

/**
 * A single embeddable font family. PDF/A-3 requires all fonts to be
 * embedded, therefore only font buffers (TTF) are accepted, never names of
 * PDF standard fonts.
 */
export type PdfFont = {
	normal: Buffer;
	bold: Buffer;
	italics: Buffer;
	bolditalics: Buffer;
};

export type PdfPluginOptions = {
	template: InvoiceTemplate;
	/**
	 * BCP 47 locale used by the built-in number/date formatters.
	 *
	 * @default "de-DE"
	 */
	intlLocale?: string;
	/**
	 * Custom fonts available to templates, keyed by family name. The first
	 * entry is used as the document's default font.
	 *
	 * @default The Roboto family shipped with pdfmake
	 */
	fonts?: Record<string, PdfFont>;
};

export type CreatePdfOptions = NonNullable<
	Parameters<ReturnType<ZugferdContext["document"]["create"]>["embedInPdf"]>[1]
>;
