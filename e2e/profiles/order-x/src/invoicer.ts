import { orderX } from "@node-zugferd/order-x";
import { orderXSchemaDefinitions } from "@node-zugferd/order-x-schema-definition";
import { mustang } from "@node-zugferd/validator-mustang";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [orderX],
	plugins: [
		mustang({
			autoRun: false,
		}),
		xsd({
			autoRun: false,
			schemaMap: orderXSchemaDefinitions,
		}),
	],
});
