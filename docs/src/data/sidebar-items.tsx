import {
	BookOpenCheckIcon,
	BookOpenIcon,
	ChartColumn,
	CirclePlayIcon,
	FlaskConicalIcon,
	GitPullRequestArrowIcon,
	HandHelpingIcon,
	LayoutGridIcon,
	LucideIcon,
	NotebookPenIcon,
	PencilRulerIcon,
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
				title: "Minimum",
				href: "/docs/profiles/minimum",
			},
			{
				title: "Basic WL",
				href: "/docs/profiles/basic-wl",
			},
			{
				title: "Basic",
				href: "/docs/profiles/basic",
			},
			{
				title: "EN16931 (Comfort)",
				href: "/docs/profiles/en16931",
			},
			{
				title: "Extended",
				href: "/docs/profiles/extended",
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
		title: "Contributing",
		Icon: GitPullRequestArrowIcon,
		list: [
			{
				title: "Getting Started",
				Icon: BookOpenCheckIcon,
				href: "/docs/contribute/getting-started",
			},
			{
				title: "Areas to Contribute",
				Icon: HandHelpingIcon,
				href: "/docs/contribute/areas-to-contribute",
			},
			{
				title: "Testing",
				Icon: FlaskConicalIcon,
				href: "/docs/contribute/testing",
			},
			{
				title: "Documenting",
				Icon: NotebookPenIcon,
				href: "/docs/contribute/documenting",
			},
		],
	},
] satisfies Content[];
