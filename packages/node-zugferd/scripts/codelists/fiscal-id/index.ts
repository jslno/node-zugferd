// Tax registration

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
		destination: "fiscal-id.gen.ts",
		identifier: "FISCAL_ID",
		secondaryIdentifier: "FiscalId",
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
			path: "/codelists/fiscal-id",
			importPath: "/codelist/fiscal-id",
			title: "Tax registration",
			description:
				"Code specifying the fiscal identification of a party.",
			sidebar: {
				title: "FISCAL ID",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Value",
					},
				},
			},
		},
	};
});
