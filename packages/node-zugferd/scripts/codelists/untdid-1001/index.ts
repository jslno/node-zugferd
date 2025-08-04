// UNTDID 1001 — Document type

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
		destination: "untdid-1001.gen.ts",
		identifier: "UNTDID_1001",
		secondaryIdentifier: "Untdid1001",
		constants: {
			PUBLISHED: {
				value: new Date("2025"),
				export: true,
			},
		},
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
			interpretation: z.string(),
		}),
		data: entries.map((entry: any) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);
			const interpretation = ctx.getTextNode(entry.interpretation);

			return {
				key: ctx.toScreamingSnakeCase(name),
				name,
				value,
				interpretation,
			};
		}),
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/untdid-1001",
			importPath: "/codelist/untdid-1001",
			title: "UNTDID 1001 — Document type",
			description: "Document/message identifier expressed in code.",
			sidebar: {
				title: "UNTDID 1001",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Name",
					},
					interpretation: { label: "EN16931 interpretation" },
				},
			},
		},
	};
});
