import type { TraffiqxProvider } from "../types";

export type DatevSmartTransferOptions = {
	appName: string;
	clientId: string;
};

export const datevSmartTransfer = (options: DatevSmartTransferOptions) =>
	({
		providerId: "DATEV SmartTransfer",
		baseUrl: "https://smarttransfer.datev.de/tia/v1",
		headers: {
			"x-datev-client-id": options.clientId,
			"x-app-display-name": options.appName,
		},
	}) satisfies TraffiqxProvider;
