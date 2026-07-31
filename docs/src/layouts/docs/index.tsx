"use client";

import { useSearchContext } from "@fumadocs/base-ui/contexts/search";
import { TreeContextProvider } from "@fumadocs/base-ui/contexts/tree";
import Link from "fumadocs-core/link";
import type * as PageTree from "fumadocs-core/page-tree";
import {
	ChevronsUpDownIcon,
	SearchIcon,
	SidebarCloseIcon,
	SidebarOpenIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { GitHubIcon } from "@/components/icons/github";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { gitConfig } from "@/lib/shared";
import { cn } from "../../lib/cn";
import { handleGlobalWheel } from "../../lib/global-scroll";
import { Sidebar, SIDEBAR_TABS, SidebarToggle, useSidebar } from "./sidebar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { AnimatePresence, motion } from "motion/react";

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
	const { collapsed, currentTab, currentTabId } = useSidebar();

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
			<div
				ref={shellRef}
				className="bg-fd-muted/30 flex h-dvh flex-col overflow-hidden"
			>
				<header className="h-14 shrink-0">
					<nav className="flex flex-row h-full items-center gap-x-4 px-4">
						<div className="flex items-center gap-4 w-full">
							<Link href="/" className="font-medium whitespace-nowrap">
								node-zugferd
							</Link>
							<SidebarCollapseToggle />
							<AnimatePresence initial={false}>
								{collapsed && (
									<motion.div
										variants={{
											visible: { y: 0, opacity: 1 },
											hidden: { y: "-100%", opacity: 0 },
										}}
										initial="hidden"
										animate="visible"
										exit="hidden"
										transition={{
											duration: 0.15,
											ease: [0.4, 0, 0.2, 1],
										}}
									>
										<Popover>
											<PopoverTrigger render={<Button variant="outline" />}>
												<currentTab.icon data-icon="inline-start" />
												<span className="mr-1">{currentTab.title}</span>
												<ChevronsUpDownIcon
													data-icon="inline-end"
													className="ms-auto text-muted-foreground"
												/>
											</PopoverTrigger>
											<PopoverContent align="start" className="p-1 gap-0.5">
												{[...SIDEBAR_TABS.entries()].map(
													([id, { icon: Icon, title, description, href }]) => (
														<Button
															key={id}
															variant="ghost"
															className="w-full py-1 gap-2.5 [&_svg]:size-5! h-auto justify-start text-start data-active:bg-muted"
															render={<Link href={href} />}
															nativeButton={false}
															data-active={currentTabId === id}
														>
															<Icon />
															<div className="flex flex-col">
																<span>{title}</span>
																<span className="text-muted-foreground text-xs">
																	{description}
																</span>
															</div>
														</Button>
													),
												)}
											</PopoverContent>
										</Popover>
									</motion.div>
								)}
							</AnimatePresence>
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
		</TreeContextProvider>
	);
}

export function SearchToggle({
	className,
	...props
}: ComponentProps<"button">) {
	const { enabled, setOpenSearch } = useSearchContext();
	if (!enabled) return;

	return (
		<button
			{...props}
			className={cn(
				"flex items-center justify-center outline-none [&_svg]:size-4 px-1.5 rounded-md border border-input/50 max-md:hidden text-sm bg-input/40 hover:bg-input/80 text-muted-foreground hover:text-foreground cursor-text transition-colors h-8 min-w-fit w-full max-w-[calc(812px)] mx-auto",
				className,
			)}
			onClick={() => setOpenSearch(true)}
		>
			<div className="w-full flex items-center justify-center gap-2.5 -me-5">
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
