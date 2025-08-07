import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";

export const downloadMustangJar = async (destination: string) => {
	const release = await fetchRelease({
		owner: "ZUGFeRD",
		repo: "mustangproject",
	});
	const releaseName = release.name;

	const filename = `Mustang-CLI-${releaseName}.jar`;
	const asset = release.assets.find((asset: any) => asset.name === filename);
	if (!asset) {
		throw new Error(`Asset "${filename}" not found in latest release.`);
	}

	const response = await fetch(asset.browser_download_url);
	if (!response.ok || !response.body) {
		throw new Error(`Failed to download asset: ${response.status}`);
	}

	const fileStream = createWriteStream(destination);
	await mkdir(path.dirname(destination), { recursive: true });
	await pipeline(response.body, fileStream);
};

const fetchRelease = async (input: {
	owner: string;
	repo: string;
	/**
	 * @default "latest"
	 */
	release?: string;
}) => {
	const url = `https://api.github.com/repos/${input.owner}/${input.repo}/releases/${input.release ?? "latest"}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch release ${input.release ?? "latest"}: ${response.status}`,
		);
	}

	return response.json();
};
