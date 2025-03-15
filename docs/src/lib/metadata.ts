import type { Metadata } from "next/types";

export const createMetadata = (data: Metadata): Metadata => ({
	...data,
	openGraph: {
		title: data.title ?? undefined,
		description: data.description ?? undefined,
		url: "https://node-zugferd.jsolano.de",
		images: "https://node-zugferd.jsolano.de/og.png",
		siteName: "node-zugferd",
		...data.openGraph,
	},
	twitter: {
		card: "summary_large_image",
		creator: "@jslno",
		title: data.title ?? undefined,
		description: data.description ?? undefined,
		images: "https://node-zugferd.jsolano.de/og.png",
		...data.twitter,
	},
});
