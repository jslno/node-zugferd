// UNTDID 4461 — Payment means

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
		destination: "payment.gen.ts",
		identifier: "PAYMENT",
		secondaryIdentifier: "Payment",
		constants: {
			PUBLISHED: {
				value: "24A",
				asConst: true,
				export: true,
			},
		},
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
			usage: z.string().optional(),
		}),
		data: entries.map((entry: any) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);
			const usage = entry.usage ? ctx.getTextNode(entry.value) : undefined;

			return {
				key: ctx.toScreamingSnakeCase(name),
				name,
				value,
				usage,
			};
		}),
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/payment",
			importPath: "/codelist/payment",
			title: "UNTDID 4461 — Payment means",
			description:
				"Indication of the instrument of payment, which may include a guarantee.",
			sidebar: {
				title: "Payment",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Code name",
					},
					usage: {
						label: "Usage in EN16931",
					},
				},
			},
		},
	};
});
