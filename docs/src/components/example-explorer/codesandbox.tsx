"use client";

import { useTheme } from "fumadocs-ui/provider/base";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "../ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
} from "../ui/empty";
import { useExampleExplorer } from ".";

export function CodeSandbox() {
	const { path, owner, repo, branch } = useExampleExplorer();
	const { resolvedTheme = "light" } = useTheme();
	const url = useMemo(() => {
		const baseUrl = "https://codesandbox.io";

		const pathname = `/p/devbox/github/${owner}/${repo}/tree/${branch}/${path.replace(/^\//, "").replace(/\/$/, "")}?theme=${resolvedTheme}`;
		return new URL(pathname, baseUrl).toString();
	}, [path, owner, repo, branch, resolvedTheme]);

	return (
		// <div className="flex flex-1 flex-col h-full">
		<Empty className="flex-1">
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
		// </div>
	);
}
