#!/usr/bin/env node

import { setup } from "./setup";

const args = process.argv.slice(2);

void setup(args)
	.then(() => process.exit(0))
	.catch(() => process.exit(1));
