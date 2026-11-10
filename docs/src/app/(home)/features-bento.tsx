"use client";

import {
	CircleCheckIcon,
	CircleDotIcon,
	CircleSlashIcon,
	CircleXIcon,
	Loader2Icon,
	XIcon,
} from "lucide-react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

const liftedPanel =
	"border bg-card shadow-[0_1px_1px_rgba(0,0,0,0.06),0_16px_32px_-18px_rgba(0,0,0,0.4)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_18px_36px_-18px_rgba(0,0,0,0.9)]";

const scaleOnHover =
	"transition-transform duration-300 ease-out group-hover:scale-[1.02]";

const revealItem = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.55,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	},
};

const DEMO_ISSUE_DATE = new Date(Date.now()).toISOString().split("T")[0];
const [issueYear, issueMonth, issueDay] = DEMO_ISSUE_DATE.split("-");
const ISSUE_DATE = `${issueDay}.${issueMonth}.${issueYear}`;

function InvoicePreview() {
	return (
		<div
			className={cn(
				"flex aspect-[1/1.414] w-full min-w-0 max-w-48 flex-1 flex-col overflow-hidden rounded-md",
				liftedPanel,
				scaleOnHover,
			)}
		>
			<div className="border-b p-2 font-mono text-xs text-muted-foreground">
				invoice.pdf
			</div>
			<InvoiceDocument variant="classic" />
		</div>
	);
}

function FlowLabel({ label }: { label: string }) {
	const id = useId().replaceAll(":", "");

	return (
		<div className="relative rounded-sm px-1.5 py-1 font-mono text-xs text-muted-foreground">
			<svg
				aria-hidden
				className="pointer-events-none absolute inset-0 size-full overflow-visible"
			>
				<defs>
					<clipPath id={`${id}-top`} clipPathUnits="objectBoundingBox">
						<rect x="-0.05" y="-0.2" width="1.1" height="0.7" />
					</clipPath>
					<clipPath id={`${id}-bottom`} clipPathUnits="objectBoundingBox">
						<rect x="-0.05" y="0.5" width="1.1" height="0.7" />
					</clipPath>
				</defs>
				<rect
					x="0"
					y="0"
					width="100%"
					height="100%"
					rx="6"
					fill="none"
					stroke="var(--border)"
					strokeDasharray="3 5"
					strokeWidth="1"
					clipPath={`url(#${id}-top)`}
					className="animate-dash-border"
				/>
				<rect
					x="0"
					y="0"
					width="100%"
					height="100%"
					rx="6"
					fill="none"
					stroke="var(--border)"
					strokeDasharray="3 5"
					strokeWidth="1"
					clipPath={`url(#${id}-bottom)`}
					className="animate-dash-border-reverse"
				/>
			</svg>
			{label}
		</div>
	);
}

function GenerateVisual() {
	return (
		<div className="m-2 flex flex-1 items-center justify-center @md:m-6 @md:justify-around @lg:m-8 @2xl:m-12">
			<div
				className={cn(
					"flex min-w-0 flex-1 flex-col overflow-hidden rounded-md @md:flex-[1.5] @lg:flex-[2]",
					liftedPanel,
					scaleOnHover,
				)}
			>
				<div className="border-b p-2 font-mono text-xs text-muted-foreground">
					invoice.ts
				</div>
				<div className="min-w-0 px-2 py-1.5 @md:px-3 @md:py-2">
					<CodeBlock
						lang="ts"
						keepBackground
						className="text-[10px] @md:text-xs @xl:text-sm"
					>
						{`invoicer.create("en-16931", {
  exchangedDocument: {
    invoiceNumber: "471102",
    invoiceTypeCode: "380",
    invoiceIssueDate: new Date(),
  },
  transaction: {
    // ...
  },
});`}
					</CodeBlock>
				</div>
			</div>
			<div className="hidden flex-1 items-center @md:flex">
				<div className="h-px w-full animate-dash-flow" />
				<FlowLabel label=".toPDF()" />
				<div className="h-px w-full animate-dash-flow" />
			</div>
			<div className="hidden flex-1 justify-center @md:flex">
				<InvoicePreview />
			</div>
		</div>
	);
}

type ValidationStatus =
	| "pending"
	| "running"
	| "success"
	| "failed"
	| "skipped";

