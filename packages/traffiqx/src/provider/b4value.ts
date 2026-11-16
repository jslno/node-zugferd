import type { TraffiqxProvider } from "../types";

export type B4ValueOptions = {
	clientId: string;
	sandbox?: boolean | undefined;
};

export const b4value = (options: B4ValueOptions) =>
	({
		providerId: "b4value.net GmbH",
		baseUrl: options?.sandbox
			? "https://portal.qs.b4value.net/tia/v0.9"
			: "https://portal.b4value.net/tia/v1",
		headers: {
			"x-traffiqx-client-id": options.clientId,
		},
	}) satisfies TraffiqxProvider;
