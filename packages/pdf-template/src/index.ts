import type { Awaitable } from "@node-zugferd/core";
import type { Template } from "@node-zugferd/templates";
import { PDFDocument } from "pdf-lib";
import { text as text_ } from "boxpdf";
import type { TextOptions } from "boxpdf";
import type { TemplateContext } from "@node-zugferd/templates";
import { IntlMessageFormat } from "intl-messageformat";

export function definePdfTemplate<
	const Input extends Record<string, any>,
	const Output = Input,
>(
	input: Omit<Template<Input, Output>, "template"> & {
		template: (
			pdf: PDFDocument,
			props: Output,
			ctx: TemplateContext,
		) => Awaitable<unknown>;
	},
): Template<Input, Output> {
	const { template, ...rest } = input;
	return {
		...rest,
		async template(props, ctx) {
			const hasFullICU = (() => {
				try {
					const january = new Date(9e8);
					const spanish = new Intl.DateTimeFormat("es", { month: "long" });
					return spanish.format(january) === "enero";
				} catch (err) {
					return false;
				}
			})();
			if (!hasFullICU) {
				ctx.context.logger.warn(
					"Full ICU support is not available in this environment. Please ensure that your Node.js environment has full ICU support enabled.",
				);
			}
			const pdf = await PDFDocument.create();
			await template(pdf, props, ctx);
			return pdf;
		},
	};
}

export const text = ((
	content: string,
	options: TextOptions & {
		props?: Record<string, any> | undefined;
		locale?: string | undefined;
	},
) => {
	const { props, locale, ...opts } = options;
	if (props) {
		content = new IntlMessageFormat(content, locale).format(props);
	}
	return text_(content, opts);
}) satisfies typeof text_;
export * from "boxpdf";
