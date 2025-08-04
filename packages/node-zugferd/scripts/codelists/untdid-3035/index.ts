// UNTDID 3035 - Party function code qualifier

import z from "zod";
import { createParser } from "..";

const source = "https://service.unece.org/trade/untdid/d06b/tred/tred3035.htm";

export default createParser(async (ctx) => {
	const data = await ctx.parseUneceList(source);

	return {
		path: __filename,
		source,
		destination: "untdid-3035.gen.ts",
		identifier: "UNTDID_3035",
		secondaryIdentifier: "Untdid3035",
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
			path: "/codelists/untdid-3035",
			importPath: "/codelist/untdid-3035",
			title: "UNTDID 3035 - Party function code qualifier",
			description: "Code giving specific meaning to a party.",
			sidebar: {
				title: "UNTDID 3035",
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
