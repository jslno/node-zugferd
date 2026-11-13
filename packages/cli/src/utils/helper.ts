import { execSync } from "node:child_process";
import os from "node:os";

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

export const open = (link: string) => {
	const platform = os.platform();

	let cmd: string;
	switch (platform) {
		case "darwin":
			cmd = "open";
			break;
		case "win32":
			cmd = 'start ""';
			break;
		case "linux":
			cmd = "xdg-open";
			break;
		default:
			throw new Error(`Unsupported platform: ${platform}`);
	}

	execSync(`${cmd} "${link}"`, { stdio: "inherit" });
};
