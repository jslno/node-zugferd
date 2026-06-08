import { en16931 } from "@node-zugferd/en-16931";
import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [en16931],
	plugins: [
		mustang({
			autoRun: false,
		}),
		xsd({
			autoRun: false,
		}),
	],
});
