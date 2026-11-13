import { extended } from "@node-zugferd/extended";
import { parser } from "@node-zugferd/parser";
import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [extended],
	plugins: [
		parser(),
		mustang({
			autoRun: false,
			failOnWarnings: true,
		}),
		xsd({
			autoRun: false,
		}),
	],
});
