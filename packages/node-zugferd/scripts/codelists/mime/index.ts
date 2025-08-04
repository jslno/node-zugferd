// Mime type codes — Mime codes + Factur-X

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
		destination: "mime.gen.ts",
		identifier: "MIME",
		secondaryIdentifier: "Mime",
		definition: z.object({
			value: z.string(),
		}),
		data: entries.map((entry: any) => {
			const value = ctx.getTextNode(entry.value);

			return {
				value,
			};
		}),
		enum: {
			value: "value",
		},
		docs: {
			path: "/codelists/mime",
			importPath: "/codelist/mime",
			title: "Mime type codes — Mime codes + Factur-X",
			description:
				"Code specifying the media type of the content.",
			sidebar: {
				title: "MIME",
			},
			table: {
				columns: {
					value: ctx.CODE_COLUMN,
				},
			},
		},
	};
});
