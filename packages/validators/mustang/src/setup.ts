import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { ZugferdError } from "@node-zugferd/core/error";
import { createLogger } from "@node-zugferd/core/utils";
import which from "which";
import { __dirname } from "./isomorph";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { createWriteStream } from "node:fs";

const logger = createLogger({
	// Add more detailed logging in CI environments
	level: "debug",
	// level: process.env.CI || process.env.DEBUG ? "debug" : undefined,
});

export async function setup(args?: string[]) {
	const force = args?.some((a) => a.toLowerCase() === "--force");
	try {
		if (!force) {
			logger.debug(`Locating java, JAVA_HOME=${process.env.JAVA_HOME}`);
			const java = await which("java", {
				path: process.env.JAVA_HOME
					? process.env.JAVA_HOME + "/bin"
					: undefined,
			}).catch((err) => {
				throw new ZugferdError(
					"Java runtime (JRE) is required to run the Mustang validator.",
					err,
				);
			});
			logger.debug(`Found Java executable at ${java}`);
		}

		logger.info("Installing Mustang CLI");
		await downloadMustang();
		logger.success("Mustang CLI installed successfully");
	} catch (error) {
		logger.debug("An error occurred during setup", { error });
		logger.error(`Setup failed: ${(error as Error).message}`);
		return Promise.reject(error);
	}

	return Promise.resolve({ cleanup });
}

async function downloadMustang() {
	const releases = await fetchReleases({
		owner: "ZUGFeRD",
		repo: "mustangproject",
	});

	let asset: Record<string, any> | undefined = undefined;

	for (const release of releases) {
		const foundAsset = release.assets?.find(({ name }: { name: string }) =>
			/^Mustang-CLI-(.*)\.jar$/i.test(name),
		);
		if (foundAsset) {
			asset = foundAsset;
			break;
		}
	}

	if (!asset) {
		throw new ZugferdError(
			"Failed to find Mustang CLI asset in the latest release",
		);
	}

	logger.debug(`Downloading Mustang CLI from ${asset.browser_download_url}`);
	const response = await fetch(asset.browser_download_url, {
		headers: {
			"User-Agent": "node-zugferd",
			Accept: "application/octet-stream",
		},
	});
	logger.debug(`GitHub status: ${response.status}`);
	logger.debug(response.headers.get("x-ratelimit-remaining") ?? "");
	if (!response.ok || !response.body) {
		throw new ZugferdError(
			`Failed to download Mustang CLI: ${response.statusText} (${response.status})`,
		);
	}
	logger.debug(
		`Received response with status ${response.statusText} (${response.status}), starting download...`,
	);

	await cleanup();
	await mkdir(path.resolve(__dirname, "../runtime"), { recursive: true });
	const dest = path.resolve(__dirname, "../runtime/Mustang-CLI.jar");
	logger.debug(`Download completed, writing to ${dest}...`);
	const stream = Readable.fromWeb(response.body as any);

	stream.on("end", () => logger.debug("stream end"));
	stream.on("close", () => logger.debug("stream close"));
	stream.on("error", (e) => logger.error(String(e)));
	stream.on("data", (chunk) => logger.debug("chunk", chunk));

	await pipeline(stream, createWriteStream(dest));
	logger.debug(`Mustang CLI downloaded successfully`);
}

async function cleanup() {
	await rm(path.resolve(__dirname, "../runtime"), {
		recursive: true,
		force: true,
	});
}

async function fetchReleases(data: {
	owner: string;
	repo: string;
	page?: number | undefined;
}) {
	const url = `https://api.github.com/repos/${encodeURIComponent(data.owner)}/${encodeURIComponent(data.repo)}/releases?per_page=2&page=${encodeURIComponent(`${data.page ?? 1}`)}`;
	logger.debug(`Fetching release info from ${url}`);
	const response = await fetch(url, {
		headers: {
			"User-Agent": "node-zugferd",
			Accept: "application/vnd.github.v3+json",
		},
	});
	if (!response.ok) {
		throw new ZugferdError(
			`Failed to fetch release info: ${response.statusText} (${response.status})`,
		);
	}
	logger.debug(
		`Received response with status ${response.statusText} (${response.status})`,
	);
	return (await response.json()) as Record<string, any>[];
}
