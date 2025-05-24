#!/usr/bin/env node

import { Command } from "commander";
import "dotenv/config";
import { getPackageInfo } from "./utils/get-package-info";
import { init } from "./commands/init";

// handle exit
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const main = async () => {
	const program = new Command("node-zugferd");

	let packageInfo: Record<string, any> = {};

	try {
		packageInfo = await getPackageInfo();
	} catch {}

	program
		.addCommand(init)
		.version(packageInfo.version || "0.0.10-beta.1")
		.description("node-zugferd CLI");

	program.parse();
};

void main();
