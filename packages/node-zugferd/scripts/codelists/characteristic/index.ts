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
		destination: "characteristic.gen.ts",
		identifier: "CHARACTERISTIC",
		secondaryIdentifier: "Characteristic",
		constants: {
			PUBLISHED: {
				value: "D23A+2024",
				asConst: true,
				export: true,
			},
		},
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
			description: z.string().optional(),
			source: z.string(),
		}),
		data: entries.map((entry: any) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);
			const description = entry.description
				? ctx.getTextNode(entry.description)
				: undefined;
			const source = ctx.getTextNode(entry["@source"]);

			return {
				key: ctx.toScreamingSnakeCase(name),
				name,
				value,
				description,
				source,
			};
		}),
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/characteristic",
			importPath: "/codelist/characteristic",
			title: "UNTDID 6313 - Measured attribute code and Factur-X Extension",
			description: "Code specifying the attribute measured.",
			sidebar: {
				title: "Characteristic",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Name",
						className: {
							col: "w-1/2",
						},
					},
					description: {
						label: "Description",
						className: {
							col: "w-1/2",
						},
					},
					source: {
						label: "Source",
					},
				},
			},
		},
	};
});
