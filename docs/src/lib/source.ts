import { apiReference } from "collections/dynamic";
import { docs, examples } from "collections/server";
import type { Page } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { icons as lucideIcons } from "lucide-react";
import { createElement } from "react";
import * as icons from "@/components/icons";
import {
	apiReferenceRoute,
	docsContentRoute,
	docsImageRoute,
	docsRoute,
	examplesContentRoute,
	examplesImageRoute,
	examplesRoute,
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

	const apiReferenceIconMap = {
		type: "oklch(81% 0.117 11.638)",
		interface: "oklch(84.5% 0.143 164.978)",
		enum: "oklch(83.7% 0.128 66.29)",
		class: "oklch(82.8% 0.111 230.318)",
		function: "oklch(82.7% 0.119 306.383)",
		variable: "oklch(78.5% 0.115 274.713)",
	};
	const createAPIReferenceIcon = (type: keyof typeof apiReferenceIconMap) => {
		const color = apiReferenceIconMap[type];
		return createElement("div", {
			key: type,
			className: `shrink-0 size-4 select-none grid place-items-center bg-background rounded-sm border border-(--icon-color)`,
			children: createElement("span", {
				children: type[0].toUpperCase(),
				className: `font-mono text-[0.65rem] text-(--icon-color)`,
			}),
			style: {
				"--icon-color": color,
			} as React.CSSProperties,
			"aria-hidden": true,
		});
	};

	if (icon in apiReferenceIconMap) {
		return createAPIReferenceIcon(icon as keyof typeof apiReferenceIconMap);
	}
};

type SourceType = "docs" | "examples" | "api-reference";
type InferSource<T extends SourceType> = T extends "examples"
	? typeof examplesSource
	: T extends "api-reference"
		? typeof apiReferenceSource
		: typeof source;

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
	baseUrl: docsRoute,
	source: docs.toFumadocsSource(),
	icon,
});

export const examplesSource = loader({
	baseUrl: examplesRoute,
	source: examples.toFumadocsSource(),
	icon,
});

export const apiReferenceSource = loader({
	baseUrl: apiReferenceRoute,
	source: apiReference.toFumadocsSource(),
	icon,
});

const factory =
	<R>(fn: (page: Page, type: SourceType) => R) =>
	<P extends InferSource<T>["$inferPage"], T extends SourceType = "docs">(
		page: P,
		type: T = "docs" as T,
	): R =>
		fn(page, type);

export const getPageImage = factory((page, type) => {
	const segments = [...page.slugs, "image.webp"];
	const baseUrl = type === "examples" ? examplesImageRoute : docsImageRoute;

	return {
		segments,
		url: `${baseUrl}/${segments.join("/")}`,
	};
});

export const getPageMarkdownUrl = factory((page, type) => {
	const segments = [...page.slugs, "content.md"];
	const baseUrl = type === "examples" ? examplesContentRoute : docsContentRoute;

	return {
		segments,
		url: `${baseUrl}/${segments.join("/")}`,
	};
});

export const getLLMText = factory(async (page) => {
	const processed = await page.data.getText("processed");

	return `# ${page.data.title} (${page.url})

 ${processed}`;
});
