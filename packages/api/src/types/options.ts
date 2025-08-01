import type { LaunchOptions } from "puppeteer";
import type { Zugferd } from "node-zugferd";
import type { GenericEndpointContext } from "./context";
import type { Promisable } from "./helper";
import type { Renderer, Templates } from "./renderer";

export type ZugferdApiOptions = {
	renderer: Renderer;
	invoicer: Zugferd;
	baseURL?: string;
	/**
	 * @default "/api/zugferd"
	 */
	basePath?: string;
	templates: Templates<any, any>;
	trustedOrigins?: string[] | ((request: Request) => Promisable<string[]>);
	advanced?: {
		disableCSRFCheck?: boolean;
		puppeteer?: {
			launch?: LaunchOptions;
		};
	};
	authorize?: (ctx: GenericEndpointContext) => Promisable<boolean>;
};
