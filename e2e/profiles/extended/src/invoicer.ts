import { extended } from "@node-zugferd/extended";
import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [extended],
	plugins: [
		mustang({
			autoRun: false,
		}),
		xsd({
			autoRun: false,
		}),
	],
});
