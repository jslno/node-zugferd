import { basic } from "@node-zugferd/basic";
import { defaultTemplate } from "@node-zugferd/default-template";
import { templates } from "@node-zugferd/templates";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basic],
	plugins: [
		templates({
			templates: {
				default: defaultTemplate(),
			},
		}),
		xsd(),
	],
	prettyPrint: process.env.NODE_ENV === "development",
});
