import { basic } from "@node-zugferd/basic";
import { simpleData } from "@node-zugferd-test/test-utils/basic/valid/simple.ts";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basic],
	logger: {
		level: "debug",
	},
});

await invoicer.create("basic", simpleData);
