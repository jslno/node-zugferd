import { basic } from "@node-zugferd/basic";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basic],
	plugins: [xsd()],
	prettyPrint: true,
});
