import type { LiteralString } from "node-zugferd/types";
import type { ZugferdApiContext } from "../init";
import type { DeepPartial } from "./helper";
import type { ZugferdApiOptions } from "./options";
import type { Endpoint, Middleware } from "better-call";
import type { ApiMiddleware } from "../api";
import type { HookEndpointContext } from "./context";

export type ZugferdApiPlugin = {
	id: LiteralString;
	/**
	 * The init function is called when the plugin is initialized.
	 * You can return a new context or modify the existing context.
	 */
	init?: (ctx: ZugferdApiContext) => {
		context?: DeepPartial<Omit<ZugferdApiContext, "options">>;
		options?: Partial<ZugferdApiOptions>;
	} | void;
	endpoints?: {
		[key: string]: Endpoint;
	};
	middlewares?: {
		path: string;
		middleware: Middleware;
	}[];
	onRequest?: (
		request: Request,
		ctx: ZugferdApiContext,
	) => Promise<{ response: Response } | { request: Request } | void>;
	onResponse?: (
		response: Response,
		ctx: ZugferdApiContext,
	) => Promise<{ response: Response } | void>;
	hooks?: {
		before?: {
			matcher: (context: HookEndpointContext) => boolean;
			handler: ApiMiddleware;
		}[];
		after?: {
			matcher: (context: HookEndpointContext) => boolean;
			handler: ApiMiddleware;
		}[];
	};
	/**
	 * The options of the plugin
	 */
	options?: Record<string, any>;
};
