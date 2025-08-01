import { source } from "@/app/source";
import {
	DocsPage,
	DocsBody,
	DocsDescription,
	DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { buttonVariants } from "@/components/ui/button";
import { contents } from "@/data/sidebar-items";
import { BookOpenIcon, ChevronLeft, ChevronRight, EditIcon } from "lucide-react";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { File, Folder, Files } from "fumadocs-ui/components/files";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Features } from "@/components/blocks/features";
import { ProfileTree } from "@/components/blocks/profile-tree";
import { NeedHelp } from "@/components/blocks/need-help";
import { GithubInfo } from "@/components/github-info";
import { GenerateSecret } from "@/components/generate-secret";
import { APIFeatures } from "@/components/blocks/api-features";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import React from "react";

export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDX = page.data.body;

	const { nextPage, prevPage } = getPageLinks(page.url);

	return (
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
			tableOfContent={{
				style: "clerk",
				enabled: true,
				header: <div className="w-10 h-4"></div>,
			}}
			tableOfContentPopover={{
				enabled: true,
				style: "clerk",
			}}
			footer={{
				component: (
					<div className="mb-10 space-y-6">
						<div className="flex items-center gap-4">
							<Link
								href={`https://github.com/jslno/node-zugferd/blob/main/docs/content/docs/${page.path}`}
								className={buttonVariants({
									size: "sm",
									variant: "ghost",
								})}
							>
								<EditIcon />
								<span>Edit on GitHub</span>
							</Link>
							<Link
								href="/llms.txt"
								className={buttonVariants({
									size: "sm",
									variant: "ghost",
								})}
							>
								<BookOpenIcon />
								<span>llms.txt</span>
							</Link>
						</div>
						<div className="mt-auto gap-4 @container grid grid-cols-2">
							{prevPage ? (
								<Link
									href={prevPage.url}
									className="flex-1 hover:bg-muted focus-visible:bg-muted outline-0 border rounded transition-colors @max-lg:col-span-full"
								>
									<div className="w-full p-4 flex items-start gap-2.5">
										<ChevronLeft className="shrink-0 size-4 mt-1" />
										<div className="w-full truncate space-y-1">
											<h3 className="font-medium leading-relaxed text-pretty">
												{prevPage.data.title}
											</h3>
											<p className="text-sm truncate text-muted-foreground">
												{prevPage.data.description}
											</p>
										</div>
									</div>
								</Link>
							) : (
								<div />
							)}
							{nextPage ? (
								<Link
									href={nextPage.url}
									className="flex-1 hover:bg-muted focus-visible:bg-muted outline-0 border rounded transition-colors @max-lg:col-span-full"
								>
									<div className="w-full p-4 flex items-start gap-2.5">
										<div className="w-full truncate space-y-1">
											<h3 className="font-medium leading-relaxed text-pretty">
												{nextPage.data.title}
											</h3>
											<p className="text-sm truncate text-muted-foreground">
												{nextPage.data.description}
											</p>
										</div>
										<ChevronRight className="shrink-0 size-4 mt-1" />
									</div>
								</Link>
							) : (
								<div />
							)}
						</div>
					</div>
				),
			}}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDX
					components={{
						...defaultMdxComponents,
						CodeBlockTab: ({
							className,
							...props
						}: React.ComponentProps<
							typeof defaultMdxComponents.CodeBlockTab
						>) => {
							return (
								<defaultMdxComponents.CodeBlockTab
									{...props}
									className={cn(className, "bg-muted/20")}
								/>
							);
						},
						Link: ({
							className,
							...props
						}: React.ComponentProps<typeof Link>) => (
							<Link
								className={cn(
									"font-medium underline underline-offset-4",
									className,
								)}
								{...props}
							/>
						),
						Step,
						Steps,
						File,
						Folder,
						Files,
						TypeTable,
						AutoTypeTable,
						Tab,
						Tabs: ({
							className,
							...props
						}: React.ComponentProps<typeof Tabs>) => {
							return (
								<Tabs {...props} className={cn(className, "bg-muted/20")} />
							);
						},
						Accordion,
						Accordions,
						Callout: ({ children, type, ...props }) => (
							<div
								{...props}
								className={cn(
									props,
									"text-muted-foreground text-base p-4 my-4 bg-muted/20 rounded-none border border-dashed border-border",
									type === "info" && "border-l-blue-500/50",
									type === "tip" && "border-l-emerald-500/50",
									type === "warn" && "border-l-amber-500/50",
									type === "error" && "border-l-red-500/50",
								)}
							>
								{children}
							</div>
						),
						iframe: (props) => (
							<iframe {...props} className="w-full h-[500px]" />
						),
						Features,
						APIFeatures,
						ProfileTree,
						NeedHelp,
						GithubInfo,
						GenerateSecret,
						pre: ({ ref: _ref, ...props }) => (
							<CodeBlock
								viewportProps={{
									className: "bg-muted/20",
								}}
								{...props}
							>
								<Pre>{props.children}</Pre>
							</CodeBlock>
						),
					}}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (page == null) notFound();
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const url = new URL(`${baseUrl}/api/og`);
	const { title, description } = page.data;
	const pageSlug = page.file.path;
	url.searchParams.set("type", "Documentation");
	url.searchParams.set("mode", "dark");
	url.searchParams.set("heading", `${title}`);

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			url: `${baseUrl}/docs/${pageSlug}`,
			images: [
				{
					url: url.toString(),
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [url.toString()],
		},
	};
}

function getPageLinks(path: string) {
	const current_category_index = contents.findIndex(
		(x) => x.list.find((x) => x.href === path)!,
	)!;
	const current_category = contents[current_category_index];
	if (!current_category) return { nextPage: undefined, prevPage: undefined };

	// user's current page.
	const current_page = current_category.list.find((x) => x.href === path)!;

	// the next page in the array.
	let next_page = current_category.list.filter((x) => !x.group)[
		current_category.list
			.filter((x) => !x.group)
			.findIndex((x) => x.href === current_page.href) + 1
	];
	//if there isn't a next page, then go to next cat's page.
	if (!next_page) {
		// get next cat
		let next_category = contents[current_category_index + 1];
		// if doesn't exist, return to first cat.
		if (!next_category) next_category = contents[0];

		next_page = next_category.list[0];
		if (next_page.group) {
			next_page = next_category.list[1];
		}
	}
	// the prev page in the array.
	let prev_page = current_category.list.filter((x) => !x.group)[
		current_category.list
			.filter((x) => !x.group)
			.findIndex((x) => x.href === current_page.href) - 1
	];
	// if there isn't a prev page, then go to prev cat's page.
	if (!prev_page) {
		// get prev cat
		let prev_category = contents[current_category_index - 1];
		// if doesn't exist, return to last cat.
		if (!prev_category) prev_category = contents[contents.length - 1];
		prev_page = prev_category.list[prev_category.list.length - 1];
		if (prev_page.group) {
			prev_page = prev_category.list[prev_category.list.length - 2];
		}
	}

	const pages = source.getPages();
	let next_page2 = pages.find((x) => x.url === next_page.href);
	let prev_page2 = pages.find((x) => x.url === prev_page.href);
	if (path === "/docs/introduction") prev_page2 = undefined;
	return { nextPage: next_page2, prevPage: prev_page2 };
}
