"use client";

import type { ClassValue } from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
	href: string;
	children: React.ReactNode;
	startWith: string;
	title?: string | null;
	className?: ClassValue;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const SideBarLink = ({
	href,
	children,
	startWith,
	title,
	className,
	...props
}: Props) => {
	const segment = useSelectedLayoutSegment();
	const path = href;
	const isActive = path.replace("/docs/", "") === segment;

	return (
		<Link
			href={href}
			className={cn(
				isActive
					? "text-foreground bg-primary/10 [&_svg]:opacity-100"
					: "text-muted-foreground hover:text-foreground [&_svg]:opacity-60 hover:[&_svg]:opacity-100 [&_svg]:transition-opacity [&_svg]:duration-300",
				"w-full transition-colors flex items-center gap-x-2.5 hover:bg-primary/10 px-5 py-1",
			)}
			data-state={isActive}
			{...props}
		>
			{children}
		</Link>
	);
};
