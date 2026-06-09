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
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/cn";

export interface DocsPageProps {
	toc?: TOCItemType[];

	children: ReactNode;
}

export function DocsPage({ toc = [], ...props }: DocsPageProps) {
	return (
		<TOCProvider toc={toc}>
			<main className="flex w-full min-w-0 px-4 pb-4 flex-col">
				<div className="bg-fd-background border border-fd-border rounded-2xl shadow-lg flex-1">
					<article className="flex flex-1 h-full flex-col justify-between w-full max-w-[860px] gap-6 px-4 py-8 md:px-6 md:mx-auto">
						<div className="flex flex-col w-full gap-6">{props.children}</div>
						<Footer />
					</article>
				</div>
			</main>
			{toc.length > 0 && (
				<div className="sticky top-(--fd-nav-height) w-[286px] shrink-0 h-[calc(100dvh-var(--fd-nav-height))] p-4 overflow-auto max-xl:hidden">
					<div className="flex flex-row items-center gap-2.5 mb-2">
						<TableOfContentsIcon className="text-fd-muted-foreground size-4.5" />
						<p className="text-sm text-fd-muted-foreground">On this page</p>
					</div>
					<TOCScrollArea>
						<TOCItems>
							{toc.map((item) => (
								<TOCItem key={item.url} item={item} />
							))}
						</TOCItems>
					</TOCScrollArea>
				</div>
			)}
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

function Footer() {
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
							<p className="text-sm text-fd-muted-foreground">
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
							<p className="text-sm text-fd-muted-foreground">
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
				<Button
					variant="secondary"
					render={<Link href="" />}
					className="me-auto"
					nativeButton={false}
				>
					<EditIcon className="-ms-0.5" />
					Edit on GitHub
				</Button>
				<Button
					variant="link"
					size="lg"
					className="text-muted-foreground underline"
					render={<Link href="" />}
					nativeButton={false}
				>
					llms.txt
				</Button>
				<Button
					variant="link"
					size="lg"
					className="text-muted-foreground underline"
					render={<Link href="" />}
					nativeButton={false}
				>
					llms-full.txt
				</Button>
			</div>
		</div>
	);
}
