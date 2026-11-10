"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import * as React from "react";

import { cn } from "@/lib/utils";

const SCROLL_IDLE_MS = 800;

function useScrollActivity(viewport: HTMLDivElement | null) {
	const [scrolling, setScrolling] = React.useState(false);

	React.useEffect(() => {
		if (!viewport) return;

		let idleTimer: ReturnType<typeof setTimeout> | null = null;

		const onScroll = () => {
			setScrolling(true);

			if (idleTimer) clearTimeout(idleTimer);
			idleTimer = setTimeout(() => {
				setScrolling(false);
				idleTimer = null;
			}, SCROLL_IDLE_MS);
		};

		viewport.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			viewport.removeEventListener("scroll", onScroll);
			if (idleTimer) clearTimeout(idleTimer);
		};
	}, [viewport]);

	return scrolling;
}

function ScrollArea({
	className,
	children,
	scrollbarVisibility = "hover",
	global = false,
	fade = true,
	...props
}: ScrollAreaPrimitive.Root.Props & {
	scrollbarVisibility?: "always" | "hover" | "never" | undefined;
	global?: boolean | undefined;
	fade?: boolean | undefined;
}) {
	const [viewport, setViewport] = React.useState<HTMLDivElement | null>(null);
	const scrolling = useScrollActivity(viewport);

	const setViewportRef = React.useCallback(
		(node: HTMLDivElement | null) => {
			if (node && global) {
				node.setAttribute("data-global-scroll", "");
			}
			setViewport(node);
		},
		[global],
	);

	const showScrollbarWhileScrolling =
		scrollbarVisibility !== "never" && scrolling;

	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cn("group/scroll-area relative overflow-hidden", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				ref={setViewportRef}
				data-slot="scroll-area-viewport"
				className={cn(
					"size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
					fade &&
						"mask-[linear-gradient(to_bottom,transparent_0,black_min(40px,var(--scroll-area-overflow-y-start)),black_calc(100%-min(40px,var(--scroll-area-overflow-y-end,40px))),transparent_100%),linear-gradient(to_right,transparent_0,black_min(40px,var(--scroll-area-overflow-x-start)),black_calc(100%-min(40px,var(--scroll-area-overflow-x-end,40px))),transparent_100%)] mask-intersect mask-no-repeat",
				)}
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar
				className={cn(
					scrollbarVisibility === "never" && "hidden",
					scrollbarVisibility === "hover" &&
						"opacity-0 transition-opacity group-hover/scroll-area:opacity-100",
					showScrollbarWhileScrolling && "opacity-100",
				)}
			/>
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
	return (
		<ScrollAreaPrimitive.Scrollbar
			data-slot="scroll-area-scrollbar"
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				"flex touch-none p-px me-1 transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:py-2.5 data-vertical:scale-x-75 data-vertical:hover:scale-x-100 data-vertical:border-l data-vertical:border-l-transparent",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.Thumb
				data-slot="scroll-area-thumb"
				className="relative flex-1 rounded-full bg-border"
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
}

export { ScrollArea, ScrollBar };
