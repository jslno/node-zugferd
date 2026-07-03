"use client";

import { useSearchContext } from "@fumadocs/base-ui/contexts/search";
import { TreeContextProvider } from "@fumadocs/base-ui/contexts/tree";
import Link from "fumadocs-core/link";
import type * as PageTree from "fumadocs-core/page-tree";
import { SearchIcon, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { GitHubIcon } from "@/components/icons/github";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { gitConfig } from "@/lib/shared";
import { cn } from "../../lib/cn";
import { handleGlobalWheel } from "../../lib/global-scroll";
import { Sidebar, SidebarProvider, SidebarToggle, useSidebar } from "./sidebar";

export interface DocsLayoutProps {
	tree: PageTree.Root;
	children: ReactNode;
}

function SidebarCollapseToggle() {
	const { collapsed, setCollapsed } = useSidebar();
	return (
		<Button
			variant="ghost"
			size="icon-lg"
			className="max-md:hidden"
			onClick={() => {
				setCollapsed((prev) => !prev);
			}}
		>
			{collapsed ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
		</Button>
	);
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
	const shellRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const shell = shellRef.current;
		if (!shell) return;

		shell.addEventListener("wheel", handleGlobalWheel, { passive: false });

		return () => {
			shell.removeEventListener("wheel", handleGlobalWheel);
		};
	}, []);

	return (
		<TreeContextProvider tree={tree}>
			<SidebarProvider>
				<div
					ref={shellRef}
					className="bg-fd-muted/30 flex h-dvh flex-col overflow-hidden"
				>
					<header className="h-14 shrink-0">
						<nav className="flex flex-row h-full items-center gap-x-4 px-4">
							<div className="flex items-center gap-4 w-full">
								<Link href="/" className="font-medium whitespace-nowra">
									node-zugferd
								</Link>
								<SidebarCollapseToggle />
							</div>

							<SearchToggle />
							<div className="flex items-center justify-end gap-2 w-full">
								<SidebarToggle className="md:hidden" />
								<ThemeToggle />
								<Button
									size="icon-lg"
									variant="ghost"
									render={
										<Link
											href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/tree/${gitConfig.branch}`}
											target="_blank"
										/>
									}
									nativeButton={false}
								>
									<GitHubIcon />
								</Button>
							</div>
						</nav>
					</header>
					<main
						id="nd-docs-layout"
						className="flex min-h-0 flex-1 flex-row [--fd-nav-height:56px]"
					>
						<Sidebar />
						<div className="flex h-full min-h-0 min-w-0 flex-1">{children}</div>
					</main>
				</div>
			</SidebarProvider>
		</TreeContextProvider>
	);
}

function SearchToggle({ className, ...props }: ComponentProps<"button">) {
	const { enabled, setOpenSearch } = useSearchContext();
	if (!enabled) return;

	return (
		<button
			{...props}
			className={cn(
				"flex items-center justify-center [&_svg]:size-4 px-1.5 rounded-md border border-input/50 max-md:hidden text-sm bg-input/40 hover:bg-input/80 cursor-text transition-colors h-8 min-w-fit w-full max-w-[calc(812px)] mx-auto",
				className,
			)}
			onClick={() => setOpenSearch(true)}
		>
			<div className="w-full flex items-center justify-center gap-2.5">
				<SearchIcon />
				<span>Search documentation...</span>
			</div>
			<KbdGroup>
				<Kbd>Ctrl</Kbd>
				<Kbd>K</Kbd>
			</KbdGroup>
		</button>
	);
}
