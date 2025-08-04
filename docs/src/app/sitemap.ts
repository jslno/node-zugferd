import { type MetadataRoute } from "next";
import { source } from "./source";

export default function sitemap(): MetadataRoute.Sitemap {
	const WEBSITE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const pages = source.getPages();
	const docs = pages.map((page) => ({
		url: `${WEBSITE_URL}/docs/${page.slugs.join("/")}`,
		lastModified: new Date().toISOString().split("T")[0],
		priority: page.data.priority,
		changeFrequency: page.data.changeFrequency,
	}));
	return [
		{
			url: `${WEBSITE_URL}`,
			lastModified: new Date().toISOString().split("T")[0],
			priority: 1,
			changeFrequency: "monthly",
		},
		...docs,
	];
}
