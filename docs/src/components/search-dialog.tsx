"use client";

import { useFetchSearch } from "fumadocs-core/search/client";
import type { SharedProps } from "fumadocs-ui/components/dialog/search";
import {
	SearchDialog,
	SearchDialogClose,
	SearchDialogContent,
	SearchDialogFooter,
	SearchDialogHeader,
	SearchDialogIcon,
	SearchDialogInput,
	SearchDialogList,
	SearchDialogOverlay,
	TagsList,
	TagsListItem,
} from "fumadocs-ui/components/dialog/search";
import { useState } from "react";
import { SIDEBAR_TABS } from "@/layouts/docs/sidebar";

export function CustomSearchDialog(props: SharedProps) {
	const [tag, setTag] = useState<string>("docs");
	const search = useFetchSearch({
		tag,
	});
	return (
		<SearchDialog {...search} {...props}>
			<SearchDialogOverlay />
			<SearchDialogContent>
				<SearchDialogHeader>
					<SearchDialogIcon />
					<SearchDialogInput />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList className="[&_#fd-search-list]:scroll-fade" />
				<SearchDialogFooter className="flex flex-row">
					<TagsList
						allowClear={false}
						tag={tag}
						onTagChange={(tag) => setTag(tag ?? "docs")}
					>
						{[...SIDEBAR_TABS.values()].map(({ id, label, icon: Icon }) => (
							<TagsListItem
								key={id}
								value={id}
								className="flex items-center gap-1"
							>
								<Icon
									className="size-3.5 shrink-0 -ms-0.5"
									aria-hidden="true"
								/>
								{label}
							</TagsListItem>
						))}
					</TagsList>
				</SearchDialogFooter>
			</SearchDialogContent>
		</SearchDialog>
	);
}
