import type {
	BaseOAuthProviderOptions,
	GenericOAuthConfig,
} from "better-auth/plugins";

export interface BundesdruckereiOptions extends BaseOAuthProviderOptions {}

export const bundesdruckerei = (options: BundesdruckereiOptions) =>
	({
		providerId: "bundesdruckerei",
		name: "Bundesdruckerei",
		discoveryUrl:
			"https://login.bdr-businessportal.de/realms/prod/.well-known/openid-configuration",
		pkce: true,
		...options,
	}) satisfies GenericOAuthConfig;
