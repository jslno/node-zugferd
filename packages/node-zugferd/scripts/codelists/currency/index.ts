// ISO 4217 — Currency codes

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
		destination: "currency.gen.ts",
		identifier: "CURRENCY",
		secondaryIdentifier: "Currency",
		constants: {
			PUBLISHED: {
				value: new Date("02-01-2025"),
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
			path: "/codelists/currency",
			importPath: "/codelist/currency",
			title: "ISO 4217 — Currency codes",
			description: "Code specifying the currency.",
			sidebar: {
				title: "Currency",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: { ...ctx.CODE_COLUMN, label: "Alphabetic Code" },
					name: {
						label: "Currency",
					},
				},
			},
		},
	};
});
