import { createWriteStream, existsSync } from "node:fs";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { ZugferdError } from "@node-zugferd/core/error";
import { createLogger } from "@node-zugferd/core/utils";
import { glob } from "tinyglobby";
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
		const java = which("java", {
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
	return Promise.resolve();
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

	if (!existsSync(path.resolve(__dirname, asset.name))) {
		logger.debug(`Downloading Mustang-CLI from ${asset.browser_download_url}`);
		const response = await fetch(asset.browser_download_url);
		logger.debug(
			`Received response: ${response.status} ${response.statusText}`,
		);
		if (!response.ok || !response.body) {
			throw new ZugferdError(
				`Failed to download Mustang-CLI from ${asset.browser_download_url}: ${response.status} ${response.statusText}`,
			);
		}
		await cleanup();

		const dest = path.resolve(__dirname, asset.name);
		logger.debug(`Saving Mustang-CLI to ${dest}`);
		await pipeline(Readable.fromWeb(response.body), createWriteStream(dest));
		logger.debug(`Saved Mustang-CLI successfully`);
	} else {
		logger.debug(`Latest Mustang-CLI already installed. Skipping download.`);
	}
	await Promise.all([
		writeFile(
			path.resolve(__dirname, "meta.js"),
			`export const MUSTANG_CLI_JAR = ${JSON.stringify(asset.name)};`,
		).catch((err) => {
			throw new ZugferdError("Failed to write meta.js file", err);
		}),
		writeFile(
			path.resolve(__dirname, "meta.cjs"),
			`exports.MUSTANG_CLI_JAR = ${JSON.stringify(asset.name)};`,
		).catch((err) => {
			throw new ZugferdError("Failed to write meta.cjs file", err);
		}),
	]);
	logger.debug(`Saved Mustang-CLI version successfully`);
}

async function cleanup() {
	const files = await glob(
		path.join(__dirname, "mustang", "Mustang-CLI-*.jar"),
	);
	await Promise.all(files.map(unlink));
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
	const res = await fetch(url);
	logger.debug(`Received response: ${res.status} ${res.statusText}`);
	if (!res.ok) {
		throw new ZugferdError(
			`Failed to fetch release info from ${url}: ${res.status} ${res.statusText}`,
		);
	}
	return res.json() as Record<string, any>;
}
