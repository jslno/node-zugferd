import { readFile } from "node:fs/promises";
import path from "node:path";
import type { XMLSerializedAsObject } from "xmlbuilder2/lib/interfaces";
import { __dirname } from "../../helper";
import { defineParser } from "../utils";

const source = path.resolve(__dirname, "./codelist/untdid-5305/output.xml");

export const untdid5305 = defineParser(async (ctx) => {
	const xml = new TextDecoder().decode(await readFile(source));
	const result = ctx.parseXML(xml);
	if (!result || Array.isArray(result)) {
		throw new Error("Unexpected XML structure");
	}

	const entries = (result.entries as XMLSerializedAsObject).entry as {
		value: string;
		name: string;
		"semantic-model": string;
	}[];

	return {
		packageRoot: "./packages/codelists/untdid-5305",
		data: entries.map(({ "semantic-model": semanticModel, ...entry }) => ({
			...entry,
			semanticModel,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
