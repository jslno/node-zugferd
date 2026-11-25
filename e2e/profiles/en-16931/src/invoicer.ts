import { en16931 } from "@node-zugferd/en-16931";
import { parser } from "@node-zugferd/parser";
import { kosit } from "@node-zugferd/validator-kosit";
import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [en16931],
	plugins: [
		parser(),
		kosit({
			autoRun: false,
			failOnWarnings: true,
		}),
		mustang({
			autoRun: false,
			failOnWarnings: true,
		}),
		xsd({
			autoRun: false,
		}),
	],
});
