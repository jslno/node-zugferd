import { notFound } from "next/navigation";
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
		<div className="p-16">
			<div className="prose mx-auto max-w-5xl">{children}</div>
		</div>
	);
}
