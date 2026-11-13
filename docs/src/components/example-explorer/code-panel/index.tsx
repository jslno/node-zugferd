"use client";

import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import type { SandpackSetup, SandpackTheme } from "@codesandbox/sandpack-react";
import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackProvider,
	useSandpack,
} from "@codesandbox/sandpack-react";
import { cn } from "cn";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useExampleExplorer } from "..";
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

function resolveDependencies(packageJsonStr: string) {
	if (!packageJsonStr) {
		return {
			dependencies: {},
			devDependencies: {},
		};
	}
	const packageJson = JSON.parse(packageJsonStr);

	const parseVersion = (pkgName: string, version: unknown) => {
		if (
			typeof version !== "string" ||
			version.startsWith("catalog:") ||
			version.startsWith("workspace:")
		) {
			if (pkgName === "node-zugferd" || pkgName.startsWith("@node-zugferd/")) {
				// TODO: replace beta with latest after stable release
				return "beta";
			}
			return "latest";
		}
		return version;
	};

	const dependencies = Object.fromEntries(
		Object.entries(packageJson.dependencies ?? {}).map(([name, version]) => [
			name,
			parseVersion(name, version),
		]),
	);
	const devDependencies = Object.fromEntries(
		Object.entries(packageJson.devDependencies ?? {}).map(([name, version]) => [
			name,
			parseVersion(name, version),
		]),
	);

	packageJson.dependencies = dependencies;
	packageJson.devDependencies = devDependencies;

	return packageJson;
}

type SandpackSelection = {
	activeFile: string;
	visibleFiles: string[];
};

function isSameSelection(a: SandpackSelection, b: SandpackSelection) {
	return (
		a.activeFile === b.activeFile &&
		a.visibleFiles.length === b.visibleFiles.length &&
		a.visibleFiles.every((file, index) => file === b.visibleFiles[index])
	);
}

/**
 * Mirrors Sandpack's internal selection back into React state so the provider
 * can be controlled and keep the open tabs across re-renders.
 */
function SandpackSelectionSync({
	activeFile,
	visibleFiles,
	onChange,
}: SandpackSelection & {
	onChange: (selection: SandpackSelection) => void;
}) {
	const { sandpack } = useSandpack();

	useEffect(() => {
		const selection = {
			activeFile: sandpack.activeFile,
			visibleFiles: sandpack.visibleFiles,
		};

		if (isSameSelection(selection, { activeFile, visibleFiles })) return;

		onChange(selection);
	}, [
		activeFile,
		onChange,
		sandpack.activeFile,
		sandpack.visibleFiles,
		visibleFiles,
	]);

	return null;
}

export function CodePanel() {
	const { path: rootPath, entry, owner, repo, branch } = useExampleExplorer();
	const { data: tree, isPending } = useFileTree({
		path: rootPath,
		owner,
		repo,
		branch,
	});

	const files = useMemo(
		() =>
			Object.fromEntries((tree ?? []).map((file) => [file.path, file.content])),
		[tree],
	);

	const packageJson = useMemo(
		() => resolveDependencies(files["/package.json"]),
		[files],
	);

	const sandpackFiles = useMemo(
		() => ({
			...files,
			"/package.json": JSON.stringify(packageJson, null, 2),
		}),
		[files, packageJson],
	);

	const customSetup = useMemo(
		(): SandpackSetup => ({
			entry,
			environment: "node",
			dependencies: packageJson.dependencies,
			devDependencies: packageJson.devDependencies,
		}),
		[entry, packageJson],
	);

	const [activeFile, setActiveFile] = useState(entry ?? "");
	const [visibleFiles, setVisibleFiles] = useState<string[]>([]);

	const handleSelectionChange = useCallback((selection: SandpackSelection) => {
		setActiveFile(selection.activeFile);
		setVisibleFiles(selection.visibleFiles);
	}, []);

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

	return (
		<SandpackProvider
			theme={theme}
			files={sandpackFiles}
			customSetup={customSetup}
			options={{
				activeFile,
				visibleFiles,
				autorun: true,
				initMode: "immediate",
			}}
			className="flex-1! flex! flex-col items-stretch! justify-stretch!"
		>
			<SandpackSelectionSync
				activeFile={activeFile}
				visibleFiles={visibleFiles}
				onChange={handleSelectionChange}
			/>
			<SandpackLayout className="flex! min-h-0! not-prose h-full! border-none! flex-1!">
				<ResizablePanelGroup className="h-full! flex-1!">
					<ResizablePanel
						className="contents"
						defaultSize="10rem"
						minSize="10rem"
						maxSize="50"
						collapsible
					>
						<SandpackFileExplorer
							className={cn(
								"[&_.sp-file-explorer-list]:scroll-fade [&_.sp-file-explorer-list]:scrollbar-none",
							)}
						/>
					</ResizablePanel>
					<ResizableHandle className="bg-muted/30" />
					<ResizablePanel className="contents">
						<SandpackCodeEditor
							className={cn(
								"[&_.sp-code-editor_.cm-scroller]:scroll-fade [&_.sp-code-editor_.cm-scroller]:scrollbar-none [&_.sp-tabs-scrollable-container]:scroll-fade-x [&_.sp-tabs-scrollable-container]:scrollbar-none",
								"[&_.sp-tabs-scrollable-container]:gap-x-1 [&_.sp-tabs]:border-none! [&_.sp-tab-container]:transition-colors! [&_.sp-tabs]:pt-2 [&_.sp-tab-container]:outline-none! [&_.sp-tab-container]:aria-selected:bg-accent! [&_.sp-tab-container]:aria-selected:text-accent-foreground! [&_.sp-tab-container]:text-muted-foreground! [&_.sp-tab-container]:bg-muted/60! [&_.sp-tab-container]:hover:bg-muted! [&_.sp-tab-container]:rounded-md [&_.sp-tab-container]:h-7 [&_.sp-tab-button]:h-7! [&_.sp-close-button]:mr-1 [&_.sp-close-button]:visible! [&_.sp-close-button]:transition-opacity! [&_.sp-close-button]:opacity-0! [&_.sp-tab-container]:aria-selected:[&_.sp-close-button]:opacity-100! [&_.sp-tab-container]:hover:[&_.sp-close-button]:opacity-100!",
							)}
							extensions={[
								autocompletion({
									tooltipClass: (_state) =>
										cn(
											"bg-popover! text-popover-foreground! border-none! rounded-lg! overflow-clip! ring-1 ring-foreground/10 outline-hidden! shadow-md! [&>ul]:scrollbar-none [&>ul]:scroll-fade [&>ul]:scroll-fade-6",
										),
									optionClass: (_state) =>
										cn(
											"p-1.5! hover:bg-accent! hover:text-accent-foreground! aria-[selected=true]:bg-accent! aria-[selected=true]:text-accent-foreground!",
										),
								}),
							]}
							extensionsKeymap={[...completionKeymap]}
							closableTabs
							showTabs
						/>
					</ResizablePanel>
					<ResizableHandle className="bg-muted/30" />
					<ResizablePanel
						className="contents"
						defaultSize="35"
						minSize="14rem"
						maxSize="50"
						collapsible
					>
						<SandpackConsole standalone showSetupProgress showHeader={false} />
					</ResizablePanel>
				</ResizablePanelGroup>
			</SandpackLayout>
		</SandpackProvider>
	);
}
