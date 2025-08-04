// UNTDID 5305  — Duty or tax or fee category

import z from "zod";
import { arrayable, createParser } from "..";
import { readFile } from "fs/promises";
import path from "path";

const source = path.resolve(__dirname, "./output.xml");

export default createParser(async (ctx) => {
	const xml = await readFile(source);
	const entries = arrayable(ctx.parseXML(xml).entries.entry);

	return {
		path: __filename,
		source,
		destination: "untdid-5305.gen.ts",
		identifier: "UNTDID_5305",
		secondaryIdentifier: "Untdid5305",
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
			semantic_model: z.string(),
		}),
		data: entries.map((entry: any) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);
			const semantic_model = ctx.getTextNode(entry["semantic-model"]);

			return {
				key: ctx.toScreamingSnakeCase(name),
				name,
				value,
				semantic_model,
			};
		}),
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/untdid-5305",
			importPath: "/codelist/untdid-5305",
			title: "UNTDID 5305  — Duty or tax or fee category",
			description: "Code specifying a duty or tax or fee category.",
			sidebar: {
				title: "UNTDID 5305",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Name",
					},
					semantic_model: {
						label: "Semantic model",
					},
				},
			},
		},
	};
});
