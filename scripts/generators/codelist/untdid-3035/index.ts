import { defineParser } from "../utils";

export const untdid3035 = defineParser(async (ctx) => {
	const data = await ctx.parseUneceList(
		"https://service.unece.org/trade/untdid/d22a/tred/tred3035.htm",
	);

	return {
		packageRoot: "./packages/codelists/untdid-3035",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
