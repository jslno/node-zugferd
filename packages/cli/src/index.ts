#!/usr/bin/env node

import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { Command } from "commander";
import { info } from "./commands/info";
import { init } from "./commands/init";
import { mcp } from "./commands/mcp";
import { parse } from "./commands/parse";
import { upgrade } from "./commands/upgrade";
import { validate } from "./commands/validate";

// handle exit
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
	const program = new Command("node-zugferd");

	program
		.addCommand(info)
		.addCommand(init)
		.addCommand(parse)
		.addCommand(validate)
		.addCommand(mcp)
		.addCommand(upgrade)
		.version(NODE_ZUGFERD_VERSION)
		.description("node-zugferd CLI")
		.action(() => program.help());

	program.parse();
}

void main().catch((error) => {
	console.error("Error running node-zugferd CLI:", error);
	process.exit(1);
});
