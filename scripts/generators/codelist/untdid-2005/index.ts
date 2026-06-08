import { defineParser } from "../utils";

export const untdid2005 = defineParser(async (ctx) => {
	const data = await ctx.parseUneceList(
		"https://service.unece.org/trade/untdid/d22a/tred/tred2005.htm",
	);

	return {
		packageRoot: "./packages/codelists/untdid-2005",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
