"use client";

import Link from "next/link";
import { ArrowRightIcon, CheckIcon, CodeIcon, CopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";
import { LiteralString } from "@/types/helper";
import { useEffect, useRef, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";

type Tab = {
	name: LiteralString;
	code: string;
	highlight?: number[];
};

const tabs: Tab[] = [
	{
		name: "invoicer.ts",
		code: `export const invoicer = zugferd({
	profile: BASIC
});`,
	},
	{
		name: "main.ts",
		code: `const data: ProfileBasic = {
	// ...data
};
	
const inv = invoicer.create(data);

const xml = await inv.toXML();
const pdfa = await inv.embedInPdf(pdf);`,
		highlight: [5, 8],
	},
];

const CodePreview = () => {
	const [ref, { height }] = useMeasure();
	const [currentTabName, setCurrentTabName] = useState<string>(tabs[0].name);
	const currentTab = tabs.find((tab) => tab.name === currentTabName);
	const theme = useTheme();
	const [codeTheme, setCodeTheme] = useState(themes.oneDark);
	const [copyState, setCopyState] = useState(false);
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopyState(true);
			setTimeout(() => {
				setCopyState(false);
			}, 2000);
		});
	};

	useEffect(() => {
		setCodeTheme(
			theme.resolvedTheme === "light" ? themes.oneLight : themes.oneDark,
		);
	}, [theme.resolvedTheme]);

	return (
		<>
			<AnimatePresence initial={false}>
				<MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
					<motion.div
						animate={{ height: height > 0 ? height : undefined }}
						className="relative overflow-hidden rounded-sm ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-lg shadow-lg bg-gradient-to-tr from-muted/10 via-muted/25 to-muted/10"
					>
						<div ref={ref}>
							<div className="absolute -top-px left-0 right-0 h-px" />
							<div className="absolute -bottom-px left-11 right-20 h-px" />
							<div className="pl-4 pt-4">
								<div className="flex items-center flex-wrap gap-2.5">
									<svg
										aria-hidden="true"
										viewBox="0 0 42 10"
										fill="none"
										className="stroke-black/10 dark:stroke-white/10 h-2.5 w-auto"
									>
										<circle cx="5" cy="5" r="4.5" />
										<circle cx="21" cy="5" r="4.5" />
										<circle cx="37" cy="5" r="4.5" />
									</svg>

									<div className="flex space-x-2 text-xs drop-shadow-sm">
										{tabs.map((tab) => (
											<button
												key={tab.name}
												onClick={() => setCurrentTabName(tab.name)}
												className={cn(
													"relative isolate flex h-6 cursor-pointer items-center justify-center rounded-full px-2.5",
													currentTabName === tab.name
														? "text-foreground"
														: "text-muted-foreground",
												)}
											>
												{tab.name}
												{tab.name === currentTabName && (
													<motion.div
														layoutId="tab-code-preview"
														className="bg-muted absolute inset-0 -z-10 rounded-lg"
													/>
												)}
											</button>
										))}
									</div>
								</div>

								<div className="mt-6 flex flex-col items-start px-1 text-sm">
									<div className="absolute top-2 right-4">
										<Button
											variant="ghost"
											size="icon"
											type="button"
											className="absolute size-7 top-2 right-0"
											onClick={() => copyToClipboard(currentTab!.code)}
										>
											{copyState ? (
												<CheckIcon className="size-3" />
											) : (
												<CopyIcon className="size-3" />
											)}
											<span className="sr-only">Copy code</span>
										</Button>
									</div>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.5 }}
										key={currentTabName}
										className="relative flex items-start px-1 text-sm"
									>
										<Highlight
											key={theme.resolvedTheme}
											code={currentTab!.code}
											language={"javascript"}
											theme={{
												...codeTheme,
												plain: {
													backgroundColor: "transparent",
												},
											}}
										>
											{({
												className,
												style,
												tokens,
												getLineProps,
												getTokenProps,
											}) => (
												<>
													<pre
														className={cn(
															className,
															"flex overflow-x-auto pb-6",
														)}
														style={style}
													>
														<code className="px-4">
															{tokens.map((line, lineIndex) => (
																<div
																	key={lineIndex}
																	{...getLineProps({
																		line,
																		className: (
																			currentTab!.highlight ?? []
																		).some((l) => l === lineIndex + 1)
																			? "bg-muted"
																			: "flex flex-row",
																	})}
																>
																	<span
																		aria-hidden="true"
																		className="h-full border-r pr-2 mr-2 border-muted-foreground/10 text-muted-foreground select-none font-mono"
																	>
																		{String(lineIndex + 1).padStart(2, "0")}
																	</span>
																	{line.map((token, tokenIndex) => (
																		<span
																			key={tokenIndex}
																			{...getTokenProps({ token })}
																		/>
																	))}
																</div>
															))}
														</code>
													</pre>
												</>
											)}
										</Highlight>
									</motion.div>
								</div>
							</div>
						</div>
					</motion.div>
				</MotionConfig>
			</AnimatePresence>
		</>
	);
};

