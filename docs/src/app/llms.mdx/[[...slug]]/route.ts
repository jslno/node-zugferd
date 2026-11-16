import { notFound } from "next/navigation";
import { llms, source } from "@/lib/source";

export const revalidate = false;

export async function GET(
	_req: Request,
	{ params }: RouteContext<"/llms.mdx/[[...slug]]">,
) {
	const { slug } = await params;
	// remove the appended "content.md", `/docs/index.md` is rewritten to the root page
	const slugs = slug?.slice(0, -1) ?? [];
	if (slugs.at(-1) === "index") slugs.pop();
	const page = source.getPage(slugs);
	if (!page) notFound();

	return new Response(await llms.page(page), {
		headers: {
			"Content-Type": "text/markdown",
		},
	});
}

export function generateStaticParams() {
	return source.generateParams().map((item) => ({
		...item,
		slug: [...item.slug, "content.md"],
	}));
}
