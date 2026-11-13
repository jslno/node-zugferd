"use client";

import type { VM } from "@stackblitz/sdk";
import sdk from "@stackblitz/sdk";
import { useTheme } from "fumadocs-ui/provider/base";
import { AlertCircleIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gitConfig } from "@/lib/shared";
import { Button } from "../ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../ui/empty";
import { Spinner } from "../ui/spinner";

export type StackBlitzProps = {
	path: string;
};

export function StackBlitz({ path }: StackBlitzProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const vmRef = useRef<VM | null>(null);
	const { resolvedTheme = "light" } = useTheme();

	const repoSlug = useMemo(() => {
		return `${gitConfig.user}/${gitConfig.repo}/tree/${gitConfig.branch}/${path.replace(/^\/+/, "")}`;
	}, [path]);

	const url = useMemo(() => {
		const baseUrl = "https://stackblitz.com";
		const pathname = `/github/${repoSlug.replace(/^\//, "").replace(/\/$/, "")}?theme=${resolvedTheme}&preset=node`;
		return new URL(pathname, baseUrl).toString();
	}, [repoSlug, resolvedTheme]);

	useEffect(() => {
		const parent = containerRef.current;
		if (!parent) return;

		const container = document.createElement("div");

		parent.replaceChildren(container);

		let cancelled = false;

		setLoading(true);
		setError(null);

		sdk
			.embedGithubProject(container, repoSlug, {
				height: 600,
				view: "editor",
			})
			.then((vm) => {
				if (!cancelled) {
					setLoading(false);
					vmRef.current = vm;
				}
			})
			.catch((err: unknown) => {
				if (!cancelled) {
					console.error(err);
					setError(err instanceof Error ? err : new Error(String(err)));
					setLoading(false);
				}
			});

		return () => {
			cancelled = true;
			container.remove();
		};
	}, [path]);

	const openInStackBlitz = (
		<Button
			nativeButton={false}
			render={
				<Link
					suppressHydrationWarning
					href={url}
					target="_blank"
					rel="noopener noreferrer"
				/>
			}
		>
			Open in StackBlitz
			<ExternalLinkIcon aria-hidden="true" data-icon="inline-end" />
		</Button>
	);

	return (
		<div className="relative">
			{error ? (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<AlertCircleIcon />
						</EmptyMedia>
						<EmptyDescription className="text-destructive">
							{error.message}
						</EmptyDescription>
						<EmptyContent>{openInStackBlitz}</EmptyContent>
					</EmptyHeader>
				</Empty>
			) : loading ? (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<Spinner />
						</EmptyMedia>
						<EmptyTitle>Loading StackBlitz...</EmptyTitle>
						<EmptyDescription>
							If the embedded editor does not load, open it in a new tab.
						</EmptyDescription>
						<EmptyContent>{openInStackBlitz}</EmptyContent>
					</EmptyHeader>
				</Empty>
			) : (
				<div ref={containerRef} />
			)}
		</div>
	);
}
