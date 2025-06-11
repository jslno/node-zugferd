import { exec } from "child_process";

const checkCommand = (command: string): Promise<boolean> =>
	new Promise((resolve) => {
		exec(`${command} --version`, (error) => {
			if (error) {
				resolve(false); // Command not found or error occurred
			} else {
				resolve(true);
			}
		});
	});

export const checkPackageManagers = async () => {
	const hasPnpm = await checkCommand("pnpm");
	const hasBun = await checkCommand("bun");

	return {
		hasPnpm,
		hasBun,
	};
};
