import type { ZugferdProfile } from "@node-zugferd/core";
import { ChevronDownIcon } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { profileFieldMetaMap } from "@/lib/profile-field-meta";
import type { AnySchema, FieldCardinality } from "@/lib/profile-field-utils";
import {
	collectProfileFields,
	getProfileTreeChildren,
	getSchemaMetadata,
	resolveChildPath,
	resolveFieldMeta,
	unwrapSchema,
} from "@/lib/profile-field-utils";
import { TruncatedText } from "../truncated-text";
import { Badge } from "../ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";

export function ProfileTree({
	profile: { schema: $schema },
}: {
	profile: ZugferdProfile;
}) {
	const schema: AnySchema = $schema;
	const fields = useMemo(() => collectProfileFields(schema), [schema]);

	const renderItem = (
		item: AnySchema,
		cfg: {
			key?: string | undefined;
			depth?: number | undefined;
			index?: number | undefined;
			length?: number | undefined;
			basePath?: readonly string[];
		} = {},
	) => {
		const basePath = cfg.basePath ?? [];
		const metadata = getSchemaMetadata(item);
		const id =
			"id" in metadata
				? Array.isArray(metadata.id)
					? metadata.id.join(", ")
					: metadata.id
				: undefined;

		const meta = resolveFieldMeta(metadata, profileFieldMetaMap);
		const unwrapped = unwrapSchema(item);
		const isArray = unwrapped.type === "array" || unwrapped.type === "as_array";
		const isOptional = item.type === "nullish";

		let cardinality: FieldCardinality = isOptional ? "0..1" : "1..1";
		if (isArray) {
			if (
				"pipe" in unwrapped &&
				Array.isArray(unwrapped.pipe) &&
				unwrapped.pipe.some((s) => s.type === "min_length")
			) {
				cardinality = "1..n";
			} else {
				cardinality = "0..n";
			}
		}

		const parsedType = (() => {
			if (
				unwrapped.type === "object" ||
				isArray ||
				unwrapped.type === "intersect" ||
				unwrapped.type === "union"
			) {
				return undefined;
			}

			switch ((unwrapped as { subType?: string }).subType ?? unwrapped.type) {
				case "identifier":
				case "code":
				case "text":
				case "quantity":
				case "percentage":
				case "date":
				case "amount":
				case "boolean":
					return unwrapped.type[0].toUpperCase() + unwrapped.type.slice(1);
				case "unit-price-amount":
					return "Unit Price Amount";
				case "binary-object":
					return "Binary Object";
				case "document-reference":
					return "Document Reference";
				case "literal":
					return unwrapped.expects;
				default:
					return unwrapped.type;
			}
		})();

		const childEntries = getProfileTreeChildren(fields, basePath);
		const hasChildren = Object.keys(childEntries).length > 0;

		return (
			<li
				key={`${cfg.depth ?? 0}-${cfg.key ?? "root"}-${id ?? (basePath.join(".") || "no-id")}`}
				className="flex w-full"
			>
				{(cfg.depth ?? 0) > 0 && (
					<div className="relative w-3 self-stretch">
						{(cfg.index ?? 0) === (cfg.length ?? 1) - 1 ? (
							<div className="absolute w-full h-5 top-0 right-0 border-l border-b rounded-bl-md" />
						) : (
							<>
								<div className="absolute w-[calc(var(--spacing)*3-1px)] h-4.5 top-0 right-0 border-b" />
								<div className="border-l h-full" />
							</>
						)}
					</div>
				)}
				<Collapsible
					defaultOpen={!cfg.key}
					disabled={!cfg.key}
					className="w-full"
				>
					<CollapsibleTrigger
						scrollIntoView
						className="group/collapsible-trigger scroll-mt-16 py-2 [&_svg]:size-4 gap-2 flex items-center justify-between w-full outline-0"
					>
						{!!cfg.key && (
							<>
								<div className="flex flex-row items-center gap-4 flex-1">
									<div className="w-full flex">
										<code className="bg-muted rounded font-mono text-sm px-1.5 py-0.5">
											{cfg.key}
											{isArray && "[]"}
											{isOptional && "?"}
										</code>
									</div>
									<div className="w-full flex">
										{!!parsedType && (
											<Badge
												variant="link"
												className="text-muted-foreground decoration-dashed"
											>
												{parsedType}
											</Badge>
										)}
									</div>
									<div className="w-full flex max-w-1/4">
										<TruncatedText className="ms-auto text-xs text-muted-foreground font-mono text-right">
											/{meta?.xpath.split("/").at(-1)}
										</TruncatedText>
									</div>
								</div>
								<ChevronDownIcon className="text-muted-foreground group-aria-expanded/collapsible-trigger:rotate-180 transition-transform duration-200" />
							</>
						)}
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-col h-(--collapsible-panel-height) overflow-hidden transition-all duration-200 data-ending-style:h-0 data-starting-style:h-0">
						<div
							className={cn(
								"border rounded-md p-1.5",
								hasChildren && "rounded-bl-none",
							)}
						>
							<div className="@container/field-meta flex rounded-md rounded-bl-sm bg-card border border-border/60 flex-col gap-1 p-3">
								<span className="text-xs font-medium -mb-1 text-muted-foreground">
									{`${id}`}
								</span>
								<p className="text-lg font-semibold">{meta?.businessTerm}</p>
								{meta?.description && (
									<p className="text-sm text-muted-foreground">
										{meta?.description}
									</p>
								)}
								<p className="text-xs text-muted-foreground italic">
									{cardinality}
								</p>
								{meta?.usageNote || meta?.cius || meta?.businessRule ? (
									<>
										<hr className="my-2" />
										<div className="grid @md/field-meta:grid-cols-2 gap-4">
											{meta?.usageNote && (
												<div className="flex flex-col gap-0.5">
													<h4 className="font-medium">Usage Note</h4>
													<p className="text-sm text-muted-foreground">
														{meta.usageNote}
													</p>
												</div>
											)}
											{meta?.cius && (
												<div className="flex flex-col gap-0.5">
													<h4 className="font-medium">
														CIUS (Core Invoice Usage Specification)
													</h4>
													<p className="text-sm text-muted-foreground">
														{meta.cius}
													</p>
												</div>
											)}
											{meta?.businessRule && (
												<div className="flex flex-col gap-0.5">
													<h4 className="font-medium">Business Rule</h4>
													<p className="text-sm text-muted-foreground">
														{meta.businessRule}
													</p>
												</div>
											)}
										</div>
									</>
								) : null}
							</div>
						</div>
						{hasChildren && (
							<ul className="list-none pl-0">
								{Object.entries(childEntries).map(([key, value], i, arr) => {
									const childPath = resolveChildPath(fields, basePath, key);

									return renderItem(value, {
										key,
										depth: (cfg.depth ?? 0) + 1,
										index: i,
										length: arr.length,
										basePath: childPath,
									});
								})}
							</ul>
						)}
					</CollapsibleContent>
				</Collapsible>
			</li>
		);
	};

	return (
		<ul className="list-none not-prose pl-0 w-full">{renderItem(schema)}</ul>
	);
}
