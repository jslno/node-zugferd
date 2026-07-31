import type { Awaitable, ZugferdPlugin } from "@node-zugferd/core";
import type {
	Template,
	TemplateContext,
	Templates,
	TemplatesOptions,
} from "./types";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError, ZugferdValidationError } from "@node-zugferd/core/error";
import type { PDFDocument } from "pdf-lib";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOptions, Options> {
		templates: {
			creator: typeof templates;
		};
	}
}

type HasRequiredKeys<T> = keyof {
	[K in keyof T as {} extends Pick<T, K> ? never : K]: T[K];
} extends never
	? false
	: true;

type PropsArgs<T> = [T] extends [never | undefined]
	? []
	: HasRequiredKeys<NonNullable<T>> extends true
		? [props: T]
		: [props?: T];

export const templates = <
	const T extends string,
	const Opts extends TemplatesOptions<T>,
	const DefaultTemplate extends T | undefined = undefined,
>(
	options: Opts & {
		templates: Templates<T>;
		defaultTemplate?: DefaultTemplate;
	},
) => {
	return {
		id: "templates",
		version: NODE_ZUGFERD_VERSION,
		actions: () => {
			type TemplateFnResult = (
				ctx: TemplateContext,
			) => Promise<PDFDocument | string | ArrayBuffer | Uint8Array>;

			type TemplateFnBase = {
				<K extends T>(
					name: K | ((ctx: TemplateContext) => Awaitable<K>),
					...props: PropsArgs<
						Opts["templates"][K] extends Template<infer P> ? P : never
					>
				): TemplateFnResult;
			};

			type TemplateFn = DefaultTemplate extends T
				? {
						(
							...args: PropsArgs<
								Opts["templates"][DefaultTemplate] extends Template<infer P>
									? P
									: never
							>
						): TemplateFnResult;
					} & TemplateFnBase
				: TemplateFnBase;

			return {
				template: ((
					nameOrProps?:
						| string
						| ((ctx: TemplateContext) => Awaitable<T>)
						| Record<string, any>
						| undefined,
					props?: Record<string, any> | undefined,
				) => {
					let name: T | ((ctx: TemplateContext) => Awaitable<T>);
					if (
						!nameOrProps ||
						(typeof nameOrProps === "object" && nameOrProps !== null)
					) {
						if (!options.defaultTemplate) {
							throw new ZugferdError(
								"No template name provided and no default template configured.",
							);
						}
						name = options.defaultTemplate;
						if (typeof nameOrProps === "object") {
							props = nameOrProps;
						}
					} else if (typeof nameOrProps === "string") {
						name = nameOrProps as T;
					}
					return async (ctx: TemplateContext) => {
						const templateName =
							typeof name === "function" ? await name(ctx) : name;
						const template = options.templates[templateName];
						if (!template) {
							throw new ZugferdError(
								`Template "${templateName}" not found in templates configuration.`,
							);
						}
						const {
							template: render,
							props: propsSchema,
							transformProps,
						} = template;
						if (propsSchema) {
							const result = await propsSchema["~standard"].validate(props);
							if (result.issues) {
								throw new ZugferdValidationError(result.issues);
							}
							props = result.value;
						}
						if (props && transformProps) {
							props = await transformProps(props, ctx);
						}

						return await render(props ?? {}, ctx);
					};
				}) as unknown as TemplateFn,
			};
		},
		$Infer: {} as {
			DefaultTemplate: DefaultTemplate;
			Templates: T;
		},
	} satisfies ZugferdPlugin;
};

export type * from "./types";
