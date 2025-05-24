import type { LaunchOptions } from "puppeteer";
import type { GenericEndpointContext } from "./context";
import type { Renderer } from "./renderer";
import type { ZugferdApiPlugin } from "./plugins";

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
	plugins?: ZugferdApiPlugin[];
	advanced?: {
		disableCSRFCheck?: boolean;
		puppeteer?: {
			launch?: LaunchOptions;
		};
	};
	authorize?: (ctx: GenericEndpointContext) => Promise<boolean> | boolean;
};
