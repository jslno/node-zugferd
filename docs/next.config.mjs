import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	redirects: async () => {
		return [
			{
				source: "/docs",
				destination: "/docs/introduction",
				permanent: true,
			},
		];
	},
	rewrites: async () => {
		return [
			{
				source: "/docs/:path*.mdx",
				destination: "/llms.txt/:path*",
			},
		];
	},
	serverExternalPackages: [
		"@ts-morph",
		"typescript",
		"oxc-transform",
		"@shikijs/twoslash",
	],
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default withMDX(config);
