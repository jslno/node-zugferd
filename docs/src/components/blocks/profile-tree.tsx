import { CheckIcon, LinkIcon, XIcon } from "lucide-react";
import Link from "next/link";
import type { Schema, SchemaField } from "node-zugferd/types";
import Markdown from "react-markdown";

export const ProfileTree = ({ schema }: { schema: Schema }) => {
	const fields = Object.entries(schema);

	return (
		<div className="grid grid-cols-1">
			{fields.map(([name, def], i) => (
				<TreeItem data={[name, def]} key={i} />
			))}
		</div>
	);
};

const TreeItem = ({
	data,
	prefix = "",
}: {
	data: [string, SchemaField];
	prefix?: string;
}) => {
	const [name, def] = data;

	const children = def.shape ? Object.entries(def.shape) : undefined;

	if (prefix !== "" && !prefix.endsWith(".")) {
		prefix += ".";
	}
	const id = def.key || prefix + name;

	return (
		<div className="flex" id={id}>
			<div className="pl-5 border-l w-full">
				<div className="relative">
					<div className="flex items-center gap-2">
						<Link
							href={`#${id}`}
							className="peer cursor-pointer no-underline font-normal"
						>
							<code>{name}</code>
						</Link>
						<LinkIcon className="size-3.5 text-fd-muted-foreground shrink-0 opacity-0 transition-opacity peer-hover:opacity-100" />
					</div>
					<div className="w-3 h-[1.5px] -left-5 bg-muted absolute top-1/2 -translate-y-1/2"></div>
				</div>

				<div className="text-sm bg-background mt-2 mb-6 leading-none p-1 rounded-xl border">
					<div className="space-y-4 p-2">
						<div className="flex items-center gap-2">
							<span>Type:</span>
							<code>{Array.isArray(def.type) ? "string" : def.type}</code>
						</div>
						<div className="flex gap-2 items-center">
							<span>Required:</span>
							{def.required === false ? (
								<XIcon className="size-4 text-muted-foreground" />
							) : (
								<CheckIcon className="size-4 text-emerald-500" />
							)}
						</div>
						{!!def.xpath && (
							<div className="text-muted-foreground text-xs">
								{def.xpath.split("/").pop()}
							</div>
						)}
					</div>
					{!!def.description && (
						<div className="px-4 text-muted-foreground bg-gradient-to-tr w-full text-pretty break-words from-muted/10 via-muted/25 to-muted/10 border rounded-lg">
							<Markdown>{def.description}</Markdown>
						</div>
					)}
				</div>

				{!!children &&
					children.map((entry, i) => (
						<TreeItem data={entry} prefix={id} key={i} />
					))}
			</div>
		</div>
	);
};
