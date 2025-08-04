// CEF VATEX — VAT exemption reason code

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
		destination: "vatex.gen.ts",
		identifier: "VATEX",
		secondaryIdentifier: "VatEx",
		constants: {
			PUBLISHED: {
				value: "7",
				asConst: true,
				export: true,
			},
		},
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
			remark: z.string().optional(),
		}),
		data: entries.map((entry: any) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);
			const remark = entry.remark ? ctx.getTextNode(entry.value) : undefined;

			return {
				key: ctx.toScreamingSnakeCase(name),
				name,
				value,
				remark,
			};
		}),
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/vatex",
			importPath: "/codelist/vatex",
			title: "CEF VATEX — VAT exemption reason code",
			description: "Code specifying the VAT exemption reason.",
			sidebar: {
				title: "VATEX",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Code name (english)",
					},
					remark: {
						label: "Remark",
					},
				},
			},
		},
	};
});
