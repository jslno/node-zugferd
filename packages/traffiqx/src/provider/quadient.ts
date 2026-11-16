import type { TraffiqxProvider } from "../types";

export type QuadientOptions = {
	clientId: string;
};

export const quadient = (options: QuadientOptions) =>
	({
		providerId: "Quadient CXM Germany GmbH",
		baseUrl: "https://www.quadient-eservices.com/tia/v1",
		headers: {
			"x-traffiqx-client-id": options.clientId,
		},
	}) satisfies TraffiqxProvider;
