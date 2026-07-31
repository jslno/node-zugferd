"use client";

import type { JSX } from "react";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { BundledLanguage } from "shiki";
import { highlight } from "@/lib/highlight";
import { HomeBackground } from "./background";
import {
	CodeBlockTab,
	CodeBlockTabs,
	CodeBlockTabsList,
	CodeBlockTabsTrigger,
} from "@/components/codeblock";
import { Button } from "@/components/ui/button";
import {
	ArrowRightIcon,
	CheckIcon,
	CircleCheckIcon,
	CircleDotIcon,
	CircleXIcon,
	CopyIcon,
	LightbulbIcon,
	Loader2Icon,
	StarIcon,
	XIcon,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { BUN, NPM, Pnpm, Yarn } from "@/components/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
	animate,
	motion,
	stagger,
	useMotionValue,
	useTransform,
} from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CodeBlock = ({
	children,
	lang,
	initial,
	keepBackground = false,
	showLineNumbers = false,
	highlightedLineNumbers = [],
	className,
}: {
	children: string;
	lang: BundledLanguage;
	initial?: JSX.Element | undefined;
	keepBackground?: boolean | undefined;
	showLineNumbers?: boolean | undefined;
	highlightedLineNumbers?: number[] | undefined;
	className?: string | undefined;
}) => {
	const [nodes, setNodes] = useState(initial);

	useLayoutEffect(() => {
		void highlight(children, lang, {
			transformers: showLineNumbers
				? [
						{
							pre(node) {
								node.properties["data-line-numbers"] = true;
							},
							line(node, line) {
								node.properties["data-line"] = line;
								if (highlightedLineNumbers.includes(line)) {
									this.addClassToHast(node, "highlighted");
								}
							},
						},
					]
				: undefined,
			meta: { className },
			rootStyle: keepBackground
				? "--shiki-dark-bg: transparent;--shiki-bg: transparent;"
				: undefined,
		}).then(setNodes);
	}, [children, lang, keepBackground]);

	return nodes ?? "Loading...";
};

const INSTALL_CODE = `npm install node-zugferd`;

