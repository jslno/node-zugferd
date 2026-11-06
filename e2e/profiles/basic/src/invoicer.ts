import { basic } from "@node-zugferd/basic";
import { parser } from "@node-zugferd/parser";
import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basic],
	plugins: [
		parser(),
		mustang({
			autoRun: false,
		}),
		xsd({
			autoRun: false,
		}),
	],
});
