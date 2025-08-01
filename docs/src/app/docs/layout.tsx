import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/app/source";
import { SideBar } from "@/components/side-bar";
import { Footer } from "@/components/footer";
import {
	DocsNavBarMobile,
	DocsNavBarMobileTitle,
	DocsNavMobileButton,
} from "@/components/nav-mobile";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<DocsLayout
				tree={source.pageTree}
				{...baseOptions}
				sidebar={{
					component: (
						<div className="mr-(--fd-sidebar-width)">
							<SideBar />
						</div>
					),
				}}
				nav={{
					component: (
						<div className="fixed top-(--nav-height) inset-x-0 flex items-center justify-between z-10 bg-background supports-backdrop-filter:backdrop-blur-lg supports-backdrop-filter:bg-background/80 py-4 px-2.5 md:hidden">
							<DocsNavBarMobileTitle />
							<DocsNavMobileButton />
						</div>
					),
				}}
			>
				<DocsNavBarMobile />
				{children}
			</DocsLayout>
			<Footer className="ml-(--fd-sidebar-width) w-[calc(100%-var(--fd-sidebar-width))]" />
		</>
	);
}
