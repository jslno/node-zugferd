import type { TraffiqxProvider } from "../types";

export type BundesdruckereiOptions = {
	clientId: string;
};

export const bundesdruckerei = (options: BundesdruckereiOptions) =>
	({
		providerId: "Bundesdruckerei GmbH",
		baseUrl: "https://www.bdr-businessportal.de/tia/v1",
		headers: {
			"x-traffiqx-client-id": options.clientId,
		},
	}) satisfies TraffiqxProvider;
