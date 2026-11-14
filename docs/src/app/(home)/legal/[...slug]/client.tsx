"use client";

import { ChevronDownIcon, LanguagesIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getLangLabel(lang: string) {
	return new Intl.DisplayNames([lang], { type: "language" }).of(lang);
}

export function LangSwitcher({ lang }: { lang: string }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button size="xs" variant="outline" className="mb-4" />}
			>
				<LanguagesIcon aria-hidden="true" data-icon="inline-start" />
				{getLangLabel(lang)}
				<ChevronDownIcon
					className="text-muted-foreground! size-3"
					aria-hidden="true"
					data-icon="inline-end"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{["en", "de"].map((item) => {
					if (lang === item) return null;

					return (
						<DropdownMenuItem
							key={item}
							onClick={() => {
								const params = new URLSearchParams(searchParams);
								params.set("lang", item);
								router.replace(`?${params}`);
							}}
						>
							{getLangLabel(item)}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