export const Hero = () => {
	const [copied, setCopied] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleCopy = () => {
		if (inputRef.current) {
			navigator.clipboard.writeText(inputRef.current.value);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		}
	};

	return (
		<section className="max-h-[70dvh] w-full flex items-center justify-center antialiased relative overflow-hidden px-8 min-h-[70dvh]">
			<div className="overflow-hidden bg-transparent md:px-10 dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem]">
				<div className="lg:max-w-8xl mx-auto grid max-w-full grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-2 lg:grid-cols-2 lg:px-8 lg:py-4 xl:gap-x-16 xl:px-12">
					<div className="relative z-10 md:text-center lg:text-left">
						<div className="relative space-y-4">
							<div className="space-y-2">
								<div className="flex flex-col items-start gap-2">
									<div className="flex items-center gap-1 mt-2">
										<CodeIcon className="size-3.5" />
										<span className="text-xs text-opacity-75">
											Code your paperwork
										</span>
									</div>
								</div>

								<p className="tracking-tight text-2xl md:text-3xl">
									Seamless Electronic Invoicing in Node.js
								</p>
							</div>

							<div className="relative mt-4 flex items-center">
								<Input
									ref={inputRef}
									className="ps-28 pe-9 bg-background"
									type="text"
									defaultValue="npm install node-zugferd"
									readOnly
								/>
								<span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
									<span className="md:text-sm text-xs font-mono select-none">
										<span>
											<span className="text-[#4498c8]">git:</span>
											<span className="text-[#F07178]">(main) </span>
										</span>
										<span className="italic text-amber-600"> x</span>
									</span>
								</span>
								<TooltipProvider delayDuration={0}>
									<Tooltip>
										<TooltipTrigger asChild>
											<button
												onClick={handleCopy}
												className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
												aria-label={copied ? "Copied" : "Copy to clipboard"}
												disabled={copied}
											>
												<div
													className={cn(
														"transition-all",
														copied
															? "scale-100 opacity-100"
															: "scale-0 opacity-0",
													)}
												>
													<CheckIcon
														className="stroke-emerald-500"
														size={16}
														aria-hidden="true"
													/>
												</div>
												<div
													className={cn(
														"absolute transition-all",
														copied
															? "scale-0 opacity-0"
															: "scale-100 opacity-100",
													)}
												>
													<CopyIcon size={16} aria-hidden="true" />
												</div>
											</button>
										</TooltipTrigger>
										<TooltipContent className="px-2 py-1 text-xs">
											Copy to clipboard
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>

							<div className="flex items-center gap-4">
								<Link href="/docs">
									<Button
										effect="expandIcon"
										icon={ArrowRightIcon}
										iconPlacement="right"
									>
										Get Started
									</Button>
								</Link>
								<Link
									href="https://www.npmjs.com/package/node-zugferd"
									target="_blank"
									className="hover:scale-110 transition-transform"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.4em"
										height="1.4em"
										viewBox="0 0 128 128"
									>
										<path
											fill="#cb3837"
											d="M0 7.062C0 3.225 3.225 0 7.062 0h113.88c3.838 0 7.063 3.225 7.063 7.062v113.88c0 3.838-3.225 7.063-7.063 7.063H7.062c-3.837 0-7.062-3.225-7.062-7.063zm23.69 97.518h40.395l.05-58.532h19.494l-.05 58.581h19.543l.05-78.075l-78.075-.1l-.1 78.126z"
										></path>
										<path
											fill="#fff"
											d="M25.105 65.52V26.512H40.96c8.72 0 26.274.034 39.008.075l23.153.075v77.866H83.645v-58.54H64.057v58.54H25.105z"
										></path>
									</svg>
								</Link>
								<Link
									href="https://github.com/jslno/node-zugferd"
									target="_blank"
									className="hover:scale-110 transition-transform"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.4em"
										height="1.4em"
										viewBox="0 0 256 256"
									>
										<g fill="none">
											<rect
												width="256"
												height="256"
												fill="#242938"
												rx="60"
											></rect>
											<path
												fill="#fff"
												d="M128.001 30C72.779 30 28 74.77 28 130.001c0 44.183 28.653 81.667 68.387 94.89c4.997.926 6.832-2.169 6.832-4.81c0-2.385-.093-10.262-.136-18.618c-27.82 6.049-33.69-11.799-33.69-11.799c-4.55-11.559-11.104-14.632-11.104-14.632c-9.073-6.207.684-6.079.684-6.079c10.042.705 15.33 10.305 15.33 10.305c8.919 15.288 23.394 10.868 29.1 8.313c.898-6.464 3.489-10.875 6.349-13.372c-22.211-2.529-45.56-11.104-45.56-49.421c0-10.918 3.906-19.839 10.303-26.842c-1.039-2.519-4.462-12.69.968-26.464c0 0 8.398-2.687 27.508 10.25c7.977-2.215 16.531-3.326 25.03-3.364c8.498.038 17.06 1.149 25.051 3.365c19.087-12.939 27.473-10.25 27.473-10.25c5.443 13.773 2.019 23.945.98 26.463c6.412 7.003 10.292 15.924 10.292 26.842c0 38.409-23.394 46.866-45.662 49.341c3.587 3.104 6.783 9.189 6.783 18.519c0 13.38-.116 24.149-.116 27.443c0 2.661 1.8 5.779 6.869 4.797C199.383 211.64 228 174.169 228 130.001C228 74.771 183.227 30 128.001 30M65.454 172.453c-.22.497-1.002.646-1.714.305c-.726-.326-1.133-1.004-.898-1.502c.215-.512.999-.654 1.722-.311c.727.326 1.141 1.01.89 1.508m4.919 4.389c-.477.443-1.41.237-2.042-.462c-.654-.697-.777-1.629-.293-2.078c.491-.442 1.396-.235 2.051.462c.654.706.782 1.631.284 2.078m3.374 5.616c-.613.426-1.615.027-2.234-.863c-.613-.889-.613-1.955.013-2.383c.621-.427 1.608-.043 2.236.84c.611.904.611 1.971-.015 2.406m5.707 6.504c-.548.604-1.715.442-2.57-.383c-.874-.806-1.118-1.95-.568-2.555c.555-.606 1.729-.435 2.59.383c.868.804 1.133 1.957.548 2.555m7.376 2.195c-.242.784-1.366 1.14-2.499.807c-1.13-.343-1.871-1.26-1.642-2.052c.235-.788 1.364-1.159 2.505-.803c1.13.341 1.871 1.252 1.636 2.048m8.394.932c.028.824-.932 1.508-2.121 1.523c-1.196.027-2.163-.641-2.176-1.452c0-.833.939-1.51 2.134-1.53c1.19-.023 2.163.639 2.163 1.459m8.246-.316c.143.804-.683 1.631-1.864 1.851c-1.161.212-2.236-.285-2.383-1.083c-.144-.825.697-1.651 1.856-1.865c1.183-.205 2.241.279 2.391 1.097"
											></path>
										</g>
									</svg>
								</Link>
							</div>
						</div>
					</div>
					<div className="relative hidden md:block lg:static xl:pl-10">
						<div className="relative w-full">
							<CodePreview />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
