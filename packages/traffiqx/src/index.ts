import type { BetterFetchOption } from "@better-fetch/fetch";
import { createFetch } from "@better-fetch/fetch";
import type { ZugferdPlugin } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import type {
	TraffiqxAccessTokenInput,
	TraffiqxAccessTokenInputContext,
	TraffiqxDocumentStatus,
	TraffiqxInboxDocumentIds,
	TraffiqxInboxMetadata,
	TraffiqxOptions,
	TraffiqxOutboxDocumentIds,
	TraffiqxOutboxMetadata,
	TraffiqxProblemDetails,
	TraffiqxProvider,
	TraffiqxStatus,
	TraffiqxUploadResult,
} from "./types";
import { toBlob } from "./utils";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOpts, Options> {
		traffiqx: {
			creator: typeof traffiqx;
		};
	}
}

export const traffiqx = <
	const Provider extends TraffiqxProvider | TraffiqxProvider[],
	Metadata extends StandardSchemaV1<any, any>,
>(
	options: TraffiqxOptions<Provider, Metadata>,
) => {
	const opts = {
		$fetch: createFetch({
			credentials: "include",
			redirect: "manual",
			customFetchImpl: options.fetch,
		}),
		...options,
	};

	return {
		id: "traffiqx",
		version: NODE_ZUGFERD_VERSION,
		actions: () => {
			type ProviderInput =
				Provider extends Array<TraffiqxProvider>
					? {
							providerId: Provider[number]["providerId"];
						}
					: Provider extends TraffiqxProvider
						? {
								providerId?: Provider["providerId"];
							}
						: {
								providerId?: string;
							};
			type MetaInput = [undefined] extends [
				StandardSchemaV1.InferInput<Metadata>,
			]
				? {
						meta?: StandardSchemaV1.InferInput<Metadata>;
					}
				: { meta: StandardSchemaV1.InferInput<Metadata> };

			const getProvider = (input: ProviderInput) => {
				if (!Array.isArray(opts.provider)) {
					const provider: TraffiqxProvider = opts.provider;
					if (input.providerId && input.providerId !== provider.providerId) {
						throw new ZugferdError(
							`Unknown TRAFFIQX provider "${input.providerId}"`,
						);
					}
					return provider;
				} else {
					if (!input.providerId) {
						throw new ZugferdError("Field `providerId` is required.");
					}
					const provider = opts.provider.find(
						(provider) => input.providerId === provider.providerId,
					);

					if (!provider) {
						throw new ZugferdError(
							`Unknown TRAFFIQX provider "${input.providerId}"`,
						);
					}

					return provider;
				}
			};

			const getAccessToken = (
				context: TraffiqxAccessTokenInputContext<Metadata>,
				fn?: TraffiqxAccessTokenInput<Metadata> | undefined,
			) => {
				const accessTokenInput = fn ?? opts.accessToken;

				if (!accessTokenInput) {
					throw new ZugferdError(
						"accessToken is required for uploads. Add it to the input or plugin options",
					);
				}

				return async () =>
					typeof accessTokenInput === "function"
						? await accessTokenInput(context)
						: accessTokenInput;
			};

			return {
				traffiqx: {
					inbox: {
						metadata: async (
							input: {
								documentId: string;
								traffiqxId: string;
								accessToken?: TraffiqxAccessTokenInput<Metadata>;
								fetchOptions?: BetterFetchOption | undefined;
							} & MetaInput &
								ProviderInput,
						) => {
							const provider = getProvider(input);
							const token = getAccessToken(
								{
									meta: input.meta,
								},
								input.accessToken,
							);

							return await opts.$fetch<
								TraffiqxInboxMetadata,
								TraffiqxProblemDetails
							>(
								"/traffiqx-clients/:traffiqxId/inbox-documents/:documentId/metadata",
								{
									baseURL: provider.baseUrl,
									auth: {
										type: "Bearer",
										token,
									},
									...(input.fetchOptions ?? {}),
									params: {
										...(input.fetchOptions?.params ?? {}),
										traffiqxId: input.traffiqxId,
										documentId: input.documentId,
									},
									headers: {
										accept: "application/json",
										...(provider.headers ?? {}),
										...(input.fetchOptions?.headers ?? {}),
									},
								},
							);
						},
						list: async (
							input: {
								traffiqxId: string;
								downloaded?: boolean;
								from_date?: Date | string | undefined;
								to_date?: Date | string | undefined;
								accessToken?: TraffiqxAccessTokenInput<Metadata>;
								fetchOptions?: BetterFetchOption | undefined;
							} & MetaInput &
								ProviderInput,
						) => {
							const provider = getProvider(input);
							const token = getAccessToken(
								{
									meta: input.meta,
								},
								input.accessToken,
							);

							return await opts.$fetch<
								TraffiqxInboxDocumentIds,
								TraffiqxProblemDetails
							>("/traffiqx-clients/:traffiqxId/inbox-documents", {
								baseURL: provider.baseUrl,
								auth: {
									type: "Bearer",
									token,
								},
								...(input.fetchOptions ?? {}),
								params: {
									...(input.fetchOptions?.params ?? {}),
									traffiqxId: input.traffiqxId,
								},
								query: {
									...(input.fetchOptions?.query ?? {}),
									downloaded: input.downloaded,
									from_date: input.from_date
										? new Date(input.from_date).toISOString()
										: undefined,
									to_date: input.to_date
										? new Date(input.to_date).toISOString()
										: undefined,
								},
								headers: {
									accept: "application/json",
									...(provider.headers ?? {}),
									...(input.fetchOptions?.headers ?? {}),
								},
							});
						},
						download: async (
							input: {
								traffiqxId: string;
								documentId: string;
								accessToken?: TraffiqxAccessTokenInput<Metadata>;
								fetchOptions?: BetterFetchOption | undefined;
							} & MetaInput &
								ProviderInput,
						) => {
							const provider = getProvider(input);
							const token = getAccessToken(
								{
									meta: input.meta,
								},
								input.accessToken,
							);

							const fetchImpl = opts.fetch ?? globalThis.fetch;

							const response = await fetchImpl(
								`${provider.baseUrl.replace(/\/$/, "")}/traffiqx-clients/${encodeURIComponent(input.traffiqxId)}/inbox-documents/${encodeURIComponent(input.documentId)}`,
								{
									credentials: "include",
									...(input.fetchOptions ?? {}),
									headers: {
										authorization: `Bearer ${await token()}`,
										accept: "application/zip",
										...(provider.headers ?? {}),
										...(input.fetchOptions?.headers ?? {}),
									},
								},
							);

							if (!response.ok) {
								return {
									data: null,
									error: {
										...((await response.json()) as TraffiqxProblemDetails),
										status: response.status,
										statusText: response.statusText,
									},
								};
							}

							return {
								data: response,
								error: null,
							};
						},
					},
					outbox: {
						metadata: async (
							input: {
								documentId: string;
								traffiqxId: string;
								accessToken?: TraffiqxAccessTokenInput<Metadata>;
								fetchOptions?: BetterFetchOption | undefined;
							} & MetaInput &
								ProviderInput,
						) => {
							const provider = getProvider(input);
							const token = getAccessToken(
								{
									meta: input.meta,
								},
								input.accessToken,
							);

							return await opts.$fetch<
								TraffiqxOutboxMetadata,
								TraffiqxProblemDetails
							>(
								"/traffiqx-clients/:traffiqxId/outbox-documents/:documentId/metadata",
								{
									baseURL: provider.baseUrl,
									auth: {
										type: "Bearer",
										token,
									},
									...(input.fetchOptions ?? {}),
									params: {
										...(input.fetchOptions?.params ?? {}),
										traffiqxId: input.traffiqxId,
										documentId: input.documentId,
									},
									headers: {
										accept: "application/json",
										...(provider.headers ?? {}),
										...(input.fetchOptions?.headers ?? {}),
									},
								},
							);
						},
						status: async (
							input: {
								documentId: string;
								traffiqxId: string;
								accessToken?: TraffiqxAccessTokenInput<Metadata>;
								fetchOptions?: BetterFetchOption | undefined;
							} & MetaInput &
								ProviderInput,
						) => {
							const provider = getProvider(input);
							const token = getAccessToken(
								{
									meta: input.meta,
								},
								input.accessToken,
							);

							return await opts.$fetch<
								TraffiqxDocumentStatus,
								TraffiqxProblemDetails
							>(
								"/traffiqx-clients/:traffiqxId/outbox-documents/:documentId/status",
								{
									baseURL: provider.baseUrl,
									auth: {
										type: "Bearer",
										token,
									},
									...(input.fetchOptions ?? {}),
									params: {
										...(input.fetchOptions?.params ?? {}),
										traffiqxId: input.traffiqxId,
										documentId: input.documentId,
									},
									headers: {
										accept: "application/json",
										...(provider.headers ?? {}),
										...(input.fetchOptions?.headers ?? {}),
									},
								},
							);
						},
						list: async (
							input: {
								traffiqxId: string;
								downloaded?: boolean;
								status?: TraffiqxStatus;
								accessToken?: TraffiqxAccessTokenInput<Metadata>;
								fetchOptions?: BetterFetchOption | undefined;
							} & MetaInput &
								ProviderInput,
						) => {
							const provider = getProvider(input);
							const token = getAccessToken(
								{
									meta: input.meta,
								},
								input.accessToken,
							);

							return await opts.$fetch<
								TraffiqxOutboxDocumentIds,
								TraffiqxProblemDetails
							>("/traffiqx-clients/:traffiqxId/outbox-documents", {
								baseURL: provider.baseUrl,
								auth: {
									type: "Bearer",
									token,
								},
								...(input.fetchOptions ?? {}),
								params: {
									...(input.fetchOptions?.params ?? {}),
									traffiqxId: input.traffiqxId,
								},
								query: {
									...(input.fetchOptions?.query ?? {}),
									downloaded: input.downloaded,
									status: input.status,
								},
								headers: {
									accept: "application/json",
									...(provider.headers ?? {}),
									...(input.fetchOptions?.headers ?? {}),
								},
							});
						},
						download: async (
							input: {
								traffiqxId: string;
								documentId: string;
								accessToken?: TraffiqxAccessTokenInput<Metadata>;
								fetchOptions?: RequestInit | undefined;
							} & MetaInput &
								ProviderInput,
						) => {
							const provider = getProvider(input);
							const token = getAccessToken(
								{
									meta: input.meta,
								},
								input.accessToken,
							);

							const fetchImpl = opts.fetch ?? globalThis.fetch;

							const response = await fetchImpl(
								`${provider.baseUrl.replace(/\/$/, "")}/traffiqx-clients/${encodeURIComponent(input.traffiqxId)}/outbox-documents/${encodeURIComponent(input.documentId)}`,
								{
									credentials: "include",
									...(input.fetchOptions ?? {}),
									headers: {
										authorization: `Bearer ${await token()}`,
										accept: "application/zip",
										...(provider.headers ?? {}),
										...(input.fetchOptions?.headers ?? {}),
									},
								},
							);

							if (!response.ok) {
								return {
									data: null,
									error: {
										...((await response.json()) as TraffiqxProblemDetails),
										status: response.status,
										statusText: response.statusText,
									},
								};
							}

							return {
								data: response,
								error: null,
							};
						},
					},
					upload: async (
						input: {
							data: string | Uint8Array | ArrayBuffer | Blob;
							traffiqxId: string;
							accessToken?: TraffiqxAccessTokenInput<Metadata>;
							fetchOptions?: BetterFetchOption | undefined;
						} & MetaInput &
							ProviderInput,
					) => {
						const provider = getProvider(input);
						const token = getAccessToken(
							{
								meta: input.meta,
							},
							input.accessToken,
						);

						const body = new FormData();

						const data = toBlob(input.data, {
							type: "application/pdf",
							base64DecodeString: true,
						});
						if (data.size > 104857600) {
							throw new ZugferdError("The document is too large to upload.");
						}
						body.set("data", data);

						return await opts.$fetch<
							TraffiqxUploadResult,
							TraffiqxProblemDetails
						>("/traffiqx-clients/:traffiqxId/outbox/zugferd-data", {
							baseURL: provider.baseUrl,
							method: "POST",
							auth: {
								type: "Bearer",
								token,
							},
							body,
							...(input.fetchOptions ?? {}),
							params: {
								...(input.fetchOptions?.params ?? {}),
								traffiqxId: input.traffiqxId,
							},
							headers: {
								accept: "application/json",
								"content-type": "multipart/form-data",
								...(provider.headers ?? {}),
								...(input.fetchOptions?.headers ?? {}),
							},
						});
					},
					uploadStructuredData: async (
						input: {
							data: string | Uint8Array | ArrayBuffer | Blob;
							view_component: string | Uint8Array | ArrayBuffer | Blob;
							traffiqxId: string;
							accessToken?: TraffiqxAccessTokenInput<Metadata>;
							fetchOptions?: BetterFetchOption | undefined;
						} & MetaInput &
							ProviderInput,
					) => {
						const provider = getProvider(input);
						const token = getAccessToken(
							{
								meta: input.meta,
							},
							input.accessToken,
						);

						const body = new FormData();

						const data = toBlob(input.data, {
							type: "application/xml",
						});
						if (data.size > 104857600) {
							throw new ZugferdError("The document is too large to upload.");
						}
						body.set(
							"data",
							toBlob(input.data, {
								type: "application/xml",
							}),
						);
						body.set(
							"view_component",
							toBlob(input.view_component, {
								type: "application/pdf",
								base64DecodeString: true,
							}),
						);

						return await opts.$fetch<
							TraffiqxUploadResult,
							TraffiqxProblemDetails
						>("/traffiqx-clients/:traffiqxId/outbox/structured-data", {
							baseURL: provider.baseUrl,
							method: "POST",
							auth: {
								type: "Bearer",
								token,
							},
							body,
							...(input.fetchOptions ?? {}),
							params: {
								...(input.fetchOptions?.params ?? {}),
								traffiqxId: input.traffiqxId,
							},
							headers: {
								accept: "application/json",
								"content-type": "multipart/form-data",
								...(provider.headers ?? {}),
								...(input.fetchOptions?.headers ?? {}),
							},
						});
					},
				},
			};
		},
		options: opts as NoInfer<typeof opts>,
	} satisfies ZugferdPlugin;
};
