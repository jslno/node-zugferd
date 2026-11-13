"use server";

import type { Octokit } from "octokit";
import { getOctokit } from "@/lib/github";
import { gitConfig } from "@/lib/shared";

type FileTree = (Awaited<
	ReturnType<Octokit["rest"]["git"]["getTree"]>
>["data"]["tree"][number] & { content: string })[];

const cache = new Map<string, FileTree>();

export const getFileTree = async (path: string) => {
	if (cache.has(path)) {
		return cache.get(path)!;
	}

	const octokit = await getOctokit();

	const { data: commit } = await octokit.rest.repos.getCommit({
		owner: gitConfig.user,
		repo: gitConfig.repo,
		ref: gitConfig.branch,
	});

	const segments = path.split("/").filter(Boolean);
	let sha = commit.commit.tree.sha;

	for (const segment of segments) {
		const { data } = await octokit.rest.git.getTree({
			owner: gitConfig.user,
			repo: gitConfig.repo,
			tree_sha: sha,
		});

		const directory = data.tree.find(
			(entry) => entry.path === segment && entry.type === "tree",
		);

		if (!directory?.sha) {
			throw new Error(`Directory not found: ${path}`);
		}

		sha = directory.sha;
	}

	const files: FileTree = [];

	const traverse = async (treeSha: string, prefix: string) => {
		const { data } = await octokit.rest.git.getTree({
			owner: gitConfig.user,
			repo: gitConfig.repo,
			tree_sha: treeSha,
		});

		if (data.truncated) {
			throw new Error(`Tree truncated: ${prefix}`);
		}

		for (const entry of data.tree) {
			const filePath = `${prefix}/${entry.path}`;

			if (entry.type === "tree" && entry.sha) {
				await traverse(entry.sha, filePath);
			} else if (entry.type === "blob" && entry.sha) {
				const { data: blob } = await octokit.rest.git.getBlob({
					owner: gitConfig.user,
					repo: gitConfig.repo,
					file_sha: entry.sha,
				});

				if (blob.encoding !== "base64") {
					throw new Error(`Unsupported encoding: ${blob.encoding}`);
				}

				const normalizedPrefix = prefix.slice(path.length);
				files.push({
					...entry,
					path: `${normalizedPrefix}/${entry.path}`,
					size: blob.size ?? entry.size ?? undefined,
					content: new TextDecoder().decode(
						Uint8Array.from(atob(blob.content), (char) => char.charCodeAt(0)),
					),
				});
			}
		}
	};

	await traverse(sha, segments.join("/"));

	return files;
};
