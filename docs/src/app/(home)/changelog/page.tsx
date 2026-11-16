import { createCompiler } from "@fumadocs/mdx-remote";
import { remarkGfm } from "fumadocs-core/mdx-plugins";
import { CalendarIcon } from "lucide-react";
import type { Link, Parent, Root, Text } from "mdast";
import Image from "next/image";
import NextLink from "next/link";
import { visit } from "unist-util-visit";
import { FormatDate } from "@/app/(home)/changelog/client";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/hover-card";
import { getMDXComponents } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";
import { DocsDescription, DocsFooter, DocsTitle } from "@/layouts/docs/client";
import { getChangelog } from "@/lib/github";
import { cn } from "@/lib/utils";

export const metadata = {
	title: "Changelog",
	description: "Release notes and version history.",
};

type Release = Awaited<ReturnType<typeof getChangelog>>[number];

function remarkGitHubReferences() {
	return (tree: Root) => {
		// Transform GitHub issues and pull requests
		visit(tree, "link", (node: Link) => {
			const match = node.url.match(
				/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:issues|pull)\/(\d+)\/?$/,
			);

			if (!match) return;

			node.children = [
				{
					type: "text",
					value: `#${match[3]}`,
				},
			];
		});

		// Transform GitHub user mentions
		visit(tree, "text", (node: Text, index, parent) => {
			if (!parent || index === undefined) return;

			// Don't transform mentions inside existing links
			if (parent.type === "link" || parent.type === "linkReference") {
				return;
			}

			const regex =
				/(^|[^\w.@-])@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?)/g;

			const children: (Text | Link)[] = [];
			let lastIndex = 0;
			let match: RegExpExecArray | null;

			while ((match = regex.exec(node.value)) !== null) {
				const mentionStart = match.index + match[1].length;
				const username = match[2];

				if (mentionStart > lastIndex) {
					children.push({
						type: "text",
						value: node.value.slice(lastIndex, mentionStart),
					});
				}

				children.push({
					type: "link",
					url: `https://github.com/${username}`,
					children: [
						{
							type: "image",
							url: `https://github.com/${username}.png?size=32`,
							alt: `@${username}`,
							data: {
								hProperties: {
									width: 32,
									height: 32,
									className: ["rounded-full inline size-7 me-0.5 my-0!"],
								},
							},
						},
						{
							type: "text",
							value: `@${username}`,
						},
					],
				});

				lastIndex = regex.lastIndex;
			}

			if (lastIndex === 0) return;

			if (lastIndex < node.value.length) {
				children.push({
					type: "text",
					value: node.value.slice(lastIndex),
				});
			}

			(parent as Parent).children.splice(index, 1, ...children);
		});
	};
}

const compiler = createCompiler({
	format: "md",
	remarkPlugins: [remarkGfm, remarkGitHubReferences],
});

export default async function ChangelogPage() {
	const releases = await getChangelog();

	const latestReleaseIdx = releases.findIndex(
		(release) => !release.draft && !release.prerelease,
	);
	const _latestRelease = releases[latestReleaseIdx];

	return (
		<div className="flex-1 flex">
			<div className="mx-auto flex-1 flex flex-col max-w-5xl">
				<div className="px-4 pt-16 pb-8 prose md:px-6 flex-1">
					<div>
						<DocsTitle>Changelog</DocsTitle>
						<DocsDescription>
							Release notes and version history.
						</DocsDescription>
					</div>
					<div className="flex flex-col divide-y">
						{releases.map((release, i) => {
							if (release.draft) return null;
							const isLatest = i === latestReleaseIdx;
							return (
								<Release
									key={release.id}
									release={release}
									isLatest={isLatest}
								/>
							);
						})}
					</div>
				</div>
				<div className="py-1.5">
					<DocsFooter />
				</div>
			</div>
		</div>
	);
}

