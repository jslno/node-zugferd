// UNTDID 2379 - Date format

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
		destination: "date.gen.ts",
		identifier: "DATE",
		secondaryIdentifier: "Date",
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
			description: z.string(),
		}),
		data: entries.map((entry: any) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);
			const description = ctx.getTextNode(entry.description);

			return {
				key: ctx.toScreamingSnakeCase(name),
				name,
				value,
				description,
			};
		}),
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/date",
			importPath: "/codelist/date",
			title: "UNTDID 2379 - Date format",
			description:
				"Specification of the representation of a date, a date and time or of a period.",
			sidebar: {
				title: "Date",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: { label: "Code name" },
					description: { label: "Description" },
				},
			},
		},
	};
});
