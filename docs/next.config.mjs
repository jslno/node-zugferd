import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	serverExternalPackages: ["@takumi-rs/core"],
	rewrites: async () => [
		{
			source: "/docs/:path*.md",
			destination: "/llms.mdx/docs/:path*",
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
