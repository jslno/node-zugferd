#!/usr/bin/env node

import { setup } from "./setup";

const args = process.argv.slice(2);

let timer: ReturnType<typeof setTimeout>;
const timeout = new Promise<never>((_, reject) => {
	timer = setTimeout(() => {
		reject(new Error("Setup timed out after 10 minutes"));
	}, 600_000);
});

void Promise.race([setup(args), timeout])
	.then(() => {
		clearTimeout(timer);
	})
	.catch((err: unknown) => {
		clearTimeout(timer);
		console.error(err);
		process.exitCode = 1;
	});
