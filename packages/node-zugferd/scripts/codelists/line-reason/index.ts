// Status Reason Code

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
		destination: "line-reason.gen.ts",
		identifier: "LINE_REASON",
		secondaryIdentifier: "LineReason",
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
			path: "/codelists/line-reason",
			importPath: "/codelist/line-reason",
			title: "Status Reason Code",
			description:
				"Code specifying the reason for the status.",
			sidebar: {
				title: "Line Reason",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Description",
					},
				},
			},
		},
	};
});
