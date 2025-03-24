import type { GenericEndpointContext } from "./context";
import type { Renderer } from "./renderer";

export type ZugferdApiOptions<R extends Renderer = Renderer> = {
	secret: string;
	baseURL?: string;
	/**
	 * @default "/api/zugferd"
	 */
	basePath?: string;
	template: R["$Infer"]["Template"];
	trustedOrigins?:
		| string[]
		| ((request: Request) => string[] | Promise<string[]>);
	advanced?: {
		disableCSRFCheck?: boolean;
	};
	authorize?: (ctx: GenericEndpointContext) => Promise<boolean> | boolean;
};
