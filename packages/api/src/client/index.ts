import {
	createClient as createRpcClient,
	type ClientOptions,
} from "better-call/client";
import type { Router } from "../api";
import { getBaseURL } from "../utils/url";
import type { Profile } from "node-zugferd/types";
import type { BASIC } from "node-zugferd/profile";
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

export const createClient = <P extends Profile>(
	options?: Omit<ClientOptions, "baseURL"> & {
		baseURL?: string;
		basePath?: string;
	},
) => {
	const baseURL = getBaseURL(options?.baseURL, options?.basePath) || "";
	return createRpcClient<
		WithoutNonActions<WithoutServerOnly<Router<P>["endpoints"]>>
	>({
		...options,
		baseURL,
	});
};

const c = createClient<typeof BASIC>();