const VALIDATIONS = [
	{
		rule: "BR-1",
		description: "An Invoice shall have a Specification identifier (BT-24).",
	},
	{
		rule: "BR-2",
		description: "An Invoice shall have an Invoice number (BT-1).",
	},
	{
		rule: "BR-3",
		description: "An Invoice shall have an Invoice issue date (BT-2).",
	},
	{
		rule: "BR-4",
		description: "An Invoice shall have an Invoice type code (BT-3).",
	},
	{
		rule: "BR-5",
		description: "An Invoice shall have an Invoice currency code (BT-5).",
	},
] as const;

const RUNS: { failAt?: number; delays: number[] }[] = [
	{ delays: [700, 1150, 900, 1350, 1500] },
	{ failAt: 3, delays: [650, 950, 1250, 1650, 2000] },
];

function ValidationIcon({ status }: { status: ValidationStatus }) {
	switch (status) {
		case "success":
			return <CircleCheckIcon className="text-emerald-500" />;
		case "failed":
			return <CircleXIcon className="text-red-400" />;
		case "skipped":
			return <CircleSlashIcon className="text-muted-foreground/60" />;
		case "running":
			return <Loader2Icon className="animate-spin text-amber-500" />;
		default:
			return <CircleDotIcon className="text-muted-foreground" />;
	}
}

