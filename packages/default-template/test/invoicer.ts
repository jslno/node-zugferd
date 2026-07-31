import { en16931 } from "@node-zugferd/en-16931";
import { templates } from "@node-zugferd/templates";
import { zugferd } from "node-zugferd";
import { defaultTemplate } from "../src";

export const invoicer = zugferd({
	profiles: [en16931],
	plugins: [
		templates({
			templates: {
				default: defaultTemplate({}),
			},
			defaultTemplate: "default",
		}),
	],
});
