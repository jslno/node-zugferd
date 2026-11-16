import type {
	BaseOAuthProviderOptions,
	GenericOAuthConfig,
} from "better-auth/plugins";

export interface DatevERechnungsplattformOptions
	extends BaseOAuthProviderOptions {}

export const datevERechnungsplattform = (
	options: DatevERechnungsplattformOptions,
) =>
	({
		providerId: "datev-e-rechnungsplattform",
		name: "DATEV E-Rechnungsplattform",
		discoveryUrl:
			"https://signin.datev.de/datevam/oauth2/realms/root/realms/user/.well-known/openid-configuration",
		pkce: true,
		...options,
	}) satisfies GenericOAuthConfig;
