import { createClient, type ClientOptions } from "better-call/client";
import { BASIC, type ProfileBasic } from "node-zugferd/profile";
import { zugferd } from "node-zugferd";
import type { ZugferdApiOptions } from "../types/options";
import { Document, renderer } from "../renderer/react";
import type {
	InferSchema,
	ProfileContext,
	ZugferdOptions,
} from "node-zugferd/types";
import { api } from "..";
import { getBaseURL } from "../utils/url";
import type { Router } from "../api";
import express from "express";
import { toNodeHandler } from "../integrations/node";

export const getTestInstance = async <
	O extends Partial<ZugferdApiOptions>,
	C extends ClientOptions,
	Z extends Partial<Omit<ZugferdOptions, "plugins">>,
>(
	options?: O,
	config?: {
		zugferdOptions?: Z;
		clientOptions?: C;
		port?: number;
	},
) => {
	config ||= {};
	const opts = {
		secret: "node-zugferd.secret",
		template: {
			default: {
				language: "eng",
				component: (props: { data: ProfileBasic }) => {
					return (
						<Document>
							<h1>Test Invoice</h1>
							<p>{props.data.number}</p>
						</Document>
					);
				},
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
	} satisfies ZugferdApiOptions;

	const profile = config.zugferdOptions?.profile || BASIC;

	const invoicer = zugferd({
		...config.zugferdOptions,
		profile,
		plugins: [
			api(profile)(renderer, {
				...opts,
				...options,
			}),
		],
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
		return invoicer.apiHandler(new Request(url, init));
	};

	const port = config.port || 3000;

	const client = createClient<Router<Profile>>({
		...(config?.clientOptions as C extends undefined ? {} : C),
		baseURL: getBaseURL(
			options?.basePath || "http://localhost:" + port,
			options?.basePath || "/api/zugferd",
		),
		customFetchImpl,
	});

	const createTestServer = () => {
		const app = express();
		app.all("/api/zugferd/*", toNodeHandler(invoicer));

		const server = app.listen(port);
		return server;
	};

	return {
		invoicer,
		data,
		client,
		customFetchImpl,
		createTestServer,
	};
};
