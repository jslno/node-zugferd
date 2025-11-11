#!/usr/bin/env node

import { setup } from "./setup";

void setup()
	.then(() => {
		process.exit(0);
	})
	.catch(() => {
		process.exit(1);
	});
