"use client";

import { useTheme } from "fumadocs-ui/provider/base";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { gitConfig } from "@/lib/shared";
import { Button } from "../ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
} from "../ui/empty";

export function CodeSandbox({ path }: { path: string }) {
	const { resolvedTheme = "light" } = useTheme();
	const url = useMemo(() => {
		const baseUrl = "https://codesandbox.io";

		const pathname = `/p/devbox/github/${gitConfig.user}/${gitConfig.repo}/tree/${gitConfig.branch}/${path.replace(/^\//, "").replace(/\/$/, "")}?theme=${resolvedTheme}`;
		return new URL(pathname, baseUrl).toString();
	}, [path]);

	return (
		<Empty>
			<EmptyHeader>
				<EmptyDescription>
					Open this example in a new tab to use CodeSandbox's editor and
					preview.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button
					nativeButton={false}
					render={
						<Link
							suppressHydrationWarning
							href={url}
							target="_blank"
							rel="noopener noreferrer"
						/>
					}
				>
					Open in CodeSandbox
					<ExternalLinkIcon aria-hidden="true" data-icon="inline-end" />
				</Button>
			</EmptyContent>
		</Empty>
	);
}
