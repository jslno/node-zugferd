import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LangSwitcher } from "@/app/(home)/legal/[...slug]/client";
import { getMDXComponents } from "@/components/mdx";
import { DocsDescription, DocsTitle } from "@/layouts/docs/page";
import { prefersLanguage } from "@/lib/lang";
import { toURLSearchParams } from "@/lib/shared";

export default async function LegalPage({
	params,
	searchParams,
}: PageProps<"/legal/[...slug]">) {
	const { slug } = await params;

	if (!slug || slug.length !== 1) notFound();

	const search = await searchParams;
	let lang: string = "en";
	const explicitLang = (
		Array.isArray(search.lang) ? search.lang[0] : search.lang
	)?.toLowerCase();

	if (explicitLang) {
		lang = explicitLang;
	} else if (await prefersLanguage("de")) {
		const searchParams = toURLSearchParams(search);
		searchParams.set("lang", "de");
		redirect(`?${searchParams}`);
	}

	const { MDX, frontmatter } = await import(
		`./${slug}/content.${lang}.mdx`
	).then(({ default: MDX, frontmatter }) => ({
		MDX,
		frontmatter,
	}));

	return (
		<>
			<LangSwitcher lang={lang} />
			<div>
				<DocsTitle>{frontmatter.title}</DocsTitle>
				<DocsDescription>{frontmatter.description}</DocsDescription>
			</div>
			<MDX components={getMDXComponents()} />
		</>
	);
}

export async function generateMetadata({
	params,
	searchParams,
}: PageProps<"/legal/[...slug]">): Promise<Metadata> {
	const { slug } = await params;
	if (!slug || slug.length !== 1) notFound();

	const search = await searchParams;
	const explicitLang = (
		Array.isArray(search.lang) ? search.lang[0] : search.lang
	)?.toLowerCase();
	const lang = explicitLang ?? ((await prefersLanguage("de")) ? "de" : "en");
	const { frontmatter } = await import(`./${slug}/content.${lang}.mdx`);

	return {
		title: frontmatter.title,
		description: frontmatter.description,
	};
}
