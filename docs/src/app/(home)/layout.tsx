"use client";
import { HomeLayout } from "@fumadocs/base-ui/layouts/home";
import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { baseOptions } from "@/lib/layout.shared";
import { gitConfig } from "@/lib/shared";

export default function Layout({ children }: LayoutProps<"/">) {
	const baseOpts = baseOptions();
	return (
		<HomeLayout
			{...baseOpts}
			slots={{
				...(baseOpts.slots ?? {}),
				header: () => (
					<nav className="flex flex-row h-full items-center gap-x-4 px-4">
						<div className="flex items-center gap-4 w-full">
							<Link href="/" className="font-medium whitespace-nowra">
								node-zugferd
							</Link>
						</div>

						{/*<SearchToggle />*/}
						<div className="flex items-center justify-end gap-2 w-full">
							<ThemeToggle />
							<Button
								size="icon-lg"
								variant="ghost"
								render={
									<Link
										href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/tree/${gitConfig.branch}`}
										target="_blank"
									/>
								}
								nativeButton={false}
							>
								<GitHubIcon />
							</Button>
						</div>
					</nav>
				),
			}}
		>
			{children}
		</HomeLayout>
	);
}
