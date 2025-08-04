// UNTDID 1153 — Reference code qualifier

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
		destination: "untdid-1153.gen.ts",
		identifier: "UNTDID_1153",
		secondaryIdentifier: "Untdid1153",
		constants: {
			PUBLISHED: {
				value: "24A",
				asConst: true,
				export: true,
			},
		},
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
		}),
		data: entries.map((entry: any) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);

			return {
				key: ctx.toScreamingSnakeCase(name),
				name,
				value,
			};
		}),
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/untdid-1153",
			importPath: "/codelist/untdid-1153",
			title: "UNTDID 1153 — Reference code qualifier",
			description:
				"Code giving specific meaning to a reference segment or a reference number.",
			sidebar: {
				title: "UNTDID 1153",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Name",
					},
				},
			},
		},
	};
});
