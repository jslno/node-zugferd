import {
	createClient as createRpcClient,
	type ClientOptions as RpcClientOptions,
} from "better-call/client";
import type { Router } from "../api";
import { getBaseURL } from "../utils/url";
import type { Profile } from "node-zugferd/types";
import type { Endpoint } from "better-call";

type WithoutServerOnly<T extends Record<string, Endpoint>> = {
	[K in keyof T]: T[K] extends Endpoint<any, infer O>
		? O extends { metadata: { SERVER_ONLY: true } }
			? never
			: T[K]
		: T[K];
};

type WithoutNonActions<T extends Record<string, Endpoint>> = {
	[K in keyof T]: T[K] extends Endpoint<any, infer O>
		? O extends { metadata: { isAction: false } }
			? never
			: T[K]
		: T[K];
};

type FilterEndpoints<T extends Record<string, Endpoint>> = WithoutNonActions<
	WithoutServerOnly<T>
>;

export type ClientOptions = Omit<RpcClientOptions, "baseURL"> & {
	baseURL?: string;
	basePath?: string;
};

export const createClient = <P extends Profile>(options?: ClientOptions) => {
	const baseURL = getBaseURL(options?.baseURL, options?.basePath) || "";
	return createRpcClient<FilterEndpoints<Router<P>["endpoints"]>>({
		...options,
		baseURL,
	});
};
