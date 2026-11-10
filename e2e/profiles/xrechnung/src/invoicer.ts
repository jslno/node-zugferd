import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { xrechnung } from "@node-zugferd/xrechnung";
import { xrechnungSchemaDefinitions } from "@node-zugferd/xrechnung-schema-definition";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [xrechnung],
	plugins: [
		mustang({
			autoRun: false,
		}),
		xsd({
			autoRun: false,
			schemaMap: xrechnungSchemaDefinitions,
		}),
	],
});
