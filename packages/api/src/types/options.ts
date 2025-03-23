import type { Renderer } from "./renderer";

export type ZugferdApiOptions<R extends Renderer = Renderer> = {
	baseURL?: string;
	/**
	 * @default "/api/zugferd"
	 */
	basePath?: string;
	template: R["$Infer"]["Template"];
};
