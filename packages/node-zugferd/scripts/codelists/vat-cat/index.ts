// VAT Category code + Factur-X

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
		destination: "vat-cat.gen.ts",
		identifier: "VAT_CAT",
		secondaryIdentifier: "VatCat",
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
			path: "/codelists/vat-cat",
			importPath: "/codelist/vat-cat",
			title: "VAT Category code + Factur-X",
			description: "Code specifying the VAT category.",
			sidebar: {
				title: "VAT-CAT",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Name",
					},
					description: {
						label: "Description",
					},
				},
			},
		},
	};
});
