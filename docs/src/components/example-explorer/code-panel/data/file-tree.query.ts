"use client";

import type { QueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { tryCatch } from "@/lib/shared";
import { getFileTree } from "../actions";

function normalizeRepoPath(path: string) {
	return path.replace(/^\/+|\/+$/g, "");
}

export type FileTreeOptions = {
	owner?: string;
	repo?: string;
	branch?: string;
	path: string;
};

async function fetchFileTree(input: FileTreeOptions) {
	const { data, error } = await tryCatch(getFileTree(input));

	if (error) {
		throw error;
	}

	return data;
}

export function fileTreeOptions(input: FileTreeOptions) {
	const normalizedPath = normalizeRepoPath(input.path);

	const data = {
		...input,
		path: normalizedPath,
	};

	return {
		queryKey: ["file-tree", data],
		queryFn: () => fetchFileTree(data),
		gcTime: Infinity,
	} satisfies QueryOptions;
}

export function useFileTree(input: FileTreeOptions) {
	return useQuery({
		...fileTreeOptions(input),
		staleTime: Infinity,
	});
}
