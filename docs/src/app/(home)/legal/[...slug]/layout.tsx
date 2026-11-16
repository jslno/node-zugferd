import { notFound } from "next/navigation";
import { DocsFooter } from "@/layouts/docs/client";
import { pages } from "./shared";

const isValidSlug = (str: string): str is (typeof pages)[number] =>
	pages.includes(str.toLowerCase() as any);

export default async function LegalLayout({
	params,
	children,
}: LayoutProps<"/legal/[...slug]">) {
	const { slug: slugs } = await params;
	if (!slugs || slugs.length !== 1) notFound();
	const slug = slugs[0]!.toLowerCase();

	if (!isValidSlug(slug)) notFound();

	return (
		<div className="flex-1 flex">
			<div className="mx-auto flex-1 flex flex-col max-w-5xl">
				<div className="px-4 pt-16 pb-8 md:px-6 prose flex-1">{children}</div>
				<div className="py-1.5">
					<DocsFooter />
				</div>
			</div>
		</div>
	);
}
