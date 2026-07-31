#!/usr/bin/env node

import { setup } from "./setup";

const args = process.argv.slice(2);

const timeout = new Promise((_, reject) => {
	setTimeout(() => {
		reject(new Error("Setup timed out after 10 minutes"));
	}, 600_000);
});

void Promise.race([setup(args), timeout])
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
