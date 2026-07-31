"use client";

import { useCallback, useRef, useState, useTransition } from "react";

export const useCopyToClipboard = () => {
	const [copied, setCopied] = useState(false);
	const [copying, startCopying] = useTransition();
	const timeoutRef = useRef<number | null>(null);

	const copyToClipboard = useCallback(
		(
			text: string,
			cfg?:
				| {
						onError?: (err: unknown, text: string) => void | Promise<void>;
				  }
				| undefined,
		) => {
			startCopying(async () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				try {
					await navigator.clipboard.writeText(text);

					setCopied(true);
					timeoutRef.current = window.setTimeout(() => {
						setCopied(false);
					}, 2000);
				} catch (err) {
					setCopied(false);
					if (cfg?.onError) {
						await cfg.onError(err, text);
					}
				}
			});
		},
		[],
	);

	return { copied, copying, copyToClipboard };
};
