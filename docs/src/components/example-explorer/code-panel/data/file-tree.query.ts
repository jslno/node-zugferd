"use client";

import type { QueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { tryCatch } from "@/lib/shared";
import { getFileTree } from "../actions";

function normalizeRepoPath(path: string) {
	return path.replace(/^\/+|\/+$/g, "");
}

async function fetchFileTree(path: string) {
	const { data, error } = await tryCatch(getFileTree(path));

	if (error) {
		throw error;
	}

	return data;
}

export function fileTreeOptions(path: string) {
	const normalizedPath = normalizeRepoPath(path);

	return {
		queryKey: ["file-tree", normalizedPath],
		queryFn: () => fetchFileTree(normalizedPath),
		gcTime: Infinity,
	} satisfies QueryOptions;
}

export function useFileTree(path: string) {
	return useQuery({
		...fileTreeOptions(path),
		staleTime: Infinity,
	});
}
