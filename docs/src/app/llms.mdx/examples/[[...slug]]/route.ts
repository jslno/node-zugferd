import { notFound } from "next/navigation";
import { getLLMText, getPageMarkdownUrl, examplesSource } from "@/lib/source";

export const revalidate = false;

export async function GET(
	_req: Request,
	{ params }: RouteContext<"/llms.mdx/examples/[[...slug]]">,
) {
	const { slug } = await params;
	const page = examplesSource.getPage(slug?.slice(0, -1));
	if (!page) notFound();

	return new Response(await getLLMText(page, "examples"), {
		headers: {
			"Content-Type": "text/markdown",
		},
	});
}

export function generateStaticParams() {
	return examplesSource.getPages().map((page) => ({
		lang: page.locale,
		slug: getPageMarkdownUrl(page, "examples").segments,
	}));
}
