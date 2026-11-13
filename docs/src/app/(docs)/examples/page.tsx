import { Card, Cards } from "@fumadocs/base-ui/components/card";
import type { Item } from "fumadocs-core/page-tree";
import { DocsBody, DocsPage, DocsTitle } from "@/layouts/docs/page";
import { getSourcePageTree } from "@/lib/source";

export default function Page() {
	return (
		<DocsPage>
			<div className="flex w-full flex-col gap-6">
				<div className="flex flex-col gap-2.5">
					<DocsTitle>Examples</DocsTitle>
				</div>
				<DocsBody>
					<Cards>
						{getSourcePageTree("examples")
							.children.filter((page): page is Item => page.type === "page")
							.map((page) => (
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
			</div>
		</DocsPage>
	);
}
