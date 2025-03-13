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
	typescript: {
		ignoreBuildErrors: true
	}
};

export default withMDX(config);
