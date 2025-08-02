import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Resource } from "./resource";

export const ResourceCard = ({
	title,
	description,
	href,
	tags,
	className,
}: Resource) => {
	let host = new URL(href).hostname;
	if (host.toLowerCase().startsWith("www.")) {
		host = host.substring(4);
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer noopener"
			className={cn(
				"no-underline opacity-100! relative flex justify-between rounded-none flex-col group space-y-1 border transition-colors hover:bg-muted/80 focus-visible:bg-muted/80 outline-0",
				className,
			)}
		>
			<div>
				<ArrowUpRightIcon className="absolute top-3 right-3 size-4 scale-100 group-hover:scale-115 origin-bottom-left group-hover:opacity-100 opacity-80 text-muted-foreground transition-all group-hover:text-foreground" />
				<div className="px-4 flex flex-col">
					<h3 className="font-semibold text-md tracking-tight leading-tight underline decoration-transparent group-hover:decoration-foreground group-focus-visible:decoration-foreground transition-colors duration-200">
						{title}
					</h3>
					<p className="-mt-1 no-underline! text-muted-foreground leading-tight text-xs">
						{host}
					</p>
				</div>
				<p
					className="px-4 text-sm text-muted-foreground"
					dangerouslySetInnerHTML={{ __html: `${description}` }}
				/>
			</div>
			<div>
				{tags && tags.length > 0 && (
					<div className="p-2 bg-muted/10 border-t flex flex-wrap items-end gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex items-end border bg-background group-hover:bg-background/30 transition-colors align-middle leading-tight rounded-md px-2 py-1 text-xs font-medium"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
		</a>
	);
};
ResourceCard.displayName = "ResourceCard";
