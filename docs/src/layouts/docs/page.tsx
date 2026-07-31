"use client";
import { TOCScrollArea } from "@fumadocs/base-ui/components/toc";
import { TOCItem, TOCItems } from "@fumadocs/base-ui/components/toc/clerk";
import { useTreeContext } from "@fumadocs/base-ui/contexts/tree";
import { TOCProvider } from "@fumadocs/base-ui/layouts/docs/page/slots/toc";
import { Link, usePathname } from "fumadocs-core/framework";
import type * as PageTree from "fumadocs-core/page-tree";
import type { TOCItemType } from "fumadocs-core/toc";
import { EditIcon, ExternalLinkIcon, TableOfContentsIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { gitConfig } from "@/lib/shared";
import { cn } from "../../lib/cn";

interface EditOnGitHubOptions {
	owner?: string;
	repo?: string;

	/**
	 * SHA or ref (branch or tag) name.
	 *
	 * @defaultValue main
	 */
	sha?: string;

	/**
	 * File path in the repo
	 */
	path: string;
}

export interface DocsPageProps {
	toc?: TOCItemType[];
	children: ReactNode;
	editOnGithub?: EditOnGitHubOptions;
	lastEditedAt?: Date;
}

export function DocsPage({
	toc = [],
	editOnGithub,
	lastEditedAt,
	...props
}: DocsPageProps) {
	if (editOnGithub) {
		editOnGithub.owner ??= gitConfig.user;
		editOnGithub.repo ??= gitConfig.repo;
		editOnGithub.sha ??= gitConfig.branch;
	}
	return (
		<TOCProvider toc={toc}>
			<div className="flex h-full min-h-0 flex-1 w-full min-w-0">
				<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-4 pb-4">
					<div className="bg-fd-background border border-fd-border min-h-0 flex-1 overflow-hidden rounded-2xl shadow-lg">
						<ScrollArea global className="h-full rounded-2xl">
							<article className="mx-auto flex min-h-full w-full max-w-[860px] flex-col justify-between gap-6 px-4 py-8 md:px-6">
								<div className="flex w-full flex-col gap-6">
									{props.children}
								</div>
								<Footer
									editOnGithub={editOnGithub}
									lastEditedAt={lastEditedAt}
								/>
							</article>
						</ScrollArea>
					</div>
				</div>
				{toc.length > 0 && (
					<aside
						data-scroll-region
						className="flex h-full w-[286px] shrink-0 flex-col py-4 pr-4 max-xl:hidden"
					>
						<div className="flex flex-row items-center gap-2.5 mb-2 shrink-0">
							<TableOfContentsIcon className="text-fd-muted-foreground size-4.5" />
							<p className="text-sm text-fd-muted-foreground">On this page</p>
						</div>
						<TOCScrollArea className="min-h-0 flex-1">
							<TOCItems>
								{toc.map((item) => (
									<TOCItem key={item.url} item={item} />
								))}
							</TOCItems>
						</TOCScrollArea>
					</aside>
				)}
			</div>
		</TOCProvider>
	);
}

export function DocsBody(props: ComponentProps<"div">) {
	return (
		<div {...props} className={cn("prose", props.className)}>
			{props.children}
		</div>
	);
}

export function DocsDescription(props: ComponentProps<"p">) {
	// don't render if no description provided
	if (props.children === undefined) return null;

	return (
		<p
			{...props}
			className={cn("mb-8 text-lg text-fd-muted-foreground", props.className)}
		>
			{props.children}
		</p>
	);
}

export function DocsTitle(props: ComponentProps<"h1">) {
	return (
		<h1 {...props} className={cn("text-3xl font-semibold", props.className)}>
			{props.children}
		</h1>
	);
}

function Footer({
	editOnGithub,
	lastEditedAt,
}: {
	editOnGithub?: EditOnGitHubOptions;
	lastEditedAt?: Date;
}) {
	const { root } = useTreeContext();
	const pathname = usePathname();
	const flatten = useMemo(() => {
		const result: PageTree.Item[] = [];

		function scan(items: PageTree.Node[]) {
			for (const item of items) {
				if (item.type === "page") result.push(item);
				else if (item.type === "folder") {
					if (item.index) result.push(item.index);
					scan(item.children);
				}
			}
		}

		scan(root.children);
		return result;
	}, [root]);

	const { previous, next } = useMemo(() => {
		const idx = flatten.findIndex((item) => item.url === pathname);

		if (idx === -1) return {};
		return {
			previous: flatten[idx - 1],
			next: flatten[idx + 1],
		};
	}, [flatten, pathname]);

	return (
		<div className="flex flex-col gap-4">
			<hr />
			{lastEditedAt && <LastEditedAt date={lastEditedAt} />}
			<div className="grid grid-cols-2 gap-4 font-medium">
				{previous ? (
					<Link
						href={previous.url}
						className="flex flex-row items-start gap-2 border px-4 py-2.5 rounded-xl bg-fd-card hover:bg-fd-muted transition-colors"
					>
						{previous.icon ? (
							<div className="-ms-1.5 [&_svg]:size-4 mt-1">{previous.icon}</div>
						) : null}
						<div className="flex flex-col">
							<span>{previous.name}</span>
							<p className="text-sm text-fd-muted-foreground line-clamp-2">
								{previous.description}
							</p>
						</div>
						{previous.external && (
							<ExternalLinkIcon className="ms-auto size-4 -me-1 text-muted-foreground" />
						)}
					</Link>
				) : (
					<div />
				)}
				{next ? (
					<Link
						href={next.url}
						className="flex flex-row items-start gap-2 border px-4 py-2.5 rounded-xl bg-fd-card hover:bg-fd-muted transition-colors"
					>
						{next.icon ? (
							<div className="-ms-1.5 [&_svg]:size-4 mt-1">{next.icon}</div>
						) : null}
						<div className="flex flex-col">
							<span>{next.name}</span>
							<p className="text-sm text-fd-muted-foreground line-clamp-2">
								{next.description}
							</p>
						</div>
						{next.external && (
							<ExternalLinkIcon className="ms-auto size-4 -me-1 text-muted-foreground" />
						)}
					</Link>
				) : (
					<div />
				)}
			</div>
			<div className="flex">
				{editOnGithub &&
				editOnGithub.owner &&
				editOnGithub.repo &&
				editOnGithub.path ? (
					<Button
						variant="secondary"
						render={
							<Link
								href={`https://github.com/${editOnGithub.owner}/${editOnGithub.repo}/blob/${editOnGithub.sha}/${editOnGithub.path.startsWith("/") ? editOnGithub.path.slice(1) : editOnGithub.path}`}
							/>
						}
						className="me-auto"
						nativeButton={false}
					>
						<EditIcon className="-ms-0.5" />
						Edit on GitHub
					</Button>
				) : null}
				<Button
					variant="link"
					size="lg"
					className="text-muted-foreground underline"
					render={<Link href="/llms.txt" />}
					nativeButton={false}
				>
					llms.txt
				</Button>
				<Button
					variant="link"
					size="lg"
					className="text-muted-foreground underline"
					render={<Link href="/llms-full.txt" />}
					nativeButton={false}
				>
					llms-full.txt
				</Button>
			</div>
		</div>
	);
}

function LastEditedAt({ date }: { date: Date }) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <p className="text-sm">&nbsp;</p>;

	return (
		<p className="text-sm text-fd-muted-foreground">
			Last edited at{" "}
			{new Intl.DateTimeFormat(undefined, {
				dateStyle: "medium",
			}).format(date)}
		</p>
	);
}
