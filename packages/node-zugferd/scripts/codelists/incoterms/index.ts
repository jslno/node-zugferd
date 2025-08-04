// INCOTERMS

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
		destination: "incoterms.gen.ts",
		identifier: "INCOTERMS",
		secondaryIdentifier: "Incoterms",
		constants: {
			PUBLISHED: {
				value: "Factur-X",
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
			path: "/codelists/incoterms",
			importPath: "/codelist/incoterms",
			title: "INCOTERMS",
			description:
				"Code specifying the trade terms under which goods are delivered.",
			sidebar: {
				title: "INCOTERMS",
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