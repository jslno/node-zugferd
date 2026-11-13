import { apiReference } from "collections/dynamic";
import { docs, examples } from "collections/server";
import type { Folder, Root } from "fumadocs-core/page-tree";
import { llms as createLlms, loader } from "fumadocs-core/source";
import { icons as lucideIcons } from "lucide-react";
import { createElement } from "react";
import {
	APIReferenceIcon,
	isAPIReferenceIcon,
} from "@/components/api-reference-icon";
import * as icons from "@/components/icons";
import {
	docsContentRoute,
	docsImageRoute,
	examplesContentRoute,
	examplesImageRoute,
} from "./shared";

const icon = (icon: string | undefined) => {
	if (!icon) return;
	if (icon in icons) {
		return createElement(icons[icon as keyof typeof icons], {
			key: icon,
		});
	}

	if (icon in lucideIcons) {
		return createElement(lucideIcons[icon as keyof typeof lucideIcons], {
			key: icon,
		});
	}

	if (icon.startsWith("dot-")) {
		const parseColor = (color: string) => {
			if (color[0] === "[" && color.at(-1) === "]") {
				return color.slice(1, -1);
			}
			return `var(--color-${color})`;
		};

		const color = parseColor(icon.slice(4));
		const Component = createElement("div", {
			className: "size-1.5 shrink-0 rounded-full bg-(--icon-color)",
			style: {
				"--icon-color": color,
			} as React.CSSProperties,
		});
		return createElement("div", {
			key: `dot-${color}`,
			className: "size-4 grid place-items-center",
			children: Component,
			"aria-hidden": true,
		});
	}

	if (isAPIReferenceIcon(icon)) {
		return createElement(APIReferenceIcon, { key: icon, type: icon });
	}
};

const sourcePrefix = {
	docs: "docs",
	examples: "examples",
	apiReference: "api-reference",
} as const;

const sourceTreeName = {
	docs: "Docs",
	examples: "Examples",
	apiReference: "API Reference",
} as const;

type SourceKey = keyof typeof sourcePrefix;

const sourceKeyForFolder = (folderPath: string) =>
	(Object.keys(sourcePrefix) as SourceKey[]).find(
		(key) => sourcePrefix[key] === folderPath,
	);

// https://fumadocs.dev/docs/headless/source-api
export const source = loader(
	{
		docs: docs.toFumadocsSource({ baseDir: sourcePrefix.docs }),
		examples: examples.toFumadocsSource({ baseDir: sourcePrefix.examples }),
		apiReference: apiReference.toFumadocsSource({
			baseDir: sourcePrefix.apiReference,
		}),
	},
	{
		baseUrl: "/",
		icon,
		pageTree: {
			transformers: [
				{
					// Fumadocs prepends the root name to every breadcrumb trail, so the
					// global root is blanked. Each source folder gets its real title instead.
					root(node) {
						return { ...node, name: "" };
					},
					folder(node, folderPath) {
						const key = sourceKeyForFolder(folderPath);
						if (!key) return node;
						return { ...node, name: sourceTreeName[key] };
					},
				},
			],
		},
	},
);

export type SourcePage = (typeof source)["$inferPage"];

export function getSourcePage<T extends SourceKey>(type: T, slugs?: string[]) {
	const page = source.getPage([sourcePrefix[type], ...(slugs ?? [])]);
	if (page?.type !== type) return;
	return page as Extract<SourcePage, { type: T }>;
}

export function getSourceParams(type: SourceKey) {
	return source
		.getPages()
		.flatMap((page) =>
			page.type === type ? [{ slug: page.slugs.slice(1) }] : [],
		);
}

export function getSourcePageTree(type: SourceKey): Root {
	const tree = source.getPageTree();
	const folder = tree.children.find(
		(node): node is Folder =>
			node.type === "folder" && node.$ref?.folder === sourcePrefix[type],
	);
	if (!folder) return { name: tree.name, children: [] };

	return {
		$id: folder.$id,
		$ref: folder.$ref,
		name: sourceTreeName[type],
		description: folder.description,
		children: folder.index
			? [folder.index, ...folder.children]
			: folder.children,
	};
}

function contentSlugs(page: SourcePage) {
	return page.slugs.slice(1);
}

export function getContentPath(page: SourcePage) {
	const index = page.path.indexOf("/");
	return index === -1 ? page.path : page.path.slice(index + 1);
}

export function getPageImage(page: SourcePage) {
	const segments = [...contentSlugs(page), "image.webp"];
	const baseUrl =
		page.type === "examples" ? examplesImageRoute : docsImageRoute;

	return {
		segments,
		url: `${baseUrl}/${segments.join("/")}`,
	};
}

export function getPageMarkdownUrl(page: SourcePage) {
	const segments = [...contentSlugs(page), "content.md"];
	const baseUrl =
		page.type === "examples" ? examplesContentRoute : docsContentRoute;

	return {
		segments,
		url: `${baseUrl}/${segments.join("/")}`,
	};
}

export const llms = createLlms(source, {
	renderPage: async (page) => `# ${page.data.title} (${page.url})
	
${await page.data.getText("processed")}`,
});
