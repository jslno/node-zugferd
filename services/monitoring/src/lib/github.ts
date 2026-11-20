import { env } from "cloudflare:workers";
import type { Octokit } from "octokit";
import { App } from "octokit";
import { isTrustedOrigin } from "./origin";
import type { Update } from "./schema";

let instance: Octokit | undefined;

export async function getOctokit(): Promise<Octokit> {
	if (instance) return instance;
	const app = new App({
		appId: env.GITHUB_APP_ID,
		privateKey: env.GITHUB_APP_PRIVATE_KEY,
	});

	const { data } = await app.octokit.request(
		"GET /repos/{owner}/{repo}/installation",
		{
			owner: env.GIT_USER,
			repo: env.GIT_REPO,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		},
	);

	instance = await app.getInstallationOctokit(data.id);
	return instance;
}

const getIdempotencyKeyMarker = (idempotencyKey: string) =>
	`<idempotency-key>${idempotencyKey}</idempotency-key>`;

async function findIssueByIdempotencyKey(idempotencyKey: string) {
	const marker = getIdempotencyKeyMarker(idempotencyKey);
	const octokit = await getOctokit();
	const { data } = await octokit.rest.search.issuesAndPullRequests({
		q: `repo:${env.GIT_USER}/${env.GIT_REPO} is:issue in:body "${marker}"`,
		per_page: 1,
	});

	return data.items[0] ?? null;
}

export async function createIssue(idempotencyKey: string, update: Update) {
	const existingIssue = await findIssueByIdempotencyKey(idempotencyKey);
	if (existingIssue !== null) return;

	const octokit = await getOctokit();

	const releaseDate = (() => {
		const date = new Date(update.releaseDate);
		return !isNaN(+date) ? date : null;
	})();

	const references = update.references?.filter((url) => isTrustedOrigin(url));

	const body = [
		getIdempotencyKeyMarker(idempotencyKey),
		update.summary.description,
		"## Specification versions",
		[
			`- **ZUGFeRD:** ${update.zugferdVersion ?? "Not specified"}`,
			`- **Factur-X:** ${update.facturXVersion ?? "Not specified"}`,
			`- **Release date:** ${releaseDate?.toISOString().split("T")[0] ?? "Not specified"}`,
		].join("\n"),
		"## Changes",
		update.changes.length
			? update.changes.map((change) =>
					[
						`### ${change.title}`,
						`**Type:** ${change.type}`,
						change.shortDescription,
					].join("\n\n"),
				)
			: "Could not determine individual changes.",
		"## Affected profiles",
		update.affectedProfiles.length
			? update.affectedProfiles.map((profile) => `- ${profile}`).join("\n")
			: "Could not be determined from the announcement.",
		references.length
			? ["## References", references.map((url) => `- ${url}`).join("\n")].join(
					"\n\n",
				)
			: null,
		"[Download Specification](https://www.ferd-net.de/en/download-zugferd)",
	]
		.filter((val): val is string => typeof val === "string")
		.join("\n\n");

	return await octokit.rest.issues.create({
		owner: env.GIT_USER,
		repo: env.GIT_REPO,
		title: update.summary.title,
		body,
	});
}
