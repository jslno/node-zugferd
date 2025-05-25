import type { ZugferdApiContext } from "../init";

export type Renderer = {
	render: (
		ctx: {
			data: any;
		} & ZugferdApiContext,
		component: any,
	) => Promise<string> | string;
	$Infer: {
		Template: any;
	};
};
