// CEF EAS — Electronic address scheme identifier

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
		destination: "eas.gen.ts",
		identifier: "EAS",
		secondaryIdentifier: "Eas",
		constants: {
			PUBLISHED: {
				value: "14",
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
			path: "/codelists/eas",
			importPath: "/codelist/eas",
			title: "CEF EAS — Electronic address scheme identifier",
			description:
				"Code specifying the scheme used to identify an electronic address.",
			sidebar: {
				title: "EAS",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: {
						...ctx.CODE_COLUMN,
						label: "AES",
					},
					name: {
						label: "Scheme name",
					},
				},
			},
		},
	};
});
