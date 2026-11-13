/// <reference path="./virtual-schemas.d.ts" />

import schemaSources from "virtual:node-zugferd/xrechnung-schemas";
import type { SchemaMap, SchemaMapEntry } from "@node-zugferd/validator-xsd";

const ROOT_XSD = "CrossIndustryInvoice_100pD22B.xsd";

const getBundledSchema = (): SchemaMapEntry => {
	const content = schemaSources[ROOT_XSD];
	if (content === undefined) {
		throw new Error("The bundled XRechnung schema is missing from this build.");
	}

	return { content, imports: schemaSources };
};

export const xrechnungSchemaDefinitions = {
	xrechnung: getBundledSchema(),
} as const satisfies SchemaMap;

export default xrechnungSchemaDefinitions;
