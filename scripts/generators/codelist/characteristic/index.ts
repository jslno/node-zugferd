import { readFile } from "node:fs/promises";
import path from "node:path";
import type { XMLSerializedAsObject } from "xmlbuilder2/lib/interfaces";
import { __dirname } from "../../helper";
import { defineParser } from "../utils";

const source = path.resolve(__dirname, "./codelist/characteristic/output.xml");

export const characteristic = defineParser(async (ctx) => {
	const xml = new TextDecoder().decode(await readFile(source));
	const result = ctx.parseXML(xml);
	if (!result || Array.isArray(result)) {
		throw new Error("Unexpected XML structure");
	}

	const entries = (result.entries as XMLSerializedAsObject).entry as {
		value: string;
		name: string;
		description: string;
	}[];

	return {
		packageRoot: "./packages/codelists/characteristic",
		data: entries.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
