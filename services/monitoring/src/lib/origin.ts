import { env } from "cloudflare:workers";
import picomatch from "picomatch";

const matchesTrustedOrigin = picomatch(
	env.TRUSTED_ORIGINS.split(",").map((url) => url.trim()),
);

export const isTrustedOrigin = (input: string) => {
	try {
		const url = new URL(input);
		return matchesTrustedOrigin(url.origin);
	} catch {}
	return false;
};
