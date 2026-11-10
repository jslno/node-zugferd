"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

const EDGE_PADDING = 16;

function getScrollMargin(element: HTMLElement) {
	const style = getComputedStyle(element);
	return {
		top: parseFloat(style.scrollMarginTop) || 0,
		right: parseFloat(style.scrollMarginRight) || 0,
		bottom: parseFloat(style.scrollMarginBottom) || 0,
		left: parseFloat(style.scrollMarginLeft) || 0,
	};
}

function getViewportTopInset(element: HTMLElement): number {
	const rect = element.getBoundingClientRect();
	let inset = 0;

	for (const candidate of document.querySelectorAll("header, nav")) {
		if (!(candidate instanceof HTMLElement)) continue;

		const style = getComputedStyle(candidate);
		if (style.position !== "sticky" && style.position !== "fixed") continue;

		const candidateRect = candidate.getBoundingClientRect();
		if (candidateRect.height <= 0) continue;

		const obscuresTop =
			candidateRect.top < rect.bottom && candidateRect.bottom > rect.top;

		if (obscuresTop) {
			inset = Math.max(inset, candidateRect.bottom);
		}
	}

	return inset;
}

function getVisibleSpan(
	start: number,
	end: number,
	containerStart: number,
	containerEnd: number,
): number {
	return Math.max(
		0,
		Math.min(end, containerEnd) - Math.max(start, containerStart),
	);
}

function isScrollable(element: HTMLElement): boolean {
	const style = getComputedStyle(element);

	return (
		(style.overflowY === "auto" ||
			style.overflowY === "scroll" ||
			style.overflowY === "overlay") &&
		element.scrollHeight > element.clientHeight
	);
}

function isComfortablyVisible(element: HTMLElement): boolean {
	const rect = element.getBoundingClientRect();
	const margin = getScrollMargin(element);
	const minVisible = Math.min(
		element.clientHeight,
		Math.max(32, element.clientHeight * 0.6),
	);

	const viewTop = getViewportTopInset(element) + EDGE_PADDING + margin.top;
	const viewBottom = window.innerHeight - EDGE_PADDING - margin.bottom;

	if (getVisibleSpan(rect.top, rect.bottom, viewTop, viewBottom) < minVisible) {
		return false;
	}

	let parent = element.parentElement;
	while (parent) {
		if (isScrollable(parent)) {
			const parentRect = parent.getBoundingClientRect();
			const containerTop = parentRect.top + EDGE_PADDING + margin.top;
			const containerBottom = parentRect.bottom - EDGE_PADDING - margin.bottom;

			if (
				getVisibleSpan(rect.top, rect.bottom, containerTop, containerBottom) <
				minVisible
			) {
				return false;
			}
		}
		parent = parent.parentElement;
	}

	return true;
}

function scrollIntoViewIfNeeded(
	element: HTMLElement,
	options: ScrollIntoViewOptions = {
		behavior: "smooth",
		block: "start",
		inline: "nearest",
	},
) {
	if (isComfortablyVisible(element)) return;

	element.scrollIntoView(options);
}

function scheduleScrollAfterOpen(trigger: HTMLElement, callback: () => void) {
	const root = trigger.closest('[data-slot="collapsible"]');
	const panel = root?.querySelector('[data-slot="collapsible-content"]');

	if (!(panel instanceof HTMLElement)) {
		requestAnimationFrame(() => requestAnimationFrame(callback));
		return;
	}

	let finished = false;
	const finish = () => {
		if (finished) return;
		finished = true;
		panel.removeEventListener("transitionend", onTransitionEnd);
		callback();
	};

	const onTransitionEnd = (event: TransitionEvent) => {
		if (event.target === panel) finish();
	};

	panel.addEventListener("transitionend", onTransitionEnd);

	const duration = Math.max(
		...getComputedStyle(panel)
			.transitionDuration.split(",")
			.map((value) => parseFloat(value) * 1000)
			.filter(Number.isFinite),
		200,
	);

	window.setTimeout(finish, duration + 32);
}

function CollapsibleTrigger({
	onClick,
	scrollIntoView,
	...props
}: CollapsiblePrimitive.Trigger.Props & {
	scrollIntoView?: boolean | undefined;
}) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			onClick={(e) => {
				const target = e.currentTarget;
				const wasOpen = target.getAttribute("aria-expanded") === "true";

				onClick?.(e);

				if (!e.defaultPrevented && scrollIntoView && !wasOpen) {
					scheduleScrollAfterOpen(target, () => {
						scrollIntoViewIfNeeded(target);
					});
				}
			}}
			{...props}
		/>
	);
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
	return (
		<CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
	);
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
