"use client";
import { HomeLayout } from "@fumadocs/base-ui/layouts/home";
import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { baseOptions } from "@/lib/layout.shared";
import { gitConfig } from "@/lib/shared";
import {
	BookTextIcon,
	BracesIcon,
	LightbulbIcon,
	ScrollTextIcon,
	SearchIcon,
} from "lucide-react";
import { useSearchContext } from "@fumadocs/base-ui/contexts/search";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useEffect, useRef } from "react";
import { cancelFrame, frame } from "motion/react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";

export default function Layout({ children }: LayoutProps<"/">) {
	const baseOpts = baseOptions();
	const { open: searchOpen, setOpenSearch } = useSearchContext();
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		function update(data: { timestamp: number }) {
			const time = data.timestamp;
			lenisRef.current?.lenis?.raf(time);
		}

		frame.update(update, true);

		return () => cancelFrame(update);
	}, []);

	return (
		<>
			<ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
			<HomeLayout
				{...baseOpts}
				slots={{
					...(baseOpts.slots ?? {}),
					header: () => (
						<nav className="after:absolute after:content-[''] after:w-full after:inset-0 after:h-14 after:top-full after:bg-background after:mask-b-from-5% after:pointer-events-none flex flex-row sticky top-0 z-50 bg-background h-14 items-center gap-x-4 px-4">
							<div className="flex items-center gap-4 w-full">
								<Link href="/" className="font-medium whitespace-nowrap">
									node-zugferd
								</Link>
							</div>

							<div className="flex justify-center items-center gap-4 w-full">
								{[
									{
										icon: BookTextIcon,
										label: "Documentation",
										href: "/docs",
									},
									{
										icon: LightbulbIcon,
										label: "Examples",
										href: "/examples",
									},
									{
										icon: BracesIcon,
										label: "API Reference",
										href: "/api-reference",
									},
									{
										icon: ScrollTextIcon,
										label: "Changelog",
										href: "/changelog",
									},
								].map(({ icon: Icon, label, href }) => (
									<Button
										key={href}
										variant="ghost"
										size="lg"
										render={<Link href={href} />}
										nativeButton={false}
									>
										<Icon />
										{label}
									</Button>
								))}
							</div>
							<div className="flex items-center justify-end gap-2 w-full">
								<Button
									size="lg"
									variant="outline"
									className="mr-4 text-muted-foreground cursor-text justify-start text-left min-w-fit w-full max-w-56"
									onClick={() => setOpenSearch(!searchOpen)}
								>
									<SearchIcon
										data-icon="inline-start"
										className="text-muted-foreground!"
									/>
									Search...
									<KbdGroup className="ms-auto -me-1">
										<Kbd>Ctrl</Kbd>
										<Kbd>K</Kbd>
									</KbdGroup>
								</Button>
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
		</>
	);
}
