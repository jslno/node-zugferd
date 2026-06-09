"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function TruncatedText<
	E extends keyof React.JSX.IntrinsicElements = "span",
>({
	children,
	as = "span" as E,
	className,
	onMouseEnter,
	...props
}: {
	as?: E | undefined;
} & React.ComponentProps<E>) {
	const Component: any = as;
	const [overflowing, setOverflowing] = useState(false);

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<Component
						className={cn("truncate", className)}
						onMouseEnter={(e: any) => {
							const el = e.currentTarget;
							setOverflowing(el.scrollWidth > el.clientWidth);
							onMouseEnter?.(e);
						}}
						{...props}
					/>
				}
			>
				{children}
			</TooltipTrigger>

			{overflowing && (
				<TooltipContent className="break-all max-w-76">
					{children}
				</TooltipContent>
			)}
		</Tooltip>
	);
}
