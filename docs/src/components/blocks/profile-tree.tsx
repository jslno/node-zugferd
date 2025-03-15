import { CheckIcon, XIcon } from "lucide-react";
import type { Schema, SchemaField } from "node-zugferd/types";

export const ProfileTree = ({
	schema,
}: {
	schema: Schema;
}) => {
	const fields = Object.entries(schema);

	return (
		<div className="grid grid-cols-1">
			{fields.map(([name, def], i) => (
				<TreeItem data={[name, def]} key={i} />
			))}
		</div>
	);
};

const TreeItem = ({ data }: { data: [string, SchemaField] }) => {
	const [name, def] = data;

	const children = def.shape ? Object.entries(def.shape) : undefined;

	return (
		<div className="flex">
			<div className="pl-5 border-l">
				<div className="relative">
					<code>{name}</code>
					<div className="w-3 h-[1.5px] -left-5 bg-muted absolute top-1/2 -translate-y-1/2"></div>
				</div>

				<div className="text-sm leading-none space-y-4 py-4">
					<div className="flex items-center gap-2">
						<span>Type:</span>
						<code>
							{Array.isArray(def.type)
								? def.type
										.map((item) =>
											typeof item === "string" ? `"${item}"` : item,
										)
										.join(" | ")
								: def.type}
						</code>
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
						<span className="text-muted-foreground text-xs">{def.xpath.split("/").pop()}</span>
					)}
				</div>

				{!!children &&
					children.map((entry, i) => <TreeItem data={entry} key={i} />)}
			</div>
		</div>
	);
};
