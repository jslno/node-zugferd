import { defineParser } from "../utils";

export const untdid4053 = defineParser(async (ctx) => {
	const data = await ctx.parseUneceList(
		"https://service.unece.org/trade/untdid/d22a/tred/tred4053.htm",
	);

	return {
		packageRoot: "./packages/codelists/untdid-4053",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
