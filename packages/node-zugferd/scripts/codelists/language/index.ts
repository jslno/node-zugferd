// ISO 639-2 alpha-3 language Code

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
		destination: "language.gen.ts",
		identifier: "LANGUAGE",
		secondaryIdentifier: "Language",
		constants: {
			PUBLISHED: {
				value: new Date("2007"),
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
			path: "/codelists/language",
			importPath: "/codelist/language",
			title: "ISO 639-2 alpha-3 language Code",
			description:
				"Code representing a language.",
			sidebar: {
				title: "Language",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Code name",
					},
				},
			},
		},
	};
});
