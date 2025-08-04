import { remarkNpm } from "fumadocs-core/mdx-plugins";
import {
	defineConfig,
	defineDocs,
	frontmatterSchema as defaultFrontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

const frontmatterSchema = z.object({
	priority: z.number().default(0.5),
	changeFrequency: z
		.enum(["daily", "monthly", "always", "hourly", "weekly", "yearly", "never"])
		.default("monthly"),
});
export const docs = defineDocs({
	dir: "content/docs",
	docs: {
		schema: frontmatterSchema as typeof frontmatterSchema &
			typeof defaultFrontmatterSchema,
	},
});

export default defineConfig({
	mdxOptions: {
		remarkPlugins: [
			[
				remarkNpm,
				{
					persist: {
						id: "persist-install",
					},
				},
			],
		],
	},
});