function ValidateVisual() {
	const [run, setRun] = useState(0);
	const [statuses, setStatuses] = useState<ValidationStatus[]>(() =>
		VALIDATIONS.map(() => "running"),
	);

	useEffect(() => {
		const timeouts: ReturnType<typeof setTimeout>[] = [];

		const schedule = (fn: () => void, delay: number) => {
			timeouts.push(setTimeout(fn, delay));
		};

		setStatuses(VALIDATIONS.map(() => "running"));

		const { failAt, delays } = RUNS[run];

		delays.forEach((delay, index) => {
			schedule(() => {
				setStatuses((current) => {
					if (current[index] !== "running") return current;

					const next = [...current];

					if (index === failAt) {
						next[index] = "failed";

						for (let i = index + 1; i < next.length; i++) {
							if (next[i] === "running") next[i] = "skipped";
						}
					} else {
						next[index] = "success";
					}

					return next;
				});
			}, delay);
		});

		schedule(() => setRun((current) => (current + 1) % RUNS.length), 3200);

		return () => {
			for (const timeout of timeouts) clearTimeout(timeout);
		};
	}, [run]);

	const failed = statuses.includes("failed");
	const passed = !failed && statuses.every((status) => status === "success");

	return (
		<div className="m-3 flex flex-1 items-center justify-center @md:m-4">
			<div
				className={cn(
					"w-full min-w-0 max-w-sm rounded-md",
					liftedPanel,
					scaleOnHover,
				)}
			>
				<div className="flex items-center gap-2 border-b p-2 text-sm">
					<div className="grid size-4 place-items-center">
						<div
							className={cn(
								"size-1.5 rounded-full",
								failed
									? "bg-red-400"
									: passed
										? "bg-emerald-500"
										: "bg-[#eab308]",
							)}
						/>
					</div>
					<span>EN16931</span>
					<span
						className={cn(
							"ms-auto mr-1 flex items-center gap-1",
							failed
								? "text-red-400"
								: passed
									? "text-emerald-500"
									: "text-muted-foreground",
						)}
					>
						{failed ? (
							<XIcon className="size-3.5" />
						) : passed ? (
							<CircleCheckIcon className="size-3.5" />
						) : (
							<Loader2Icon className="size-3.5 animate-spin text-amber-500" />
						)}
						{failed ? "Failed" : passed ? "Passed" : "Validating"}
					</span>
				</div>
				<ul className="flex flex-col gap-2 p-2">
					{VALIDATIONS.map(({ rule, description }, i) => (
						<li
							key={rule}
							className={cn(
								"flex items-center gap-2 text-xs transition-opacity [&_svg]:size-3.5",
								statuses[i] === "skipped" && "opacity-50",
							)}
						>
							<ValidationIcon status={statuses[i]} />
							<span className="text-nowrap text-muted-foreground">{rule}:</span>{" "}
							<span className="truncate">{description}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

function ParseVisual() {
	return (
		<div className="m-3 flex flex-1 items-center justify-center @md:m-4 @md:justify-around @lg:m-8">
			<div className="flex min-w-0 flex-1 justify-center">
				<InvoicePreview />
			</div>
			<div className="hidden flex-1 items-center @md:flex">
				<div className="h-px w-full animate-dash-flow" />
				<FlowLabel label=".parse()" />
				<div className="h-px w-full animate-dash-flow" />
			</div>
			<div
				className={cn(
					"hidden min-w-0 flex-1 flex-col overflow-hidden rounded-md @md:flex @md:flex-[1.5] @lg:flex-[2]",
					liftedPanel,
					scaleOnHover,
				)}
			>
				<div className="border-b p-2 font-mono text-xs text-muted-foreground">
					invoice.ts
				</div>
				<div className="min-w-0 px-2 py-1.5 @md:px-3 @md:py-2">
					<CodeBlock
						lang="ts"
						keepBackground
						className="text-[10px] @md:text-xs @xl:text-sm"
					>
						{`{
  exchangedDocument: {
    invoiceNumber: "471102",
    invoiceTypeCode: "380",
    invoiceIssueDate: {
		format: "102",
		value: new Date(
			"${DEMO_ISSUE_DATE}",
		),
	},
  },
  transaction: {
    // ...
  },
}`}
					</CodeBlock>
				</div>
			</div>
		</div>
	);
}

function InvoiceLines({
	lines,
	totals,
	boxed = false,
}: {
	lines: { label: string; amount: string }[];
	totals: { label: string; amount: string }[];
	boxed?: boolean;
}) {
	return (
		<>
			<div className="flex min-h-0 flex-col overflow-hidden">
				{lines.map((line) => (
					<div
						key={line.label}
						className="flex items-baseline justify-between gap-[0.7em] border-b border-border py-[0.38em] text-[0.74em]"
					>
						<span className="truncate">{line.label}</span>
						<span className="shrink-0 font-mono text-muted-foreground tabular-nums">
							{line.amount}
						</span>
					</div>
				))}
			</div>
			<div
				className={cn(
					"mt-auto flex shrink-0 flex-col gap-[0.28em]",
					boxed && "rounded-[0.35em] bg-muted px-[0.55em] py-[0.45em]",
				)}
			>
				{totals.map((row, index) => {
					const due = index === totals.length - 1;
					return (
						<div
							key={row.label}
							className={cn(
								"flex items-baseline justify-between gap-[0.7em]",
								due
									? "text-[0.84em] font-medium"
									: "text-[0.68em] text-muted-foreground",
								due &&
									totals.length > 1 &&
									"mt-[0.15em] border-t border-border pt-[0.38em]",
							)}
						>
							<span>{row.label}</span>
							<span
								className={cn(
									"font-mono tabular-nums",
									due && "text-foreground",
								)}
							>
								{row.amount}
								{due && (
									<span className="ms-[0.35em] font-sans text-[0.78em] font-normal text-muted-foreground">
										EUR
									</span>
								)}
							</span>
						</div>
					);
				})}
			</div>
		</>
	);
}

function InvoiceDocument({
	variant,
}: {
	variant: "classic" | "band" | "rail";
}) {
	return (
		<div aria-hidden className="@container h-full min-h-0 w-full flex-1">
			<div className="flex h-full min-h-0 flex-col overflow-hidden text-[6.6cqw] leading-tight text-foreground select-none">
				{variant === "classic" && (
					<div className="h-[0.22em] shrink-0 bg-teal-700 dark:bg-teal-500" />
				)}
				{variant === "band" && (
					<div className="flex shrink-0 items-end justify-between gap-[0.8em] bg-foreground px-[1.05em] py-[0.8em] text-background">
						<p className="font-medium tracking-tight text-[1.12em]">
							Nordlicht
						</p>
						<div className="text-right">
							<p className="text-[0.62em] text-background/65">Invoice</p>
							<p className="font-mono font-medium text-[1.05em] tabular-nums">
								1844
							</p>
						</div>
					</div>
				)}
				<div
					className={cn(
						"flex min-h-0 flex-1",
						variant === "rail" && "flex-row",
					)}
				>
					{variant === "rail" && (
						<div className="w-[0.38em] shrink-0 bg-teal-700 dark:bg-teal-500" />
					)}
					<div
						className={cn(
							"flex min-h-0 min-w-0 flex-1 flex-col gap-[0.8em] p-[1.05em]",
							variant === "rail" && "ps-[0.85em]",
						)}
					>
						{variant === "classic" && (
							<div className="flex items-start justify-between gap-[0.7em]">
								<div className="min-w-0">
									<p className="truncate font-medium text-[1.02em]">
										Lieferant GmbH
									</p>
									<p className="mt-[0.18em] truncate text-[0.64em] text-muted-foreground">
										Musterweg 1, Berlin
									</p>
									<p className="mt-[0.7em] text-[0.6em] text-muted-foreground">
										Bill to
									</p>
									<p className="mt-[0.12em] truncate text-[0.78em]">
										Kunden AG
									</p>
								</div>
								<div className="shrink-0 text-right">
									<p className="text-[0.6em] text-muted-foreground">Invoice</p>
									<p className="font-mono font-medium text-[1.12em] tabular-nums">
										471102
									</p>
									<p className="mt-[0.12em] font-mono text-[0.62em] text-muted-foreground tabular-nums">
										{ISSUE_DATE}
									</p>
								</div>
							</div>
						)}
						{variant === "rail" && (
							<div className="flex items-start justify-between gap-[0.55em]">
								<div className="flex min-w-0 items-center gap-[0.45em]">
									<div className="grid size-[1.65em] shrink-0 place-items-center rounded-[0.28em] bg-foreground font-medium text-[0.78em] text-background">
										A
									</div>
									<div className="min-w-0">
										<p className="truncate font-medium text-[1em]">Atelier</p>
										<p className="truncate text-[0.62em] text-muted-foreground">
											Berlin
										</p>
									</div>
								</div>
								<div className="shrink-0 text-right">
									<p className="font-mono font-medium text-[0.95em] tabular-nums">
										902
									</p>
									<p className="font-mono text-[0.6em] text-muted-foreground tabular-nums">
										{ISSUE_DATE}
									</p>
								</div>
							</div>
						)}
						{variant === "band" && (
							<p className="truncate text-[0.7em] text-muted-foreground">
								Hafen GmbH
							</p>
						)}
						{variant === "classic" && (
							<InvoiceLines
								lines={[
									{ label: "Consulting", amount: "1,000.00" },
									{ label: "License", amount: "200.00" },
								]}
								totals={[
									{ label: "Net", amount: "1,200.00" },
									{ label: "VAT 19%", amount: "228.00" },
									{ label: "Due", amount: "1,428.00" },
								]}
							/>
						)}
						{variant === "band" && (
							<InvoiceLines
								lines={[
									{ label: "Workshop", amount: "860.00" },
									{ label: "Print", amount: "140.00" },
								]}
								totals={[{ label: "Due", amount: "1,190.00" }]}
							/>
						)}
						{variant === "rail" && (
							<InvoiceLines
								boxed
								lines={[
									{ label: "Retainer", amount: "640.00" },
									{ label: "Revisions", amount: "180.00" },
								]}
								totals={[{ label: "Due", amount: "975.80" }]}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

function Template({
	className,
	variant,
}: {
	className?: string;
	variant: "classic" | "band" | "rail";
}) {
	return (
		<div
			className={cn(
				"aspect-[1/1.414] overflow-hidden rounded-md border bg-background",
				className,
			)}
		>
			<InvoiceDocument variant={variant} />
		</div>
	);
}

function TemplatesVisual() {
	return (
		<div
			className={cn(
				"m-3 flex items-center justify-center @md:m-4",
				scaleOnHover,
			)}
		>
			<Template
				variant="rail"
				className="h-32 translate-x-1/3 opacity-80 mask-r-from-20% @md:h-40"
			/>
			<Template
				variant="classic"
				className="z-2 h-36 shadow-[0_1px_1px_rgba(0,0,0,0.06),0_18px_36px_-16px_rgba(0,0,0,0.45)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_22px_40px_-18px_rgba(0,0,0,0.9)] @md:h-46"
			/>
			<Template
				variant="band"
				className="h-32 -translate-x-1/3 opacity-80 mask-l-from-20% @md:h-40"
			/>
		</div>
	);
}

function CliVisual() {
	const index = useMotionValue(0);
	const cmds = ["init", "parse", "validate"];
	const baseText = useTransform(index, (latest) => cmds[latest] || "");
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
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
				} else if (updatedThisRound.get() === false && latest === 0) {
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
	}, [count, index, updatedThisRound]);

	return (
		<div className={cn("m-3 rounded-md @md:m-4", liftedPanel, scaleOnHover)}>
			<div className="border-b p-2">
				<div className="flex items-center gap-1.5">
					<div className="size-3 rounded-full border" />
					<div className="size-3 rounded-full border" />
					<div className="size-3 rounded-full border" />
				</div>
			</div>
			<div className="min-w-0 p-3 font-mono text-[10px] @md:p-4 @md:text-xs">
				<div className="flex min-w-0 items-center">
					<div className="min-w-0 truncate">
						<span className="hidden @md:inline">
							<span className="font-medium text-teal-600 dark:text-teal-500">
								git:
							</span>
							<span className="font-medium text-rose-500 dark:text-rose-400">
								(main)
							</span>{" "}
							<span className="font-black italic text-amber-500 dark:text-amber-400">
								x
							</span>{" "}
						</span>
						<span className="text-[#59873A]">npx</span>{" "}
						<span className="text-[#B56959]">@node-zugferd/cli</span>
						<motion.span className="ml-[1ch] text-[#B56959]">
							{displayText}
						</motion.span>
					</div>
					<div className="h-lh w-px shrink-0 bg-amber-500 dark:bg-amber-400" />
				</div>
			</div>
		</div>
	);
}

const FEATURES = [
	{
		label: "Generate",
		description:
			"Create ZUGFeRD/Factur-X compliant electronic invoices from structured data with a simple, developer-friendly API.",
		href: "/docs/installation",
		className: "sm:col-span-2 lg:col-span-5 lg:row-span-2",
		Visual: GenerateVisual,
	},
	{
		label: "Validate",
		href: "/docs/plugins/validators/mustang",
		description:
			"Verify invoices against the ZUGFeRD specification to catch structural and compliance issues before delivery.",
		className: "lg:order-3 lg:col-span-4",
		Visual: ValidateVisual,
	},
	{
		label: "Parse",
		href: "/docs/plugins/parser",
		description:
			"Extract invoice data from existing ZUGFeRD/Factur-X documents into structured data for processing and automation.",
		className: "lg:order-4 lg:col-span-4",
		Visual: ParseVisual,
	},
	{
		label: "Templates",
		href: "/docs/plugins/templates",
		description:
			"Build invoices faster with reusable templates for layouts, branding, and recurring invoice structures.",
		className: "lg:col-span-3",
		Visual: TemplatesVisual,
	},
	{
		label: "CLI",
		href: "/docs/reference/cli",
		description:
			"Scaffold projects, parse documents, and validate invoices from the terminal with a single package.",
		className: "lg:col-span-3",
		Visual: CliVisual,
	},
] as const;

const MotionLink = motion.create(Link);

export function FeaturesBento() {
	return (
		<section className="mx-auto flex min-h-screen w-full max-w-400 flex-col gap-12 px-4 md:gap-24 md:px-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
				className="flex flex-col justify-center gap-4"
			>
				<p className="font-bold text-teal-700 italic">FEATURES</p>
				<h2 className="font-pixel-square text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
					Everything you need
					<br />
					for electronic invoicing
				</h2>
				<p className="text-lg text-muted-foreground sm:text-xl">
					Generate, validate, and parse ZUGFeRD/Factur-X documents with a single
					developer-friendly API.
				</p>
			</motion.div>

			<div className="grid grid-cols-1 gap-4 pb-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-8 lg:gap-8">
				{FEATURES.map(({ label, description, href, className, Visual }, i) => (
					<MotionLink
						key={label}
						href={href}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						variants={revealItem}
						className={cn(
							"group relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-xl border bg-card p-2 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_50px_-24px_rgba(0,0,0,0.32)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-foreground/10 dark:bg-muted dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_30px_60px_-28px_rgba(0,0,0,0.85)]",
							className,
						)}
					>
						<div className="relative @container flex min-w-0 flex-1 flex-col rounded-lg bg-muted px-3 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] dark:bg-background dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.55)]">
							<Visual />
						</div>
						<div className="px-2 pb-2">
							<span className="font-mono text-sm text-muted-foreground">
								{`${i + 1}`.padStart(2, "0")}.
							</span>
							<p className="text-lg font-semibold">{label}</p>
							<p className="text-muted-foreground">{description}</p>
						</div>
					</MotionLink>
				))}
			</div>
		</section>
	);
}
