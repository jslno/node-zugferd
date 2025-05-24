import chalk from "chalk";
import { Command } from "commander";
import Crypto from "crypto";

export const generateSecret = new Command("api-secret").action(() => {
	const secret = generateSecretHash();

	console.info(
		`\nAdd the following to your .env file:\n${chalk.gray("# Zugferd Secret") + chalk.green(`\nZUGFERD_API_SECRET=${secret}`)}`,
	);
});

export const generateSecretHash = () => {
	return Crypto.randomBytes(32).toString("hex");
};
