"use client";

import { GitHubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SearchToggle } from "@/layouts/docs";
import { SIDEBAR_TABS } from "@/layouts/docs/sidebar";
import { gitConfig } from "@/lib/shared";
import Link from "next/link";
import { HomeBackground } from "./(home)/background";

export default function NotFound() {
	return (
		<>
			<div className="h-14 px-4 gap-x-4 flex items-center justify-between">
				<Link href="/" className="font-medium whitespace-nowrap">
					node-zugferd
				</Link>
				<div className="w-full max-w-xl">
					<SearchToggle />
				</div>
				<div className="flex items-center gap-x-2">
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
			</div>
			<div className="flex-1 flex flex-col justify-center items-center relative">
				<div className="absolute inset-0 -z-1">
					<HomeBackground />
				</div>
				<div className="flex flex-col gap-12 relative pb-14">
					<div className="flex flex-col items-center gap-4">
						<span className="text-2xl text-teal-500 font-medium italic">
							404
						</span>
						<h2 className="text-7xl font-pixel-square font-bold">
							Page Not Found
						</h2>
						<p className="text-xl text-muted-foreground">
							The page you are looking for does not exist.
						</p>
					</div>
					<div className="grid sm:grid-cols-2 gap-4">
						{[...SIDEBAR_TABS.entries()].map(([id, tab]) => (
							<div key={id} className="bg-background rounded-md">
								<Button
									variant="outline"
									className="min-h-8 py-1.5 w-full h-auto justify-start items-start"
								>
									<tab.icon className="mt-1" />
									<div className="flex flex-col items-start">
										<span>{tab.title}</span>
										<span className="text-muted-foreground">
											{tab.description}
										</span>
									</div>
								</Button>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
