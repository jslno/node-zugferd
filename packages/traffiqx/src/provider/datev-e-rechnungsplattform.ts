import type { TraffiqxProvider } from "../types";

export type DatevERechnungsplattformOptions = {
	appName: string;
	clientId: string;
	sandbox?: boolean | undefined;
};

export const datevERechnungsplattform = (
	options: DatevERechnungsplattformOptions,
) =>
	({
		providerId: "DATEV E-Rechnungsplattform",
		baseUrl: `https://traffiqx-invoice.api.datev.de/platform${options?.sandbox ? "-sandbox" : ""}/v1`,
		headers: {
			"x-datev-client-id": options.clientId,
			"x-app-display-name": options.appName,
		},
	}) satisfies TraffiqxProvider;
