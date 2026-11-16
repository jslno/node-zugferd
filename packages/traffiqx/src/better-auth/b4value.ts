import type {
	BaseOAuthProviderOptions,
	GenericOAuthConfig,
} from "better-auth/plugins";

export interface B4ValueOptions extends BaseOAuthProviderOptions {
	sandbox?: boolean;
}

export const b4value = (options: B4ValueOptions) =>
	({
		providerId: "b4value",
		name: "b4value.net GmbH",
		discoveryUrl: options?.sandbox
			? "https://login.qs.b4value.net/realms/qs/.well-known/openid-configuration"
			: "https://login.b4value.net/realms/prod/.well-known/openid-configuration",
		pkce: true,
		...options,
	}) satisfies GenericOAuthConfig;
