import { exec } from "child_process";

export const run = (cmd: string) =>
	new Promise<string>((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				return reject(error);
			}

			resolve(stdout + stderr);
		});
	});
