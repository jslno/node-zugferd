import { basicWL } from "@node-zugferd/basic-wl";
import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basicWL],
	plugins: [
		mustang({
			autoRun: false,
		}),
		xsd({
			autoRun: false,
		}),
	],
});
