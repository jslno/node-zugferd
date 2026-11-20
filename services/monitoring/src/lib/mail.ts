import { env } from "cloudflare:workers";
import type { Source } from "mailparser";
import { parseAddressHeader, simpleParser } from "mailparser";
import picomatch from "picomatch";

export const matchesAllowedSenders = picomatch(
	env.ALLOWED_SENDERS.split(",").map((entry) => entry.trim()),
);

export const parseEmailsFromHeader = (header: string) => {
	return parseAddressHeader(header).value.reduce((acc, email) => {
		if (!email.address) return acc;
		acc.add(email.address);
		return acc;
	}, new Set<string>());
};

export const parseEmail = async (source: Source) => {
	return await simpleParser(source, {
		skipImageLinks: true,
		skipTextToHtml: true,
	});
};
