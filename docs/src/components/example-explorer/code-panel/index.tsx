"use client";

import type { SandpackTheme } from "@codesandbox/sandpack-react";
import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackProvider,
} from "@codesandbox/sandpack-react";
import { useMemo } from "react";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Spinner } from "@/components/ui/spinner";
import type { ExampleExplorerProps } from "..";
import { useFileTree } from "./data/file-tree.query";

const theme: SandpackTheme = {
	colors: {
		surface1: "var(--background)",
		surface2: "var(--border)",
		surface3: "var(--accent)",
		disabled: "color-mix(in oklch, var(--muted-foreground) 45%, transparent)",
		base: "var(--foreground)",
		clickable: "var(--muted-foreground)",
		hover: "var(--foreground)",
		accent: "var(--primary)",
		error: "var(--destructive)",
		errorSurface:
			"color-mix(in oklch, var(--destructive) 12%, var(--background))",
		warning: "var(--foreground)",
		warningSurface: "var(--muted)",
	},
	syntax: {
		plain: "var(--vitesse-plain)",
		comment: { color: "var(--vitesse-comment)", fontStyle: "italic" },
		keyword: "var(--vitesse-keyword)",
		tag: "var(--vitesse-keyword)",
		punctuation: "var(--vitesse-punctuation)",
		definition: "var(--vitesse-definition)",
		property: "var(--vitesse-property)",
		static: "var(--vitesse-static)",
		string: "var(--vitesse-string)",
	},
	font: {
		body: "var(--font-sans)",
		mono: "var(--font-mono)",
		size: "0.875rem",
		lineHeight: "1.25rem",
	},
};

export type CodePanelProps = ExampleExplorerProps;

function resolveDependencies(packageJsonStr: string) {
	if (!packageJsonStr) {
		return {
			dependencies: {},
			devDependencies: {},
		};
	}
	const packageJson = JSON.parse(packageJsonStr);

	const parseVersion = (version: unknown) => {
		if (
			typeof version !== "string" ||
			version.startsWith("catalog:") ||
			version.startsWith("workspace:")
		) {
			// TODO: replace beta with latest after stable release
			return "beta";
		}
		return version;
	};

	const dependencies = Object.fromEntries(
		Object.entries(packageJson.dependencies ?? {}).map(([name, version]) => [
			name,
			parseVersion(version),
		]),
	);
	const devDependencies = Object.fromEntries(
		Object.entries(packageJson.devDependencies ?? {}).map(([name, version]) => [
			name,
			parseVersion(version),
		]),
	);

	return {
		dependencies,
		devDependencies,
	};
}

export function CodePanel({ path: rootPath, entry }: CodePanelProps) {
	const { data: tree, isPending } = useFileTree(rootPath);

	const files = useMemo(
		() =>
			Object.fromEntries((tree ?? []).map((file) => [file.path, file.content])),
		[tree],
	);

	if (isPending) {
		return (
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Spinner />
					</EmptyMedia>
					<EmptyTitle>Loading Playground...</EmptyTitle>
					<EmptyDescription>This shouldn't take too long.</EmptyDescription>
				</EmptyHeader>
			</Empty>
		);
	}

	const packageJson = files["package.json"];
	const { dependencies, devDependencies } = resolveDependencies(packageJson);

	return (
		<SandpackProvider
			theme={theme}
			files={files}
			customSetup={{
				entry,
				dependencies,
				devDependencies,
			}}
		>
			<SandpackLayout>
				<ResizablePanelGroup className="contents">
					<ResizablePanel className="contents">
						<SandpackFileExplorer className="[&_.sp-file-explorer-list]:scroll-fade [&_.sp-file-explorer-list]:scrollbar-none" />
					</ResizablePanel>
					<ResizableHandle className="bg-muted/30" />
					<ResizablePanel className="contents">
						<SandpackCodeEditor
							className="[&_.sp-code-editor_.cm-scroller]:scroll-fade [&_.sp-code-editor_.cm-scroller]:scrollbar-none [&_.sp-tabs-scrollable-container]:scroll-fade-x [&_.sp-tabs-scrollable-container]:scrollbar-none"
							closableTabs
							showTabs
						/>
					</ResizablePanel>
					<ResizableHandle className="bg-muted/30" />
					<ResizablePanel className="contents">
						<SandpackConsole />
					</ResizablePanel>
				</ResizablePanelGroup>
			</SandpackLayout>
		</SandpackProvider>
	);
}
