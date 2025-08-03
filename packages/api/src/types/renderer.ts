import type { Zugferd } from "node-zugferd";
import type { LanguageCode } from "node-zugferd/codelist/language";
import type { Promisable } from "./helper";
import type { PaperFormat, PDFOptions } from "puppeteer";
import type { ZugferdApiOptions } from "./options";
import type { InferSchema } from "node-zugferd/types";

export type RendererContext = {
	invoicer: Zugferd;
	options: ZugferdApiOptions;
};

export type RenderResult = {
	head?: string;
	body: string;
};

export type Renderer = {
	render: (component: any, ...args: any) => Promisable<RenderResult>;
	$Infer: Record<string, any> & {
		Component: any;
	};
};

export type Templates<Component = any, I extends Zugferd = Zugferd> = {
	[key: string]: Template<Component, I>;
};

export type Template<Component = any, I extends Zugferd = Zugferd> = (
	data: InferSchema<I["options"]["profile"]>,
) => Promisable<
	Omit<PDFOptions, "format" | "footerTemplate" | "headerTemplate" | "path"> & {
		language?: LanguageCode;
		/**
		 * @remarks If set, this takes priority over the `width` and `height` options.
		 *
		 * @default "A4"
		 */
		format?: PaperFormat;
		/**
		 * @default
		 * ({ head, body }) => `<!DOCTYPE html><html><head>${head ?? ""}</head><body>${body}</body></html>`
		 */
		layout?: (data: RenderResult) => Promisable<string>;
		body: Component;
		/**
		 * HTML template for the print footer.
		 * Should be valid HTML with the following CSS classes used to inject values into them:
		 *
		 * - `date` formatted print date
		 * - `title` document title
		 * - `url` document location
		 * - `pageNumber` current page number
		 * - `totalPages` total pages in the document
		 */
		footer?: Component;
		/**
		 * HTML template for the print header.
		 * Should be valid HTML with the following CSS classes used to inject values into them:
		 *
		 * - `date` formatted print date
		 * - `title` document title
		 * - `url` document location
		 * - `pageNumber` current page number
		 * - `totalPages` total pages in the document
		 */
		header?: Component;
	}
>;
