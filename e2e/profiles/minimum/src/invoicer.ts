import { minimum } from "@node-zugferd/minimum";
import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [minimum],
	plugins: [
		mustang({
			autoRun: false,
		}),
		xsd({
			autoRun: false,
		}),
	],
});
