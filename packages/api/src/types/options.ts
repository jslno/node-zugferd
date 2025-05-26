import type { LaunchOptions } from "puppeteer";
import type { GenericEndpointContext } from "./context";
import type { Renderer } from "./renderer";
import type { Iso639_2Code } from "node-zugferd/codelist/iso.639-2";

export type ZugferdApiOptions<R extends Renderer = Renderer> = {
	secret: string;
	baseURL?: string;
	/**
	 * @default "/api/zugferd"
	 */
	basePath?: string;
	template: {
		[key: string]: {
			language: Iso639_2Code;
			component: R["$Infer"]["Template"];
		};
	};
	trustedOrigins?:
		| string[]
		| ((request: Request) => string[] | Promise<string[]>);
	advanced?: {
		disableCSRFCheck?: boolean;
		puppeteer?: {
			launch?: LaunchOptions;
		};
	};
	authorize?: (ctx: GenericEndpointContext) => Promise<boolean> | boolean;
};
