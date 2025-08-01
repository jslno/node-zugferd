import {
	createClient as createRpcClient,
	type ClientOptions as RpcClientOptions,
} from "better-call/client";
import type { Router } from "../api";
import { getBaseURL } from "../utils/url";
import type { Endpoint } from "better-call";
import type { ZugferdApiContext } from "../init";
import type { Zugferd } from "node-zugferd";

type WithoutNonActions<T extends Record<string, Endpoint>> = {
	[K in keyof T]: T[K] extends Endpoint<any, infer O>
		? O extends { metadata: { isAction: false } }
			? never
			: T[K]
		: T[K];
};

export type ClientOptions = Omit<RpcClientOptions, "baseURL"> & {
	baseURL?: string;
	basePath?: string;
};

export const createClient = <
	API extends {
		context: Promise<ZugferdApiContext>;
		invoicer: Zugferd;
		templates: Record<string, any>;
	},
>(
	options?: ClientOptions,
) => {
	const baseURL = getBaseURL(options?.baseURL, options?.basePath) || "";
	type Context = Awaited<API["context"]>;

	return createRpcClient<
		WithoutNonActions<
			Router<
				Context,
				Context["options"],
				Context["options"]["renderer"],
				API["invoicer"],
				API["templates"]
			>["endpoints"]
		>
	>({
		...options,
		baseURL,
	});
};
