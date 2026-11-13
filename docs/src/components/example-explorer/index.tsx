"use client";

import { ExternalLinkIcon, Maximize2Icon, Minimize2Icon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { Tab, Tabs, tabsTriggerClasses } from "@/components/tabs";
import { gitConfig } from "@/lib/shared";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CodePanel } from "./code-panel";
import { CodeSandbox } from "./codesandbox";
import { StackBlitz } from "./stackblitz";

const useIsomorphicLayoutEffect =
	typeof window === "undefined" ? useEffect : useLayoutEffect;

type Rect = {
	left: number;
	top: number;
	width: number;
	height: number;
};

type Insets = {
	top: number;
	bottom: number;
};

const COMPACT_OVERLAY_INSET = 8;
const DEFAULT_OVERLAY_INSET = 24;

function getOverlayInset() {
	return window.matchMedia("(min-width: 640px)").matches
		? DEFAULT_OVERLAY_INSET
		: COMPACT_OVERLAY_INSET;
}

function getOverlayRect(inset: number): Rect {
	return {
		left: inset,
		top: inset,
		width: window.innerWidth - inset * 2,
		height: window.innerHeight - inset * 2,
	};
}

type ExampleExplorerProps = {
	owner?: string;
	repo?: string;
	branch?: string;
	path: string;
	entry?: string;
};

type ExampleExplorerContextType = (Required<
	Omit<ExampleExplorerProps, "entry">
> &
	Pick<ExampleExplorerProps, "entry">) & {
	maximized: boolean;
	portaled: boolean;
	setMaximized: React.Dispatch<React.SetStateAction<boolean>>;
	toggleMaximized: () => void;
};

const ExampleExplorerContext = createContext<ExampleExplorerContextType | null>(
	null,
);

export const useExampleExplorer = () => {
	const state = useContext(ExampleExplorerContext);
	if (!state) {
		throw new Error(
			"useExampleExplorer must be used within an ExampleExplorer",
		);
	}
	return state;
};

