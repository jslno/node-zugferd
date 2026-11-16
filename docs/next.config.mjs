import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	serverExternalPackages: ["@takumi-rs/core", "typescript"],
	cacheComponents: true,
	partialPrefetching: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "github.com",
				pathname: "/**",
			},
		],
	},
	rewrites: async () => [
		{
			source: "/docs/:path*.md",
			destination: "/llms.mdx/docs/:path*",
		},
		{
			source: "/api-reference/:path*.md",
			destination: "/llms.mdx/api-reference/:path*",
		},
		{
			source: "/examples/:path*.md",
			destination: "/llms.mdx/examples/:path*",
		},
	],
	redirects: async () => [
		{
			source: "/docs",
			destination: "/docs/introduction",
			permanent: true,
		},
	],
};

export default withMDX(config);
