import type { Renderer } from "./renderer";

export type ZugferdApiOptions<R extends Renderer = Renderer> = {
	template: R["$Infer"]["Template"];
};
