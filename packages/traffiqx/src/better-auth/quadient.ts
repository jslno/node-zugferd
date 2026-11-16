import type {
	BaseOAuthProviderOptions,
	GenericOAuthConfig,
} from "better-auth/plugins";

export interface QuadientOptions extends BaseOAuthProviderOptions {}

export const quadient = (options: QuadientOptions) =>
	({
		providerId: "quadient",
		name: "Quadient CXM Germany GmbH",
		discoveryUrl:
			"https://login.quadient-eservices.com/realms/prod/.well-known/openid-configuration",
		pkce: true,
		...options,
	}) satisfies GenericOAuthConfig;
