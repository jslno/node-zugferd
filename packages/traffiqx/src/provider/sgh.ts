import type { TraffiqxProvider } from "../types";

export type SGHOptions = {
	clientId: string;
};

export const sgh = (options: SGHOptions) =>
	({
		providerId: "SGH Service GmbH",
		baseUrl: "https://ivi.sgh-net.de/tia/v1",
		headers: {
			"x-traffiqx-client-id": options.clientId,
		},
	}) satisfies TraffiqxProvider;
