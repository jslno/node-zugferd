import { createRelativeLink } from "@fumadocs/base-ui/mdx";
import { getGithubLastEdit } from "fumadocs-core/content/github";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	MarkdownCopyButton,
	ViewOptionsPopover,
} from "@/components/ai/page-actions";
import { ExampleExplorer } from "@/components/example-explorer";
import { getMDXComponents } from "@/components/mdx";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "@/layouts/docs/page";
import { gitConfig } from "@/lib/shared";
import {
	getContentPath,
	getPageImage,
	getPageMarkdownUrl,
	getSourcePage,
	getSourceParams,
	source,
} from "@/lib/source";

export default async function Page(props: PageProps<"/examples/[[...slug]]">) {
	const params = await props.params;
	const page = getSourcePage("examples", params.slug);
	if (!page) notFound();

	const MDX = page.data.body;
	const markdownUrl = getPageMarkdownUrl(page).url;

	const gitPath = `docs/content/examples/${getContentPath(page)}`;
	const lastEditedAt = await getGithubLastEdit({
		owner: gitConfig.user,
		repo: gitConfig.repo,
		sha: gitConfig.branch,
		path: gitPath,
	});

	return (
		<DocsPage
			toc={page.data.toc}
			editOnGithub={{
				path: gitPath,
			}}
			lastEditedAt={lastEditedAt ?? undefined}
			full={page.data.full}
		>
			<div className="flex w-full flex-col gap-6">
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
						githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/${gitPath}`}
					/>
				</div>
				<DocsBody>
					<MDX
						components={getMDXComponents({
							// this allows you to link to other pages with relative file paths
							a: createRelativeLink(source, page),
							ExampleExplorer,
						})}
					/>
				</DocsBody>
			</div>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return getSourceParams("examples");
}

export async function generateMetadata(
	props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
	const params = await props.params;
	const page = getSourcePage("examples", params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			images: getPageImage(page).url,
		},
	};
}
