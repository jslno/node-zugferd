import { cn } from "@/lib/utils";

const apiReferenceIcons = {
	type: "oklch(81% 0.117 11.638)",
	interface: "oklch(84.5% 0.143 164.978)",
	enum: "oklch(83.7% 0.128 66.29)",
	class: "oklch(82.8% 0.111 230.318)",
	function: "oklch(82.7% 0.119 306.383)",
	variable: "oklch(78.5% 0.115 274.713)",
} as const;

export type APIReferenceIconName = keyof typeof apiReferenceIcons;

const kindByFolder = {
	types: "type",
	interfaces: "interface",
	enums: "enum",
	classes: "class",
	functions: "function",
	variables: "variable",
} as const satisfies Record<string, APIReferenceIconName>;

export function isAPIReferenceIcon(icon: string): icon is APIReferenceIconName {
	return icon in apiReferenceIcons;
}

/** Kind badge for `/api-reference/.../<folder>/<page>` URLs. */
export function apiReferenceIconFromUrl(url: string) {
	const folder = url.split("#")[0]?.split("/").at(-2);
	if (!folder || !(folder in kindByFolder)) return;
	return kindByFolder[folder as keyof typeof kindByFolder];
}

export function APIReferenceIcon({
	type,
	className,
}: {
	type: APIReferenceIconName;
	className?: string;
}) {
	const color = apiReferenceIcons[type];
	return (
		<div
			className={cn(
				"size-4 shrink-0 select-none grid place-items-center bg-background rounded-sm border border-(--icon-color)",
				className,
			)}
			style={{ "--icon-color": color } as React.CSSProperties}
			aria-hidden
		>
			<span className="font-mono text-[0.65rem] text-(--icon-color)">
				{type[0]?.toUpperCase()}
			</span>
		</div>
	);
}