export function ExampleExplorer(props: ExampleExplorerProps) {
	const [maximized, setMaximized] = useState(false);
	// `portaled` stays true until the close morph finishes, so the explorer keeps
	// its expanded layout while it animates back to the inline position.
	const [portaled, setPortaled] = useState(false);
	const [inlineRect, setInlineRect] = useState<Rect | null>(null);
	const [overlayRect, setOverlayRect] = useState<Rect | null>(null);

	// A stable, React-managed portal host. It is moved between the inline layout
	// and the fullscreen overlay so the explorer (and its sandboxes) never remount
	// when the view is toggled.
	const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
	const [reservedHeight, setReservedHeight] = useState<number | null>(null);
	const inlineInsetsRef = useRef<Insets>({ top: 0, bottom: 0 });
	const restoreFocusRef = useRef(false);
	const maximizedRef = useRef(maximized);
	maximizedRef.current = maximized;
	const inlineRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);
	const reduceMotion = useReducedMotion();
	const reduceMotionRef = useRef(reduceMotion);
	reduceMotionRef.current = reduceMotion;

	const maximize = useCallback(() => {
		// If the close morph is still playing, the explorer is already in the
		// overlay; just animate it back to the full-screen rect.
		if (portaled && !maximized) {
			setMaximized(true);
			return;
		}

		const card = portalHost?.firstElementChild;
		if (!(card instanceof HTMLElement)) return;

		const bounds = card.getBoundingClientRect();
		const styles = window.getComputedStyle(card);

		inlineInsetsRef.current = {
			top: Number.parseFloat(styles.marginTop || "0"),
			bottom: Number.parseFloat(styles.marginBottom || "0"),
		};

		// Reserve the inline space so the page behind the overlay does not reflow
		// while the explorer is rendered in the portal.
		setInlineRect({
			left: bounds.left,
			top: bounds.top,
			width: bounds.width,
			height: bounds.height,
		});
		setOverlayRect(getOverlayRect(getOverlayInset()));
		setReservedHeight(
			bounds.height +
				inlineInsetsRef.current.top +
				inlineInsetsRef.current.bottom,
		);
		setPortaled(true);
		setMaximized(true);
	}, [portalHost, portaled, maximized]);

	const minimize = useCallback(() => {
		const placeholder = inlineRef.current;
		const insets = inlineInsetsRef.current;

		restoreFocusRef.current = true;

		// Re-measure the inline slot so the panel docks back into the current
		// layout even if the viewport changed while it was maximized.
		if (placeholder) {
			const bounds = placeholder.getBoundingClientRect();
			setInlineRect({
				left: bounds.left,
				top: bounds.top + insets.top,
				width: bounds.width,
				height: bounds.height - insets.top - insets.bottom,
			});
		}

		setMaximized(false);

		// Without motion there is no exit animation to wait for, so restore the
		// inline layout right away.
		if (reduceMotionRef.current) {
			setPortaled(false);
			setReservedHeight(null);
		}
	}, []);

	const toggleMaximized = useCallback(() => {
		if (maximized) minimize();
		else maximize();
	}, [maximized, maximize, minimize]);

	useIsomorphicLayoutEffect(() => {
		const element = document.createElement("div");
		element.className = "contents";
		inlineRef.current?.appendChild(element);
		setPortalHost(element);
		return () => element.remove();
	}, []);

	useIsomorphicLayoutEffect(() => {
		if (!portalHost) return;

		if (maximized) {
			overlayRef.current?.appendChild(portalHost);
			dialogRef.current?.focus();
			return;
		}

		// Keep the host inside the overlay while the close morph is playing.
		if (portaled) return;

		inlineRef.current?.appendChild(portalHost);
		if (restoreFocusRef.current) {
			restoreFocusRef.current = false;
			toggleRef.current?.focus({ preventScroll: true });
		}
	}, [portalHost, maximized, portaled]);

	useEffect(() => {
		if (!maximized) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") minimize();
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [maximized, minimize]);

	// Keep the overlay flush with the viewport when it is resized while open.
	useEffect(() => {
		if (!maximized) return;

		const onResize = () => {
			setOverlayRect(getOverlayRect(getOverlayInset()));
		};

		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [maximized]);

	const ctx = {
		owner: gitConfig.user,
		repo: gitConfig.repo,
		branch: gitConfig.branch,
		...props,
		maximized,
		portaled,
		setMaximized,
		toggleMaximized,
	};

	const dialogRect = maximized ? overlayRect : inlineRect;

	const tabs = (
		<Tabs
			items={["Playground", "StackBlitz", "CodeSandbox"]}
			className={portaled ? "my-0 min-h-0 flex-1" : "h-[50svh]"}
			listChildren={
				<>
					<Link
						href={`https://github.com/${ctx.owner}/${ctx.repo}/tree/${ctx.branch}/${ctx.path.replace(/^\//, "")}`}
						target="_blank"
						rel="noopener noreferrer"
						className={tabsTriggerClasses}
					>
						GitHub <ExternalLinkIcon />
					</Link>
					<Button
						ref={toggleRef}
						size="icon-sm"
						variant="outline"
						className="ms-auto -me-1.5 self-center"
						onClick={toggleMaximized}
						aria-label={maximized ? "Minimize" : "Maximize"}
						aria-pressed={maximized}
					>
						{maximized ? <Minimize2Icon /> : <Maximize2Icon />}
					</Button>
				</>
			}
		>
			<Tab
				value="Playground"
				className={cn(
					"flex-1 flex! flex-col p-0! not-prose overflow-clip",
					portaled && "min-h-0 [&_.sp-wrapper]:h-full! [&_.sp-layout]:h-full",
				)}
			>
				<CodePanel />
			</Tab>
			<Tab
				value="StackBlitz"
				className={cn(
					"p-0! not-prose flex-1 flex flex-col",
					portaled && "min-h-0",
				)}
			>
				<StackBlitz />
			</Tab>
			<Tab
				value="CodeSandbox"
				className={cn("not-prose flex-1 flex flex-col", portaled && "min-h-0")}
			>
				<CodeSandbox />
			</Tab>
		</Tabs>
	);

	return (
		<ExampleExplorerContext.Provider value={ctx}>
			<div
				ref={inlineRef}
				style={reservedHeight === null ? undefined : { height: reservedHeight }}
			/>
			{portalHost && createPortal(tabs, portalHost)}
			{portalHost &&
				createPortal(
					<>
						<AnimatePresence>
							{maximized && (
								<motion.div
									key="example-explorer-backdrop"
									className="fixed inset-0 z-[100] bg-fd-background/80 backdrop-blur-md"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: reduceMotion ? 0 : 0.2,
										ease: "easeOut",
									}}
									onMouseDown={(event) => {
										if (event.target === event.currentTarget) {
											minimize();
										}
									}}
								/>
							)}
						</AnimatePresence>
						{portaled && dialogRect && (
							<motion.div
								ref={dialogRef}
								key="example-explorer-maximized"
								role="dialog"
								aria-modal="true"
								aria-label="Example explorer"
								tabIndex={-1}
								className="fixed z-[101] flex flex-col overflow-hidden outline-none"
								initial={reduceMotion || !inlineRect ? false : inlineRect}
								animate={dialogRect}
								transition={
									reduceMotion
										? { duration: 0 }
										: {
												type: "tween",
												duration: 0.36,
												ease: [0.22, 1, 0.36, 1],
											}
								}
								onAnimationComplete={() => {
									// The exit morph is the only animation that completes while
									// the explorer is no longer maximized.
									if (maximizedRef.current) return;
									setPortaled(false);
									setReservedHeight(null);
								}}
							>
								<div ref={overlayRef} className="contents" />
							</motion.div>
						)}
					</>,
					document.body,
				)}
		</ExampleExplorerContext.Provider>
	);
}
