import type {
	BaseOAuthProviderOptions,
	GenericOAuthConfig,
} from "better-auth/plugins";

export interface SGHOptions extends BaseOAuthProviderOptions {}

export const sgh = (options: SGHOptions) =>
	({
		providerId: "sgh",
		name: "SGH Service GmbH",
		discoveryUrl:
			"https://login.ivi.sgh-net.de/realms/prod/.well-known/openid-configuration",
		pkce: true,
		...options,
	}) satisfies GenericOAuthConfig;
