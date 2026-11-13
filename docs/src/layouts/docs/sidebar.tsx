"use client";

import { useTreeContext } from "@fumadocs/base-ui/contexts/tree";
import { cva } from "class-variance-authority";
import type * as PageTree from "fumadocs-core/page-tree";
import { useMediaQuery } from "fumadocs-core/utils/use-media-query";
import { ChevronDownIcon, ChevronsUpDownIcon, MenuIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import {
	createContext,
	use,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navItems } from "@/lib/nav-items";
import {
	SIDEBAR_COOKIE_MAX_AGE,
	SIDEBAR_COOKIE_NAME,
} from "@/lib/sidebar-cookie";
import { cn } from "@/lib/utils";

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

type SidebarTab = (typeof navItems)[number];
type SidebarTabId = SidebarTab["id"];

export const SIDEBAR_TABS = new Map(navItems.map((item) => [item.id, item]));

export function SidebarProvider({
	children,
	defaultCollapsed = false,
}: {
	children: ReactNode;
	defaultCollapsed?: boolean;
}) {
	const [open, setOpen] = useState(false);
	const [collapsed, setCollapsed_] = useState(defaultCollapsed);

	const setCollapsed = useCallback(
		(value: React.SetStateAction<boolean>) => {
			const next = typeof value === "function" ? value(collapsed) : value;
			setCollapsed_(next);
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		},
		[collapsed],
	);

	const pathname = usePathname();
	const currentTabId = useMemo(() => {
		if (pathname.startsWith("/examples")) return "examples";
		if (pathname.startsWith("/api-reference")) return "apiReference";
		return "docs";
	}, [pathname]);

	const currentTab = useMemo(
		() => SIDEBAR_TABS.get(currentTabId)!,
		[currentTabId],
	);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

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
				[open, setOpen, collapsed, setCollapsed, currentTabId, currentTab],
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
		<Button
			variant="ghost"
			size="icon"
			aria-label="Toggle menu"
			{...props}
			onClick={() => setOpen(!open)}
		>
			<MenuIcon />
		</Button>
	);
}

export function Sidebar() {
	const { root } = useTreeContext();
	const { open, setOpen, collapsed, currentTabId, currentTab } =
		use(SidebarContext)!;
	const isMobile = useMediaQuery("(max-width: 640px)");
	const isDesktop = useMediaQuery("(min-width: 1024px)");

	useEffect(() => {
		if (isDesktop) setOpen(false);
	}, [isDesktop, setOpen]);

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
				if (currentTabId === "apiReference" && children) {
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
		if (currentTabId === "apiReference") {
			children.sort(sort("desc"));
		}

		return renderItems(children);
	}, [root, currentTabId]);

	return (
		<>
			<motion.div
				className="max-lg:hidden h-full shrink-0 overflow-hidden"
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
									<span>{currentTab.label}</span>
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
									([id, { label, icon: Icon, href, description }]) => (
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
												<span>{label}</span>
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

			<Drawer
				open={Boolean(open && !isDesktop)}
				onOpenChange={setOpen}
				swipeDirection={isMobile ? "down" : "left"}
				showSwipeHandle={Boolean(isMobile)}
			>
				<DrawerContent className="max-sm:[--drawer-content-height:calc(100dvh-3.5rem)] max-sm:[--drawer-content-max-height:calc(100dvh-3.5rem)]">
					<div className="flex min-h-0 flex-1 flex-col">
						<div className="px-4 pt-2 sm:pt-4">
							<Popover>
								<PopoverTrigger
									render={
										<Button
											variant="outline"
											size="lg"
											className="mb-6 h-auto w-full justify-start gap-2.5 py-1.5 text-start"
										/>
									}
								>
									<currentTab.icon className="size-5" />
									<div className="flex flex-col">
										<span>{currentTab.label}</span>
										<span className="text-muted-foreground text-xs">
											{currentTab.description}
										</span>
									</div>
									<ChevronsUpDownIcon className="ms-auto size-4! text-muted-foreground" />
								</PopoverTrigger>
								<PopoverContent
									align="start"
									side="bottom"
									className="w-(--anchor-width) gap-0.5 p-1"
								>
									{[...SIDEBAR_TABS.entries()].map(
										([id, { label, icon: Icon, href, description }]) => (
											<Button
												key={id}
												variant="ghost"
												className="h-auto w-full justify-start gap-2.5 py-1 text-start data-active:bg-muted [&_svg]:size-5!"
												render={<Link href={href} />}
												nativeButton={false}
												data-active={currentTabId === id}
												onClick={() => setOpen(false)}
											>
												<Icon />
												<div className="flex flex-col">
													<span>{label}</span>
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
							<div className="px-4 pb-4">{children}</div>
						</SidebarScrollArea>
					</div>
				</DrawerContent>
			</Drawer>
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
				<CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
					<div className="flex flex-col pt-1 pb-4 pl-4">{children}</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
