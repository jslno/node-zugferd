import type { TraffiqxProvider } from "../types";

export type RicohOptions = {
	clientId: string;
};

export const ricoh = (options: RicohOptions) =>
	({
		providerId: "Ricoh Deutschland GmbH",
		baseUrl: "https://www.ricoh-idx.net/tia/v1",
		headers: {
			"x-traffiqx-client-id": options.clientId,
		},
	}) satisfies TraffiqxProvider;