export default function HomePage() {
	return (
		<div className="flex flex-col justify-center gap-32 flex-1">
			<Hero />
			<div className="min-h-screen flex flex-col gap-24 w-full max-w-400 mx-auto">
				<div className="flex flex-col gap-4 justify-center">
					<p className="font-bold italic text-teal-700">FEATURES</p>
					<h2 className="text-6xl font-semibold font-pixel-square">
						Everything you need
						<br />
						for electronic invoicing
					</h2>
					<p className="text-xl text-muted-foreground">
						Generate, validate, and parse ZUGFeRD/Factur-X documents with a
						single developer-friendly API.
					</p>
				</div>

				<div className="pb-12 grid grid-cols-8 gap-8">
					{[
						{
							label: "Generate",
							description:
								"Create ZUGFeRD/Factur-X compliant electronic invoices from structured data with a simple, developer-friendly API.",
							className: "col-span-5 row-span-2",
							Visual: () => {
								return (
									<div className="flex-1 m-12 flex items-center justify-around">
										<div className="flex-1 border bg-background flex flex-col rounded-md w-fit">
											<div className="p-2 border-b text-xs text-muted-foreground font-mono">
												invoice.ts
											</div>
											<div className="px-3 py-2">
												<CodeBlock
													lang="ts"
													keepBackground
													className="text-sm"
												>{`invoicer.create("en-16931", {
  exchangedDocument: {
    invoiceNumber: "471102",
    invoiceTypeCode: "380",
    invoiceIssueDate: new Date(Date.now()),
  },
  transaction: {
    // ...
  },
});`}</CodeBlock>
											</div>
										</div>
										<div className="flex-1 flex items-center">
											<div className="w-full border-b border-dashed" />
											<div className="font-mono text-xs text-muted-foreground py-1 px-1.5 rounded-sm border border-dashed">
												.toPDF()
											</div>
											<div className="w-full border-b border-dashed" />
										</div>
										<div className="flex-1 border bg-background flex flex-col rounded-md w-fit aspect-[1/1.414]">
											<div className="p-2 border-b text-xs text-muted-foreground font-mono">
												invoice.pdf
											</div>
											<div></div>
										</div>
									</div>
								);
							},
						},
						{
							label: "Validate",
							description:
								"Verify invoices against the ZUGFeRD specification to catch structural and compliance issues before delivery.",
							className: "order-3 col-span-4",
							Visual: () => {
								return (
									<div className="flex-1 flex items-center justify-center m-4">
										<div className="border bg-background rounded-md max-w-sm">
											<div className="p-2 border-b flex items-center gap-2 text-sm">
												<div className="size-4 grid place-items-center">
													<div className="size-1.5 rounded-full bg-[#eab308]" />
												</div>
												<span>EN16931</span>
												{/*<span className="ms-auto mr-1 flex items-center gap-1 text-muted-foreground">
													<Loader2Icon className="size-3.5 animate-spin" />
													Pending
												</span>*/}
												{/*<span className="ms-auto mr-1 flex items-center gap-1 text-emerald-400">
													<CheckIcon className="size-3.5" />
													Passed
												</span>*/}
												<span className="ms-auto mr-1 flex items-center gap-1 text-red-400">
													<XIcon className="size-3.5" />
													Failed
												</span>
											</div>
											<ul className="p-2 flex flex-col gap-2">
												<li className="text-xs flex items-center gap-2 [&_svg]:size-3.5">
													<CircleCheckIcon className="text-emerald-500" />
													<span className="text-muted-foreground text-nowrap">
														BR-1:
													</span>{" "}
													<span className="truncate">
														An Invoice shall have a Specification identifier
														(BT-24).
													</span>
												</li>
												<li className="text-xs flex items-center gap-2 [&_svg]:size-3.5">
													<CircleCheckIcon className="text-emerald-500" />
													<span className="text-muted-foreground text-nowrap">
														BR-2:
													</span>{" "}
													<span className="truncate">
														An Invoice shall have an Invoice number (BT-1).
													</span>
												</li>
												<li className="text-xs flex items-center gap-2 [&_svg]:size-3.5">
													<Loader2Icon className="text-amber-500 animate-spin" />
													<span className="text-muted-foreground text-nowrap">
														BR-3:
													</span>{" "}
													<span className="truncate">
														An Invoice shall have an Invoice issue date (BT-2).
													</span>
												</li>
												<li className="text-xs flex items-center gap-2 [&_svg]:size-3.5">
													<CircleXIcon className="text-red-400" />
													<span className="text-muted-foreground text-nowrap">
														BR-4:
													</span>{" "}
													<span className="truncate">
														An Invoice shall have an Invoice type code (BT-3).
													</span>
												</li>
												<li className="text-xs flex items-center gap-2 [&_svg]:size-3.5">
													<CircleDotIcon className="text-muted-foreground" />
													<span className="text-muted-foreground text-nowrap">
														BR-5:
													</span>{" "}
													<span className="truncate">
														An Invoice shall have an Invoice currency code
														(BT-5).
													</span>
												</li>
											</ul>
										</div>
									</div>
								);
							},
						},
						{
							label: "Parse",
							description:
								"Extract invoice data from existing ZUGFeRD/Factur-X documents into structured data for processing and automation.",
							className: "order-4 col-span-4",
							Visual: () => {
								return (
									<div className="flex-1 m-8 flex items-center justify-around">
										<div className="flex-1 border bg-background flex flex-col rounded-md w-fit aspect-[1/1.414]">
											<div className="p-2 border-b text-xs text-muted-foreground font-mono">
												invoice.pdf
											</div>
											<div></div>
										</div>
										<div className="flex-1 flex items-center">
											<div className="w-full border-b border-dashed" />
											<div className="font-mono text-xs text-muted-foreground py-1 px-1.5 rounded-sm border border-dashed">
												.parse()
											</div>
											<div className="w-full border-b border-dashed" />
										</div>
										<div className="flex-1 border bg-background flex flex-col rounded-md w-fit">
											<div className="p-2 border-b text-xs text-muted-foreground font-mono">
												invoice.ts
											</div>
											<div className="py-2 px-3">
												<CodeBlock
													lang="ts"
													keepBackground
													className="text-sm"
												>{`{
  exchangedDocument: {
    invoiceNumber: "471102",
    invoiceTypeCode: "380",
    invoiceIssueDate: new Date(
      "${new Date(Date.now()).toISOString().split("T")[0]}",
    ),
  },
  transaction: {
    // ...
  },
}`}</CodeBlock>
											</div>
										</div>
									</div>
								);
							},
						},
						{
							label: "Templates",
							description:
								"Build invoices faster with reusable templates for layouts, branding, and recurring invoice structures.",
							className: "col-span-3",
							Visual: () => {
								const Template = ({
									className,
								}: {
									className?: string | undefined;
								}) => (
									<div
										className={cn(
											"p-3 flex flex-col gap-2 border bg-background rounded-md aspect-[1/1.414]",
											className,
										)}
									>
										<div className="flex flex-col items-start gap-0.5">
											<div className="w-2/5 min-h-1 bg-muted rounded-xs" />
											<div className="w-2/6 min-h-1 bg-muted rounded-xs" />
											<div className="w-2/7 min-h-1 bg-muted rounded-xs" />
										</div>
										<div className="flex flex-col items-end gap-0.5">
											<div className="w-2/6 min-h-1 bg-muted rounded-xs" />
											<div className="w-2/7 min-h-1 bg-muted rounded-xs" />
											<div className="w-2/5 min-h-1 bg-muted rounded-xs" />
										</div>
										<div className="w-2/3 mt-2.5 min-h-1.5 bg-muted rounded-xs" />
										<div className="flex flex-col gap-0.5">
											{Array.from({ length: 5 }).map((_, index) => (
												<div className="flex gap-0.5" key={index}>
													<div className="min-h-1 bg-muted rounded-xs flex-1" />
													<div className="min-h-1 bg-muted rounded-xs w-1/3" />
													<div className="min-h-1 bg-muted rounded-xs w-1/4" />
												</div>
											))}
										</div>
										<div className="ms-auto w-1/3 min-h-1 bg-muted rounded-xs" />
										<div className="mt-auto flex gap-1">
											<div className="size-4 bg-muted rounded-xs" />
											<div className="flex-1 flex flex-col justify-center gap-0.5">
												<div className="min-h-1 bg-muted rounded-xs w-2/5" />
												<div className="min-h-1 bg-muted rounded-xs w-1/4" />
												<div className="min-h-1 bg-muted rounded-xs w-1/3" />
											</div>
										</div>
									</div>
								);
								Template.displayName = "Template";

								return (
									<div className="flex items-center justify-center m-4">
										<Template className="h-40 mask-r-from-20% opacity-80 translate-x-1/4" />
										<Template className="h-46 z-2" />
										<Template className="h-40 mask-l-from-20% opacity-80 -translate-x-1/4" />
									</div>
								);
							},
						},
						{
							label: "CLI",
							description:
								"Build invoices faster with reusable templates for layouts, branding, and recurring invoice structures.",
							className: "col-span-3",
							Visual: () => {
								const index = useMotionValue(0);
								const cmds = ["init", "parse"];

								const baseText = useTransform(
									index,
									(latest) => cmds[latest] || "",
								);
								const count = useMotionValue(0);
								const rounded = useTransform(count, (latest) =>
									Math.round(latest),
								);
								const displayText = useTransform(rounded, (latest) =>
									baseText.get().slice(0, latest),
								);
								const updatedThisRound = useMotionValue(true);

								useEffect(() => {
									const controls = animate(count, 60, {
										type: "tween",
										duration: 2,
										ease: "easeIn",
										repeat: Number.POSITIVE_INFINITY,
										repeatType: "reverse",
										repeatDelay: 1,
										onUpdate: (latest) => {
											if (updatedThisRound.get() === true && latest > 0) {
												updatedThisRound.set(false);
											} else if (
												updatedThisRound.get() === false &&
												latest === 0
											) {
												if (index.get() === cmds.length - 1) {
													index.set(0);
												} else {
													index.set(index.get() + 1);
												}
												updatedThisRound.set(true);
											}
										},
									});
									return controls.stop;
								}, []);

								return (
									<div className="border m-4 bg-background rounded-md">
										<div className="p-2 border-b">
											<div className="flex items-center gap-1.5">
												<div className="size-3 rounded-full border" />
												<div className="size-3 rounded-full border" />
												<div className="size-3 rounded-full border" />
											</div>
										</div>
										<div className="font-mono text-xs p-4">
											<div className="flex items-center">
												<div>
													<span className="font-medium text-teal-600 dark:text-teal-500">
														git:
													</span>
													<span className="font-medium text-rose-500 dark:text-rose-400">
														(main)
													</span>{" "}
													<span className="italic font-black text-amber-500 dark:text-amber-400">
														x
													</span>{" "}
													<span className="text-[#59873A]">npx</span>{" "}
													<span className="text-[#B56959]">
														@node-zugferd/cli
													</span>
													<motion.span className="ml-[1ch] text-[#B56959]">
														{displayText}
													</motion.span>
												</div>
												<div className="h-lh w-px bg-amber-500 dark:bg-amber-400" />
											</div>
										</div>
									</div>
								);
							},
						},
					].map(({ label, description, className, Visual }, i) => (
						<div
							key={i}
							className={cn(
								"bg-muted dark:bg-muted/50 p-2 rounded-lg border",
								"col-span-2 flex flex-col gap-4",
								className,
							)}
						>
							<div className="bg-muted flex-1 rounded-sm px-3 py-1.5 relative flex flex-col">
								<Visual />
							</div>
							<div className="px-2 pb-2">
								<span className="font-mono text-sm text-muted-foreground">
									{`${i + 1}`.padStart(2, "0")}.
								</span>
								<p className="text-lg font-semibold">{label}</p>
								<p className="text-muted-foreground">{description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex flex-col py-12 gap-24 w-full max-w-400 mx-auto">
				<div className="bg-muted dark:bg-muted/50 p-8 rounded-3xl flex flex-col gap-4 justify-center">
					<p className="font-bold italic text-teal-700">GET STARTED</p>
					<h2 className="text-5xl font-semibold font-pixel-square">
						Ready to build
						<br />
						your first invoice?
					</h2>
					<p className="text-lg text-muted-foreground">
						Build electronic invoice workflows without fighting the
						specification. Generate, parse, validate, and customize ZUGFeRD and
						Factur-X documents through a consistent API while node-zugferd
						handles the complexity of XML, profiles, and compliance.
					</p>
					<div className="flex items-center gap-2 mt-2">
						<Button size="lg">
							Get Started
							<ArrowRightIcon data-icon="inline-end" />
						</Button>
						<Button size="lg" variant="secondary">
							<LightbulbIcon data-icon="inline-start" />
							Examples
						</Button>
					</div>
				</div>
			</div>
			<div className="w-full py-4 max-w-400 mx-auto flex items-center">
				<span className="text-muted-foreground font-mono text-sm">
					&copy; {new Date(Date.now()).getFullYear()} Joél de Olivèira Solano da
					Silva
				</span>
				<Link href="/legal" className="ms-auto text-muted-foreground">
					Legal
				</Link>
			</div>
		</div>
	);
}

function Hero() {
	const [copyPopoverOpen, setCopyPopoverOpen] = useState(false);
	const { copied, copying, copyToClipboard } = useCopyToClipboard();
	return (
		<div className="h-[calc(100svh-var(--spacing)*14)] relative grid place-items-center">
			<div className="size-full absolute inset-0 -z-1">
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
				className="flex flex-row items-center justify-around w-full max-w-400"
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
					className="text-left max-w-4xl w-fit flex flex-col items-start gap-12"
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
										className="text-[4.75rem] tracking-wide leading-tight font-bold font-pixel-square"
										transition={{
											delayChildren: stagger(0.025),
										}}
									>
										{text.split("").map((letter, i) => (
											<motion.span
												key={i}
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
						className="h-10 drop-shadow-md bg-background w-fit flex items-center font-mono rounded-lg border"
					>
						<div className="flex items-center">
							<span className="pl-3 -mr-1.5 font-mono text-muted-foreground select-none">
								<span className="font-medium text-teal-600 dark:text-teal-500">
									git:
								</span>
								<span className="font-medium text-rose-500 dark:text-rose-400">
									(main)
								</span>{" "}
								<span className="italic font-black text-amber-500 dark:text-amber-400">
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
												className="flex items-center justify-center size-7 rounded-sm transition-transform ease-in-out hover:scale-115 [&_svg]:size-4"
												disabled={copying}
												onClick={() => {
													copyToClipboard(
														`${id} ${id === "npm" ? "install" : "add"} node-zugferd`,
														{
															onError(err, text) {
																// TODO: Error toast
															},
														},
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
						<Button size="lg" className="w-fit">
							Get Started
							<ArrowRightIcon />
						</Button>
						<Button size="lg" variant="ghost">
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
			className="drop-shadow-2xl bg-background overflow-clip w-full max-w-2xl border rounded-xl text-left"
		>
			<motion.div
				animate={{
					height: bounds.height > 0 ? bounds.height : undefined,
					width: bounds.width > 0 ? bounds.width : undefined,
				}}
				transition={{ ease: [0, 0.55, 0.45, 1] }}
				className="overflow-hidden relative bg-linear-to-br from-background to-accent/40 dark:to-accent/20"
			>
				<div ref={ref}>
					<div className="px-2 pt-2 flex gap-1.5">
						<div className="size-3.5 border rounded-full" />
						<div className="size-3.5 border rounded-full" />
						<div className="size-3.5 border rounded-full" />
					</div>
					<div className="pt-2 pb-4 text-left">
						<CodeBlockTabs
							defaultValue={Object.keys(files)[0]}
							className="bg-transparent rounded-none border-none m-0!"
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
