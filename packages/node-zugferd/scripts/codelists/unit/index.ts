// UN/ECE Recommendation N°20 and UN/ECE Recommendation N°21 — Unit codes

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
		destination: "unit.gen.ts",
		identifier: "UNIT",
		secondaryIdentifier: "Unit",
		constants: {
			PUBLISHED: {
				value: "Rec20r20+Rec21r20",
				asConst: true,
				export: true,
			},
		},
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
			change: z.string().optional(),
			source: z.string(),
		}),
		data: entries.map((entry: any) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);
			const change = entry.change ? ctx.getTextNode(entry.change) : undefined;
			const source = ctx.getTextNode(entry["@source"]);

			return {
				key: ctx.toScreamingSnakeCase(name),
				name,
				value,
				change,
				source,
			};
		}),
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/unit",
			importPath: "/codelist/unit",
			title:
				"UN/ECE Recommendation N°20 and UN/ECE Recommendation N°21 — Unit codes",
			description: "Code specifying units of measurement.",
			sidebar: {
				title: "Unit",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Name",
					},
					change: {
						label: "Change",
					},
					source: {
						label: "Source",
					},
				},
			},
		},
	};
});
