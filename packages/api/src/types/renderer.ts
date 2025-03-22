import type { ZugferdApiContext } from "../init";

export type Renderer = {
	render: (
		ctx: {
			data: any;
		} & ZugferdApiContext,
	) => Promise<string> | string;
	$Infer: {
		Template: any;
	};
};
