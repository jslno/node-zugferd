// UNTDID 3139 - Contact function, coded

import z from "zod";
import { createParser } from "..";

const source = "https://service.unece.org/trade/untdid/d96a/uncl/uncl3139.htm";

export default createParser(async (ctx) => {
	const data = await ctx.parseUneceList(source);

	return {
		path: __filename,
		source,
		destination: "untdid-3139.gen.ts",
		identifier: "UNTDID_3139",
		secondaryIdentifier: "Untdid3139",
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
	};
});
