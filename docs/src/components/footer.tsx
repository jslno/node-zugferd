import { cn } from "@/lib/utils";
import Link from "next/link";

export const Footer = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<"footer">) => {
	return (
		<footer
			className={cn(
				"py-2 md:h-[58px] flex items-center gap-4 px-5 border-t w-full",
				className,
			)}
			{...props}
		>
			<span className="text-muted-foreground text-sm">
				&copy; {new Date().getFullYear()}{" "}
				<Link
					href="https://www.jsolano.de"
					target="_blank"
					className="text-foreground hover:underline underline-offset-2"
				>
					IT Service JSolano
				</Link>
				. All rights reserved.
			</span>

			<div className="ml-auto flex items-center gap-4 divide-x text-sm">
				<Link
					href="https://www.jsolano.de/impressum"
					className="text-foreground hover:underline pr-4 underline-offset-2"
				>
					Legal
				</Link>
			</div>
		</footer>
	);
};
