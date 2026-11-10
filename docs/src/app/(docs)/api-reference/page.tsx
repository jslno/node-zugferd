import { Card, Cards } from "@fumadocs/base-ui/components/card";
import type { Folder } from "fumadocs-core/page-tree";
import { DocsBody, DocsPage, DocsTitle } from "@/layouts/docs/page";
import { apiReferenceSource } from "@/lib/source";

export default function Page() {
	const _pages = apiReferenceSource
		.getPageTree()
		.children.reduce((acc, folder) => {
			if (folder.type !== "folder" || !folder.index) return acc;

			return acc;
		}, []);

	return (
		<DocsPage>
			<div className="flex flex-col gap-2.5">
				<DocsTitle>API Reference</DocsTitle>
			</div>
			<DocsBody>
				<Cards>
					{apiReferenceSource
						.getPageTree()
						.children.filter(
							(
								page,
							): page is Omit<Folder, "index"> &
								Required<Pick<Folder, "index">> =>
								page.type === "folder" && page.index !== undefined,
						)
						.map(({ index: page }) => (
							<Card
								key={page.url}
								icon={page.icon}
								title={page.name}
								href={page.url}
							>
								{page.description}
							</Card>
						))}
				</Cards>
			</DocsBody>
		</DocsPage>
	);
}
