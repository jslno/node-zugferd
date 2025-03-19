import {
	BookOpenIcon,
	ChartColumn,
	CirclePlayIcon,
	LayoutGridIcon,
	LibraryIcon,
	LucideIcon,
	PencilRulerIcon,
	ScrollIcon,
} from "lucide-react";
import { ReactNode, SVGProps } from "react";

type Content = {
	title: string;
	href?: string;
	Icon?: ((props: SVGProps<any>) => ReactNode) | LucideIcon;
	list: {
		title: string;
		href: string;
		Icon?: ((props: SVGProps<any>) => ReactNode) | LucideIcon;
		group?: boolean;
	}[];
};

export const contents: Content[] = [
	{
		title: "Get Started",
		Icon: CirclePlayIcon,
		list: [
			{
				title: "Introduction",
				href: "/docs/introduction",
				Icon: BookOpenIcon,
			},
			{
				title: "Basic Usage",
				href: "/docs/basic-usage",
				Icon: ChartColumn,
			},
		],
	},
	{
		title: "Profiles",
		Icon: LayoutGridIcon,
		list: [
			{
				title: "Factur-X",
				href: "/docs/profiles",
				group: true,
			},
			{
				Icon: () => (
					<div className="size-4 flex items-center justify-center">
						<div className="size-1.5 rounded-full bg-muted-foreground" />
					</div>
				),
				title: "Minimum",
				href: "/docs/profiles/minimum",
			},
			{
				Icon: () => (
					<div className="size-4 flex items-center justify-center">
						<div className="size-1.5 rounded-full bg-emerald-500" />
					</div>
				),
				title: "Basic WL",
				href: "/docs/profiles/basic-wl",
			},
			{
				Icon: () => (
					<div className="size-4 flex items-center justify-center">
						<div className="size-1.5 rounded-full bg-blue-500" />
					</div>
				),
				title: "Basic",
				href: "/docs/profiles/basic",
			},
			{
				Icon: () => (
					<div className="size-4 flex items-center justify-center">
						<div className="size-1.5 rounded-full bg-amber-500" />
					</div>
				),
				title: "EN16931 (Comfort)",
				href: "/docs/profiles/en16931",
			},
			{
				Icon: () => (
					<div className="size-4 flex items-center justify-center">
						<div className="size-1.5 rounded-full bg-purple-500" />
					</div>
				),
				title: "Extended",
				href: "/docs/profiles/extended",
			},
		],
	},
	{
		title: "Codelists",
		Icon: ScrollIcon,
		list: [
			{
				title: "UNTDID 1001",
				href: "/docs/codelists/untdid-1001",
			},
			{
				title: "UNTDID 1153",
				href: "/docs/codelists/untdid-1153",
			},
			{
				title: "UNTDID 1229",
				href: "/docs/codelists/untdid-1229",
			},
			{
				title: "UNTDID 2005",
				href: "/docs/codelists/untdid-2005",
			},
			{
				title: "UNTDID 3035",
				href: "/docs/codelists/untdid-3035",
			},
			{
				title: "UNTDID 3139",
				href: "/docs/codelists/untdid-3139",
			},
			{
				title: "UNTDID 4451",
				href: "/docs/codelists/untdid-4451",
			},
			{
				title: "UNTDID 4461",
				href: "/docs/codelists/untdid-4461",
			},
			{
				title: "UNTDID 5189",
				href: "/docs/codelists/untdid-5189",
			},
			{
				title: "UNTDID 5305",
				href: "/docs/codelists/untdid-5305",
			},
			{
				title: "UNTDID 7143",
				href: "/docs/codelists/untdid-7143",
			},
			{
				title: "UNTDID 7161",
				href: "/docs/codelists/untdid-7161",
			},
			{
				title: "VATEX",
				href: "/docs/codelists/vatex",
			},
			{
				title: "EAS",
				href: "/docs/codelists/eas",
			},
			{
				title: "Currency Codes",
				href: "/docs/codelists/currency-codes",
			},
			{
				title: "UN/ECE Recommendation N°20",
				href: "/docs/codelists/rec20",
			},
			{
				title: "UN/ECE Recommendation N°21",
				href: "/docs/codelists/rec21",
			},
		],
	},
	{
		title: "Guides",
		Icon: (props: SVGProps<SVGSVGElement>) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1.2rem"
				height="1.2rem"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z" />
				<path d="M15 4h1a1 1 0 0 1 1 1v3.5" />
				<path d="M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374" />
			</svg>
		),
		list: [
			{
				title: "Create your first profile",
				Icon: PencilRulerIcon,
				href: "/docs/guides/create-your-first-profile",
			},
		],
	},
	{
		title: "Reference",
		Icon: LibraryIcon,
		list: [
			{
				Icon: (props: SVGProps<SVGSVGElement>) => (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						{...props}
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2z" />
						<path d="M12 5v16" />
						<path d="M7 7h1" />
						<path d="M7 11h1" />
						<path d="M16 7h1" />
						<path d="M16 11h1" />
						<path d="M16 15h1" />
					</svg>
				),
				title: "Options",
				href: "/docs/reference/options",
			},
		],
	},
] satisfies Content[];
