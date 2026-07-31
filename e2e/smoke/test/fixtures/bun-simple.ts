import { basic } from "@node-zugferd/basic";
import { zugferd } from "node-zugferd";
import { simpleData } from "@node-zugferd-test/test-utils/basic/valid/simple.js";

export const invoicer = zugferd({
	profiles: [basic],
	logger: {
		level: "debug",
	},
});

await invoicer.create("basic", simpleData);
