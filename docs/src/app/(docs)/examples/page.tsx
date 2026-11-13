import { Card, Cards } from "@fumadocs/base-ui/components/card";
import { cn } from "cn";
import type { Item } from "fumadocs-core/page-tree";
import { DocsBody, DocsPage, DocsTitle } from "@/layouts/docs/page";
import { getSourcePageTree } from "@/lib/source";

export default function Page() {
	const tree = getSourcePageTree("examples");

	type Group = {
		name?: React.ReactNode | undefined;
		items: Item[];
	};

	const entries = tree.children.reduce<{
		ungrouped: Item[];
		grouped: Group[];
	}>(
		(acc, item) => {
			if (item.type === "folder") return acc;

			if (item.type === "separator") {
				acc.grouped.push({
					name: item.name,
					items: [],
				});
				return acc;
			}

			const currentGroup = acc.grouped.at(-1);

			if (currentGroup) {
				currentGroup.items.push(item);
			} else {
				acc.ungrouped.push(item);
			}

			return acc;
		},
		{
			ungrouped: [],
			grouped: [],
		},
	);

	const renderItem = (entry: Item, index: number, arr: Item[]) => (
		<Card
			key={entry.url}
			icon={entry.icon}
			title={entry.name}
			href={entry.url}
			className={cn(
				arr.length % 2 !== 0 && arr.length - 1 === index && "col-span-full",
			)}
		>
			{entry.description}
		</Card>
	);

	return (
		<DocsPage>
			<div className="flex w-full flex-col gap-6">
				<div className="flex flex-col gap-2.5">
					<DocsTitle>Examples</DocsTitle>
				</div>
				<DocsBody>
					<Cards>{entries.ungrouped.map(renderItem)}</Cards>
					{entries.grouped.map((group, i) => {
						return (
							<div key={i}>
								<h3>{group.name}</h3>
								<Cards>{group.items.map(renderItem)}</Cards>
							</div>
						);
					})}
				</DocsBody>
			</div>
		</DocsPage>
	);
}
