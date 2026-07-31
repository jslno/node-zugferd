#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init";
import { upgrade } from "./commands/upgrade";
import { parse } from "./commands/parse";

// handle exit
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
	const program = new Command("node-zugferd");

	const cliVersion = "1.0.0"; // TODO: Replace with actual CLI version

	program
		.addCommand(init)
		.addCommand(parse)
		.addCommand(upgrade)
		.version(cliVersion)
		.description("node-zugferd CLI")
		.action(() => program.help());

	program.parse();
}

void main().catch((error) => {
	console.error("Error running node-zugferd CLI:", error);
	process.exit(1);
});
