import { createGetUrl } from "fumadocs-core/source";

export const appName = "node-zugferd";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

export const examplesRoute = "/examples";
export const examplesImageRoute = "/og/examples";
export const examplesContentRoute = "/llms.mdx/examples";

export const apiReferenceRoute = "/api-reference";
export const apiReferenceImageRoute = "/og/api-reference";
export const apiReferenceContentRoute = "/llms.mdx/api-reference";

export const gitConfig = {
	user: "jslno",
	repo: "node-zugferd",
	branch: "main",
};

const getContentUrl = createGetUrl("/llms.mdx");

export function getPageMarkdownUrl(page: {
	slugs: string[];
	locale?: string;
	type: string;
}) {
	const segments = [
		page.type === "apiReference" ? "api-reference" : page.type,
		...page.slugs,
		"content.md",
	];

	return {
		segments,
		url: getContentUrl(segments, page.locale),
	};
}

type Success<T> = {
	data: T;
	error: null;
};

type Failure<E> = {
	data: null;
	error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
	promise: Promise<T>,
): Promise<Result<T, E>> {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error as E };
	}
}
