import { basic } from "@node-zugferd/basic";
import { simpleData } from "@node-zugferd-test/test-utils/basic/valid/simple.js";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basic],
});

invoicer.create("basic", simpleData).catch();
