function canElementScroll(element: HTMLElement) {
	const { overflowY } = getComputedStyle(element);

	if (
		overflowY !== "auto" &&
		overflowY !== "scroll" &&
		overflowY !== "overlay"
	) {
		return false;
	}

	return element.scrollHeight > element.clientHeight + 1;
}

function canConsumeScroll(element: HTMLElement, deltaY: number) {
	if (!canElementScroll(element)) return false;

	if (deltaY > 0) {
		return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
	}

	if (deltaY < 0) {
		return element.scrollTop > 0;
	}

	return false;
}

function getLocalScrollContainer(target: Element) {
	const foreignViewport = target.closest<HTMLElement>(
		'[data-slot="scroll-area-viewport"]:not([data-global-scroll])',
	);
	if (foreignViewport) return foreignViewport;

	const scrollRegion = target.closest<HTMLElement>("[data-scroll-region]");
	if (!scrollRegion) return null;

	let element: Element | null = target;
	while (element && element !== scrollRegion) {
		if (element instanceof HTMLElement && canElementScroll(element)) {
			return element;
		}
		element = element.parentElement;
	}

	for (const child of scrollRegion.querySelectorAll<HTMLElement>("*")) {
		if (canElementScroll(child)) return child;
	}

	return null;
}

export function handleGlobalWheel(event: WheelEvent) {
	const target = event.target;
	if (!(target instanceof Element)) return;

	const viewport = document.querySelector<HTMLDivElement>(
		"[data-global-scroll]",
	);
	if (!viewport) return;

	if (viewport.contains(target)) return;
	if (target.closest('[role="dialog"], [aria-modal="true"]')) return;

	const localScroll = getLocalScrollContainer(target);
	if (localScroll && canConsumeScroll(localScroll, event.deltaY)) return;

	const maxScroll = viewport.scrollHeight - viewport.clientHeight;
	if (maxScroll <= 0) return;

	const nextScrollTop = Math.max(
		0,
		Math.min(maxScroll, viewport.scrollTop + event.deltaY),
	);

	if (nextScrollTop === viewport.scrollTop) return;

	viewport.scrollTop = nextScrollTop;
	event.preventDefault();
}