async function Release({
	release,
	isLatest,
}: {
	release: Release;
	isLatest: boolean;
}) {
	const { content, metadata } = extractMetadata(release.body);
	const hasBreakingChanges =
		metadata && typeof metadata["breaking-changes"] === "boolean"
			? metadata["breaking-changes"]
			: metadata?.["breaking-changes"] === "true";
	const { body: Content } = await compiler.compile({
		source: !!content ? content : "*No significant changes*",
		components: getMDXComponents({
			h1: (props) => <h1 {...props} />,
			h2: (props) => <h2 {...props} />,
			h3: (props) => <h3 {...props} />,
			h4: (props) => <h4 {...props} />,
			h5: (props) => <h5 {...props} />,
			h6: (props) => <h6 {...props} />,
			ul: ({ className, ...props }) => (
				<ul className={cn("list-inside", className)} {...props} />
			),
		}),
	});

	const authors = release.commits.reduce((acc, current) => {
		if (current.author && current.author.type.toLowerCase() === "user") {
			acc.set(current.author.id, current.author);
		}
		return acc;
	}, new Map<number, NonNullable<Release["commits"][number]["author"]>>());

	return (
		<section id={release.tag_name}>
			<div id={isLatest ? "latest" : undefined}>
				<h2 className="flex items-center gap-2 mb-1!">
					{!!release.name ? release.name : release.tag_name}
					{isLatest && (
						<Badge className="bg-emerald-500/10 text-emerald-500 focus-visible:ring-emerald-500/20 dark:bg-emerald-500/20 dark:focus-visible:bg-emerald-500/40 [a]:hover:bg-emerald-500/20">
							Latest
						</Badge>
					)}
					{release.prerelease && (
						<Badge className="bg-amber-500/10 text-amber-500 focus-visible:ring-amber-500/20 dark:bg-amber-500/20 dark:focus-visible:bg-amber-500/40 [a]:hover:bg-amber-500/20">
							Pre-Release
						</Badge>
					)}
					{hasBreakingChanges && (
						<Badge className="bg-violet-500/10 text-violet-500 focus-visible:ring-violet-500/20 dark:bg-violet-500/20 dark:focus-visible:bg-violet-500/40 [a]:hover:bg-violet-500/20">
							Breaking Changes
						</Badge>
					)}
				</h2>
				<p className="text-xs flex items-center gap-1.5 font-medium [&_svg]:size-3.5 text-muted-foreground">
					<CalendarIcon />
					<FormatDate date={release.created_at} />
				</p>
			</div>

			<Content />

			<div className="mt-8 mb-10 flex items-center gap-2 flex-wrap not-prose">
				{[...authors.values()].map((author) => (
					<HoverCard key={author.id}>
						<HoverCardTrigger
							render={
								<NextLink
									key={author.id}
									href={author.html_url}
									aria-label={`@${author.login}`}
									className="flex size-8 rounded-full overflow-hidden"
								/>
							}
						>
							<Image
								src={author.avatar_url}
								alt={`@${author.login}`}
								width={32}
								height={32}
							/>
						</HoverCardTrigger>
						<HoverCardContent align="start">
							<div className="flex items-center gap-3">
								<Image
									src={author.avatar_url}
									alt={`@${author.login}`}
									width={64}
									height={64}
									className="size-10 rounded-full border shadow-sm"
								/>
								<div className="truncate">
									<NextLink
										href={author.html_url}
										className="font-medium underline decoration-2 underline-offset-4 leading-relaxed hover:text-foreground/80 transition-colors"
									>
										{author.login}
									</NextLink>
									<p className="text-xs text-muted-foreground">{author.name}</p>
								</div>
							</div>
						</HoverCardContent>
					</HoverCard>
				))}
			</div>
		</section>
	);
}

function extractMetadata(body: string | undefined | null): {
	metadata: Record<string, string> | null;
	content: string;
} {
	if (!body) return { metadata: null, content: "" };

	const match = body.match(/<metadata\b([^>]*)\/?\s*>/i);

	if (!match) return { metadata: null, content: body };

	const metadata = Object.fromEntries(
		[...match[1].matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
			([, key, doubleQuoted, singleQuoted]) => [
				key,
				doubleQuoted ?? singleQuoted,
			],
		),
	);

	return {
		metadata,
		content: body.replace(match[0], "").trim(),
	};
}
