import { BookTextIcon, BracesIcon, LightbulbIcon } from "lucide-react";

export const navItems = [
	{
		id: "docs" as const,
		icon: BookTextIcon,
		label: "Documentation",
		description: "get started, profiles and more",
		href: "/docs",
	},
	{
		id: "examples" as const,
		icon: LightbulbIcon,
		label: "Examples",
		description: "examples and guides",
		href: "/examples",
	},
	{
		id: "api-reference" as const,
		icon: BracesIcon,
		label: "API Reference",
		description: "reference and type docs",
		href: "/api-reference",
	},
];
