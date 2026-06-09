import { createRelativeLink } from "@fumadocs/base-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	MarkdownCopyButton,
	ViewOptionsPopover,
} from "@/components/ai/page-actions";
import { getMDXComponents } from "@/components/mdx";
import { ProfileTree } from "@/components/profile-tree";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "@/layouts/docs/page";
import { gitConfig } from "@/lib/shared";
import { getPageImage, getPageMarkdownUrl, source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDX = page.data.body;
	const markdownUrl = getPageMarkdownUrl(page).url;

	return (
		<DocsPage toc={page.data.toc} full={page.data.full}>
			<div className="flex flex-col gap-2.5">
				<DocsTitle>{page.data.title}</DocsTitle>
				<DocsDescription className="mb-0">
					{page.data.description}
				</DocsDescription>
			</div>
			<div className="flex flex-row gap-2 items-center border-b pb-6">
				<MarkdownCopyButton markdownUrl={markdownUrl} />
				<ViewOptionsPopover
					markdownUrl={markdownUrl}
					githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
				/>
			</div>
			<DocsBody>
				<MDX
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
						ProfileTree,
					})}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(
	props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			images: getPageImage(page).url,
		},
	};
}
