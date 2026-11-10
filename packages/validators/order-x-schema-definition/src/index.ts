import { resolve } from "node:path";
import type { SchemaMap } from "@node-zugferd/validator-xsd";
import { __dirname } from "./isomorph";

const getBundledXsdPath = (fileName: string) =>
	resolve(__dirname, "../schemas", fileName);

export const orderXSchemaDefinitions = {
	"order-x-basic": {
		path: getBundledXsdPath(
			"./basic/SCRDMCCBDACIOMessageStructure_100pD20B.xsd",
		),
		dir: getBundledXsdPath("./basic"),
	},
	"order-x": {
		path: getBundledXsdPath(
			"./comfort/SCRDMCCBDACIOMessageStructure_100pD20B.xsd",
		),
		dir: getBundledXsdPath("./comfort"),
	},
	"order-x-extended": {
		path: getBundledXsdPath(
			"./extended/SCRDMCCBDACIOMessageStructure_100pD20B.xsd",
		),
		dir: getBundledXsdPath("./extended"),
	},
} as const satisfies SchemaMap;

export default orderXSchemaDefinitions;
