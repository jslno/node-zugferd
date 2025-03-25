import type { Renderer } from "../types";

export const renderer = {
	render: (ctx) => ctx.options.template({ data: ctx.data }),
	$Infer: {
		Template: {} as (props: { data: any }) => string,
	},
} satisfies Renderer;

export type DocumentProps = {
	head?: string;
	html?: Record<string, any>;
	body?: Record<string, any>;
};

export const Document =
	(props?: DocumentProps) =>
	(child: TemplateStringsArray | string, ...values: any[]) => {
		const head = !!props?.head ? props.head : "";
		const htmlProps = propsToAttr(props?.html);
		const bodyProps = propsToAttr(props?.body);

		const body =
			typeof child === "string"
				? child
				: child.reduce(
						(result, str, i) => result + str + (values[i] ?? ""),
						"",
					);

		return `<!DOCTYPE html><html${htmlProps}><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />${head}</head><body${bodyProps}>${body}</body></html>`;
	};

const propsToAttr = (data: Record<string, any> | undefined | null) => {
	const attributes = Object.entries(data == null ? {} : data).map(
		([key, value]) => `${key}=${JSON.stringify(value)}`,
	);

	if (attributes.length <= 0) {
		return "";
	}

	return " " + attributes.join(" ");
};
