import { readFile } from "node:fs/promises";
import path from "node:path";
import type { XMLSerializedAsObject } from "xmlbuilder2/lib/interfaces";
import { __dirname } from "../../helper";
import { defineParser } from "../utils";

const source = path.resolve(__dirname, "./codelist/untdid-1001/output.xml");

export const untdid1001 = defineParser(async (ctx) => {
	const xml = new TextDecoder().decode(await readFile(source));
	const result = ctx.parseXML(xml);
	if (!result || Array.isArray(result)) {
		throw new Error("Unexpected XML structure");
	}

	const entries: Map<
		string,
		{
			value: string;
			name: string;
			description?: string | undefined;
			interpretation?: string | undefined;
		}
	> = new Map(
		(
			(result.entries as XMLSerializedAsObject).entry as {
				value: string;
				name: string;
				interpretation: string;
			}[]
		).map((entry) => [entry.value, entry]),
	);

	for (const entry of await ctx.parseUnclList("1001")) {
		entries.set(entry.value, {
			...entry,
			...(entries.get(entry.value) ?? {}),
		});
	}

	return {
		packageRoot: "./packages/codelists/untdid-1001",
		data: [...entries.values()].map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
