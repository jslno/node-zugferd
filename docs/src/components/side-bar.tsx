"use client";

import { AppWindowIcon, ChevronDownIcon, LibraryIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { contents } from "@/data/sidebar-items";
import { cn } from "@/lib/utils";
import { SideBarLink } from "./side-bar-link";
import { Badge } from "./ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export const SideBar = () => {
	const [currentOpen, setCurrentOpen] = useState(0);
	const router = useRouter();
	const pathname = usePathname();
	const [group, setGroup] = useState("docs");

	const getDefaultValue = () => {
		const defaultValue = contents.findIndex((item) =>
			item.list.some((listItem) => listItem.href === pathname),
		);

		return defaultValue === -1 ? 0 : defaultValue;
	};

	useEffect(() => {
		const grp = pathname.includes("examples")
			? "examples"
			: pathname.includes("plugins/api/")
				? "api"
				: "docs";

		setGroup(grp);
		setCurrentOpen(getDefaultValue());
	}, [pathname]);

	// TODO: Add contents for examples
	const cts = group === "docs" ? contents : [];

	return (
		<div className="fixed left-0 top-0">
			<aside className="border-r md:flex hidden w-(--fd-sidebar-width) overflow-y-auto absolute top-(--nav-height) h-[calc(100dvh-var(--nav-height))] flex-col justify-between">
				<div>
					<div className="py-2 bg-muted/20">
						<Select
							value={group}
							onValueChange={(val) => {
								setGroup(val);
								if (val === "examples") {
									router.push("/docs/examples");
								} else {
									router.push("/docs");
								}
							}}
						>
							<SelectTrigger className="h-14 bg-background cursor-pointer border-0 border-y !ring-0">
								<SelectValue className="py-16" />
							</SelectTrigger>
							<SelectContent
								onCloseAutoFocus={(e) => e.preventDefault()}
								className="rounded-lg"
							>
								<SelectItem value="docs" className="h-14">
									<div>
										<div className="flex items-center gap-1">
											<LibraryIcon />
											Docs
										</div>
										<p className="text-xs text-muted-foreground">
											get started, profiles and more
										</p>
									</div>
								</SelectItem>
								<SelectItem value="examples" className="h-14" disabled>
									<div>
										<div className="flex items-center gap-1">
											<AppWindowIcon />
											Examples
											<Badge variant="outline" className="rounded-[4px]">
												Soon
											</Badge>
										</div>
										<p className="text-xs text-muted-foreground">
											examples and guides
										</p>
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-col divide-y">
						{cts.map((item, index) => (
							<div
								key={item.title}
								className="overflow-hidden first:border-t last:border-b"
							>
								<button
									className={cn(
										"hover:underline underline-offset-4 border-b border-b-sidebar-border group cursor-pointer w-full text-sm px-5 py-2.5 text-left flex items-center gap-2 transition-colors",
										currentOpen === index
											? "border-b-border"
											: "border-b-transparent",
									)}
									onClick={() => {
										setCurrentOpen(currentOpen === index ? -1 : index);
									}}
								>
									{!!item.Icon && (
										<item.Icon
											className={cn(
												"size-5 transition-opacity duration-300",
												currentOpen === index
													? "opacity-100"
													: "opacity-60 group-hover:opacity-100",
											)}
										/>
									)}
									<span className="grow">{item.title}</span>
									<motion.div
										animate={{ rotate: currentOpen === index ? 180 : 0 }}
									>
										<ChevronDownIcon
											className={
												"h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
											}
										/>
									</motion.div>
								</button>
								<AnimatePresence initial={false}>
									{currentOpen === index && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											className="relative overflow-hidden"
										>
											<motion.div className="text-sm">
												{item.list.map((listItem, j) => (
													<div key={listItem.title}>
														<Suspense fallback={<>Loading...</>}>
															{listItem.group ? (
																<div className="flex flex-row items-center gap-2 mx-5 my-1 ">
																	<p className="text-sm">{listItem.title}</p>
																</div>
															) : (
																<SideBarLink
																	href={listItem.href}
																	startWith="/docs"
																	title={listItem.title}
																	className="break-words w-[--fd-sidebar-width]"
																>
																	{!!listItem.Icon && (
																		<div className="w-4 flex items-center justify-center">
																			<listItem.Icon className="size-4" />
																		</div>
																	)}
																	{listItem.title}
																</SideBarLink>
															)}
														</Suspense>
													</div>
												))}
											</motion.div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>
				</div>
			</aside>
		</div>
	);
};
