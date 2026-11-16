import type {
	BaseOAuthProviderOptions,
	GenericOAuthConfig,
} from "better-auth/plugins";

export interface DatevSmartTransferOptions extends BaseOAuthProviderOptions {}

export const datevSmartTransfer = (options: DatevSmartTransferOptions) =>
	({
		providerId: "datev-smarttransfer",
		name: "DATEV SmartTransfer",
		discoveryUrl:
			"https://login.smarttransfer.datev.de/realms/prod/.well-known/openid-configuration",
		pkce: true,
		...options,
	}) satisfies GenericOAuthConfig;
