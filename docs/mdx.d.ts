declare module "*.mdx" {
	import type { MDXProps } from "mdx/types";

	export const frontmatter: Record<string, any>;

	const MDX: React.ComponentType<MDXProps>;
	export default MDX;
}
