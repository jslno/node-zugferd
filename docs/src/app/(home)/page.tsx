"use client";

import {
	ArrowRightIcon,
	CheckIcon,
	CopyIcon,
	LightbulbIcon,
	StarIcon,
} from "lucide-react";
import { motion, stagger } from "motion/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import useMeasure from "react-use-measure";
import {
	CodeBlockTab,
	CodeBlockTabs,
	CodeBlockTabsList,
	CodeBlockTabsTrigger,
} from "@/components/codeblock";
import { BUN, NPM, Pnpm, Yarn } from "@/components/icons";
import { Silk } from "@/components/silk";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { gitConfig } from "@/lib/shared";
import { HomeBackground } from "./background";
import { CodeBlock } from "./code-block";
import { FeaturesBento } from "./features-bento";

const INSTALL_CODE = `npm install node-zugferd`;

export default function HomePage() {
	return (
		<main className="flex w-full max-w-full flex-1 flex-col justify-center overflow-x-hidden">
			<Hero />
			<FeaturesBento />
			<div className="mx-auto flex w-full max-w-400 flex-col gap-24 px-4 py-24 md:px-6 md:py-32">
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="relative flex flex-col justify-center gap-4 overflow-clip rounded-3xl border bg-muted p-8 dark:bg-muted/50"
				>
					<div className="absolute -z-[1] inset-0 mask-l-from-40% mask-l-to-90% mask-b-from-0% mask-b-to-80%">
						<Silk
							color="#12805f"
							sheenColor="#e3fff4"
							speed={5}
							scale={1}
							rotation={0.35}
							sheen={0.5}
							depth={0.5}
							glow={0.3}
							noiseIntensity={1.5}
							clickRipple={false}
							intro
							ripple={1}
							wave={1}
							variation={7}
							interactionStrength={0.7}
							fade={0}
							lightMode={false}
						/>
					</div>
					<h2 className="font-pixel-square text-4xl font-semibold md:text-5xl">
						Ready to build
						<br />
						your first invoice?
					</h2>
					<p className="max-w-3xl text-lg text-muted-foreground">
						Build electronic invoice workflows without fighting the
						specification. Generate, parse, validate, and customize ZUGFeRD and
						Factur-X documents through a consistent API while node-zugferd
						handles the complexity of XML, profiles, and compliance.
					</p>
					<div className="mt-2 flex items-center gap-2">
						<Button
							size="lg"
							nativeButton={false}
							render={<Link href="/docs" />}
						>
							Get Started
							<ArrowRightIcon data-icon="inline-end" />
						</Button>
						<Button
							size="lg"
							variant="secondary"
							nativeButton={false}
							render={<Link href="/examples" />}
						>
							<LightbulbIcon data-icon="inline-start" />
							Examples
						</Button>
					</div>
				</motion.div>
			</div>
			<div className="mx-auto flex w-full max-w-400 items-center px-4 py-4 md:px-6">
				<span className="font-mono text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} Joél de Olivèira Solano da Silva
				</span>
				<Button
					variant="link"
					size="lg"
					className="ms-auto text-muted-foreground underline"
					render={<Link href="/legal/privacy" />}
					nativeButton={false}
				>
					Privacy
				</Button>
				<Button
					variant="link"
					size="lg"
					className="text-muted-foreground underline"
					render={<Link href="/legal/imprint" />}
					nativeButton={false}
				>
					Imprint
				</Button>
			</div>
		</main>
	);
}

