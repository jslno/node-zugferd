import { basic } from "@node-zugferd/basic";
import { basicWL } from "@node-zugferd/basic-wl";
import { defaultTemplate } from "@node-zugferd/default-template";
import { en16931 } from "@node-zugferd/en-16931";
import { extended } from "@node-zugferd/extended";
import { instrumentation } from "@node-zugferd/instrumentation";
import { magicBytes } from "@node-zugferd/magic-bytes";
import { minimum } from "@node-zugferd/minimum";
import { parser } from "@node-zugferd/parser";
import { templates } from "@node-zugferd/templates";
import { xsd } from "@node-zugferd/validator-xsd";
import { xrechnung } from "@node-zugferd/xrechnung";
import { xrechnungSchemaDefinitions } from "@node-zugferd/xrechnung-schema-definition";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [minimum, basicWL, basic, en16931, extended, xrechnung],
	plugins: [
		xsd({
			schemaMap: {
				...xrechnungSchemaDefinitions,
			},
		}),
		parser(),
		magicBytes(),
		templates({
			templates: {
				default: defaultTemplate(),
			},
			defaultTemplate: "default",
		}),
		instrumentation(),
	],
	prettyPrint: process.env.NODE_ENV === "development",
});
