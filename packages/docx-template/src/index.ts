import { createWorkerConverter } from "@matbee/libreoffice-converter/server";
import type { Awaitable } from "@node-zugferd/core";
import type { Template, TemplateContext } from "@node-zugferd/templates";
import { TemplateHandler } from "easy-template-x";
import { createResolver } from "easy-template-x-angular-expressions";

let lazyConverter: ReturnType<typeof createWorkerConverter> | null = null;
const getConverter = async () => {
	if (!lazyConverter) {
		lazyConverter = createWorkerConverter();
	}
	return lazyConverter;
};

const flatten = (obj: Record<string, any>): Record<string, any> => {
	if (Array.isArray(obj)) {
		return obj.map(flatten);
	}

	if (obj && typeof obj === "object" && !("_type" in obj)) {
		const res: Record<string, any> = {};

		for (const key in obj) {
			const value = obj[key];

			if (Array.isArray(value)) {
				res[key] = value.map(flatten);
			} else if (value && typeof value === "object") {
				const flatChild = flatten(value);

				for (const childKey in flatChild) {
					res[`${key}.${childKey}`] = flatChild[childKey];
				}
			} else {
				res[key] = value;
			}
		}

		return res;
	}

	return obj;
};

const toPDF = async (doc: Uint8Array | ArrayBuffer) => {
	const converter = await getConverter();
	const { data } = await converter.convert(doc, { outputFormat: "pdf" });
	return data;
};

export function defineDocxTemplate<
	const Input extends Record<string, any>,
	const Output = Input,
>(
	input: Omit<Template<Input, Output>, "template"> & {
		templateFile:
			| Blob
			| ArrayBuffer
			| Uint8Array
			| ((
					props: Output,
					ctx: TemplateContext,
			  ) => Awaitable<Blob | ArrayBuffer | Uint8Array>);
	},
): Template<Input, Output> {
	const { templateFile, ...template } = input;
	return {
		...template,
		async template(props, ctx) {
			const resolveTemplateFile = async (): Promise<ArrayBuffer> => {
				const fn = async (data: Blob | ArrayBuffer | Uint8Array) => {
					if (data instanceof Uint8Array) {
						return data.buffer as ArrayBuffer;
					} else if (data instanceof Blob) {
						return await data.arrayBuffer();
					} else if (data instanceof ArrayBuffer) {
						return data;
					} else {
						throw new Error("Invalid template file");
					}
				};

				return fn(
					typeof templateFile === "function"
						? await templateFile(props, ctx)
						: templateFile,
				);
			};
			const handler = new TemplateHandler({
				scopeDataResolver: createResolver() as any,
				skipEmptyTags: true,
			});
			return toPDF(
				await handler.process(
					await resolveTemplateFile(),
					flatten({
						data: ctx.data,
						props,
					}),
				),
			);
		},
	};
}
