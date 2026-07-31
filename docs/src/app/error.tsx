"use client";

import { Button } from "@/components/ui/button";
import { HomeBackground } from "./(home)/background";
import { RefreshCcwIcon } from "lucide-react";
import { ErrorInfo } from "next/error";
import Link from "next/link";
import { SearchToggle } from "@/layouts/docs";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubIcon } from "@/components/icons/github";
import { gitConfig } from "@/lib/shared";

export default function Error({ error, unstable_retry }: ErrorInfo) {
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
							{(error as any).statusCode ?? "500"}
						</span>
						<h2 className="text-6xl font-pixel-square font-bold">
							Something went wrong
						</h2>
						<p className="text-xl text-red-500 dark:text-red-400">
							{error.message ?? "An unknown error occurred."}
						</p>
					</div>
					<Button
						onClick={() => unstable_retry()}
						variant="secondary"
						className="self-center"
					>
						<RefreshCcwIcon />
						Try Again
					</Button>
				</div>
			</div>
		</>
	);
}
