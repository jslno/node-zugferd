import { LucideIcon } from "lucide-react";
import { ReactNode, SVGProps } from "react";

export type Content = {
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
