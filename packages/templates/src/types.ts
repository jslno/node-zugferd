import type {
	Awaitable,
	StandardSchemaV1,
	ZugferdContext,
	ZugferdProfile,
} from "@node-zugferd/core";
import type { PDFDocument } from "pdf-lib";

export type TemplateContext = {
	data: Record<string, any>;
	xml: string;
	profile: ZugferdProfile;
	context: ZugferdContext;
};

export type Template<
	PropsInput extends Record<string, any> = Record<string, any>,
	PropsOutput = PropsInput,
> = {
	template: (
		props: PropsOutput,
		ctx: TemplateContext,
	) => Awaitable<PDFDocument | string | ArrayBuffer | Uint8Array>;
	props?: StandardSchemaV1<PropsInput, PropsOutput> | undefined;
	transformProps?:
		| ((props: PropsOutput, ctx: TemplateContext) => Awaitable<PropsOutput>)
		| undefined;
	$Infer?:
		| {
				Props?:
					| {
							Input?: PropsInput;
							Output?: PropsOutput;
					  }
					| undefined;
		  }
		| undefined;
};
export type Templates<
	T extends Record<string, Template<any, any>> = Record<
		string,
		Template<any, any>
	>,
> = T;

export interface TemplatesOptions<
	T extends Record<string, Template<any, any>> = Record<
		string,
		Template<any, any>
	>,
> {
	templates: T;
	defaultTemplate?: keyof T | undefined;
}
