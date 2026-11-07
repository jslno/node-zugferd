"use client";
import { useSearchContext } from "@fumadocs/base-ui/contexts/search";
import { HomeLayout } from "@fumadocs/base-ui/layouts/home";
import { useMediaQuery } from "fumadocs-core/utils/use-media-query";
import type { LenisRef } from "lenis/react";
import { ReactLenis } from "lenis/react";
import { MenuIcon, SearchIcon } from "lucide-react";
import { cancelFrame, frame } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { GitHubIcon } from "@/components/icons";
import { NodeZugferd } from "@/components/icons/node-zugferd";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { baseOptions } from "@/lib/layout.shared";
import { navItems } from "@/lib/nav-items";
import { gitConfig } from "@/lib/shared";

export default function Layout({ children }: LayoutProps<"/">) {
	const baseOpts = baseOptions();
	const { open: searchOpen, setOpenSearch } = useSearchContext();
	const lenisRef = useRef<LenisRef>(null);
	const isMobile = useMediaQuery("(max-width: 640px)");

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
								<Drawer
									swipeDirection={isMobile ? "down" : "left"}
									showSwipeHandle={Boolean(isMobile)}
									onOpenChange={(open) => {
										if (open) {
											lenisRef.current?.lenis?.stop();
										} else {
											lenisRef.current?.lenis?.start();
										}
									}}
								>
									<DrawerTrigger
										render={
											<Button
												variant="ghost"
												size="icon-lg"
												className="2xl:hidden"
												aria-label="Open menu"
											/>
										}
									>
										<MenuIcon />
									</DrawerTrigger>
									<DrawerContent className="max-sm:[--drawer-content-height:calc(100dvh-3.5rem)] max-sm:[--drawer-content-max-height:calc(100dvh-3.5rem)]">
										<div className="flex min-h-0 flex-1 flex-col p-4">
											{navItems.map(
												({ icon: Icon, label, description, href }) => (
													<Button
														key={href}
														variant="ghost"
														className="h-auto w-full justify-start gap-2.5 py-1.5 text-start [&_svg]:size-5!"
														render={<Link href={href} />}
														nativeButton={false}
													>
														<Icon />
														<div className="flex flex-col">
															<span>{label}</span>
															<span className="text-muted-foreground text-xs">
																{description}
															</span>
														</div>
													</Button>
												),
											)}
										</div>
									</DrawerContent>
								</Drawer>
								<Link
									href="/"
									className="flex items-center gap-2 font-medium whitespace-nowrap"
								>
									<NodeZugferd />
									node-zugferd
								</Link>
							</div>

							<div className="max-2xl:hidden flex justify-center items-center gap-4 w-full">
								{navItems.map(({ icon: Icon, label, href }) => (
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
									className="max-sm:hidden mr-4 text-muted-foreground cursor-text justify-start text-left min-w-fit w-full max-w-56"
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
