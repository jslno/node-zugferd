import { type ClientOptions } from "better-call/client";
import { BASIC } from "node-zugferd/profile";
import { zugferd } from "node-zugferd";
import type { ZugferdApiOptions } from "../types/options";
import { reactRenderer } from "../renderer/react";
import type {
	InferSchema,
	ProfileContext,
	ZugferdOptions,
} from "node-zugferd/types";
import { api as zugferdApi } from "..";
import { getBaseURL } from "../utils/url";
import { createClient } from "../client";

export const getTestInstance = async <
	O extends Partial<ZugferdApiOptions>,
	C extends ClientOptions,
	Z extends Partial<ZugferdOptions>,
>(
	options?: O,
	config?: {
		zugferdOptions?: Z;
		clientOptions?: C;
		port?: number;
	},
) => {
	config ||= {};

	const profile = config.zugferdOptions?.profile || BASIC;

	const invoicer = zugferd({
		...config.zugferdOptions,
		profile,
	});

	const api = zugferdApi({
		invoicer,
		renderer: reactRenderer(),
		templates: {
			default: (data: any) => {
				return {
					body: (
						<div>
							<h1>Test Invoice</h1>
							<p>{data.number}</p>
						</div>
					),
				};
			},
		},
		advanced: {
			puppeteer: {
				launch: {
					headless: true,
					args: ["--no-sandbox", "--disable-setuid-sandbox"],
				},
			},
		},
		...((options as unknown) ?? {}),
	});

	type Profile = Z["profile"] extends ProfileContext
		? Z["profile"]
		: typeof BASIC;

	const data: InferSchema<Profile> = (
		await import(`./data/${invoicer.context.options.profile.id}.ts`)
	).default;

	const customFetchImpl = async (
		url: string | URL | Request,
		init?: RequestInit,
	) => {
		return api.handler(new Request(url, init));
	};

	const port = config.port || 3000;

	const client = createClient<typeof api>({
		...(config?.clientOptions as C extends undefined ? {} : C),
		baseURL: getBaseURL(
			options?.basePath || "http://localhost:" + port,
			options?.basePath || "/api/zugferd",
		),
		customFetchImpl,
	});

	return {
		invoicer,
		api,
		data,
		client,
		customFetchImpl,
	};
};
