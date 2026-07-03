"use client";

import { useTreeContext } from "@fumadocs/base-ui/contexts/tree";
import { cva } from "class-variance-authority";
import type * as PageTree from "fumadocs-core/page-tree";
import { ChevronDownIcon } from "lucide-react";
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

export const SIDEBAR_WIDTH = "17.75rem";
const SIDEBAR_TRANSITION = { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

interface SidebarContext {
	collapsed: boolean;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContext | null>(null);

export const useSidebar = () => {
	const context = use(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	// TODO: Store in cookie/local storage
	const [collapsed, setCollapsed] = useState(false);

	return (
		<SidebarContext
			value={useMemo(
				() => ({
					open,
					setOpen,
					collapsed,
					setCollapsed,
				}),
				[open, collapsed],
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
	const { open, setOpen, collapsed } = use(SidebarContext)!;

	const children = useMemo(() => {
		function renderItems(items: PageTree.Node[]) {
			return items.map((item) => (
				<SidebarItem key={item.$id} item={item}>
					{item.type === "folder" ? renderItems(item.children) : null}
				</SidebarItem>
			));
		}

		return renderItems(root.children);
	}, [root]);

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
