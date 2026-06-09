import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { icons as lucideIcons } from "lucide-react";
import { createElement } from "react";
import * as icons from "@/components/icons";
import { docsContentRoute, docsImageRoute, docsRoute } from "./shared";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
	baseUrl: docsRoute,
	source: docs.toFumadocsSource(),
	icon(icon) {
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

		if (!icon.startsWith("dot-")) return;
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
	},
});

export function getPageImage(page: (typeof source)["$inferPage"]) {
	const segments = [...page.slugs, "image.png"];

	return {
		segments,
		url: `${docsImageRoute}/${segments.join("/")}`,
	};
}

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
	const segments = [...page.slugs, "content.md"];

	return {
		segments,
		url: `${docsContentRoute}/${segments.join("/")}`,
	};
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
	const processed = await page.data.getText("processed");

	return `# ${page.data.title} (${page.url})

${processed}`;
}
