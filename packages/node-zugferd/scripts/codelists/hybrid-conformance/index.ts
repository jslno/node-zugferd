// HybridConformanceType

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
		destination: "hybrid-conformance.gen.ts",
		identifier: "HYBRID_CONFORMANCE",
		secondaryIdentifier: "HybridConformance",
		constants: {
			PUBLISHED: {
				value: "Factur-X",
				asConst: true,
				export: true,
			},
		},
		definition: z.object({
			value: z.string(),
			definition: z.string(),
			usage: z.string(),
			comment: z.string().optional(),
		}),
		data: entries.map((entry: any) => {
			const value = ctx.getTextNode(entry.value);
			const definition = ctx.getTextNode(entry.definition);
			const usage = ctx.getTextNode(entry.usage);
			const comment = entry.comment
				? ctx.getTextNode(entry.comment)
				: undefined;

			return {
				value,
				definition,
				usage,
				comment,
			};
		}),
		enum: {
			value: "value",
		},
	};
});
