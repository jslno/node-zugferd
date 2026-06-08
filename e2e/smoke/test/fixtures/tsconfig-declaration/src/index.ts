import { basic } from "@node-zugferd/basic";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basic],
});

invoicer
	.create("basic", {
		processControl: {},
	})
	.catch();
