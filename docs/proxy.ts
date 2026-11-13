import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
	apiReferenceContentRoute,
	apiReferenceRoute,
	docsContentRoute,
	docsRoute,
	examplesContentRoute,
	examplesRoute,
} from "@/lib/shared";

const sections = [
	[docsRoute, docsContentRoute],
	[examplesRoute, examplesContentRoute],
	[apiReferenceRoute, apiReferenceContentRoute],
] as const;

const rewrites = sections.map(([route, contentRoute]) => ({
	suffix: rewritePath(
		`${route}{/*path}.md`,
		`${contentRoute}{/*path}/content.md`,
	).rewrite,
	content: rewritePath(`${route}{/*path}`, `${contentRoute}{/*path}/content.md`)
		.rewrite,
}));

export default function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	for (const { suffix } of rewrites) {
		const result = suffix(pathname);
		if (result) {
			return NextResponse.rewrite(new URL(result, request.nextUrl));
		}
	}

	if (isMarkdownPreferred(request)) {
		for (const { content } of rewrites) {
			const result = content(pathname);
			if (result) {
				return NextResponse.rewrite(new URL(result, request.nextUrl), {
					headers: { Vary: "Accept" },
				});
			}
		}
	}

	return NextResponse.next();
}
