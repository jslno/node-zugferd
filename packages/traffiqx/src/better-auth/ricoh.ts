import type {
	BaseOAuthProviderOptions,
	GenericOAuthConfig,
} from "better-auth/plugins";

export interface RicohOptions extends BaseOAuthProviderOptions {}

export const ricoh = (options: RicohOptions) =>
	({
		providerId: "ricoh",
		name: "Ricoh Deutschland GmbH",
		discoveryUrl:
			"https://login.ricoh-idx.net/realms/prod/.well-known/openid-configuration",
		pkce: true,
		...options,
	}) satisfies GenericOAuthConfig;
