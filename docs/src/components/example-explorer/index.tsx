import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Tab, Tabs, tabsTriggerClasses } from "@/components/tabs";
import { gitConfig } from "@/lib/shared";
import { CodePanel } from "./code-panel";
import { CodeSandbox } from "./codesandbox";
import { StackBlitz } from "./stackblitz";

export type ExampleExplorerProps = {
	path: string;
	entry?: string;
};

export function ExampleExplorer({ path, entry }: ExampleExplorerProps) {
	return (
		<Tabs
			items={["Playground", "StackBlitz", "CodeSandbox"]}
			listChildren={
				<Link
					href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/tree/${gitConfig.branch}/${path.replace(/^\//, "")}`}
					target="_blank"
					rel="noopener noreferrer"
					className={tabsTriggerClasses}
				>
					GitHub <ExternalLinkIcon />
				</Link>
			}
		>
			<Tab value="Playground" className="p-0! not-prose overflow-clip">
				<CodePanel path={path} entry={entry} />
			</Tab>
			<Tab value="StackBlitz" className="p-0! not-prose">
				<StackBlitz path={path} />
			</Tab>
			<Tab value="CodeSandbox" className="not-prose">
				<CodeSandbox path={path} />
			</Tab>
		</Tabs>
	);
}
