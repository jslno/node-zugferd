"use client";

import { useEffectEvent } from "fumadocs-core/utils/use-effect-event";
import { CheckIcon, CopyIcon } from "lucide-react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export const useCopyButton = (
	onCopy: () => void | Promise<void>,
): [checked: boolean, onClick: MouseEventHandler] => {
	const [checked, setChecked] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	const onClick: MouseEventHandler = useEffectEvent(() => {
		if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
		const res = Promise.resolve(onCopy());

		void res.then(() => {
			setChecked(true);
			timeoutRef.current = window.setTimeout(() => {
				setChecked(false);
			}, 1500);
		});
	});

	useEffect(() => {
		return () => {
			if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
		};
	}, []);

	return [checked, onClick];
};

const cache = new Map<string, string>();

export const LLMCopyButton = () => {
	const [isLoading, setLoading] = useState(false);
	const [checked, onClick] = useCopyButton(async () => {
		setLoading(true);
		const url = window.location.pathname + ".mdx";
		try {
			const cached = cache.get(url);

			if (cached) {
				await navigator.clipboard.writeText(cached);
			} else {
				await navigator.clipboard.write([
					new ClipboardItem({
						"text/plain": fetch(url).then(async (res) => {
							const content = await res.text();
							cache.set(url, content);

							return content;
						}),
					}),
				]);
			}
		} finally {
			setLoading(false);
		}
	});

	return (
		<Button
			variant="secondary"
			size="sm"
			className="gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground"
			onClick={onClick}
			disabled={isLoading}
		>
			{checked ? <CheckIcon /> : <CopyIcon />}
			Copy Markdown
		</Button>
	);
};
LLMCopyButton.displayName = "LLMCopyButton";
