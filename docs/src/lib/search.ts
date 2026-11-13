import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const search = createFromSource(source, {
	language: "english",
	buildIndex: async (page) => ({
		id: page.url,
		url: page.url,
		title: page.data.title,
		description: page.data.description,
		structuredData:
			typeof page.data.structuredData === "function"
				? await page.data.structuredData()
				: page.data.structuredData,
		tag: [page.type],
	}),
});
