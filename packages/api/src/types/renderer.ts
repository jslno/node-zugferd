import type { ZugferdApiContext } from "../init";

export type Renderer = (
	ctx: {
		data: any;
	} & ZugferdApiContext,
) => string;
