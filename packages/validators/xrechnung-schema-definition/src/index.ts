import { resolve } from "node:path";
import type { SchemaMap } from "@node-zugferd/validator-xsd";
import { __dirname } from "./isomorph";

const getBundledXsdPath = (fileName?: string | undefined) =>
	resolve(
		__dirname,
		...["../schemas", fileName].filter(
			(val): val is string => typeof val === "string",
		),
	);

export const xrechnungSchemaDefinitions = {
	xrechnung: {
		path: getBundledXsdPath("./CrossIndustryInvoice_100pD22B.xsd"),
		dir: getBundledXsdPath(),
	},
} as const satisfies SchemaMap;

export default xrechnungSchemaDefinitions;
