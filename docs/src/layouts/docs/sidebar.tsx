"use client";

import { useTreeContext } from "@fumadocs/base-ui/contexts/tree";
import { cva } from "class-variance-authority";
import type * as PageTree from "fumadocs-core/page-tree";
import {
	BookTextIcon,
	BracesIcon,
	ChevronDownIcon,
	ChevronsUpDownIcon,
	LightbulbIcon,
	ScrollTextIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { createContext, use, useEffect, useMemo, useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/cn";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const SIDEBAR_WIDTH = "17.75rem";
const SIDEBAR_TRANSITION = { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

interface SidebarContext {
	collapsed: boolean;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	currentTabId: SidebarTabId;
	currentTab: SidebarTab;
}

const SidebarContext = createContext<SidebarContext | null>(null);

export const useSidebar = () => {
	const context = use(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};

type SidebarTabId = "docs" | "examples" | "api-reference" | "changelog";
type SidebarTab = {
	icon: React.ElementType;
	title: string;
	description: string;
	href: string;
};

export const SIDEBAR_TABS = new Map<SidebarTabId, SidebarTab>()
	.set("docs", {
		icon: BookTextIcon,
		title: "Documentation",
		description: "get started, profiles and more",
		href: "/docs",
	})
	.set("examples", {
		icon: LightbulbIcon,
		title: "Examples",
		description: "examples and guides",
		href: "/examples",
	})
	.set("api-reference", {
		icon: BracesIcon,
		title: "API Reference",
		description: "reference and type docs",
		href: "/api-reference",
	})
	.set("changelog", {
		icon: ScrollTextIcon,
		title: "Changelog",
		description: "release notes and updates",
		href: "/changelog",
	});

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	// TODO: Store in cookie/local storage
	const [collapsed, setCollapsed] = useState(false);

	const pathname = usePathname();
	const currentTabId = useMemo(() => {
		if (pathname.startsWith("/examples")) return "examples";
		if (pathname.startsWith("/api-reference")) return "api-reference";
		return "docs";
	}, [pathname]);

	const currentTab = useMemo(
		() => SIDEBAR_TABS.get(currentTabId)!,
		[currentTabId],
	);

	return (
		<SidebarContext
			value={useMemo(
				() => ({
					open,
					setOpen,
					collapsed,
					setCollapsed,
					currentTabId,
					currentTab,
				}),
				[open, collapsed, currentTabId, currentTab],
			)}
		>
			{children}
		</SidebarContext>
	);
}

function SidebarScrollArea({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<ScrollArea
			scrollbarVisibility="never"
			className={cn("min-h-0 flex-1 text-sm", className)}
		>
			{children}
		</ScrollArea>
	);
}

export function SidebarToggle(props: ComponentProps<"button">) {
	const { open, setOpen } = use(SidebarContext)!;

	return (
		<button
			{...props}
			className={cn("text-sm", props.className)}
			onClick={() => setOpen(!open)}
		>
			Sidebar
		</button>
	);
}

export function Sidebar() {
	const { root } = useTreeContext();
	const { open, setOpen, collapsed, currentTabId, currentTab } =
		use(SidebarContext)!;

	const children = useMemo(() => {
		const sort =
			(dir: "asc" | "desc" = "asc") =>
			(a: PageTree.Node, b: PageTree.Node) => {
				if (!a.name || !b.name) return 0;
				return dir === "asc"
					? a.name.toString().localeCompare(b.name.toString())
					: b.name.toString().localeCompare(a.name.toString());
			};

		const renderItems = (items: PageTree.Node[]) => {
			return items.map((item) => {
				const children =
					item.type === "folder" ? [...item.children] : undefined;
				if (currentTabId === "api-reference" && children) {
					children.sort(sort());
				}
				return (
					<SidebarItem key={item.$id} item={item}>
						{children?.length ? renderItems(children) : null}
					</SidebarItem>
				);
			});
		};

		const children = [...root.children];
		if (currentTabId === "api-reference") {
			children.sort(sort("desc"));
		}

		return renderItems(children);
	}, [root, currentTabId]);

	return (
		<>
			<motion.div
				className="hidden h-full shrink-0 overflow-hidden md:block"
				initial={false}
				animate={{ width: collapsed ? 0 : SIDEBAR_WIDTH }}
				transition={SIDEBAR_TRANSITION}
			>
				<motion.aside
					initial={false}
					animate={{ x: collapsed ? "-100%" : 0, opacity: collapsed ? 0 : 1 }}
					transition={SIDEBAR_TRANSITION}
					className="flex h-full w-71 flex-col"
				>
					<div className="pl-4">
						<Popover>
							<PopoverTrigger
								render={
									<Button
										variant="outline"
										size="lg"
										className="w-full py-1.5 gap-2.5 h-auto justify-start text-start"
									/>
								}
							>
								<currentTab.icon className="size-5" />
								<div className="flex flex-col">
									<span>{currentTab.title}</span>
									<span className="text-muted-foreground text-xs">
										{currentTab.description}
									</span>
								</div>
								<ChevronsUpDownIcon className="ms-auto size-4! text-muted-foreground" />
							</PopoverTrigger>
							<PopoverContent
								align="start"
								side="right"
								className="p-1 gap-0.5"
							>
								{[...SIDEBAR_TABS.entries()].map(
									([id, { title, icon: Icon, href, description }]) => (
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
					</div>
					<SidebarScrollArea>
						<div className="py-4 pl-4">{children}</div>
					</SidebarScrollArea>
				</motion.aside>
			</motion.div>

			<AnimatePresence>
				{open && (
					<>
						<motion.button
							type="button"
							aria-label="Close sidebar"
							className="fixed inset-0 z-30 bg-black/20 md:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={SIDEBAR_TRANSITION}
							onClick={() => setOpen(false)}
						/>
						<motion.aside
							className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col bg-fd-background rounded-t-lg border-t md:hidden"
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							exit={{ y: "100%" }}
							transition={SIDEBAR_TRANSITION}
						>
							<SidebarScrollArea>
								<div className="p-4">{children}</div>
							</SidebarScrollArea>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}

function isFolderTreeActive(item: PageTree.Folder, pathname: string): boolean {
	if (item.index?.url === pathname) return true;

	for (const child of item.children) {
		if (child.type === "page" && child.url === pathname) return true;
		if (child.type === "folder" && isFolderTreeActive(child, pathname)) {
			return true;
		}
	}

	return false;
}

const linkVariants = cva(
	"transition-colors hover:bg-fd-accent aria-expanded:text-foreground flex items-center gap-2 w-full py-1.5 px-2 rounded-lg text-fd-foreground/80 [&_svg]:size-4",
	{
		variants: {
			active: {
				true: "text-foreground font-medium bg-fd-accent",
				false: "hover:text-fd-accent-foreground",
			},
		},
	},
);

export function SidebarItem({
	item,
	children,
}: {
	item: PageTree.Node;
	children: ReactNode;
}) {
	const pathname = usePathname();

	if (item.type === "page") {
		return (
			<Link
				href={item.url}
				className={linkVariants({
					active: pathname === item.url,
				})}
			>
				{item.icon}
				{item.name}
			</Link>
		);
	}

	if (item.type === "separator") {
		return (
			<p className="text-xs flex flex-row items-center gap-2 font-medium text-fd-muted-foreground pl-2 pt-4 mb-1 first:pt-2">
				{item.icon}
				{item.name}
			</p>
		);
	}

	const collapsible = item.collapsible !== false;
	const containsActivePage = useMemo(
		() => isFolderTreeActive(item, pathname),
		[item, pathname],
	);
	const [folderOpen, setFolderOpen] = useState(containsActivePage);

	useEffect(() => {
		if (containsActivePage) setFolderOpen(true);
	}, [containsActivePage]);

	return (
		<div>
			<Collapsible
				disabled={!collapsible}
				open={folderOpen}
				onOpenChange={setFolderOpen}
			>
				{item.index ? (
					<Link
						className={linkVariants({
							active: pathname === item.index.url,
						})}
						href={item.index.url}
					>
						{item.index.icon}
						{item.index.name}
						{collapsible && (
							<CollapsibleTrigger
								onClick={(e) => e.preventDefault()}
								className="group/collapsible-trigger ms-auto"
							>
								<ChevronDownIcon className="text-muted-foreground group-aria-expanded/collapsible-trigger:rotate-180 transition-transform duration-200" />
							</CollapsibleTrigger>
						)}
					</Link>
				) : (
					<CollapsibleTrigger
						className={cn(
							linkVariants(),
							"group/collapsible-trigger text-start",
						)}
					>
						{item.icon}
						{item.name}
						{collapsible && (
							<ChevronDownIcon className="ms-auto text-muted-foreground group-aria-expanded/collapsible-trigger:rotate-180 transition-transform duration-200" />
						)}
					</CollapsibleTrigger>
				)}
				<CollapsibleContent className="pl-4 pt-1 pb-4 flex flex-col h-(--collapsible-panel-height) overflow-hidden transition-all duration-200 data-ending-style:h-0 data-starting-style:h-0">
					{children}
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
