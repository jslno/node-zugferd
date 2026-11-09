import { basicWL } from "@node-zugferd/basic-wl";
import { en16931 } from "@node-zugferd/en-16931";
import { minimum } from "@node-zugferd/minimum";
import { templates } from "@node-zugferd/templates";
import { zugferd } from "node-zugferd";
import { defaultTemplate } from "../src";

export const invoicer = zugferd({
	profiles: [minimum, basicWL, en16931],
	plugins: [
		templates({
			templates: {
				default: defaultTemplate({}),
			},
			defaultTemplate: "default",
		}),
	],
});
