import { createWriteStream } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { ZugferdError } from "@node-zugferd/core/error";
import { createLogger } from "@node-zugferd/core/utils";
import which from "which";
import { __dirname } from "./isomorph";

const logger = createLogger({
	// Add more detailed logging when the GitHub Action Debugging option is set
	// https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
	level: process.env.RUNNER_DEBUG ? "debug" : undefined,
});

export async function setup() {
	try {
		logger.debug(`Locating java, JAVA_HOME=${process.env.JAVA_HOME}`);
		const java = await which("java", {
			path: process.env.JAVA_HOME ? process.env.JAVA_HOME + "/bin" : undefined,
		}).catch((err) => {
			throw new ZugferdError(
				"Java runtime (JRE) is required to run the Mustang validator.",
				err,
			);
		});
		logger.debug(`Found Java executable at ${java}`);

		logger.info("Installing Mustang-CLI...");
		await downloadMustang();
		logger.success("Installed successfully");
	} catch (error) {
		logger.debug("Installation failed", error);
		logger.error(`Installation failed: ${(error as Error).message}`);
		return Promise.reject(error);
	}
	return Promise.resolve({ cleanup });
}

async function downloadMustang() {
	const release = await fetchRelease({
		owner: "ZUGFeRD",
		repo: "mustangproject",
	});

	const asset = release.assets?.find(({ name }: { name: string }) => {
		return /^Mustang-CLI-(.*)\.jar$/i.test(name);
	});

	if (!asset) {
		throw new ZugferdError(
			"Could not find Mustang-CLI asset in the latest release.",
		);
	}

	logger.debug(`Downloading Mustang-CLI from ${asset.browser_download_url}`);
	const response = await fetch(asset.browser_download_url, {
		headers: {
			"User-Agent": "node-zugferd",
			Accept: "application/octet-stream",
		},
	});
	logger.debug(`Received response: ${response.status} ${response.statusText}`);
	if (!response.ok || !response.body) {
		throw new ZugferdError(
			`Failed to download Mustang-CLI from ${asset.browser_download_url}: ${response.status} ${response.statusText}`,
		);
	}

	await cleanup();
	await mkdir(path.resolve(__dirname, "../runtime"), { recursive: true });

	const dest = path.resolve(__dirname, "../runtime", "Mustang-CLI.jar");
	logger.debug(`Saving Mustang-CLI to ${dest}`);
	await pipeline(Readable.fromWeb(response.body), createWriteStream(dest));
	logger.debug(`Saved Mustang-CLI successfully`);
}

async function cleanup() {
	await rm(path.resolve(__dirname, "../runtime"), {
		recursive: true,
		force: true,
	});
}

async function fetchRelease(input: {
	owner: string;
	repo: string;
	/**
	 * @default "latest"
	 */
	release?: string | undefined;
}) {
	const url = `https://api.github.com/repos/${input.owner}/${input.repo}/releases/${input.release ?? "latest"}`;
	logger.debug(`Fetching release info from ${url}`);
	const res = await fetch(url, {
		headers: {
			"User-Agent": "node-zugferd",
			Accept: "application/vnd.github.v3+json",
		},
	});
	logger.debug(`Received response: ${res.status} ${res.statusText}`);
	if (!res.ok) {
		throw new ZugferdError(
			`Failed to fetch release info from ${url}: ${res.status} ${res.statusText}`,
		);
	}
	return res.json() as Record<string, any>;
}
