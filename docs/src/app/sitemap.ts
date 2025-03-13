import { type MetadataRoute } from "next";
import { source } from "./source";

export default function sitemap(): MetadataRoute.Sitemap {
	const WEBSITE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const pages = source.getPages().map((page) => ({
		slug: page.slugs,
	}));
	const docs = pages.map((plugin) => ({
		url: `${WEBSITE_URL}/docs/${plugin.slug.join("/")}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));
	return [...docs];
}