function Hero() {
	const [copyPopoverOpen, setCopyPopoverOpen] = useState(false);
	const { copied, copying, copyToClipboard } = useCopyToClipboard();
	return (
		<div className="relative grid min-h-[calc(100svh-var(--spacing)*14)] place-items-center">
			<div className="absolute inset-0 -z-1 size-full">
				<HomeBackground />
			</div>

			<motion.div
				variants={{
					hidden: {},
					visible: {
						transition: {
							delayChildren: stagger(0.4),
						},
					},
				}}
				initial="hidden"
				animate="visible"
				className="flex w-full max-w-400 flex-col items-center justify-around gap-12 2xl:flex-row"
			>
				<motion.div
					variants={{
						hidden: {},
						visible: {
							transition: {
								delayChildren: stagger(0.3),
							},
						},
					}}
					className="flex w-fit max-w-4xl flex-col items-center gap-12 text-center 2xl:items-start 2xl:text-left"
				>
					<motion.h1
						variants={{
							hidden: {},
							visible: {
								transition: {
									delayChildren: stagger(0.25),
								},
							},
						}}
					>
						{["Built for", "electronic", "invoicing"].map(
							(text, i, { length }) => (
								<Fragment key={text}>
									<motion.span
										variants={{
											hidden: { scale: 0 },
											visible: {
												scale: 1,
												transition: {
													delayChildren: stagger(0.05),
												},
											},
										}}
										className="font-pixel-square text-[4.75rem] leading-tight font-bold tracking-wide"
										transition={{
											delayChildren: stagger(0.025),
										}}
									>
										{text.split("").map((letter, letterIndex) => (
											<motion.span
												key={letterIndex}
												variants={{
													visible: {
														opacity: 1,
														scale: 1.1,
														transition: {
															type: "spring" as const,
															damping: 28,
															stiffness: 400,
														},
													},
													hidden: { opacity: 0, scale: 0 },
												}}
												className="inline-block"
											>
												{letter === " " ? "\u00A0" : letter}
											</motion.span>
										))}
									</motion.span>
									{i < length - 1 && <br />}
								</Fragment>
							),
						)}
					</motion.h1>
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 25 },
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.5,
									ease: [0.4, 0, 0.2, 1],
								},
							},
						}}
						className="flex h-10 w-fit items-center rounded-lg border bg-background font-mono drop-shadow-md"
					>
						<div className="flex items-center">
							<span className="mr-[-0.375rem] ml-3 font-mono text-muted-foreground select-none">
								<span className="font-medium text-teal-600 dark:text-teal-500">
									git:
								</span>
								<span className="font-medium text-rose-500 dark:text-rose-400">
									(main)
								</span>{" "}
								<span className="font-black italic text-amber-500 dark:text-amber-400">
									x
								</span>
							</span>
							<div
								contentEditable
								suppressContentEditableWarning
								onBeforeInput={(e) => e.preventDefault()}
								onPaste={(e) => e.preventDefault()}
								onDrop={(e) => e.preventDefault()}
								onFocus={(e) => {
									const selection = window.getSelection();
									if (!selection) return;

									const range = document.createRange();
									range.selectNodeContents(e.currentTarget);

									selection.removeAllRanges();
									selection.addRange(range);
								}}
								onKeyDown={(e) => {
									if (
										(e.ctrlKey || e.metaKey) &&
										["a", "c"].includes(e.key.toLowerCase())
									) {
										return;
									}
									e.preventDefault();
								}}
								className="outline-none"
							>
								<CodeBlock
									lang="bash"
									keepBackground
									initial={<div className="px-4">{INSTALL_CODE}</div>}
								>
									{INSTALL_CODE}
								</CodeBlock>
							</div>
							<Popover open={copyPopoverOpen} onOpenChange={setCopyPopoverOpen}>
								<TooltipProvider delay={800}>
									<Tooltip>
										<PopoverTrigger
											render={
												<TooltipTrigger
													render={
														<Button
															size="icon"
															variant="ghost"
															aria-label="Copy to clipboard"
															className="mr-1 text-muted-foreground"
														/>
													}
												/>
											}
										>
											{copied ? <CheckIcon /> : <CopyIcon />}
										</PopoverTrigger>
										<TooltipContent>Copy to clipboard</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<PopoverContent
									align="start"
									side="bottom"
									sideOffset={10}
									className="w-fit p-1.5"
								>
									<div className="flex items-center gap-2">
										{[
											{
												icon: NPM,
												id: "npm",
											},
											{
												icon: Pnpm,
												id: "pnpm",
											},
											{
												icon: Yarn,
												iconClassName: "text-[#2C8EBB]",
												id: "yarn",
											},
											{
												icon: BUN,
												id: "bun",
											},
										].map(({ icon: Icon, iconClassName, id }) => (
											<button
												key={id}
												title={id}
												aria-label={id}
												className="flex size-7 items-center justify-center rounded-sm transition-transform ease-in-out hover:scale-115 [&_svg]:size-4"
												disabled={copying}
												onClick={() => {
													copyToClipboard(
														`${id} ${id === "npm" ? "install" : "add"} node-zugferd`,
													);
													setCopyPopoverOpen(false);
												}}
											>
												<Icon className={iconClassName} aria-hidden="true" />
											</button>
										))}
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</motion.div>
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									ease: [0.4, 0, 0.2, 1],
								},
							},
						}}
						className="flex items-center gap-4"
					>
						<Button
							size="lg"
							className="w-fit"
							nativeButton={false}
							render={<Link href="/docs" />}
						>
							Get Started
							<ArrowRightIcon />
						</Button>
						<Button
							size="lg"
							variant="ghost"
							nativeButton={false}
							render={
								<Link
									href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
								/>
							}
						>
							<StarIcon data-icon="inline-start" />
							Star on GitHub
						</Button>
					</motion.div>
				</motion.div>
				<Editor />
			</motion.div>
		</div>
	);
}

const files = {
	"invoicer.ts": `import { zugferd } from "node-zugferd";
import { en16931 } from "@node-zugferd/en-16931";

export const invoicer = zugferd({
  profiles: [en16931],
});`,
	"main.ts": `import { invoicer } from "@/lib/invoicer";

const data: typeof invoicer.$Infer.Input.En16931 = {
  // ... your invoice data
};

const invoice = await invoicer.create("en-16931", data);`,
};

function Editor() {
	const [ref, bounds] = useMeasure();

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 25 },
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.4,
						ease: [0, 0.55, 0.45, 1],
					},
				},
			}}
			className="w-full max-w-2xl overflow-clip rounded-xl border bg-background text-left drop-shadow-2xl"
		>
			<motion.div
				animate={{
					height: bounds.height > 0 ? bounds.height : undefined,
					width: bounds.width > 0 ? bounds.width : undefined,
				}}
				transition={{ ease: [0, 0.55, 0.45, 1] }}
				className="relative overflow-hidden bg-linear-to-br from-background to-accent/40 dark:to-accent/20"
			>
				<div ref={ref}>
					<div className="flex gap-1.5 px-2 pt-2">
						<div className="size-3.5 rounded-full border" />
						<div className="size-3.5 rounded-full border" />
						<div className="size-3.5 rounded-full border" />
					</div>
					<div className="pt-2 pb-4 text-left">
						<CodeBlockTabs
							defaultValue={Object.keys(files)[0]}
							className="m-0! rounded-none border-none bg-transparent"
						>
							<CodeBlockTabsList className="mb-2">
								{Object.keys(files).map((file) => (
									<CodeBlockTabsTrigger key={file} value={file}>
										{file}
									</CodeBlockTabsTrigger>
								))}
							</CodeBlockTabsList>
							{Object.entries(files).map(([file, code]) => (
								<CodeBlockTab key={file} value={file}>
									<CodeBlock lang="ts" keepBackground showLineNumbers>
										{code}
									</CodeBlock>
								</CodeBlockTab>
							))}
						</CodeBlockTabs>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
