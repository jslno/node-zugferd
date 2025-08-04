// ISO 3166-1 — Country Codes

import path from "path";
import { arrayable, createParser } from "..";
import { readFile } from "fs/promises";
import z from "zod";

const source = path.resolve(__dirname, "./output.xml");

export default createParser(async (ctx) => {
	const xml = await readFile(source);
	const entries = arrayable(ctx.parseXML(xml).entries.entry);

	return {
		path: __filename,
		source,
		destination: "country.gen.ts",
		identifier: "COUNTRY",
		secondaryIdentifier: "Country",
		constants: {
			PUBLISHED: {
				value: new Date("09-01-2023"),
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
			path: "/codelists/country",
			importPath: "/codelist/country",
			title: "ISO 3166-1 — Country Codes",
			description: "Code specifying the country.",
			sidebar: {
				title: "Country",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: {
						...ctx.CODE_COLUMN,
						label: "Alpha-2 code",
					},
					name: {
						label: "English short name",
					},
				},
			},
		},
	};
});
