import type { JSX } from "react";
import type { Renderer } from "./renderer";

export type ZugferdApiOptions = {
	template: (data: any) => JSX.Element;
	renderer: Renderer;
};
