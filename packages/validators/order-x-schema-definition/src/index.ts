/// <reference path="./virtual-schemas.d.ts" />

import schemaSources from "virtual:node-zugferd/order-x-schemas";
import type { SchemaMap, SchemaMapEntry } from "@node-zugferd/validator-xsd";

const ROOT_XSD = "SCRDMCCBDACIOMessageStructure_100pD20B.xsd";

const getBundledSchema = (
	directory: "basic" | "comfort" | "extended",
): SchemaMapEntry => {
	const prefix = `${directory}/`;
	const imports: Record<string, string> = {};

	for (const [fileName, content] of Object.entries(schemaSources)) {
		if (fileName.startsWith(prefix)) {
			imports[fileName.slice(prefix.length)] = content;
		}
	}

	const content = imports[ROOT_XSD];
	if (content === undefined) {
		throw new Error(
			`The bundled Order-X schema for "${directory}" is missing from this build.`,
		);
	}

	return { content, imports };
};

export const orderXSchemaDefinitions = {
	"order-x-basic": getBundledSchema("basic"),
	"order-x": getBundledSchema("comfort"),
	"order-x-extended": getBundledSchema("extended"),
} as const satisfies SchemaMap;

export default orderXSchemaDefinitions;
