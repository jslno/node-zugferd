import { DocsNavBarMobileTitle, DocsNavMobileButton } from "@/components/nav-mobile";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	nav: {
		component: (
			<div className="flex items-center justify-between py-4 px-2.5 md:hidden">
				<DocsNavBarMobileTitle />
				<DocsNavMobileButton />
			</div>
		)
	},
	links: [
		{
			text: "Documentation",
			url: "/docs",
			active: "nested-url",
		},
	],
};
