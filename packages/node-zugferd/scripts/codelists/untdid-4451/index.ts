// UNTDID 4451 - Text subject qualifier

import z from "zod";
import { createParser } from "..";

const source = "https://service.unece.org/trade/untdid/d96a/uncl/uncl4451.htm";

export default createParser(async (ctx) => {
	const data = await ctx.parseUneceList(source);

	return {
		path: __filename,
		source,
		destination: "untdid-4451.gen.ts",
		identifier: "UNTDID_4451",
		secondaryIdentifier: "Untdid4451",
		definition: z.object({
			key: z.string(),
			name: z.string(),
			value: z.string(),
			description: z.string(),
		}),
		data,
		enum: {
			key: "key",
			value: "value",
		},
		docs: {
			path: "/codelists/untdid-4451",
			importPath: "/codelist/untdid-4451",
			title: "UNTDID 4451 - Text subject qualifier",
			description: "Code specifying subject of a free text.",
			sidebar: {
				title: "UNTDID 4451",
			},
			table: {
				columns: {
					key: ctx.HIDE_COLUMN,
					value: ctx.CODE_COLUMN,
					name: {
						label: "Name",
					},
					description: { label: "Description" },
				},
			},
		},
	};
});
